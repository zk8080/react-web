import { BaseState } from '../../../deploy/state/base-state';

export default class OrderPackageState extends BaseState{

	loadGrid(orderNo: string = 123465464) {
		this.get('order/package', {orderNo: orderNo}, result => {
			if (result.status === 1) {
				this.refreshDataList(result.data);
			}
		});
	}
}
