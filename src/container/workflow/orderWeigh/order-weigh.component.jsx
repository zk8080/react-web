import React from 'react';
import {Row, Table} from 'antd';
import OrderWeighState from './order-weigh.state';
import { orderWeighDataListColumns } from './order-weigh.columns';
import { observer } from 'mobx-react';

@observer
class OrderWeighComponent extends React.Component{
	constructor() {
		super();
		this.orderWeighState = new OrderWeighState();
	}

	componentDidMount(): void {
		this.orderWeighState.loadGrid();
	}

	render() {
		return <Row>
			<Table
				pagination={this.orderWeighState.page}
				loading={this.orderWeighState.loading}
				columns={orderWeighDataListColumns}
			   	dataSource={this.orderWeighState.dataList}
				onChange={this.orderWeighState.tableChange.bind(this.orderWeighState)}
			/>
		</Row>;
	}
}
export default OrderWeighComponent;
