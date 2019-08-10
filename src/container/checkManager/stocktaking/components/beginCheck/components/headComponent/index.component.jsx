import React, { Component } from 'react';
import {Button} from 'antd';   
import stocktakingState from '../../../../index.state';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    cancelCheck = () => {
        if(this.props.cancelCheck){
            this.props.cancelCheck(()=>{
                stocktakingState.setShow(1);
            });
        }
        
    }

    endCheck = () => {
        if(this.props.endCheck){
            this.props.endCheck(()=>{
                stocktakingState.setShow(1);
            });
        }
        
    }

    saveCheck = () => {
        if(this.props.saveCheck){
            this.props.saveCheck(()=>{
                stocktakingState.setShow(1);
            });
        }
        
    }

    render() {
        return (
            <div className='header-component'>
                <Button
                    type='primary'
                    onClick={this.saveCheck}
                >
                    保存
                </Button>
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