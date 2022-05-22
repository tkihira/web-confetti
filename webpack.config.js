const path = require('path');

const main = {
    mode: 'production',
    entry: {
        main: ['./src/confetti.js'],
    },
    output: {
        filename: 'web_confetti_min.js',
        library: 'Confetti',
        libraryTarget: 'var',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
    }
};

module.exports = [main];