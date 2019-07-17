import React, { Component } from 'react';
import {Button} from 'antd';   
import stocktakingState from '../../../../index.state';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    cancelCheck = () => {
        stocktakingState.setShow(1);
    }

    endCheck = () => {
        stocktakingState.setShow(1);
    }

    render() {
        return (
            <div className='header-component'>
                <Button
                    type='primary'
                    onClick={this.cancelCheck}
                >
                    取消盘点
                </Button>
                <Button
                    type='primary'
                    onClick={this.endCheck}
                >
                    盘点结束
                </Button>
            </div>
        );
    }
}


export default Index;