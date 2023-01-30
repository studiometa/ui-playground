import { Base, withDrag } from '@studiometa/js-toolkit';
import type {
	BaseProps,
	BaseConfig,
	DragServiceProps,
} from '@studiometa/js-toolkit';
import { nextTick } from '@studiometa/js-toolkit/utils';
import ResizableCursorY from './ResizableCursorY.js';
import ResizableCursorX from './ResizableCursorX.js';

export interface ResizableProps extends BaseProps {
	$children: {
		ResizableCursorY: ResizableCursorY[];
		ResizableCursorX: ResizableCursorX[];
	};
}

export default class Resizable extends Base<ResizableProps> {
	static config: BaseConfig = {
		name: 'Resizable',
		components: {
			ResizableCursorY,
			ResizableCursorX,
		},
		emits: ['dragged'],
	};

	previousSize = 0;

	onResizableCursorYDragged(props: DragServiceProps) {
		this.resize(props.mode, 'y', props.distance);
		this.$emit('dragged', props);
	}
	onResizableCursorXDragged(props: DragServiceProps) {
		this.resize(props.mode, 'x', props.distance);
		this.$emit('dragged', props);
	}

	resize(
		mode: DragServiceProps['mode'],
		axis: 'x' | 'y' = 'x',
		distance: DragServiceProps['distance']
	) {
		if (mode === 'start') {
			const size = axis === 'x' ? 'offsetWidth' : 'offsetHeight';
			this.previousSize = this.$el[size];
		} else if (mode === 'drag') {
			const size = axis === 'x' ? 'width' : 'height';
			this.$el.style[size] = distance[axis] + this.previousSize + 'px';
		}
	}

	reset() {
		this.$el.style.width = '';
		this.$el.style.height = '';
	}
}
