import React, { Component } from 'react';
import {Table} from 'antd';
import './index.less';
import {getScrollY} from './utils';


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
        this.setState({
            scrollY
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
                {...this.props}
                scroll={{...this.props.scroll, ...{y: this.state.scrollY}}}
            />
        );
    }
}


export default Index;