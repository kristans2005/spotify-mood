import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            
            <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-emerald-600 z-50 backdrop-blur-sm bg-opacity-80">
                <div className="flex items-center">
                    <span className="text-2xl font-bold text-white">🎵 Moodify</span>
                </div>
                <div className="flex gap-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="px-4 py-2 bg-white/10 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="px-4 py-2 bg-white/10 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-4 py-2 bg-emerald-500 rounded-full text-white font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>      

            <main className="fixed inset-0 bg-gradient-to-b from-green-900 to-emerald-900">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 mt-16 flex items-center justify-center px-4">
                    <div className="max-w-4xl w-full backdrop-blur-lg bg-white/10 p-12 rounded-2xl shadow-2xl">
                        <h1 className="text-7xl font-bold text-white mb-6 animate-fade-in">
                            Your Music,
                            <br />
                            <span className="bg-gradient-to-r from-emerald-400 to-green-300 text-transparent bg-clip-text">
                                Your Emotions
                            </span>
                        </h1>
                        <h2 className="text-3xl text-white/90 mb-8 animate-fade-in animation-delay-300">
                            Let your mood guide your musical journey
                        </h2>
                        <p className="text-xl text-white/80 mb-12 max-w-2xl animate-fade-in animation-delay-600">
                            Discover personalized playlists that perfectly match your emotional state. 
                            Experience music like never before.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
