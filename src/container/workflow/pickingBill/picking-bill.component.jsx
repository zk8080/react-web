import React ,{ Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Row, Table, Tabs, Input, Icon, Col, Modal, message } from 'antd';
import { PaginationProps } from 'antd/es/pagination';
import { TableRowSelection } from 'antd/es/table';
import {AuthButton} from '@pubComs';

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
            selectedRows: [],
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
		// message.info('功能并未开放');
        // PickingBillState.generatorPickBill();
        const selectedRows = this.state.selectedRows;
        if(selectedRows.length < 1){
            message.warning('请选择拣货单进行打印！');
            return;
        }
        PickingBillState.queryPickBillDetail(selectedRows, () => {
            this.setState({
                selectedRowKeys: [],
                selectedRows: []
            });
        });
	}
	tableChange(page: PaginationProps, filter, sorter) {
		PickingBillState.loadGrid(LoadGridUtil.paramsBuild(page, filter, sorter));
		this.setState({selectedRowKeys: []});
	}

	rowRender(row) {
		return <Table dataSource={row.packageCommodities} columns={lockBillCommodityColumns} pagination={false}/>;
	}

    printBarCode = () => {
        PickingBillState.printBarCode();
    }

	render(){
        const {selectedRowKeys} = this.state;
		const rowSelection: TableRowSelection = {
			selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
                    selectedRowKeys, 
                    selectedRows
                });
			},
			getCheckboxProps: record => ({
				// disabled: record.billState != 'save'
			})
		};
		return <div>
					<Row  className={'header-component'}>
                        <AuthButton
                            menuCode='BuildPickingProductHand'
                        >
                            <Button type="danger" onClick={this.generatorPickBill.bind(this)}>手动生成拣货单</Button>   
                        </AuthButton>
                        <AuthButton
                            menuCode='BuildPickingProductPrint'
                        >
                            <Button type="primary" icon="printer" onClick={this.printerPickBill.bind(this)}>打印拣货单</Button>   
                        </AuthButton>
                        {/* <Button type="primary" icon="printer" onClick={this.printBarCode.bind(this)}>打印商品条码</Button> */}
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
