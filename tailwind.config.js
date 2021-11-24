module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "carolina": "#4B9CD3",
                "carolina-light": "#5FAEDC",
                "carolina-dark": "#3D86BC",
                "theme": "#436C8E",
                "theme-light": "#497DA1",
                "theme-dark": "#345A7B",
            },
        },
    },
    variants: {
        extend: {
            border: ['active'],
            background: ['active']
        },
    },
    plugins: [],
}
