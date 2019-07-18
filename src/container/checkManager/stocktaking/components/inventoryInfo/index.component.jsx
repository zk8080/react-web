import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import {Table} from '@pubComs';
import colums from './index.data';
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
        State.getMerchantsList();
    }

    // saveClick = (obj) => {
    //     State.saveData(obj);
    // }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='stocktaking'>
                <Form>
                    <FormComponent 
                        queryData={toJS(State.queryForm)}
                        setQueryData={State.setQueryForm}
                        getData={State.getTableList}
                        merchantsList={toJS(State.merchantsList)}
                    />
                </Form>
                <HeadComponent
                    addClick={State.addClick}
                    {...this.props}
                    beginCheck={State.beginCheck}
                />
                <Table
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    rowKey='id'
                    pagination={false}
                />
            </div>
        );
    }
}


export default Index;