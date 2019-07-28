import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
// import {Table} from '@pubComs';
import {colums} from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Form, Table} from 'antd';
import FormComponent from './components/formComponent/index.component';
import HeadComponent from './components/headComponent/index.component';
import DetailComponent from './components/detailComponent/index.component';
import ReceiptModal from './components/receiptModal/index.component';
import SkuModal from './components/skuModal/index.component';
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        State.getCustomerList();
        // State.getProductList();
        State.getTableList();
    }

    saveClick = (obj) => {
        State.saveData(obj);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <Form>
                    <FormComponent 
                        queryData={toJS(State.queryForm)}
                        setQueryData={State.setQueryForm}
                        getData={State.getTableList}
                    />
                </Form>
                <HeadComponent
                    addClick={State.addClick}
                    successCbk={State.getTableList}
                />
                <Table
                    dataSource={toJS(State.tableList)}
                    getQueryData={State.getTableList}
                    pagination={toJS(State.pageInfo)}
                    columns={colums}
                    rowKey='id'
                    bordered
                    scroll={{x: 1650}}
                />
                <DetailComponent
                    {...toJS(State)}
                    isLook={State.isLook}
                    visible={State.visible}
                    cancelClick={State.toggleVisible}
                    onOk={this.saveClick}
                    detailData={toJS(State.editForm)}
                    setDetailData={State.setEditForm}
                    disabled={State.disabled}
                    toggleDisabled={State.toggleDisabled}
                    handleDelete={State.deleteEditTable}
                    handleSave={State.handleSave}
                    dataSource={toJS(State.editTable)}
                    handleAdd={State.handleAdd}
                    //handleReceipt={State.receiptClick}
                    
                />
                <ReceiptModal
                    {...toJS(State)}
                    visible={State.receiptVisible}
                    cancelClick={State.cancelReceiptModal}
                    onOk={State.confirmClick}
                    detailData={toJS(State.editForm)}
                    setDetailData={State.setEditForm}
                    disabled={State.disabled}
                    toggleDisabled={State.toggleDisabled}
                    handleSave={State.handleSave}
                    dataSource={toJS(State.editTable)}
                    handleReceipt={State.receiptClick}
                />

                {/* 商家的modal */}
                <SkuModal
                    visible={State.detailVisible}
                    cancelClick={State.cancelProdiuct}
                    onOk={State.productSave}
                    getData={State.getProductList}
                    productList={toJS(State.productList)}
                    queryData={toJS(State.detailFormData)}
                    setQueryData={State.setDetailFormData}
                    pagination={toJS(State.pageInfo)}
                />
            </div>
        );
    }
}


export default Index;