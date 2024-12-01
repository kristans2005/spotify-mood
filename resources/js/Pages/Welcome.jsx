import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Moodify" />
            
            <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-6 bg-gradient-to-r from-emerald-900/80 to-black/80 z-50 backdrop-blur-lg border-b border-emerald-800/50">
                <div className="flex items-center">
                    <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 text-transparent bg-clip-text">
                        🎵 Moodify
                    </span>
                </div>
                <div className="flex gap-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="px-6 py-2 bg-emerald-600/20 rounded-lg text-emerald-300 font-semibold hover:bg-emerald-600/30 transition-all duration-300 backdrop-blur-sm border border-emerald-600/30"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="px-6 py-2 bg-emerald-600/20 rounded-lg text-emerald-300 font-semibold hover:bg-emerald-600/30 transition-all duration-300 backdrop-blur-sm border border-emerald-600/30"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-6 py-2 bg-emerald-600 rounded-lg text-white font-semibold hover:bg-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-900/50"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>      

            <main className="min-h-screen bg-gradient-to-b from-emerald-900 to-black relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative min-h-screen flex items-center justify-center px-4 pt-20">
                    <div className="max-w-5xl w-full backdrop-blur-lg bg-emerald-900/20 p-12 rounded-2xl shadow-2xl border border-emerald-800/50">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                                Your Music,
                                <br />
                                <span className="bg-gradient-to-r from-emerald-400 to-green-300 text-transparent bg-clip-text">
                                    Your Emotions
                                </span>
                            </h1>
                            <p className="text-xl text-emerald-100/80 max-w-2xl">
                                Let AI analyze your mood and discover personalized playlists that perfectly match your emotional state. Experience music that resonates with your feelings.
                            </p>
                            {!auth.user && (
                                <div className="flex gap-4">
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-3 bg-emerald-600 rounded-lg text-white font-semibold hover:bg-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-900/50 text-lg"
                                    >
                                        Start Your Journey
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
        </>
    );
}
