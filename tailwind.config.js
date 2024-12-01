const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)'
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)'
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)'
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)'
                    }
                },
                'fade-in': {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                shimmer: {
                    '0%': {
                        backgroundPosition: '-100% -100%'
                    },
                    '100%': {
                        backgroundPosition: '100% 100%'
                    }
                }
            },
            animation: {
                'blob': 'blob 7s infinite',
                'fade-in': 'fade-in 0.6s ease-out forwards',
                fadeIn: 'fadeIn 0.5s ease-out forwards',
                'shimmer': 'shimmer 3s linear infinite'
            }
        },
    },

    plugins: [require('@tailwindcss/forms')],
};

