[日本語](README.ja.md) / [English](README.md)

[![npm version](https://badge.fury.io/js/i-read-u.svg)](https://www.npmjs.com/package/i-read-u)
[![CircleCI](https://circleci.com/gh/s2terminal/i-read-u.svg?style=shield)](https://circleci.com/gh/s2terminal/i-read-u)
[![Maintainability](https://api.codeclimate.com/v1/badges/19b1a0f802764172dd4a/maintainability)](https://codeclimate.com/github/s2terminal/i-read-u/maintainability)

<img src="docs/static/logo.png" width="640"/>

# I read you (ireadu)
README等のマークダウンファイルから、コマンドを抽出します。

<img src="https://user-images.githubusercontent.com/7953751/43365345-8f384cb2-9366-11e8-91be-a80e862a1037.gif" width="640" alt="I read you (ireadu) demo movie"/>

Linux、Windows Subsystems for Linux、macOSで動作します。

## インストール
```bash
$ npm install --global i-read-u
```

### 要求環境
Node.js v6.0+

## 使い方
```bash
$ ireadu
$ ireadu ./CONTRIBUTING.md
```
その他の情報は`$ ireadu --help`を参照ください。

### 試してみる（ireaduコマンドを実行してみてください）
```bash
$ ls
$ pwd
> w
>id
```

## 開発者用
git cloneして下記を実行してください。
```bash
$ npm install --save-dev
$ npm run webpack-watch
$ bin/ireadu.js
```

### Lint
```bash
$ npm run lint
$ npm run lint:fix
```

### テスト
```bash
$ npm test
$ file=coverage/lcov-report/index.html && if type cmd.exe; then cmd.exe /c start ${file}; else open ${file}; fi
```

## ライセンス
Copyright (c) 2018 [s2terminal / suzuki\.sh](https://www.s2terminal.com/) (Twitter: [suzukiterminal](https://twitter.com/suzukiterminal))
Licensed under the [MIT license](LICENSE).
