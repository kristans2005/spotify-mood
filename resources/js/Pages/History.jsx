import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function History() {
  

    


   
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">History</h2>}
        >
            <Head title="History" />
            
        </AuthenticatedLayout>
    );
}
