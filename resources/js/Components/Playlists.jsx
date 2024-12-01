import React, { useState, useEffect } from 'react';
import Mood from '@/Pages/Mood';



const Playlists = () => {
    const [moodPlaylists, setMoodPlaylists] = useState(Mood);
    const [selectedMood, setSelectedMood] = useState('sad');
    const [apiData, setApiData] = useState([]);	
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
            console.log(genre);
            
            setLoading(true);
            try {
                const response = await axios.post('/spotify/mood', {
                    token,
                    mood: genre
                });
                //console.log(`Mood: ${selectedMood}`, response.data);
                console.log(response.data.tracks.items);  
                
                setApiData(response.data.tracks.items);

                
                
                
            } catch (err) {
                setError(`Failed to fetch playlists for mood: ${selectedMood}`);
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {apiData.map((track, index) => (

                            <div 
                                key={track.id}
                                className="group relative bg-gray-900/20 rounded-md p-3 hover:bg-gray-800/40 transition-all duration-200 cursor-pointer"
                            >
                                <div className="relative">
                                    <div className="aspect-square mb-3">
                                        <img 
                                            src={track.album.images[0]?.url || '/default-album-art.png'}
                                            alt={track.name}
                                            className="w-full h-full object-cover rounded-md shadow-md"
                                        />
                                        <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                                            <button className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:scale-105 hover:bg-green-400 transition-all">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white font-semibold truncate">{track.name}</p>
                                        <p className="text-gray-400 text-sm truncate">
                                            {track.artists.map(artist => artist.name).join(', ')}
                                        </p>
                                    </div>
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