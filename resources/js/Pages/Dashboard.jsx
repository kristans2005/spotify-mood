import CameraDisplay from '@/Components/CameraDisplay';
import Playlists from '@/Components/Playlists';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);



    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-bold text-white">
                    Your Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="backdrop-blur-lg bg-emerald-900/20 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full mb-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg"
                            >
                                Read Your Emotions
                            </button>

                            {isModalOpen && (
                                <div className="fixed inset-0 bg-emerald-950/50 backdrop-blur-sm flex items-center justify-center z-50">
                                    <div className="bg-emerald-900/90 p-6 rounded-2xl w-96 border border-emerald-500/20 shadow-2xl">
                                        <h3 className="text-xl font-bold text-white mb-4">Choose Your Method</h3>
                                        <div className="space-y-4">
                                            <button 
                                                onClick={() => setIsModalOpen(false)}
                                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                                            >
                                                Use Camera
                                            </button>
                                            <button 
                                                onClick={() => setIsModalOpen(false)}
                                                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                                            >
                                                Upload Selfie
                                            </button>
                                            <button 
                                                onClick={() => setIsModalOpen(false)}
                                                className="w-full text-emerald-300 hover:text-emerald-200 font-medium py-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* <div className="bg-black/20 p-4 rounded-xl">
                                <CameraDisplay onSnapshot={console.log} />
                            </div> */}
                            <Playlists />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
