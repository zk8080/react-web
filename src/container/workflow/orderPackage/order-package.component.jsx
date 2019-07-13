import React from 'react';
import { observer } from 'mobx-react';

import { Col, Icon, Input, Row, Table } from 'antd';
import OrderPackageState from './order-package.state';
import { orderPackageDataListColumns } from './order-package.columns';

@observer
class OrderPackageComponent extends React.Component{
	constructor() {
		super();
		this.orderPackage = new OrderPackageState();
	}

	render() {
		return <Row >
			<Row  className={'header-component'}>
				<Col span={6} >
					<Input.Search
						placeholder="请锁定订单号"
						onSearch={this.orderPackage.lockOrderNo.bind(this.orderPackage)}
						enterButton={
							<Icon type="unlock" title="解锁"/>
						}
					/>
				</Col>
			</Row>
			<Table pagination={false}
				   loading={this.orderPackage.loading}
				   columns={orderPackageDataListColumns}
				   dataSource={this.orderPackage.dataList} />
		</Row>;
	}
}
export default OrderPackageComponent;
