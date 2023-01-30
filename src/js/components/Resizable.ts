import { Base, withDrag } from '@studiometa/js-toolkit';
import type { BaseProps, BaseConfig } from '@studiometa/js-toolkit';

export interface ResizableProps extends BaseProps {
	$options: {
		axis: 'x' | 'y';
	};
	$refs: {
		ruler: HTMLElement;
	};
}

export default class Resizable extends withDrag(Base, {
	target: (instance) => instance.$refs.ruler,
})<ResizableProps> {
	static config: BaseConfig = {
		name: 'Resizable',
		options: {
			axis: {
				type: String,
				default: 'x',
			},
		},
		refs: ['ruler'],
	};

	previousSize = 0;

	dragged(props) {
		if (props.mode === 'start') {
			document.body.classList.add('select-none');
			const size = this.$options.axis === 'x' ? 'offsetWidth' : 'offsetHeight';
			this.previousSize = this.$el[size];
		} else if (props.mode === 'drag') {
			const { axis } = this.$options;
			const size = axis === 'x' ? 'width' : 'height';
			this.$el.style[size] = props.distance[axis] + this.previousSize + 'px';
		} else if (props.mode === 'drop') {
			document.body.classList.remove('select-none');
		}
	}
}
