import Switcher from './Switcher.js';

export default class LayoutSwitcher extends Switcher {
	static config = {
		name: 'LayoutSwitcher',
	};

	switch(value) {
		document.body.classList.toggle('is-vertical', value === 'vertical');
	}
}
