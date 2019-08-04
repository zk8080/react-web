import React, { Component } from 'react';
import {Table} from 'antd';
import './index.less';
import {getScrollY, getScrollX} from './utils';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: null
        };
    }

    componentDidMount() {
        const scrollY = getScrollY();
        const scrollX = getScrollX(this.props.columns);
        this.setState({
            scrollY,
            scrollX
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pageParams = { 
            current: pagination.current,
            pageSize: pagination.pageSize
         };
        this.props.getQueryData && this.props.getQueryData(pageParams);
    };

    render() {
        console.log(this.state.scrollX,'this.state.scrollX');
        return (
            <Table
                className='cur-table'
                bordered
                rowKey={(v, i) => Math.random()}
                {...this.props}
                pagination={this.props.pagination}
                scroll={{x: this.state.scrollX, y: this.state.scrollY}}
                onChange={this.handleTableChange}
            />
        );
    }
}


export default Index;