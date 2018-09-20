const checkVer = require('../index');
const assert = require('chai').assert;

const packageJSON = {
    devDependencies: {
        valid: '1.0.0'
    },
    dependencies: {
        old: '1.0.0',
        new: '^1.0.0'
    }
};

const validJSON = {
    version: '1.0.0'
};
const oldJSON = {
    version: '0.5.0'
};
const newJSON = {
    version: '2.0.0'
};

const _fs = {
    readFileSync: function(fileName){
        let file = {};

        switch(fileName) {
            case 'package.json': file = packageJSON; break;
            case 'node_modules/valid/package.json': file = validJSON; break;
            case 'node_modules/old/package.json': file = oldJSON; break;
            case 'node_modules/new/package.json': file = newJSON; break;
            default:
                throw 'File Not Found';
        }
        return JSON.stringify(file);
    }
};

describe('CheckVer', function(){
    it('does not throw when valid', function(){
        assert.doesNotThrow(checkVer.validateVersions.bind(checkVer,'valid', 'error', _fs));
        assert.doesNotThrow(checkVer.validateVersions.bind(checkVer,'valid', false, _fs));
    });

    it('does throw when not installed', function(){
        assert.throws(checkVer.validateVersions.bind(checkVer,'invalid', 'error', _fs));
        assert.doesNotThrow(checkVer.validateVersions.bind(checkVer,'invalid', false, _fs));
    });

    it('does throw when outdated', function(){
        assert.throws(checkVer.validateVersions.bind(checkVer,'old', 'error', _fs));
        assert.doesNotThrow(checkVer.validateVersions.bind(checkVer,'old', false, _fs));
    });

    it('does not throw when new but valid', function(){
        assert.throws(checkVer.validateVersions.bind(checkVer,'new', 'error', _fs));
        assert.doesNotThrow(checkVer.validateVersions.bind(checkVer,'new', false, _fs));
    });
});