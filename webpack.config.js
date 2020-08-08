const path = require('path');

const main = {
    mode: 'production',
    entry: {
        main: ['./src/confetti.js'],
    },
    output: {
        filename: 'confetti_web_min.js',
        library: 'Confetti',
        libraryTarget: 'var',
        path: path.resolve(__dirname, 'dist'),
    }
};

module.exports = [main];