import { defineConfig } from '@studiometa/webpack-config';
import { prototyping } from '@studiometa/webpack-config/presets';
import HtmlWebpackInlineSourcePlugin from '@effortlessmotion/html-webpack-inline-source-plugin';

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
	presets: [
		prototyping(),
		htmlWebpackScriptTypeModule()
	],
});
