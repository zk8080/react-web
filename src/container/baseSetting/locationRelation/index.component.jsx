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
        State.getTableList();
        State.getCustomerList();
        // State.getStroeList();
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
                        customerList={toJS(State.customerList)}
                        setQueryData={State.setQueryForm}
                        getData={State.getTableList}
                    />
                </Form>
                <HeadComponent
                    addClick={State.addClick}
                />
                <Table
                    dataSource={toJS(State.tableList)}
                    getQueryData={State.getTableList}
                    pagination={toJS(State.pageInfo)}
                    columns={colums}
                    rowKey='id'
                    scroll={{x: 1320}}
                />
                <DetailComponent
                    visible={State.visible}
                    cancelClick={State.toggleVisible}
                    onOk={this.saveClick}
                    detailData={toJS(State.editForm)}
                    setDetailData={State.setEditForm}
                    disabled={State.disabled}
                    toggleDisabled={State.toggleDisabled}
                    customerList={toJS(State.customerList)}
                    productList={toJS(State.productList)}
                    storeList={toJS(State.allStoreList)}
                    getProductList={State.getProductList}
                />
            </div>
        );
    }
}


export default Index;