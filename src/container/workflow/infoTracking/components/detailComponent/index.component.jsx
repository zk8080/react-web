import React, { Component } from 'react';
import {observer} from 'mobx-react';
import { NewTable, Select } from '@pubComs';
import {columns1, columns2} from './index.data';
import { toJS } from 'mobx';
import {Form, Modal, Row, Col, Input, DatePicker, Button} from 'antd';
import { formUtils } from '@utils';
import moment from "moment";
import "./index.less";
const FormItem = Form.Item;

const onFieldsChange = (props, changedFields) => {
    props.setDetailData({...props.detailData, ...formUtils.formToObj(changedFields)});
};

const mapPropsToFields = (props) => {
    return formUtils.objToForm(props.detailData);
};


@Form.create({
    mapPropsToFields,
    onFieldsChange
})
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onOkClick = () => {

    }

    toggleDisabled = () => {
        
    }

    

    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible=false, cancelClick, disabled=false, detailData={} } = this.props;
        return (
            <Modal
                title='新增'
                visible={visible}
                className='detail-customer infoTracking-detail'
                okText={disabled ? '修改': '确认'}
                cancelText='取消'
                onCancel={cancelClick}
                width='850px'
                onOk={disabled ? this.toggleDisabled: this.onOkClick}
            >
                
                <Form className='query-component'>
                    <Row>
                        <Col span={12}>
                            <FormItem label="商家名称" hasFeedback>
                                {getFieldDecorator('customerName', {
                                    rules: [],
                                })(<Input 
                                    placeholder='请输入' 
                                    disabled
                                />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="订单号" hasFeedback>
                                {getFieldDecorator('orderNo', {
                                    rules: [],
                                })(<Input
                                    placeholder='请输入' 
                                    disabled
                                />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="快递单号" hasFeedback>
                                {getFieldDecorator('mailNo', {
                                    rules: [],
                                })(<Input
                                    placeholder='请输入' 
                                    disabled
                                />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="是否捡货完成" hasFeedback>
                                {getFieldDecorator('isFinish', {
                                    rules: [],
                                })(<Select 
                                    placeholder='请选择'
                                    option={[
                                        {
                                            code: '1',
                                            name: '是'
                                        },
                                        {
                                            code: '0',
                                            name: '否'
                                        }
                                    ]}
                                    valueCode='code'
                                    valueName='name'
                                    disabled
                                />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="是否称重完成" hasFeedback>
                                {getFieldDecorator('isWeight', {
                                    rules: [],
                                })(<Select 
                                    placeholder='请选择'
                                    option={[
                                        {
                                            code: '1',
                                            name: '是'
                                        },
                                        {
                                            code: '0',
                                            name: '否'
                                        }
                                    ]}
                                    valueCode='code'
                                    valueName='name'
                                    disabled
                                />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="订单日期" hasFeedback>
                                {getFieldDecorator('orderDate', {
                                    rules: [],
                                })(<Input
                                    placeholder='请输入' 
                                    disabled
                                />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <h3>商品详情</h3>
                <NewTable
                    dataSource={toJS(this.props.productList || [])}
                    columns={columns1}
                    bordered
                    scroll={{x: 750, y:150}}
                    pagination={false}
                />
                <h3 className='detail-table'>物流信息</h3>
                <div>
                    <Button onClick={()=>{this.props.getLogisticsList(1)}}>物流获取</Button>
                    <Button onClick={this.props.confirm}>手工确认</Button>
                </div>
                <NewTable
                    dataSource={toJS(this.props.logisticsList || [])}
                    columns={columns2}
                    bordered
                    scroll={{x: 2010, y:150}}
                    pagination={false}
                />
                
            </Modal>
        );
    }
}


export default Index;