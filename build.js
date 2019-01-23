'use strict'

const { stat } = require('fs').promises
const { join } = require('path')

const webpack = require('webpack')

const webpackConfig = {
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            '@babel/preset-env'
          ]
        }
      }
    }]
  },
  node: {
    fs: 'empty'
  },
  output: {
    library: 'Babel',
    libraryTarget: 'umd'
  }
}

const main = config => new Promise((resolve, reject) => {
  webpack(config, (err, stats) => err ? reject(err) : resolve(stats))
})

const build = async (src, dest) => {
  console.log(`${src} -> ${dest}`)
  const config = { ...webpackConfig, entry: `./src/${src}` }
  config.output.filename = dest

  if (!dest.includes('.min.')) {
    config.mode = 'development'
    delete config.optimization
  }

  try {
    const stats = await main(config)
    const json = stats.toJson('minimal')

    if (stats.hasErrors()) {
      console.error(json.errors)
    } else {
      const { size } = await stat(join('dist', dest))
      console.log(`${dest} created @ ${size / 1000000.0} MB`)
    }

    if (stats.hasWarnings()) {
      json.warnings
        .filter(warning =>
          !warning.includes('size limit') &&
          !warning.startsWith('webpack performance recommendations')
        )
        .forEach(warning => console.warn('\n', warning, '\n'))
    }
  } catch (e) {
    console.error(e.stack || e)
    e.details && console.error(e.details)
  }
}

Promise.all([
  build('index.js', 'babel.js'),
  build('index.js', 'babel.min.js')
]).then(() => console.log('bundling complete'))
