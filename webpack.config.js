const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
	const mode = options.mode || 'development';

	const config = {
		mode,

		entry: {
			main: './src/app.js',
		},

		output: {
			path: path.resolve('./dist'),

			filename: '[name].js',
		},

		module: {
			rules: [
				{
					test: /\.(png|jpg|gif|svg)$/,

					loader: 'url-loader',

					options: {
						name: '[name].[ext]?[hash]',

						limit: 20000, //20kb
					},
				},
			],
		},

		plugins: [
			new webpack.BannerPlugin({
				banner: `

          Build Date: ${new Date().toLocaleString()}

        `,
			}),

			new webpack.DefinePlugin({}),

			new CleanWebpackPlugin({}),
		],
	};

	const css_loader = {
		test: /\.css$/,

		use: [config.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
	};

	config.module.rules.push(css_loader);

	const html_webpack_plugin = new HtmlWebpackPlugin({
		template: './src/index.html',

		templateParameters: {
			env: config.mode === 'development' ? '(개발용)' : '',
		},

		minify:
			config.mode === 'production'
				? {
						collapseWhitespace: true,

						removeComments: true,
				  }
				: false,
	});

	config.plugins.push(html_webpack_plugin);

	if (config.mode == 'production') {
		config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }));
	}

	return config;
};
