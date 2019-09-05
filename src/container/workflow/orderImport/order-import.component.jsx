import React, { Component }  from 'react';
import { observer } from 'mobx-react';
import { Table, Button } from 'antd';
import {toJS} from 'mobx';
import {Upload, DownLoad, NewTable, AuthButton} from '@pubComs';

// import { Table } from '@pubComs';
import './index.less';
import {formUtils} from '@utils';

import { orderImportColumns } from './order-import.columns.config';
import OrderImportState from './order-import.state';
import DetailComponent from './components/detailComponent/index.component';
import FormComponent from './components/formComponent/index.component';

@observer
class OrderImportComponent extends Component{
	constructor(props) {
		super(props);
		this.state={};
		// OrderImportState = new OrderImportState();
	}

	componentDidMount(): void {
		OrderImportState.loadGrid();
	}

	render() {
			return (
                <div className='order_index'>
                    <FormComponent 
                        // queryData={toJS(OrderImportState.queryForm)}
                        // setQueryData={OrderImportState.setQueryForm}
                        getData={OrderImportState.loadGrid}
                        detailData={toJS(OrderImportState.detailData)}
                        setDetailData={OrderImportState.setDetailData}
                        // customerList={toJS(OrderImportState.customerList)}
                        // productList={toJS(OrderImportState.allProductList)}
                    />
                    <div className='header-component'>
                        <AuthButton
                            menuCode='ShipmentsOrderImport'
                        >
                            <Upload
                                action='/wms/order/excelImport'
                                successCbk={OrderImportState.loadGrid}
                                name='excelOrders'
                            />
                        </AuthButton>
                        <AuthButton
                            menuCode='ShipmentsOrderDownload'
                        >
                            <DownLoad
                                path='/order/downloadTemplate'
                                title='模板下载'
                            />
                        </AuthButton>
                        <AuthButton
                            menuCode='ShipmentsOrderExoprt'
                        >
                            <DownLoad
                                path={'/order/excelExport'}
                                params={formUtils.formToParams(toJS(OrderImportState.detailData))}
                                title='导出'
                            />
                        </AuthButton>
                    </div>
                    <NewTable
                        loading={OrderImportState.loading}
                        dataSource={OrderImportState.tableList}
                        columns={orderImportColumns}
                        rowKey='id'
                        bordered
                        scroll={{x: 1400, y: 500}}
                        getQueryData={OrderImportState.loadGrid}
                        pagination={toJS(OrderImportState.pageInfo)}
                    />
                    <DetailComponent
                        visible={OrderImportState.visible}
                        cancelClick={OrderImportState.toggleVisible}
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
