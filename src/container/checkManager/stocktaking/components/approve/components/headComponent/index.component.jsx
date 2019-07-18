import React, { Component } from 'react';
import {Button, Row, Col, Form, Input, message} from 'antd';
import { Modal } from '@pubComs';
import './index.less';
const FormItem = Form.Item;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //展示审批弹窗
            advice: 'approved', //意见，默认是通过
            remark: ''
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
            advice: 'approved'
        })
    }

    // 审批提交
    onOkClick = () => {
        if(this.state.advice == 'approve_fail' && !this.state.remark){
            message.warning('审批意见必填');
            return;
        }
        if(this.props.approveClick){
            this.props.approveClick({
                billState: this.state.advice,
                checkRecordList: this.props.checkRecordList,
                remark: this.state.remark
            },()=>{
                this.setState({
                    visible: false
                })
            });
        }
            
    }

    //修改审批意见
    changeAdvice = (num) =>{
        this.setState({
            advice: num
        });
    }

    //修改审批备注
    changeRemark = (e) => {
        this.setState({
            remark: e.target.value
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
                                onClick={this.changeAdvice.bind(this,'approved')} 
                                className={this.state.advice == 'approved' ? 'selected' : ''}
                            >
                                通过
                            </Button>
                            <Button     
                                onClick={this.changeAdvice.bind(this,'approve_fail')} 
                                className={this.state.advice == 'approve_fail' ? 'selected' : ''}
                            >
                                不通过
                            </Button>
                        </Col>
                        <Col span={24}>
                            <Col span={4}>
                                审批意见：
                            </Col>
                            <Col span={20}>
                                <Input placeholder='请输入' onChange={this.changeRemark}/>
                            </Col>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}

export default Index;