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
import ReceiptModal from './components/receiptModal/index.component';

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
        State.getProductList();
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
                        getData={State.getProductList}
                    />
                </Form>
                <HeadComponent
                    addClick={State.addClick}
                />
                <Table
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    rowKey='id'
                />
                <DetailComponent
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
                />
                <ReceiptModal/>
            </div>
        );
    }
}


export default Index;