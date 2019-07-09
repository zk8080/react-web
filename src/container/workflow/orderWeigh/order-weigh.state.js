import { BaseState } from '../../../deploy/state/base-state';
import type { LoadGrid } from '../../../utils/load-serve';

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
}
export default OrderWeighState;
