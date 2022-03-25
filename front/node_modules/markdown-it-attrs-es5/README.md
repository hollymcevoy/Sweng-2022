# markdown-it-attrs-es5

[![npm version](https://img.shields.io/npm/v/markdown-it-attrs-es5.svg)](https://www.npmjs.com/package/markdown-it-attrs-es5) [![npm version](https://img.shields.io/npm/v/markdown-it-attrs-es5/main.svg)](https://www.npmjs.com/package/markdown-it-attrs-es5/v/main) [![Continuous deployment](https://github.com/compulim/markdown-it-attrs-es5/actions/workflows/continuous-deployment.yml/badge.svg?branch=main)](https://github.com/compulim/markdown-it-attrs-es5/actions/workflows/continuous-deployment.yml)

This package is based on [`markdown-it-attrs`](https://npmjs.com/package/markdown-it-attrs). It did not contains an ES5 module. Importing the module directly or indirectly may break web apps running on ES5 browsers.

On `npm install`, this package will transpile your version of `markdown-it-attrs` to make it compatible with ES5 browsers. Then in your code, you use `markdown-it-attrs-es5` instead of `markdown-it-attrs`.

Package authors should consider importing this package instead of `markdown-it-attrs`, so your packages will not break your users due to having `markdown-it-attrs` as a transient dependency.

## How to use

To install in your project, run:

```sh
npm install markdown-it markdown-it-attrs markdown-it-attrs-es5
```

You can also use it in HTML:

```html
<script src="https://unpkg.com/markdown-it-attrs-es5/dist/markdown-it-attrs-es5.production.min.js"></script>
```

## How it works

On `postinstall`, this package will run `esbuild` to bundle `markdown-it-attrs` into a single file. Then run Babel to transpile it for ES5.

This package peer-depends on `markdown-it-attrs`. Thus, you can select your own version of `markdown-it-attrs`.

### Updating `markdown-it-attrs`

When you update `markdown-it-attrs`, re-run `npm install markdown-it-attrs-es5` to get the latest package transpiled.

## Alternatives

Instead of importing this package, there are alternative workarounds you can use.

### Including the source code

You can copy the source code of `markdown-it-attrs` into your web app and use your build pipeline transpile the original package.

Be sure to include the original license and continue to depends on the package to make sure `npm audit` will scan for vulnerabilities.

### Modify your bundler configuration

Some bundlers is configured not to transpile code under `/node_modules/` unless specified explicitly. You can modify bundler configuration to include `/node_modules/markdown-it-attrs/` and use Babel to transpile it while bundling.

## Contributions

Like us? [Star](https://github.com/compulim/markdown-it-attrs-es5/stargazers) us.

Want to make it better? [File](https://github.com/compulim/markdown-it-attrs-es5/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/markdown-it-attrs-es5/pulls) a pull request.
