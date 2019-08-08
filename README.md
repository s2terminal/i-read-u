[日本語](README.ja.md) / [English](README.md)

<p align="center">
<img src="docs/static/logo.png" width="320"/>
</p>

[![npm version](https://badge.fury.io/js/i-read-u.svg)](https://www.npmjs.com/package/i-read-u)
[![CircleCI](https://circleci.com/gh/s2terminal/i-read-u.svg?style=shield)](https://circleci.com/gh/s2terminal/i-read-u)
[![Maintainability](https://api.codeclimate.com/v1/badges/19b1a0f802764172dd4a/maintainability)](https://codeclimate.com/github/s2terminal/i-read-u/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/19b1a0f802764172dd4a/test_coverage)](https://codeclimate.com/github/s2terminal/i-read-u/test_coverage)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=s2terminal/i-read-u)](https://dependabot.com)

# I read you (ireadu)
Extracting commands from README markdown file.

<img src="https://user-images.githubusercontent.com/7953751/43365345-8f384cb2-9366-11e8-91be-a80e862a1037.gif" width="640" alt="I read you (ireadu) demo movie"/>

Supported on Linux, Windows Subsystems for Linux and macOS.

## Installation
```bash
$ npm install --global i-read-u
```

### Requirements
Node.js v6.0+

## Usage
```bash
$ ireadu
$ ireadu ./CONTRIBUTING.md
```
More usage information can be obtained from `$ ireadu --help`.

### Test Commands (Try ireadu command and hit this)
```bash
$ ls
$ pwd
> w
>id
```

## Developing
git clone and run this.
```bash
$ npm install --save-dev
$ npm run webpack-watch
$ bin/ireadu.js
```

### Linting
```bash
$ npm run lint
$ npm run lint:fix
```

### Testing
```bash
$ npm test
$ file=coverage/lcov-report/index.html && if type cmd.exe; then cmd.exe /c start ${file}; else open ${file}; fi
```

## License
Copyright (c) 2018 [s2terminal / suzuki\.sh](https://www.s2terminal.com/) (Twitter: [suzukiterminal](https://twitter.com/suzukiterminal))
Licensed under the [MIT license](LICENSE).
