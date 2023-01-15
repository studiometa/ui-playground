import { defineConfig } from '@studiometa/webpack-config';
import { prototyping } from '@studiometa/webpack-config/presets';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

/**
 * Inline source preset.
 * @returns {import('@studiometa/webpack-config/presets').Preset}
 */
function htmlWebpackScriptTypeModule() {
	return {
		name: 'html-webpack-script-type-module',
		handler(config, { extendWebpack }) {
			return extendWebpack(config, (webpackConfig) => {
				webpackConfig.plugins = webpackConfig.plugins.map((plugin) => {
					if (plugin.constructor.name === 'HtmlWebpackPlugin') {
						plugin.userOptions.scriptLoading = 'module';
					}
					return plugin;
				});
			});
		},
	};
}

export default defineConfig({
	presets: [prototyping({ ts: true }), htmlWebpackScriptTypeModule()],
	webpack(config) {
		config.devtool = false;
		config.optimization.minimize = true;
		config.plugins.push(
			new MonacoWebpackPlugin()
		);
	},
});
