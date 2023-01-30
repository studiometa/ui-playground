import { Base, createApp } from '@studiometa/js-toolkit';
import type { BaseConfig, BaseProps } from '@studiometa/js-toolkit';
import { debounce, nextTick } from '@studiometa/js-toolkit/utils';
import { store } from './store.js';
import Iframe from './components/Iframe.js';
import type HtmlEditor from './components/HtmlEditor.js';
import type ScriptEditor from './components/ScriptEditor.js';
import LayoutSwitcher from './components/LayoutSwitcher.js';
import LayoutReactive from './components/LayoutReactive.js';
import ThemeSwitcher from './components/ThemeSwitcher.js';

export interface AppProps extends BaseProps {
	$children: {
		Iframe: Iframe[];
		LayoutSwitcher: LayoutSwitcher[];
		LayoutReactive: LayoutReactive[];
		HtmlEditor: Array<Promise<HtmlEditor>>;
		ScriptEditor: Array<Promise<ScriptEditor>>;
	};
	$refs: {
		htmlVisibility: HTMLInputElement;
		scriptVisibility: HTMLInputElement;
	};
}

class App extends Base<AppProps> {
	static config: BaseConfig = {
		name: 'App',
		refs: ['htmlVisibility', 'scriptVisibility'],
		components: {
			Iframe,
			ThemeSwitcher,
			LayoutSwitcher,
			LayoutReactive,
			HtmlEditor: () => import('./components/HtmlEditor.js'),
			ScriptEditor: () => import('./components/ScriptEditor.js'),
		},
	};

	get iframe() {
		return this.$children.Iframe[0];
	}

	get htmlEditor() {
		return this.$children.HtmlEditor[0];
	}

	get scriptEditor() {
		return this.$children.ScriptEditor[0];
	}

	async onHtmlVisibilityInput() {
		const editor = await this.htmlEditor;
		editor.toggle(this.$refs.htmlVisibility.checked)
	}

	async onScriptVisibilityInput() {
		const editor = await this.scriptEditor;
		editor.toggle(this.$refs.scriptVisibility.checked)
	}

	onHtmlEditorContentChange() {
		this.iframe.updateHtml();
	}

	onScriptEditorContentChange() {
		this.iframe.updateScript();
	}
}

export default createApp(App, {
	features: {
		asyncChildren: false,
	},
});
