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
import StoreList from './components/storeList/index.component';
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        State.getCustomerList();
        // State.getStoreList();
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
                    {...toJS(State)}
                    visible={State.productVisible}
                    cancelClick={State.toggleProductVisible}
                    onOk={State.productListSave}
                    customerInfo={toJS(State.curCustomerInfo)}
                    addClick={State.addProduct}
                    tableList={toJS(State.productList)}
                    getProductList={State.getProductList}
                />
                <ProductDetail
                    {...toJS(State)}
                    visible={State.detailVisible}
                    cancelClick={State.cancelProdiuct}
                    onOk={State.productSave}
                    getData={State.getCurProduct}
                    productList={toJS(State.curProduct)}
                    queryData={toJS(State.detailFormData)}
                    setQueryData={State.setDetailFormData}
                    getCurProduct={State.getCurProduct}
                />
                <StoreModal
                    visible={State.storeVisible}
                    cancelClick={State.closeStoreModal}
                    customerInfo={toJS(State.curCustomerInfo)}
                    addClick={State.addStore}
                    tableList={toJS(State.bindStoreList)}
                    getStoreList={State.getBindStore}
                />
                <StoreList
                    {...toJS(State)}
                    visible={State.storeListVisible}
                    cancelClick={State.cancelStoreList}
                    onOk={State.bindStore}
                    getData={State.getStoreList}
                    storeList={toJS(State.storeList)}
                />
            </div>
        );
    }
}


export default Index;