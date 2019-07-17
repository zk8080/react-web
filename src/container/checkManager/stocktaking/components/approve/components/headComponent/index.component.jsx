import React, { Component } from 'react';
import {Button, Row, Col} from 'antd';
import { Modal } from '@pubComs';
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //展示审批弹窗
            advice: 1 //意见，默认是通过
        };
    }

    //点击审批按钮（打开审批弹窗）
    approve = () => {
        this.setState({
            visible: true
        })
    }

    //取消审批弹窗
    cancelClick = () => {
        this.setState({
            visible: false,
            advice: 1
        })
    }

    // 审批提交
    onOkClick = () => {
        this.setState({
            visible: false
        })
    }

    //修改审批意见
    changeAdvice = (num) =>{
        console.log(num,'num');
        this.setState({
            advice: num
        });
    }

    render() {
        return (
            <div className='header-component'>
                <Button
                    type='primary'
                    onClick={this.approve}
                >
                    审批
                </Button>
                <Modal
                    title='审批'
                    visible={this.state.visible}
                    className='approve-modal'
                    okText='提交'
                    cancelText='取消'
                    onCancel={this.cancelClick}
                    width='550px'
                    onOk={this.onOkClick}
                >
                    <Row>
                        <Col span={24}>
                            <Button     
                                onClick={this.changeAdvice.bind(this,'1')} 
                                className={this.state.advice == 1 ? 'selected' : ''}
                            >
                                通过
                            </Button>
                            <Button     
                                onClick={this.changeAdvice.bind(this,'2')} 
                                className={this.state.advice == 2 ? 'selected' : ''}
                            >
                                不通过
                            </Button>
                        </Col>
                    </Row>
                    
                        
                    

                </Modal>
            </div>
        );
    }
}


export default Index;