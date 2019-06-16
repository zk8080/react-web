import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import {Table} from '@pubComs';
import {colums} from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Form} from 'antd';
import HeaderComponent from './components/headerComponent/index.component';


@Form.create()
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {
        State.getQueryData();
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <HeaderComponent/>
                <Table
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    rowKey='id'
                    // scroll={{x: 2000}}
                />
            </div>
        );
    }
}


export default Index;