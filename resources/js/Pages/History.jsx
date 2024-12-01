import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [mounted, setMounted] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const response = await axios.post('/playlist-history', {
                    page: page,
                    per_page: 30
                });
                setHistory(response.data.data);
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [page, mounted]);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-3xl font-bold text-white">Your History</h2>}
        >
            <Head title="History" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="backdrop-blur-lg bg-emerald-900/20 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={page}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {loading ? (
                                        <motion.div 
                                            className="flex justify-center"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <div className="h-8 w-8 rounded-full border-b-2 border-green-500"></div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key={`container-${page}`}
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="show"
                                            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                                        >
                                            {history.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    variants={itemVariants}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="group relative rounded-xl bg-gray-800/40 p-4 transition-all hover:bg-gray-700/40 backdrop-blur-sm"
                                                >
                                                    <div className="aspect-square overflow-hidden rounded-md">
                                                        <img 
                                                            src={item.picture} 
                                                            alt={item.name}
                                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <h3 className="mt-3 truncate text-sm font-medium text-white">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(item.created_at).toLocaleDateString()}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                    <div className="mt-8 flex items-center justify-center gap-4">
                                        <button 
                                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                            disabled={page === 1}
                                            className="rounded-full bg-emerald-600/80 px-6 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-emerald-500/80 transition-all duration-200"
                                        >
                                            Previous
                                        </button>
                                        
                                        <span className="text-sm text-emerald-100">
                                            Page {page} of {totalPages}
                                        </span>
                                        
                                        <button 
                                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={page === totalPages}
                                            className="rounded-full bg-emerald-600/80 px-6 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-emerald-500/80 transition-all duration-200"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
