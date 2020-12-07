/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @description 覆盖默认的cra webpack配置
 */
const { override, addLessLoader, fixBabelImports, addWebpackAlias } = require('customize-cra')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const paths = require('react-scripts/config/paths')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const appBuildConfig = () => config => {
  if (config.mode === 'production') {
    // 关闭sourceMap
    config.devtool = false
    // 配置打包后的文件位置修改path目录
    paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
    config.output.path = path.join(path.dirname(config.output.path), 'dist')
    //增加`webpack-bundle-analyzer`打包分析
    config.plugins.push(
      // yarn report 查看
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled', // 不启动展示打包报告的HTTP服务器
        generateStatsFile: true, // 要生成stats.json文件
      }),
    )
    // 添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024, // 只处理比这个值大的资源。按字节计算
        deleteOriginalAssets: false, // 是否删除原资源
      }),
    )
  }
  return config
}

module.exports = override(
  addWebpackAlias({
    //增加路径别名的处理
    '@': path.resolve('./src'),
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style 的选项 ‘css' 表示引入的css文件   true 表示引入的less
    style: true,
  }),
  // less配置
  // https://github.com/arackaf/customize-cra/blob/master/api.md#addlessloaderloaderoptions 模块化less配置 .module.less
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        // for example, you use Ant Design to change theme color. ant-design 定制主题变量： https://ant.design/docs/react/customize-theme-cn
        '@primary-color': '#FE5023', // 全局主色
      },
      cssModules: {
        localIdentName: '[path][name]__[local]--[hash:base64:5]', // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      },
    },
  }),
  appBuildConfig(),
)
