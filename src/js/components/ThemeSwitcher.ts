import Switcher from './Switcher.js';
import { setTheme, getTheme } from '../store/index.js';
import type { Themes } from '../store/index.js';

export default class ThemeSwitcher extends Switcher {
	static config = {
		name: 'ThemeSwitcher',
	};

	mounted() {
		const value = getTheme();
		const input = this.$refs.inputs.find(i => i.value === value);

		if (input) {
			input.checked = true;
		}
	}

	switch(value: Themes) {
		setTheme(value);
	}
}
