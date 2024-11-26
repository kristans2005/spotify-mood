import React, { useState, useEffect } from 'react';
import Mood from '@/Pages/Mood';



const Playlists = () => {
    const [moodPlaylists, setMoodPlaylists] = useState(Mood);
    const [selectedMood, setSelectedMood] = useState('happy');
    const [apiData, setApiData] = useState({});	
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
            const genre = moodPlaylists["mood"][selectedMood]["genres"].toString();
            setLoading(true);
            try {
                const response = await axios.post('/spotify/mood', {
                    token,
                    mood: genre
                });
                //console.log(`Mood: ${selectedMood}`, response.data);
                setApiData(response.data.tracks);
                console.log(response.data.tracks);
                
                
                
            } catch (err) {
                setError(`Failed to fetch playlists for mood: ${selectedMood}`);
                console.error(`Error response for ${selectedMood}:`, err.response?.data);
            } finally {
                setLoading(false);
            }
        };
        // console.log(moodPlaylists["mood"]);
        
        
        
        
        fetchMoodPlaylists();
        
    }, [token, selectedMood]);

    return (
        <div className="min-h-screen bg-gray-900 px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-white mb-8">Mood Playlists</h1>
                
                {/* Mood Selection Buttons */}
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
                
                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {apiData.map((album, index) => (

                            <div 
                                key={album.id}
                                className="group bg-gray-800/40 p-4 rounded-lg hover:bg-gray-700/40 transition-all duration-300"
                            >
                                <div className="relative">
                                    <div className="aspect-square mb-4 relative">
                                        <img 
                                            src={album.images}
                                            alt={album.name}
                                            className="w-full h-full object-cover rounded-md shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                            <button 
                                                className="bg-green-500 p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Add play functionality here
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-white font-bold text-base mb-1 truncate">
                                        {album.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm truncate">
                                        {album.artists?.map(artist => artist.name).join(', ') || 'Unknown Artist'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {apiData?.length === 0 && !loading && (
                    <div className="text-center text-gray-400 mt-8">
                        <p>No playlists found for this mood</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Playlists;