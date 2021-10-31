// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import license from 'rollup-plugin-license'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

const banner =
  `/*!
 * <%= pkg.name %>.js v<%= pkg.version %>
 * (c) <%= moment().format('YYYY-MM-DD') %> Jade Gu
 * Released under the MIT License.
 * @license
 */`

const moduleName = pkg.name.split('-').map(str => str[0].toUpperCase() + str.slice(1)).join('')

export default {
  input: 'src/index.js',
  format: 'umd',
  // moduleName: moduleName,
  plugins: [
    resolve(),
    babel({
      presets: [
        ['@babel/preset-env'],
      ],
      babelrc: false,
      exclude: 'node_modules/**' // only transpile our source code
    }),
    license({
      banner
    })
  ],
  output: {
    format: 'umd',
    name: moduleName,
    sourcemap: true,
    file: `./dist/${pkg.name}.js`
  }
}