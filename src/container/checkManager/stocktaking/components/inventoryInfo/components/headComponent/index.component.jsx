import React, { Component } from 'react';
import {Button} from 'antd';
import {DownLoad} from '@pubComs';
import stocktakingState from '../../../../index.state';
import approveState from '../../../approve/index.state';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    beginCheck = () => {
        if(this.props.beginCheck){
            this.props.beginCheck(()=>{
                stocktakingState.setShow(2);
            })
        }
    }

    approve = () => {
        approveState.getCheckUserList();
        stocktakingState.setShow(3);
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