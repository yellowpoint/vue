/**
 * @name webpack打包模块（测试中）
 * @author SunSeekerX
 * @time 2020-02-01 12:39:00
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-01 13:37:46
 */

const fs = require('fs')
const path = require('path')

const webpack = require('webpack')

const apiPath = path.resolve(__dirname, 'src/api')
const distPath = path.resolve(__dirname, '../cloudfunctions-aliyun/')
// const distPath = path.resolve(__dirname, 'dist')

const args = process.argv
let apiList = args.slice(2)
if (apiList.length === 0) {
  apiList = fs.readdirSync(apiPath)
}
console.log(`待处理API：${apiList}`)

// Build fun
function build(apiName) {
  const apiNamePath = path.resolve(apiPath, apiName)
  const inputFile = path.resolve(apiNamePath, `${apiName}.js`)
  const outputPath = path.resolve(distPath, `${apiName}`)
  webpack(
    {
      mode: 'production',
      entry: inputFile,
      output: {
        path: outputPath,
        filename: 'index.js',
        library: 'main',
        libraryTarget: 'commonjs'
      },
      target: 'node'
    },
    (err, stats) => {
      if (err) {
        console.error(err.stack || err)
        if (err.details) {
          console.error(err.details)
        }
        return
      }

      const info = stats.toJson()
      // Error
      if (stats.hasErrors()) {
        console.error('Error>>>', info.errors)
      }
      // Warning
      if (stats.hasWarnings()) {
        console.warn('Warn>>>', info.warnings)
      }
    }
  )
}

build(apiList[0])
