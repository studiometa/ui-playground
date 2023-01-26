import { Base } from '@studiometa/js-toolkit';
import type { BaseConfig, BaseProps } from '@studiometa/js-toolkit';
import { debounce, isDefined } from '@studiometa/js-toolkit/utils';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';

export interface EditorProps extends BaseProps {}

const instances: Editor[] = [];

/**
 * Editor class.
 */
export default class Editor extends Base<EditorProps> {
	/**
	 * Config.
	 */
	static config: BaseConfig = {
		name: 'Editor',
		emits: ['content-change'],
	};

	/**
	 * Editor.
	 * @type {editor.IStandaloneCodeEditor}
	 */
	editor: editor.IStandaloneCodeEditor;

	/**
	 * Initial value for the editor.
	 */
	get initialValue() {
		return '';
	}

	/**
	 * Language of the editor.
	 */
	get language() {
		return '';
	}

	mounted() {
		this.editor = editor.create(this.$el, {
			value: this.initialValue,
			language: this.language,
			minimap: { enabled: false },
			automaticLayout: true,
			fontLigatures: true,
			theme: 'vs-dark',
		});

		this.editor.onDidChangeModelContent(debounce(() => {
			console.log('onDidChangeModelContent', this.editor.getValue());
			this.$emit('content-change', this.editor.getValue());
		}, 500));
	}

	switchTeme(dark = false) {
		this.editor.updateOptions({
			theme: dark ? 'vs-dark' : 'vs',
		});
	}

	show() {
		this.$el.style.display = '';
	}

	hide() {
		this.$el.style.display = 'none';
	}

	toggle(force) {
		if (force === true) {
			return this.show();
		} else if (force === false) {
			return this.hide();
		}

		if (this.$el.style.display === 'none') {
			this.show();
		} else {
			this.hide();
		}
	}
}
