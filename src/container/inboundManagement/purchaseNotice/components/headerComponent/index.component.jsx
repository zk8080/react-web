import React, { Component } from 'react';
import {Button} from 'antd';
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='header-component'>
                <Button
                    type='primary'
                >
                    新增
                </Button>
                <Button
                    type='primary'
                >
                    导入
                </Button>
                <Button
                    type='primary'
                >
                    导出
                </Button>
            </div>
        );
    }
}


export default Index;