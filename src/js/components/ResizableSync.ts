import { Base } from '@studiometa/js-toolkit';
import type {
	BaseProps,
	BaseConfig,
	DragServiceProps,
} from '@studiometa/js-toolkit';

export interface ResizableSyncProps extends BaseProps {}

/**
 * ResizableSync class.
 */
export default class ResizableSync extends Base<ResizableSyncProps> {
	/**
	 * Config.
	 */
	static config: BaseConfig = {
		name: 'ResizableSync',
	};

	previousSize = 0;

	sync(mode: DragServiceProps['mode'], axis: 'x' | 'y', distance: number) {
		if (mode === 'start') {
			const size = axis === 'x' ? 'offsetWidth' : 'offsetHeight';
			this.previousSize = this.$el[size];
		} else if (mode === 'drag') {
			const size = axis === 'x' ? 'width' : 'height';
			this.$el.style[size] = distance + this.previousSize + 'px';
		}
	}

	reset() {
		this.$el.style.width = '';
		this.$el.style.height = '';
	}
}
