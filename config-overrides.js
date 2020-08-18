const { override, addLessLoader } = require('customize-cra')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require('path')
const paths = require('react-scripts/config/paths')
// build--->prod --->文件设置
const appBuildPathFile = () => config => {
  if (config.mode === 'development') {
    console.log('evn is development, skip build path change...')
  } else if (config.mode === 'production') {
    console.log('evn is production, change build path...')
    // 关闭sourceMap
    config.devtool = false
    //  // 配置打包后的文件位置修改path目录
    paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
    config.output.path = path.join(path.dirname(config.output.path), 'dist')
    // 添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024
      })
    )
    // 更改生产模式输出的文件名
    // config.output.filename = 'static/js/[name].js?_v=[chunkhash:8]'
    // config.output.chunkFilename = 'static/js/[name].chunk.js?_v=[chunkhash:8]'
  }
  return config
}
module.exports = override(
  addLessLoader(),
  appBuildPathFile()
)