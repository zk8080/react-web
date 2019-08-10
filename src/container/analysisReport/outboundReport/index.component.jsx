import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import { NewTable } from '@pubComs';
import {colums} from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Form} from 'antd';
import FormComponent from './components/formComponent/index.component';
import HeadComponent from './components/headComponent/index.component';

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
            <div className='outboundReport'>
                <Form>
                    <FormComponent 
                        queryData={toJS(State.queryForm)}
                        setQueryData={State.setQueryForm}
                        getData={State.getTableList}
                        customerList={toJS(State.customerList)}
                        productList={toJS(State.allProductList)}
                    />
                </Form>
                <HeadComponent />
                <NewTable
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    // rowKey='id'
                    bordered
                    scroll={{x: 1400}}
                    getQueryData={State.getTableList}
                    pagination={toJS(State.pageInfo)}
                />
            </div>
        );
    }
}


export default Index;