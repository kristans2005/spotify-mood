
export default function GuestLayout({ children }) {
    return (
        <div className="fixed inset-0 bg-gradient-to-b from-green-900 to-emerald-900">
            {/* Animated background blobs */}
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="fixed inset-0 flex flex-col items-center justify-center">
                <div className="mb-8 animate-fade-in">
                  
                </div>

                {children}
            </div>
        </div>
    );
}