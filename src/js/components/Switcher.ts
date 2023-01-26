import { Base, withExtraConfig } from '@studiometa/js-toolkit';
import type { BaseConfig, BaseProps } from '@studiometa/js-toolkit';

export interface SwitcherProps extends BaseProps {
	$refs: {
		inputs: HTMLInputElement[];
	};
}

/**
 * Switcher class.
 */
export default class Switcher extends Base<SwitcherProps> {
	/**
	 * Config.
	 */
	static config: BaseConfig = {
		name: 'Switcher',
		refs: ['inputs[]'],
		emits: ['switch'],
	};

	get value() {
		return this.$refs.inputs.find((input) => input.checked)?.value;
	}

	onInputsInput(event, index) {
		this.switch(this.value);
		this.$emit('switch', this.value);
	}

	switch(value: string) {
		throw new Error('The `switch` method must be implemented.');
	}
}
