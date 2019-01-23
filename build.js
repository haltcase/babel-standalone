'use strict'

const webpack = require('webpack')
const Terser = require('terser-webpack-plugin')

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
  optimization: {
    minimize: true,
    minimizer: [
      new Terser()
    ]
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
  console.log(`building from ${src}...`)
  const config = { ...webpackConfig, entry: `./src/${src}` }
  config.output.filename = dest

  if (!dest.includes('.min.')) {
    config.mode = 'development'
    delete config.optimization
  }

  try {
    console.log(`outputting ${dest}...`)
    const stats = await main(config)
    console.log(stats.toJson('minimal'))
  } catch (e) {
    console.error(e)
  }
}

Promise.all([
  build('index.js', 'babel.js'),
  build('index.js', 'babel.min.js')
]).then(() => console.log('bundling complete'))
