import React, { Component } from 'react';
import {Table} from 'antd';
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

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
            />
        );
    }
}


export default Index;