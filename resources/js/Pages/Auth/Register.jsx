import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="w-full sm:max-w-md px-6 py-4 bg-white/10 backdrop-blur-lg shadow-2xl overflow-hidden rounded-2xl animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" className="text-white/90" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full bg-white/10 border-0 text-white placeholder:text-white/50 focus:ring-2 focus:ring-emerald-500"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" className="text-white/90" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-white/10 border-0 text-white placeholder:text-white/50 focus:ring-2 focus:ring-emerald-500"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
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
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-white/90" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full bg-white/10 border-0 text-white placeholder:text-white/50 focus:ring-2 focus:ring-emerald-500"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route('login')}
                            className="text-sm text-white/80 hover:text-white transition-colors"
                        >
                            Already registered?
                        </Link>

                        <button className="ml-4 px-6 py-2 bg-emerald-500 rounded-full text-white font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
