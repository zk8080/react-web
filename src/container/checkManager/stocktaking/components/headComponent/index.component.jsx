import React, { Component } from 'react';
import {Button} from 'antd';
import {DownLoad} from '@pubComs';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    beginCheck = () => {
        
    }

    approve = () => {
        
    }

    render() {
        return (
            <div className='header-component'>
                <Button
                    type='primary'
                    onClick={this.beginCheck}
                >
                    开始盘点
                </Button>
                <Button
                    type='primary'
                    onClick={this.approve}
                >
                    审批
                </Button>
            </div>
        );
    }
}


export default Index;