import React from 'react';
import { Row, Table } from 'antd';
import OrderPackageState from './order-package.state';
import { orderPackageDataListColumns } from './order-package.columns';
import { observer } from 'mobx-react';

@observer
class OrderPackageComponent extends React.Component{
	constructor() {
		super();
		this.orderPackage = new OrderPackageState();
	}

	componentDidMount(): void {
		this.orderPackage.loadGrid();
	}

	render() {
		return <Row >
			<Table pagination={false}
				   loading={this.orderPackage.loading}
				   columns={orderPackageDataListColumns}
				   dataSource={this.orderPackage.dataList} />
		</Row>;
	}
}
export default OrderPackageComponent;
