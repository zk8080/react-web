import { BaseState } from '../../../deploy/state/base-state';
import type { LoadGrid } from '../../../utils/load-serve';
import {notification, message} from 'antd';

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

	confirmWeigh() {
		if (!this.orderNo) {
			message.warning('请先锁定订单号');
			return;
		}

		if (!this.orderWeight) {
			message.warning('先对比，对比异常确认无误后在点击');
			return;
		}

		this.get('order/weighIgnore', {orderNo: this.orderNo, realWeight: this.orderWeight}, result => {
			if (result.code != 0) {
				notification.warning({
					message: '称重操作警告',
					description: result.msg
				});
			} else {
				this.loadGrid();
			}
		});
	}

	weigh(value: number) {
		this.orderWeight = value;

		if (this.orderWeight > 0)
			if (this.orderNo)  {
				this.get('order/weigh', {orderNo: this.orderNo, realWeight: value}, result => {
					if (result.code != 0) {
						notification.warning({
							message: '称重操作警告',
							description: result.msg
						});
					} else {
						this.loadGrid();
					}
				});
			} else {
				message.warning('请先锁定订单号');
			}
	}

	lockOrder(value) {

		if (this.orderNo !== value) {
			this.orderNo = value;
		}

	}
}
export default OrderWeighState;
