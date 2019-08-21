import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import { NewTable } from '@pubComs';
import {colums} from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Form} from 'antd';
import FormComponent from './components/formComponent/index.component';
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
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='infoTracking'>
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
                <NewTable
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    // rowKey='id'
                    bordered
                    scroll={{x: 1400}}
                    getQueryData={State.getTableList}
                    pagination={toJS(State.pageInfo)}
                />
                <DetailComponent
                    visible={State.visible}
                    cancelClick={State.toggleVisible}
                    onOk={this.saveClick}
                    detailData={toJS(State.editForm)}
                    setDetailData={State.setEditForm}
                    disabled={State.disabled}
                    toggleDisabled={State.toggleDisabled}
                    productList={toJS(State.productList)}
                    logisticsList={toJS(State.logisticsList)}
                    getLogisticsList={State.getLogisticsList}
                    confirm={State.confirm}
                />
            </div>
        );
    }
}


export default Index;