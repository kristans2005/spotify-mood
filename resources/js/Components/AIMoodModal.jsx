import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CameraDisplay from '@/Components/CameraDisplay';

const AIMoodModal = ({ isOpen, onClose, onMoodDetected }) => {
    const [isLiveMode, setIsLiveMode] = useState(false);
    const [currentMood, setCurrentMood] = useState(null);

    const handleImageSnapshot = (imageBlob) => {
        const formData = new FormData();
        formData.append("file", imageBlob);
        fetch("http://127.0.0.1:6969/predict", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => setCurrentMood(data.result));
            console.log(currentMood);
    };

    const handleGetPlaylist = () => {
        if (currentMood) {
            onMoodDetected(currentMood);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-gray-900 to-black p-6 shadow-xl border border-gray-800 "
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800/50 transition-all"
                        >
                            ×
                        </button>

                        <h2 className="mb-6 text-3xl text-center font-bold text-white">AI Mood Detection</h2>

                        <div className="space-y-6">
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                                    <CameraDisplay onSnapshot={handleImageSnapshot} />
                                </div>
                                
                                {currentMood && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 text-center space-y-4"
                                    >
                                        <div>
                                            <span className="text-gray-400 text-lg">Detected Mood:</span>
                                            <h3 className="text-2xl font-bold text-emerald-400 mt-2">
                                                {currentMood}
                                            </h3>
                                        </div>
                                        
                                        <motion.button
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleGetPlaylist}
                                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors shadow-lg"
                                        >
                                            Get Playlist
                                        </motion.button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AIMoodModal;