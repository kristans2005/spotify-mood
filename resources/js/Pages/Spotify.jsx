import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TextInput from '@/Components/TextInput';

export default function Spotify() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.get('/spotify/token');
                //console.log(response.data);
                
                setToken(response.data.access_token);
            } catch (err) {
                setError('Failed to fetch token');
                console.error(err);
            }
        };
        fetchToken();
    }, []);

    useEffect(() => {
        if (!token) return;

        const fetchLatestRelease = async () => {
            try {
                const response = await axios.post('/spotify/latest', {
                    token
                }
                );
                console.log(response.data.albums);
            } catch (err) {
                setError('Failed to fetch latest release');
                console.error(err);
            }
        }
        fetchLatestRelease();

    }, [token]);


    async function handleMoodSubmit(e) {
        e.preventDefault();
        console.log(e.target.elements['spotify-token'].value);
        
        try {
            const response = await axios.post('/spotify/mood', {
                token,
                mood: e.target.elements['spotify-token'].value
            });
            console.log(response.data);
        } catch (err) {
            setError('Failed to fetch mood playlists');
            console.error(err);
        }
    }


    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Spotify</h2>}
        >
            <Head title="Spotify" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleMoodSubmit}
                            className='grid grid-flow-row gap-3'
                        >
                            <TextInput
                                type="text"
                                name="spotify-token"                             
                            />
                            <button
                            className='px-6 py-2 bg-emerald-500  text-white font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg'
                            >
                                get emotion playlists
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
