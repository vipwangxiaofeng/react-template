// config-overrides.js
const { override, addLessLoader, fixBabelImports, addWebpackAlias } = require('customize-cra')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const paths = require('react-scripts/config/paths')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const appBuildConfig = () => (config) => {
	if (config.mode === 'production') {
		// 关闭sourceMap
		config.devtool = false
		// 配置打包后的文件位置修改path目录
		paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
		config.output.path = path.join(path.dirname(config.output.path), 'dist')
		//增加`webpack-bundle-analyzer`打包分析
		// config.plugins.push(new BundleAnalyzerPlugin())
		// 添加js打包gzip配置
		config.plugins.push(
			new CompressionWebpackPlugin({
				test: /\.js$|\.css$/,
				threshold: 1024,
			})
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
	// 这里设置less
	// 同时是定制ant-design的主题
	// ant-design 定制主题变量： https://ant.design/docs/react/customize-theme-cn
	addLessLoader({
		lessOptions: {
			javascriptEnabled: true,
			modifyVars: {
				'@primary-color': '#FE5023', // 全局主色
				'@link-color': '#FE5023', // 链接色
				'@success-color': '#52c41a', // 成功色
				'@warning-color': '#faad14', // 警告色
				'@error-color': '#f5222d', // 错误色
				'@font-size-base': '14px', // 主字号
				'@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
				'@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
				'@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
				'@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
				'@border-radius-base': '2px', // 组件/浮层圆角
				'@border-color-base': '#d9d9d9', // 边框色
				'@box-shadow-base': '0 3px 6px -4px rgba(0,0,0,.12),0 6px 16px 0 rgba(0,0,0,.08),0 9px 28px 8px rgba(0,0,0,.05)', // 浮层阴影
			},
			cssModules: {
				localIdentName: '[path][name]__[local]--[hash:base64:5]', // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
			},
		},
	}),
	appBuildConfig()
)

