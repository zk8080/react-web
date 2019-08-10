import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import {NewTable} from '@pubComs';
import columns from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Form} from 'antd';
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
            <div className='beginCheck'>
                <HeadComponent
                    cancelCheck={State.cancelCheck}
                    endCheck={State.endCheck}
                    saveCheck={State.saveCheck}
                />
                <NewTable
                    dataSource={toJS(State.tableList)}
                    columns={columns}
                    scroll={{x: 1530}}
                    // rowKey='id'
                />
            </div>
        );
    }
}


export default Index;