import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import {Table} from '@pubComs';
import {colums} from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Form} from 'antd';
import FormComponent from './components/formComponent/index.component';
import HeadComponent from './components/headComponent/index.component';
import DetailComponent from './components/detailComponent/index.component';
import ProductList from './components/productList/index.component';
import ProductDetail from './components/productDetail/index.component';
import StoreModal from './components/storeModal/index.component';

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        State.getCustomerList();
        State.getStoreList();
    }
    render() {
        return (
            <div>
                <Form>
                    <FormComponent 
                        queryData={toJS(State.queryForm)}
                        setQueryData={State.setQueryForm}
                        getData={State.getCustomerList}
                    />
                </Form>
                <HeadComponent
                    addClick={State.addClick}
                />
                <Table
                    dataSource={toJS(State.tableList)}
                    getQueryData={State.getQueryData}
                    pagination={toJS(State.pageInfo)}
                    columns={colums}
                    rowKey='id'
                />
                <DetailComponent
                    visible={State.visible}
                    cancelClick={State.toggleVisible}
                    onOk={State.saveData}
                    detailData={toJS(State.editForm)}
                    setDetailData={State.setEditForm}
                    disabled={State.disabled}
                    toggleDisabled={State.toggleDisabled}
                />
                <ProductList
                    visible={State.productVisible}
                    cancelClick={State.toggleProductVisible}
                    onOk={State.productListSave}
                    customerInfo={toJS(State.curCustomerInfo)}
                    addClick={State.addProduct}
                    tableList={toJS(State.productList)}
                />
                <ProductDetail
                    visible={State.detailVisible}
                    cancelClick={State.cancelProdiuct}
                    onOk={State.productSave}
                    getData={State.getCurProduct}
                    productList={toJS(State.curProduct)}
                    queryData={toJS(State.detailFormData)}
                    setQueryData={State.setDetailFormData}
                />
                <StoreModal
                    visible={State.storeVisible}
                    cancelClick={State.closeStoreModal}
                    storeList={toJS(State.storeList)}
                    onOk={State.bindStore}
                />
            </div>
        );
    }
}


export default Index;