import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaylistImage = ({ src, alt }) => {
    const [error, setError] = useState(false);
    return (
        <img 
            src={error ? 'https://img.icons8.com/ios-filled/50/000000/musical-notes.png' : src} 
            alt={alt}
            onError={() => setError(true)}
            className="w-16 h-16 object-cover rounded"
        />
    );
};

const Playlists = () => {
    const [moodPlaylists, setMoodPlaylists] = useState({});
    const [selectedMood, setSelectedMood] = useState('happy');
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get Spotify token
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.get('/spotify/token');
                setToken(response.data.access_token);
            } catch (err) {
                setError('Failed to fetch token');
                console.error(err);
            }
        };
        fetchToken();
    }, []);

    // Fetch playlists when mood changes
    useEffect(() => {
        if (!token) return;

        const fetchMoodPlaylists = async () => {
            setLoading(true);
            try {
                const response = await axios.post('/spotify/mood', {
                    token,
                    mood: selectedMood
                });
                console.log(`Mood: ${selectedMood}`, response.data);
                setMoodPlaylists(prev => ({
                    ...prev,
                    [selectedMood]: response.data.tracks
                }));
            } catch (err) {
                setError(`Failed to fetch playlists for mood: ${selectedMood}`);
                console.error(`Error response for ${selectedMood}:`, err.response?.data);
            } finally {
                setLoading(false);
            }
        };

        fetchMoodPlaylists();
    }, [token, selectedMood]);

    return (
        <div className="min-h-screen bg-gray-900 px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Mood Playlists</h1>
                
                <div className="flex flex-wrap gap-4 mb-10">
                    {['happy', 'sad'].map((mood) => ( // Temporarily removed 'angry' and 'calm'
                        <button
                            key={mood}
                            onClick={() => setSelectedMood(mood)}
                            className={`
                                px-6 py-3 rounded-full font-medium transition-all duration-300
                                ${selectedMood === mood 
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                            `}
                        >
                            {mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </button>
                    ))}
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {loading && <p className="text-white mb-4">Loading tracks...</p>}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.isArray(moodPlaylists[selectedMood]) && moodPlaylists[selectedMood].map((track, index) => (
                        <div
                            key={track.id || index}
                            onClick={() => window.open(track.external_urls?.spotify, '_blank')}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="
                                p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm
                                hover:bg-gray-700/50 transition-all duration-300 cursor-pointer
                                border border-gray-700/50 hover:border-green-500/50
                            "
                        >
                            <div className="flex items-center gap-4">
                                <PlaylistImage 
                                    src={track.album?.images?.[0]?.url} 
                                    alt={track.name}
                                />
                                <div>
                                    <h3 className="text-white font-semibold">{track.name}</h3>
                                    <p className="text-gray-400 text-sm">{track.artists?.map(a => a.name).join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Playlists;