import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import TextInput from '@/Components/TextInput';

export default function Spotify() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [mood, setMood] = useState(null);

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

    const handleFileSubmit = (e) => {
        e.preventDefault();

        
        const formData = new FormData();
        formData.append("file", selectedImage);
        fetch("http://127.0.0.1:6969/predict", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => setMood(data));

            console.log(mood);
            
            
    };

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
                    <div className='overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 my-6'>
                        <form 
                            onSubmit={handleFileSubmit} 
                            className='grid grid-flow-row gap-4'
                        >
                            <div className="flex items-center justify-center w-full">
                                <label 
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 800x400px)</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            // Handle file selection
                                            const file = e.target.files[0];
                                            if (file) {
                                                setSelectedImage(file);
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                            
                            {/* Image Preview */}
                            <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                                {selectedImage && (
                                    <img 
                                        src={URL.createObjectURL(selectedImage)} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <button
                                type="submit"
                                className='px-6 py-2 bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg rounded-lg'
                            >
                                Analyze Emotion
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
