import React, { Component } from 'react';
import {Button} from 'antd';
import {DownLoad, AuthButton} from '@pubComs';
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
            });
        }
    }

    approve = () => {
        approveState.getCheckUserList();
        stocktakingState.setShow(3);
    }

    render() {
        return (
            <div className='header-component'>
                <AuthButton
                    menuCode='CheckIngStart'  
                >
                    <Button
                        type='primary'
                        onClick={this.beginCheck}
                    >
                        开始盘点
                    </Button>
                </AuthButton>
                <AuthButton
                    menuCode='CheckIngApprove'
                >
                    <Button
                        type='primary'
                        onClick={this.approve}
                    >
                        审批
                    </Button>
                </AuthButton>
                
            </div>
        );
    }
}


export default Index;