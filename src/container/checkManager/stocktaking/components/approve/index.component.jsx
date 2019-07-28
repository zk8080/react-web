import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
// import {Table} from '@pubComs';
import columns from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Form, Table} from 'antd';
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
        // State.getProductList();
    }

    // saveClick = (obj) => {
    //     State.saveData(obj);
    // }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='approve'>
                <Form>
                    <FormComponent 
                        queryData={toJS(State.queryForm)}
                        setQueryData={State.setQueryForm}
                        getData={State.getTableList}
                        productList={toJS(State.tableList)}
                        checkUserList={toJS(State.checkUserList)}
                    />
                </Form>
                <HeadComponent
                    approveClick={State.approveClick}
                    checkRecordList={toJS(State.tableList)}
                    queryData={toJS(State.queryData)}
                />
                <Table
                    dataSource={toJS(State.tableList)}
                    columns={columns}
                    rowKey='id'
                    bordered
                />
            </div>
        );
    }
}


export default Index;