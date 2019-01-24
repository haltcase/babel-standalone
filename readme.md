# @citycide/babel-standalone &middot; [![Version](https://flat.badgen.net/npm/v/@citycide/babel-standalone)](https://www.npmjs.com/package/@citycide/babel-standalone) [![License](https://flat.badgen.net/npm/license/@citycide/babel-standalone)](https://www.npmjs.com/package/@citycide/babel-standalone) [![JavaScript Standard Style](https://flat.badgen.net/badge/code%20style/standard/green)](https://standardjs.com)

> A smaller customized version of [`@babel/standalone`][babel-standalone].

The official `@babel/standalone` has grown very large in recent releases,
at almost 6 MB minified. For use cases like [`param.macro`][param-macro]'s
online [**playground**][playground] where only a subset of transforms is
needed, that size isn't ideal. `@citycide/babel-standalone` is reduced to
about 1.73 MB minified.

This project is based on the effort by [**@joncasey**](https://github.com/joncasey)
on [`my-babel-standalone`][my-babel-standalone].

## usage

You can use the minified source directly on a page using [unpkg][unpkg]:

```html
<script src="https://unpkg.com/@citycide/babel-standalone"></script>
```

or by installing locally (i.e. for bundling):

```console
# using yarn
yarn add @citycide/babel-standalone

# using npm
npm i @citycide/babel-standalone
```

## development

1. Clone the repo: `git clone https://github.com/citycide/babel-standalone.git`
2. Move into the new directory: `cd babel-standalone`
3. Install dependencies: `yarn` or `npm install`
4. Build from source: `yarn build` or `npm run build`

Any plugins needed in the final bundle should be added as dependencies, where
the update script will pull them from automatically. This update script is run
before every build or can be manually run with `yarn update` or `npm run update`.

The version of the package itself is tied to the version of `@babel/preset-env`
used, so both can and should be updated by editing _only_ the `@babel/preset-env`
version in `package.json`. Running `yarn update` will then fetch the new version
and make this package's version match it.

## see also

* [`param.macro`][param-macro] &ndash; a [babel macro][babel-plugin-macros] for compile-time partial application in JavaScript
* [`@babel/standalone`][babel-standalone] &ndash; the official standalone Babel package
* [`my-babel-standalone`][my-babel-standalone] &ndash; another minimal version by [**@joncasey**](https://github.com/joncasey)

## license

MIT © [Bo Lingen / citycide](https://github.com/citycide)
Based on code also under MIT © [**@joncasey**](https://github.com/joncasey)

[babel-standalone]: https://github.com/babel/babel/tree/master/packages/babel-standalone
[my-babel-standalone]: https://github.com/joncasey/my-babel-standalone
[unpkg]: https://unpkg.com
[param-macro]: https://github.com/citycide/param.macro
[babel-plugin-macros]: https://github.com/kentcdodds/babel-plugin-macros
[playground]: https://citycide.github.io/param.macro
