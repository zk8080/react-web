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
import PickingBillState from './picking-bill.state';
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
		// PickingBillState = new PickingBillState();
	}
	componentDidMount(): void {
        PickingBillState.loadGrid();
	}

	/**
	 * 生成拣货单
	 */
	generatorPickBill() {
		PickingBillState.generatorPickBill();
	}

	/**
	 * 打印拣货单
	 */
	printerPickBill() {
		message.info('功能并未开放');
		// PickingBillState.generatorPickBill();
	}
	tableChange(page: PaginationProps, filter, sorter) {
		PickingBillState.loadGrid(LoadGridUtil.paramsBuild(page, filter, sorter));
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
					<Row  className={'header-component'}>
                        <Button type="danger" onClick={this.generatorPickBill.bind(this)}>手动生成拣货单</Button>
                        <Button type="primary" icon="printer" onClick={this.printerPickBill.bind(this)}>打印拣货单</Button>
                    </Row>
                    <Table
                        pagination={PickingBillState.page}
                        loading={PickingBillState.loading}
                        rowSelection={rowSelection}
                        columns={pickingBillColumns}
                        bordered
                        dataSource={PickingBillState.dataList}
                        onChange={this.tableChange.bind(this)}
                    />
		</div>;
	}

}

export default PickingBillComponent;
