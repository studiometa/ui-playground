import { Base, createApp } from '@studiometa/js-toolkit';
import type { BaseConfig, BaseProps } from '@studiometa/js-toolkit';
import { debounce, nextTick, domScheduler } from '@studiometa/js-toolkit/utils';
import Iframe from './components/Iframe.js';
import type HtmlEditor from './components/HtmlEditor.js';
import type ScriptEditor from './components/ScriptEditor.js';
import LayoutSwitcher from './components/LayoutSwitcher.js';
import LayoutReactive from './components/LayoutReactive.js';
import ThemeSwitcher from './components/ThemeSwitcher.js';
import Resizable from './components/Resizable.js';

export interface AppProps extends BaseProps {
	$children: {
		Iframe: Iframe[];
		LayoutSwitcher: LayoutSwitcher[];
		LayoutReactive: LayoutReactive[];
		Resizable: Resizable[];
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
			Resizable,
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
		editor.toggle(this.$refs.htmlVisibility.checked);
	}

	async onScriptVisibilityInput() {
		const editor = await this.scriptEditor;
		editor.toggle(this.$refs.scriptVisibility.checked);
	}

	onHtmlEditorContentChange() {
		this.iframe.updateHtml();
	}

	onScriptEditorContentChange() {
		this.iframe.updateScript();
	}

	onResizableDragged(props) {
		if (props.mode === 'start') {
			domScheduler.write(() => {
				document.body.classList.add('select-none');
				this.iframe.$el.parentElement.classList.add('pointer-events-none');
			});
		}

		if (props.mode === 'drop') {
			domScheduler.write(() => {
				document.body.classList.remove('select-none');
				this.iframe.$el.parentElement.classList.remove('pointer-events-none');
			});
		}
	}
}

export default createApp(App, {
	features: {
		asyncChildren: true,
	},
});
