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

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        State.getCustomerList();
        State.getAllProduct();
    }

    handleTableChange = (pagination) => {
        console.log(pagination, '-----pagination----');
    }

    render() {
        return (
            <div>
                <Form>
                    <FormComponent 
                        queryData={toJS(State.queryForm)}
                        setQueryData={State.setQueryForm}
                        getData={State.getProductList}
                    />
                </Form>
                <HeadComponent
                    addClick={State.addClick}
                />
                <Table
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    onChange={this.handleTableChange}
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
                    onOk={State.toggleProductVisible}
                    customerInfo={toJS(State.curCustomerInfo)}
                    addClick={State.addProduct}
                    tableList={toJS(State.productList)}
                />
                <ProductDetail
                    visible={State.detailVisible}
                    cancelClick={State.cancelProdiuct}
                    onOk={State.productSave}
                    detailData={toJS(State.detailFormData)}
                    setDetailData={State.setDetailFormData}
                    disabled={State.productDisabled}
                    toggleDisabled={State.toggleProductDisabled}
                    productList={toJS(State.allProductList)}
                />
            </div>
        );
    }
}


export default Index;