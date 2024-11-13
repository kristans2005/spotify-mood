import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-b from-green-900 to-emerald-900">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white/10 backdrop-blur-lg shadow-2xl overflow-hidden rounded-2xl animate-fade-in">
                    {status && (
                        <div className="mb-4 text-sm font-medium text-emerald-400">
                            {status}
                        </div>
                    )}

                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-white/90" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-white/10 border-0 text-white placeholder:text-white/50 focus:ring-2 focus:ring-emerald-500"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" className="text-white/90" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-white/10 border-0 text-white placeholder:text-white/50 focus:ring-2 focus:ring-emerald-500"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        

                        <div className="flex items-center justify-end mt-4">
                            

                            <button className="ml-4 px-6 py-2 bg-emerald-500 rounded-full text-white font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg">
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
