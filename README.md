# CheckVer

A small utility to check that the installed version of a dependency is compatible with the one defined in the package.json
You can use this to fail and prompt the user to update the dependencies.

## Getting Started

```
npm install check-ver --save-dev
yarn add check-ver
```

### Using


```
var checkVer = require('check-ver');
checkVer.validateVersions('webpack', 'Please update your dependencies');
```

## Versioning

We use [SemVer](http://semver.org/) for versioning

## Authors

* **Nicolas Laplume** - *Initial work* - [nlaplume](https://github.com/nlaplume)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

