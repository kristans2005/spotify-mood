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

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const pageTransition = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 }
    };

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const response = await axios.post('/playlist-history', {
                    page: page,
                    per_page: 8 // Optional: adjust items per page
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
    }, [page]);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">History</h2>}
        >
            <Head title="History" />
            <div className='p-12'>
                <div className="py-12 bg-gray-800 rounded-xl ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            {...pageTransition}
                            className="min-h-screen bg-gradient-to-b from-gray-900 to-black"
                        >
                            {loading ? (
                                <motion.div 
                                    className="flex h-64 items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="h-8 w-8 animate-pulse rounded-full bg-green-500/20"></div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                                >
                                    {history.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            variants={itemVariants}
                                            whileHover={{ 
                                                scale: 1.03,
                                                transition: { duration: 0.2 }
                                            }}
                                            className="group relative overflow-hidden rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm transition-colors duration-300 hover:bg-gray-700/50"
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
                                    className="rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-green-600"
                                >
                                    Previous
                                </button>
                                
                                <span className="text-sm text-gray-600">
                                    Page {page} of {totalPages}
                                </span>
                                
                                <button 
                                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                    className="rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-green-600"
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            </div>
            
        </AuthenticatedLayout>
    );
}
