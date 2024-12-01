import React, { useState, useEffect } from 'react';
import Mood from '@/Pages/Mood';
import { motion } from 'framer-motion';

const Playlists = ({ onOpenAIMoodModal, currentMood }) => {
    const [moodPlaylists, setMoodPlaylists] = useState(Mood);
    const [selectedMood, setSelectedMood] = useState('happy');
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
            const currentMood = moodPlaylists.find(mood => mood.name.toLowerCase() === selectedMood);
            const genre = currentMood.genres.toString();
            console.log(genre);
            
            setLoading(true);
            try {
                const response = await axios.post('/spotify/mood', {
                    token,
                    mood: genre
                });
                setApiData(response.data.tracks.items);
            } catch (err) {
                setError(`Failed to fetch playlists for mood: ${selectedMood}`);
            } finally {
                setLoading(false);
            }
        };

        fetchMoodPlaylists();
    }, [token, selectedMood]);

    useEffect(() => {
        if (currentMood) {
            setSelectedMood(currentMood.toLowerCase());
        }
    }, [currentMood]);

    const handleAIMoodDetected = (mood) => {
        setSelectedMood(mood.toLowerCase());
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="min-h-screen rounded-xl bg-gradient-to-b from-emerald-900/20 to-black/40 p-8 backdrop-blur-lg">
            {/* Mood Selector */}
            <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-white">How are you feeling today?</h2>
                <motion.div 
                    className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {moodPlaylists.map((mood) => (
                        <motion.div
                            key={mood.name}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedMood(mood.name.toLowerCase())}
                            className={`cursor-pointer rounded-xl p-6 text-center transition-all duration-300 shadow-lg backdrop-blur-sm ${
                                selectedMood === mood.name.toLowerCase()
                                    ? 'bg-emerald-600/80 text-white shadow-emerald-500/20'
                                    : 'bg-emerald-900/30 text-gray-300 hover:bg-emerald-800/40'
                            }`}
                        >
                            <div className="mb-3 text-3xl">{mood.emoji}</div>
                            <div className="font-medium">{mood.name}</div>
                        </motion.div>
                    ))}
                    
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onOpenAIMoodModal}
                        className="cursor-pointer rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-indigo-700"
                    >
                        <div className="mb-3 text-3xl">⭐</div>
                        <div className="font-medium text-white">AI Mood</div>
                    </motion.div>
                </motion.div>
            </div>




            {/* Playlist Section */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-400">{error}</div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="mx-auto max-w-4xl space-y-3"
                >
                    {apiData.map((track, index) => (
                        <motion.div
                            key={track.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="group flex flex-col sm:flex-row items-center rounded-xl bg-emerald-900/30 p-3 sm:p-4 transition-all hover:bg-emerald-800/40 backdrop-blur-sm gap-2 sm:gap-0"
                        >
                            <div className="hidden sm:flex w-8 text-gray-400">{index + 1}</div>
                            <div className="h-16 w-16 sm:h-12 sm:w-12 sm:mr-4 overflow-hidden rounded">
                                <img 
                                    src={track.album?.images[0]?.url} 
                                    alt={track.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="text-white group-hover:text-green-400 text-sm sm:text-base">
                                    {track.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-400">
                                    {track.artists?.map(artist => artist.name).join(', ')}
                                </p>
                            </div>
                            <div className="text-xs sm:text-sm text-emerald-300">
                                {Math.floor(track.duration_ms / 60000)}:
                                {Math.floor((track.duration_ms % 60000) / 1000)
                                    .toString()
                                    .padStart(2, '0')}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Playlists;