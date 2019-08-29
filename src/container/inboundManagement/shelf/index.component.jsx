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
import ShelfComponent from './components/shelfComponent/index.component';
import AuditModal from './components/auditModal/index.component';

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
        State.getAllProductList();
        State.getTableList();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='shelf'>
                <Form>
                    <FormComponent 
                        queryData={toJS(State.queryForm)}
                        setQueryData={State.setQueryForm}
                        getData={State.getTableList}
                        customerList={toJS(State.customerList)}
                        productList={toJS(State.allProductList)}
                        setCurrent={State.setCurrent} 
                    />
                </Form>
                {/* <HeadComponent
                    addClick={State.addClick}
                    successCbk={State.getTableList}
                /> */}
                <Table
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    rowKey='id'
                    bordered
                    scroll={{x: 1400}}
                    getQueryData={State.getTableList}
                    pagination={toJS(State.pageInfo)}
                />
                <DetailComponent
                    {...toJS(State)}
                    visible={State.visible}
                    cancelClick={State.toggleVisible}
                    onOk={State.saveData}
                    detailData={toJS(State.editForm)}
                    setDetailData={State.setEditForm}
                    dataSource={toJS(State.editTable)}
                    isDetail={State.isDetail}
                    shelf={State.shelfClick}
                    handleSave={State.handleProductSave}
                    auditClick={State.openAuditModal}
                />
                <ShelfComponent
                    visible={State.shelfVisible}
                    cancelClick={State.closeShelfVisible}
                    storeList={toJS(State.recommendStoreList)}
                    dataSource={toJS(State.editStoreList)}
                    handleAdd={State.handleAdd}
                    handleDelete={State.deleteEditTable}
                    handleSave={State.handleSave}
                    onOk={State.submitStoreList}
                />
                <AuditModal
                    visible={State.auditVisible}
                    cancelClick={State.closeAuditModal}
                    onOk={State.auditData}
                />
            </div>
        );
    }
}


export default Index;