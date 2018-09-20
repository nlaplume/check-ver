const deafult_fs = require('fs');
const semver = require('semver');


function validateVersions(packageName, errorMsg, _fs) {
    const fs = _fs || deafult_fs;
    if (errorMsg) {
        let installedVersion = 'none', expectedVersion = 'none';
        try {
            const installedPackage = JSON.parse(fs.readFileSync(`node_modules/${packageName}/package.json`, 'utf8'));
            const package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        
            package.devDependencies = package.devDependencies || {};
            package.dependencies = package.dependencies || {};
        
            installedVersion = installedPackage.version;
            expectedVersion = package.devDependencies[packageName] || package.dependencies[packageName];

            if (!semver.satisfies(installedVersion, expectedVersion)) {
                throw 'Version Mismatch';
            }
        } catch(e){
            throw new Error(
                `${packageName} version Mismatch (expected: ${expectedVersion} - installed: ${installedVersion} ):
                ${errorMsg}`
            );
        }
    }
}

module.exports = {
	validateVersions
};
