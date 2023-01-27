import Switcher from './Switcher.js';
import { setLayout, getLayout } from '../store/index.js';
import type { Layouts } from '../store/index.js';

export default class LayoutSwitcher extends Switcher {
	static config = {
		name: 'LayoutSwitcher',
	};

	mounted() {
		const value = getLayout();
		const input = this.$refs.inputs.find(i => i.value === value);

		if (input) {
			input.checked = true;
		}
	}

	switch(value: Layouts) {
		setLayout(value);
	}
}
