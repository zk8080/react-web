import React from 'react';
import {Button, Col, Icon, Input, Row, Table} from 'antd';
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
			<Row  className={'header-component'}>
				<Col span={6} >
					<Input.Search placeholder="请锁定订单号"  enterButton={
						<Icon type="unlock" title="解锁"/>
					} onSearch={this.orderWeighState.lockOrder.bind(this.orderWeighState)}/>
				</Col>
				<Col span={6}>
					<Input.Search type="number" placeholder="订单称重重量" onSearch={this.orderWeighState.weigh.bind(this.orderWeighState)}  enterButton="比对"/>
				</Col>
				<Button type="danger" onClick={this.orderWeighState.confirmWeigh.bind(this.orderWeighState)}>忽略异常</Button>
			</Row>
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
