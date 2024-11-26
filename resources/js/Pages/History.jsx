import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchHistory = async () => {
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
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-green-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {history.map((item) => (
                                    <div key={item.id} className="group relative rounded-md bg-gray-900 p-4 transition-all hover:bg-gray-800">
                                        <div className="aspect-square w-full overflow-hidden rounded-md">
                                            <img 
                                                src={item.picture} 
                                                alt={item.name}
                                                className="h-full w-full object-cover transition-all group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="mt-2 truncate text-sm font-medium text-white">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
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
                        </>
                    )}
                </div>
            </div>

            </div>
            
        </AuthenticatedLayout>
    );
}
