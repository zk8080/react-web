import React, { Component } from 'react';
import {Form, Row, Col, Input, Button, DatePicker} from 'antd';
import {Select, DownLoad, AuthButton} from '@pubComs';
import { formUtils } from '@utils/index';
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
class Index extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if( values.startTime ){
                    values.startTime = values.startTime.format('YYYY-MM-DD');
                }
                if( values.endTime ){
                    values.endTime = values.endTime.format('YYYY-MM-DD');
                }
                this.props.getData({
                    search: values
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={6}>
                        <FormItem label="姓名" hasFeedback>
                            {getFieldDecorator('reciptName', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="电话" hasFeedback>
                            {getFieldDecorator('reciptPhone', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="地址" hasFeedback>
                            {getFieldDecorator('reciptAddr', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="订单状态" hasFeedback>
                            {getFieldDecorator('billState', {
                                rules: [],
                            })(<Select 
                                option={[
                                    {
                                        code: 'save',
                                        name: '保存'
                                    },
                                    {
                                        code: 'cancel',
                                        name: '订单取消'
                                    },
                                    {
                                        code: 'go_out',
                                        name: '出库'
                                    },
                                    {
                                        code: 'finished',
                                        name: '完成'
                                    },
                                    {
                                        code: 'packing',
                                        name: '打包中'
                                    },
                                    {
                                        code: 'picking',
                                        name: '拣货中'
                                    },
                                ]}
                                valueCode='code'
                                valueName='name'
                            />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <FormItem label="开始日期" hasFeedback>
                            {getFieldDecorator('startTime', {
                                rules: [],
                            })(<DatePicker/>)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="结束日期" hasFeedback>
                            {getFieldDecorator('endTime', {
                                rules: [],
                            })(<DatePicker/>)}
                        </FormItem>
                    </Col>
                    <Col span={12} className='query-btn'>
                        <AuthButton
                            menuCode='ShipmentsOrderQuery'
                        >
                            <Button
                                type="primary"
                                onClick={this.handleSubmit}
                            >查询</Button>
                        </AuthButton>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default Index;


