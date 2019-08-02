import React, { Component }  from 'react';
import { observer } from 'mobx-react';
import { Table, Button } from 'antd';
import {toJS} from 'mobx';
import {Upload} from '@pubComs';
// import { Table } from '@pubComs';

import { orderImportChildColumns, orderImportColumns } from './order-import.columns.config';
import OrderImportState from './order-import.state';
import DetailComponent from './components/detailComponent/index.component';

@observer
class OrderImportComponent extends Component{
	constructor(props) {
		super(props);
		this.state={};
		// OrderImportState = new OrderImportState();
	}

	childTable(target) {
		const commodities = target.orderCommodities;
		return <Table pagination={false} size='small' columns={orderImportChildColumns} dataSource={commodities}/>;
	}

	componentDidMount(): void {
		OrderImportState.loadGrid();
	}

    successCbk = (obj) => {
        console.log(obj, '----obj----');
    }

	render() {
			return (
                <div>
                    <div className='header-component'>
                        <Upload
                            action='/wms/order/excelImport'
                            successCbk={this.successCbk}
                        />
                    </div>
                    <Table
                        loading={OrderImportState.loading}
                        dataSource={OrderImportState.dataList}
                        columns={orderImportColumns}
                        rowKey='id'
                        bordered
                        onChange={OrderImportState.tableChange.bind(OrderImportState)}
                        // expandedRowRender={this.childTable.bind(this)}
                        // expandedRowKeys={OrderImportState.dataList.map((value, index )=> value.id)}
                        pagination={OrderImportState.page}
                    />
                    <DetailComponent
                        visible={OrderImportState.visible}
                        cancelClick={OrderImportState.toggleVisible}
                        onOk={this.saveClick}
                        detailData={toJS(OrderImportState.editForm)}
                        setDetailData={OrderImportState.setEditForm}
                        disabled={OrderImportState.disabled}
                        toggleDisabled={OrderImportState.toggleDisabled}
                        handleDelete={OrderImportState.deleteEditTable}
                        handleSave={OrderImportState.handleSave}
                        dataSource={toJS(OrderImportState.editTable)}
                        handleAdd={OrderImportState.handleAdd}
                    />
                </div>
            );
	}
}
export default OrderImportComponent;
