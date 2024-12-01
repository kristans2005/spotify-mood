
import { Link } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Navigation({ auth }) {
    return (
        <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-emerald-900/80 to-black/80 z-50 backdrop-blur-lg border-b border-emerald-800/50">
            <div className="flex items-center">
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 text-transparent bg-clip-text">
                    🎵 Moodify
                </span>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <Menu as="div" className="relative">
                    <Menu.Button className="p-2 text-emerald-300 hover:text-emerald-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-in"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-48 bg-emerald-900/95 backdrop-blur-lg rounded-lg shadow-lg py-2">
                            {auth.user ? (
                                <Menu.Item>
                                    <Link href={route('dashboard')} className="block px-4 py-2 text-emerald-300 hover:bg-emerald-800/50">
                                        Dashboard
                                    </Link>
                                </Menu.Item>
                            ) : (
                                <>
                                    <Menu.Item>
                                        <Link href={route('login')} className="block px-4 py-2 text-emerald-300 hover:bg-emerald-800/50">
                                            Log in
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link href={route('register')} className="block px-4 py-2 text-emerald-300 hover:bg-emerald-800/50">
                                            Register
                                        </Link>
                                    </Menu.Item>
                                </>
                            )}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-4">
                {/* ...existing code... */}
            </div>
        </nav>
    );
}