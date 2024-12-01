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
                {/* <div className="absolute inset-0 ">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div> */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className=" backdrop-blur-lg bg-emerald-900/20 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8">

                            <Playlists />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
