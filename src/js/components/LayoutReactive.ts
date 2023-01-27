import { Base } from '@studiometa/js-toolkit';
import type { BaseConfig, BaseProps } from '@studiometa/js-toolkit';
import { watchLayout, getLayout } from '../store/index.js';
import type { Layouts } from '../store/index.js';

export interface LayoutReactiveProps extends BaseProps {
	$options: {
		horizontal: string;
		vertical: string;
	};
}

/**
 * LayoutReactive class.
 */
export default class LayoutReactive extends Base<LayoutReactiveProps> {
	/**
	 * Config.
	 */
	static config: BaseConfig = {
		name: 'LayoutReactive',
		options: {
			horizontal: String,
			vertical: String,
		},
	};

	mounted() {
		this.switch(getLayout());
		watchLayout((value: Layouts) => {
			this.switch(value);
		});
	}

	switch(value: Layouts) {
		const { horizontal, vertical } = this.$options;
		const toAdd = value === 'horizontal' ? horizontal : vertical;
		const toRemove = value === 'horizontal' ? vertical : horizontal;

		if (toRemove.length) {
			this.$el.classList.remove(...toRemove.split(' '));
		}

		if (toAdd.length) {
			this.$el.classList.add(...toAdd.split(' '));
		}
	}
}
