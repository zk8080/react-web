import React ,{ Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Row, Table, Tabs, Input, Icon, Col, Modal, message } from 'antd';
import { PaginationProps } from 'antd/es/pagination';
import { TableRowSelection } from 'antd/es/table';

import {
	invoiceColumns,
	lockBillCommodityColumns,
	lockPickingBillColumns,
	pickingBillColumns
} from './picking-bill.columns.config';
import { PickingBillState } from './picking-bill.state';
import { LoadGridUtil } from '../../../utils/load-serve';
import BarcodeComponent from '../../../pubComponents/barcode/barcode.component';


const { TabPane } = Tabs;
const { Search } = Input;

@observer
class PickingBillComponent extends Component{
	rowSelect: TableRowSelection;
	constructor(props){
		super(props);
		this.state = {
			selectedRowKeys: [],
			loading: false,
		};
		this.pickingBillState = new PickingBillState();
	}
	componentDidMount(): void {
		this.pickingBillState.loadGrid();
	}

	/**
	 * 生成拣货单
	 */
	generatorPickBill() {
		this.pickingBillState.generatorPickBill();
	}

	/**
	 * 打印拣货单
	 */
	printerPickBill() {
		message.info('功能并未开放');
		// this.pickingBillState.generatorPickBill();
	}
	tableChange(page: PaginationProps, filter, sorter) {
		this.pickingBillState.loadGrid(LoadGridUtil.paramsBuild(page, filter, sorter));
		this.setState({selectedRowKeys: []});
	}

	rowRender(row) {
		return <Table dataSource={row.packageCommodities} columns={lockBillCommodityColumns} pagination={false}/>;
	}

	render(){
		const {selectedRowKeys} = this.state;
		const rowSelection: TableRowSelection = {
			selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({selectedRowKeys});
				console.info(JSON.stringify({selectedRowKeys: selectedRowKeys, selectedRows: selectedRows}));
			},
			getCheckboxProps: record => ({
				disabled: record.printTimes > 1
			})
		};
		return <div>
					<Tabs type="card">
						<TabPane tab="拣货单列表" key="list">
							<Row  className={'header-component'}>
								<Button type="danger" onClick={this.generatorPickBill.bind(this)}>手动生成拣货单</Button>
								<Button type="primary" icon="printer" onClick={this.printerPickBill.bind(this)}>打印拣货单</Button>
							</Row>
							<Table
								pagination={this.pickingBillState.page}
								loading={this.pickingBillState.loading}
								rowSelection={rowSelection}
								columns={pickingBillColumns}
								dataSource={this.pickingBillState.dataList}
								onChange={this.tableChange.bind(this)}
							/>
						</TabPane>
						<TabPane tab="复检" key="chick">
							<Row  className={'header-component'}>
								<Col span={6} >
									<Search placeholder="请锁定拣货单号" onSearch={this.pickingBillState.lockPickBill.bind(this.pickingBillState)} enterButton={
										<Icon type="unlock" title="解锁"/>
									}/>
								</Col>
								<Col span={6}>
									<Search placeholder="商品条形码" onSearch={this.pickingBillState.checkCommodity.bind(this.pickingBillState)} enterButton="检查"/>
								</Col>

								<Button type="danger" onClick={this.pickingBillState.invoiceCheckClose.bind(this.pickingBillState)}>复检完毕</Button>
							</Row>
							<Table
								pagination={false}
								defaultExpandAllRows={true}
								columns={lockPickingBillColumns}
								expandedRowRender={this.rowRender.bind(this)}
								dataSource={this.pickingBillState.lockDataList}
							/>
							<Modal
								title="提示"
								visible={this.pickingBillState.visible}
								onOk={this.pickingBillState.tipConfirm.bind(this.pickingBillState)}
							>
								<h3>请将此商品放置 {this.pickingBillState.basketNum} 号框.</h3>
							</Modal>
						</TabPane>
						<TabPane tab="拣货单列表" key="pickBillList">
							<Row type="flex" justify="space-around" align="middle" className="header-component">
								<Col span={3}><h3 align="right" >拣货单号：</h3></Col>
								<Col span={21}>
									{/*<Barcode code={46565464} height={80}/>*/}
									<BarcodeComponent code={'9797979789KS'} height={80}/>
								</Col>
							</Row>
							<Table pagination={false} columns={invoiceColumns} dataSource={this.pickingBillState.invoices}></Table>
						</TabPane>
					</Tabs>
		</div>;
	}

}

export default PickingBillComponent;
