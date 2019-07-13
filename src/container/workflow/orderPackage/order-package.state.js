import { BaseState } from '../../../deploy/state/base-state';

export default class OrderPackageState extends BaseState{

	lockOrderNo(value) {

		if (this.orderNo !== value) {
			this.orderNo = value;

			if (this.orderNo !== ''){
				this.loadGrid(this.orderNo);
			}
		}

	}

	loadGrid(orderNo: string) {
		this.get('order/package', {orderNo: orderNo}, result => {
			if (result.status === 1) {
				this.refreshDataList(result.data);
			}
		});
	}
}
