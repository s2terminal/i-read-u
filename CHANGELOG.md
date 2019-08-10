# Change Log

## Unreleased
- null

## 2.1.0 / 2019-08-10
- add `--match` option - filtering substrings of commands
  - e.g., `$ ireadu --match ls`
- add commandNotFound message

## 2.0.1 / 2019-08-08
- resolve vulnerability [CVE\-2019\-10744](https://nvd.nist.gov/vuln/detail/CVE-2019-10744)

## 2.0.0 / 2019-08-08
- **BREAKING CHANGE : filename option is no longer necessary**
  - in i-read-u 2.0.x: `$ ireadu README.md`
  - in i-read-u 1.0.x: `$ ireadu --file README.md`
- use [lexer](https://marked.js.org/#/USING_PRO.md#lexer) instead of HTML parser
- update TypeScript version
- some refactoring (strict type checking)
- change TSLint to [typescript\-eslint](https://github.com/typescript-eslint/typescript-eslint)

## 1.0.3 / 2019-06-08
- resolve vulnerability https://github.com/s2terminal/i-read-u/pull/24

## 1.0.2 / 2019-02-09
- Update lodash

## 1.0.1 / 2019-02-03
- Update TypeScript Ver 3.3 and some npm packages.

## 1.0.0 / 2018-12-02
- add some settings to tsconfig
- add some files to .npmignore
- add README.ja.md
- `$LANG = ja_JP`のとき日本語対応
- add `--file` option's alias `-f`

## 0.0.7 / 2018-11-23
- rename project `i_read_u` to `i-read-u`
- resolve vulnerability [CVE\-2018\-16469](https://nvd.nist.gov/vuln/detail/CVE-2018-16469)

## 0.0.6 / 2018-10-20

- update TypeScript 3.1 and some outdated npm packages
- Remove unused packages
- add test code

## 0.0.4 / 2018-07-29

- as abolishing the section question, and made only the command question

## 0.0.3 / 2018-07-22

- fix project name to *i-read-u*
- fix README to use npm install

## 0.0.2 / 2018-07-22

- add `--file` option
- add `--version`
- add tslint and prettier

## 0.0.1 / 2018-07-16

- Initial release
