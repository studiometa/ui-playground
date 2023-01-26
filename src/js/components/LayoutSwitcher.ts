import Switcher from './Switcher.js';

export default class LayoutSwitcher extends Switcher {
	static config = {
		name: 'LayoutSwitcher',
	};

	switch(value:'vertical'|'horizontal') {
		document.body.classList.toggle('is-vertical', value === 'vertical');
	}
}
