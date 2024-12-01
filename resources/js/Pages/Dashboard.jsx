import CameraDisplay from '@/Components/CameraDisplay';
import Playlists from '@/Components/Playlists';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AIMoodModal from '@/Components/AIMoodModal';

export default function Dashboard() {
    const [isAIMoodModalOpen, setIsAIMoodModalOpen] = useState(false);
    const [currentMood, setCurrentMood] = useState(null);

    const handleMoodDetected = (mood) => {
        setCurrentMood(mood);
        setIsAIMoodModalOpen(false);
    };

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
                            <Playlists 
                                onOpenAIMoodModal={() => setIsAIMoodModalOpen(true)}
                                currentMood={currentMood}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <AIMoodModal
                isOpen={isAIMoodModalOpen}
                onClose={() => setIsAIMoodModalOpen(false)}
                onMoodDetected={handleMoodDetected}
            />
        </AuthenticatedLayout>
    );
}
