import React, { useState } from 'react';

const moodPlaylists = {
    happy: {
        genres: ["pop", "rock", "funk"],
        playlists: [
            { name: "Happy Hits", link: "spotify:playlist:37i9dQZF1DXdPec7aLTmlC", image: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95" },
            { name: "Feel Good Friday", link: "spotify:playlist:37i9dQZF1DX3rxVfibe1L0", image: "https://i.scdn.co/image/ab67706f000000034e1348c42b5b18c8d67cdd74" },
        ]
    },
    sad: {
        genres: ["ballad", "blues", "jazz"],
        playlists: [
            { name: "Sad Hours", link: "spotify:playlist:37i9dQZF1DX7qK8ma5wgG1", image: "https://i.scdn.co/image/ab67706f000000034d26d431869cabfc53c67d8e" },
            { name: "Life Sucks", link: "spotify:playlist:37i9dQZF1DX3YSRoSdA634", image: "https://i.scdn.co/image/ab67706f00000003e435ce0a86a8b9dc24527618" },
        ]
    },
    angry: {
        genres: ["metal", "punk", "grunge"],
        playlists: [
            { name: "Rage Beats", link: "spotify:playlist:37i9dQZF1DX1H1aGvtnPE0", image: "https://i.scdn.co/image/ab67706f00000003a90866acaa73f74d68d33bb6" },
            { name: "Metal Essentials", link: "spotify:playlist:37i9dQZF1DWXIcbzpLauPS", image: "https://i.scdn.co/image/ab67706f00000003a753f13d98de1c991797f364" },
        ]
    },
    calm: {
        genres: ["classical", "ambient", "lo-fi"],
        playlists: [
            { name: "Peaceful Piano", link: "spotify:playlist:37i9dQZF1DX4sWSpwq3LiO", image: "https://i.scdn.co/image/ab67706f00000003ca5a7517156021c57124c457" },
            { name: "Lo-Fi Beats", link: "spotify:playlist:37i9dQZF1DWWQRwui0ExPn", image: "https://i.scdn.co/image/ab67706f000000035ea54b91b073c2776b966e7b" },
        ]
    }
};

const Playlists = () => {
    const [selectedMood, setSelectedMood] = useState('happy');
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const openSpotifyPlaylist = (link) => {
        window.open(link.replace('spotify:playlist:', 'https://open.spotify.com/playlist/'), '_blank');
    };

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Mood Playlists</h2>
                
                {/* Mood Selector */}
                <div className="flex gap-4 mb-8">
                    {Object.keys(moodPlaylists).map((mood) => (
                        <button
                            key={mood}
                            onClick={() => setSelectedMood(mood)}
                            className={`px-6 py-2 rounded-full transition-all duration-300
                                ${selectedMood === mood 
                                    ? 'bg-emerald-600 text-white' 
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            {mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Playlist Rows */}
                <div className="space-y-6">
                    {moodPlaylists[selectedMood].playlists.map((playlist, index) => (
                        <div
                            key={playlist.name}
                            className="flex items-center p-2 rounded-lg hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                            onClick={() => openSpotifyPlaylist(playlist.link)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="relative w-16 h-16 mr-4">
                                <img 
                                    src={playlist.image} 
                                    alt={playlist.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                {hoveredIndex === index && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-white font-medium">{playlist.name}</h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {moodPlaylists[selectedMood].genres.map((genre) => (
                                        <span 
                                            key={genre}
                                            className="px-2 py-0.5 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                                        >
                                            {genre}
                                        </span>
                                    ))}
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