import CameraDisplay from '@/Components/CameraDisplay';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout >
            <Head title="Dashboard" />

            <div className="relative h-full"> 
                <div className="fixed inset-0 overflow-hidden -z-10">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>

                <div className="py-12 z-0 mt-8"> 
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    Emotion Detection
                                </h3>
                                <p className="text-white/80 mb-6">
                                    Your real-time emotion will be analyzed through the camera feed.
                                </p>
                                <div className="bg-black/20 p-4 rounded-xl">
                                    <CameraDisplay onSnapshot={console.log} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
