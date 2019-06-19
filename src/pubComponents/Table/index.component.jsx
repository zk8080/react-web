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

    componentWillMount() {

    }

    componentDidMount() {
        const scrollY = getScrollY();
        const scrollX = getScrollX(this.props.columns);
        this.setState({
            scrollY,
            scrollX
        });
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
            <Table
                className='cur-table'
                bordered
                rowKey={(v, i) => Math.random()}
                {...this.props}
                // scroll={{...this.props.scroll, ...{y: this.state.scrollY}}}
                scroll={{x: this.state.scrollX, y: this.state.scrollY}}
            />
        );
    }
}


export default Index;