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

    render() {
        return (
            <div className='header-component'>
                <Button
                    type='primary'
                    onClick={this.beginCheck}
                >
                    打印订单
                </Button>
            </div>
        );
    }
}


export default Index;