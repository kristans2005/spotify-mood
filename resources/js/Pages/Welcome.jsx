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
            
            <nav className="flex flex-1 justify-end p-3 bg-gradient-to-r bg-green-800 sticky top-0">
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="rounded-md px-3 py-2 text-slate-300 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="rounded-md px-3 py-2 text-slate-300 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-md px-3 py-2 text-slate-300 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none"
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>      
            <div className='flex flex-col justify-center min-h-screen bg-gray-400 place-items-center align-middle'>
                <h1 className='text-6xl'>Moodify</h1>
                <h2 className=''>Listen to your emotions!</h2>
            </div>        
        </>
    );
}
