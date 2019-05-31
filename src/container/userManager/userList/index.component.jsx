import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import {Table} from 'antd';
import {colums} from './index.data';
import './index.less';

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {
        State.getUserList();
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
            <div className='user-box'>
                <Table
                    columns={colums}
                    bordered
                    dataSource={State.tableList}
                    rowKey={(record, index) => record.id}
                    scroll={{x: 800,y: 500}}
                />
            </div>
        );
    }
}


export default Index;