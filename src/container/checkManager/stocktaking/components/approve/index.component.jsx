import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import {Table} from '@pubComs';
import columns1 from '../inventoryInfo/index.data';
import columns2 from './index.data';
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
        // State.getProductList();
    }

    // saveClick = (obj) => {
    //     State.saveData(obj);
    // }

    componentWillUnmount() {

    }

    render() {
        const columns = columns1.concat(columns2);
        return (
            <div className='approve'>
                <Form>
                    <FormComponent 
                        queryData={toJS(State.queryForm)}
                        setQueryData={State.setQueryForm}
                        getData={State.getTableList}
                        productList={toJS(State.tableList)}
                    />
                </Form>
                <HeadComponent
                    addClick={State.addClick}
                />
                <Table
                    dataSource={toJS(State.tableList)}
                    columns={columns}
                    rowKey='id'
                />
            </div>
        );
    }
}


export default Index;