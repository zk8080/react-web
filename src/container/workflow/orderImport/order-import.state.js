import { observable, action } from 'mobx';
import { defaultPage, LoadGrid } from '../../../utils/load-serve';
import { BaseState } from '../../../deploy/state/base-state';


/**
 * 订单导入
 */
export class OrderImportState extends BaseState{
	@observable orderCommodityData: [];
	@action refreshOrderCommodityDate(orderCommodityData = []) {
		this.orderCommodityData = orderCommodityData;
	}

	loadGrid(param: LoadGrid = {}) {
		this.post('/order/loadGrid', param, result => {
			if (result.status === 1) {
				this.loadGridFinished(result.data);
				// this.refreshDataList(result.data.rows);
				// this.refreshPage(result.data);
			}
		});
	}
}
