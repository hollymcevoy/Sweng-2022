# p-defer-es5

[![npm version](https://img.shields.io/npm/v/p-defer-es5.svg)](https://www.npmjs.com/package/p-defer-es5) [![Build Status](https://travis-ci.org/compulim/p-defer-es5.svg?branch=master)](https://travis-ci.org/compulim/p-defer-es5)

This package is based on [`p-defer`](https://npmjs.com/package/p-defer). It did not contains an ES5 module. Importing the module directly or indirectly may break web apps running on ES5 browsers.

On install, this package will transpile your version of `p-defer` to make it compatible with ES5 browsers.

Package authors should consider importing this package instead of `p-defer`, so your packages will not break your users due to having `p-defer` as a transient dependency.

## How to use

To install in your project, run:

```sh
npm install p-defer p-defer-es5
```

You can also use it in HTML:

```html
<script src="https://unpkg.com/p-defer/dist/p-defer-es5.production.min.js"></script>
```

## How it works

On `postinstall`, this package will run Babel and Webpack to transpile `p-defer` into a single file.

This package peer-depends on `p-defer`. Thus, you can select your own version of `p-defer`.

### Updating `p-defer`

When you update `p-defer`, re-run `npm install p-defer-es5` to get the latest package transpiled.

## Alternatives

Instead of importing this package, there are alternative workarounds you can use.

### Including the source code

You can copy the source code of `p-defer` into your web app and use your build pipeline transpile the original package.

Be sure to include the original license and continue to depends on the package to make sure `npm audit` will scan for vulnerabilities.

### Modify your bundler configuration

Webpack do not transpile code under `/node_modules/` unless specified explicitly. You can modify `webpack.config.js` to include `/node_modules/p-defer/` and use `babel-loader` to transpile it on-the-fly.

## Contributions

Like us? [Star](https://github.com/compulim/p-defer-es5/stargazers) us.

Want to make it better? [File](https://github.com/compulim/p-defer-es5/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/p-defer-es5/pulls) a pull request.
