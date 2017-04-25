var path = require('path');

module.exports = {
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'app.js'
    }
};