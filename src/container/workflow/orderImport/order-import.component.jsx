import React, { Component }  from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';

import { orderImportChildColumns, orderImportColumns } from './order-import.columns.config';
import { OrderImportState } from './order-import.state';

@observer
class OrderImportComponent extends Component{
	constructor(props) {
		super(props);
		this.state={};
		this.orderImportState = new OrderImportState();
	}

	childTable(target) {
		const commodities = target.orderCommodities;
		return <Table pagination={false} size='small' columns={orderImportChildColumns} dataSource={commodities}/>;
	}

	componentDidMount(): void {
		this.orderImportState.loadGrid();
	}

	render() {
		return (<Table

						loading={this.orderImportState.loading}
						dataSource={this.orderImportState.dataList}
						columns={orderImportColumns}
						onChange={this.orderImportState.tableChange.bind(this.orderImportState)}
						expandedRowRender={this.childTable.bind(this)}
						pagination={this.orderImportState.page}
					/>);
	}
}
export default OrderImportComponent;
