var path = require('path');

//module.exports = {
//    entry: ['./src/index'],
//    output: {
//        path: path.join(__dirname,'dist'),
//        filename: 'whistle.js'
//    }
//};
//
//
//module.exports = {
//    entry: ['./src/test/index'],
//    output: {
//        path: path.join(__dirname,'test'),
//        filename: 'test.js'
//    }
//};

var config =
{
    module: {}
};

var whistleConfig = Object.assign({}, config, {
    name: "whistle",
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'whistle.js'
    }
});
var testConfig = Object.assign({}, config,{
    name: "test",
    entry: ['./src/test/index'],
    output: {
        path: path.join(__dirname,'test'),
        filename: 'test.js'
    }
});

// Return Array of Configurations
module.exports = [
    whistleConfig, testConfig
];