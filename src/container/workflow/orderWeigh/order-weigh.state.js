import { BaseState } from '../../../deploy/state/base-state';
import type { LoadGrid } from '../../../utils/load-serve';
import {notification} from 'antd';

class OrderWeighState extends BaseState{

	loadGrid(loadGrid: LoadGrid = {size: 10, current: 1}) {
	 this.post('order/weigh/loadGrid', loadGrid, result => {
	 	if (result.status === 1) {
	 		this.loadGridFinished(result.data);
	 		// this.refreshDataList(result.data.rows);
	 		// this.refreshPage(result.data);
		}
	 });
	}

	lockOrder(value) {

		if (this.orderNo !== value) {
			this.orderNo = value;

			if (this.orderNo !== ''){
				// this.lockPickBillData();
			}
		}

	}
}
export default OrderWeighState;
