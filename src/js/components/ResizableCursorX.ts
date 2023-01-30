import { Base, withDrag } from '@studiometa/js-toolkit';
import type { BaseConfig, BaseProps } from '@studiometa/js-toolkit';

export interface ResizableCursorXProps extends BaseProps {

}

/**
 * ResizableCursorX class.
 */
export default class ResizableCursorX extends withDrag(Base)<ResizableCursorXProps> {
	/**
	 * Config.
	 */
	static config: BaseConfig = {
		name: 'ResizableCursorX',
	};
}
