import { observable, action, toJS } from 'mobx';
import { defaultPage, LoadGrid } from '../../../utils/load-serve';
import { BaseState } from '../../../deploy/state/base-state';
import Service from './index.service';
import {message} from 'antd';
/**
 * 订单导入
 */
class OrderImportState extends BaseState{
    // eslint-disable-next-line no-useless-constructor
    constructor(...rest){
        super(...rest);
    }
	@observable orderCommodityData: [];
	@action refreshOrderCommodityDate = (orderCommodityData = []) => {
		this.orderCommodityData = orderCommodityData;
	}

	loadGrid = (param: LoadGrid = {}) => {
		this.post('/order/loadGrid', param, result => {
			if (result.status === 1) {
				this.loadGridFinished(result.data);
				// this.refreshDataList(result.data.rows);
				// this.refreshPage(result.data);
			}
		});
    }
    
    //点击查看
    @action lookClick = (record) => {
        window.appHistory.push({
            pathname: '/orderDetail/index',
            state: toJS(record)
        });
    }
}

export default new OrderImportState();
