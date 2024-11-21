import React, { useState, useEffect } from 'react';
import Mood from '@/Pages/Mood';



const Playlists = () => {
    const [moodPlaylists, setMoodPlaylists] = useState(Mood);
    const [selectedMood, setSelectedMood] = useState('happy');
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
        console.log(moodPlaylists["mood"]);
        
        
        fetchMoodPlaylists();
    }, [token, selectedMood]);

    return (
        <div className="min-h-screen bg-gray-900 px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-white mb-8">Mood Playlists</h1>
                
                <div className="flex flex-wrap gap-4 mb-10">
                    {Object.keys(moodPlaylists["mood"]).map((mood, index) => ( // Loop through moodPlaylists keys
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
                            {mood}
                        </button>
                    ))}
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {loading && <p className="text-white mb-4">Loading tracks...</p>}
                
            </div>
        </div>
    );
};

export default Playlists;