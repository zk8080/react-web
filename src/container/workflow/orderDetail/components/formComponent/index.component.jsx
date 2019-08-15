import React, { Component } from 'react';
import {Form, Row, Col, Input, Button, DatePicker} from 'antd';
import {Select} from '@pubComs';
import { formUtils } from '@utils/index';
const FormItem = Form.Item;

const onFieldsChange = (props, changedFields) => {
    props.setDetailData({...props.detailData, ...formUtils.formToObj(changedFields)});
};

const mapPropsToFields = (props) => {
    // const originData = props.detailData;
    // const detailData = {
    //     ...props.detailData
    // };
    // if(typeof originData.purchaseDate == 'string'){
    //     detailData = {
    //         ...props.detailData,
    //         purchaseDate: {value: moment(props.detailData.purchaseDate)}
    //     };
    // }
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

    render() {
        const {getFieldDecorator} = this.props.form;
        const {disabled} = this.props;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={8}>
                        <FormItem label='订单号'>
                            {getFieldDecorator('systemOrderNo', {})(
                                <Input 
                                    disabled
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='商家名称'>
                            {getFieldDecorator('customerName')(
                                <Input
                                    disabled
                                />
                            )}
                        </FormItem>
                    </Col>
                    {/* <Col span={8}>
                        <FormItem label='快递公司'>
                            {getFieldDecorator('reciptAddr', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Input 
                                    disabled={disabled}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='快递单号'>
                            {getFieldDecorator('reciptAddr', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Input 
                                    disabled={disabled}
                                />
                            )}
                        </FormItem>
                    </Col> */}
                    <Col span={8}>
                        <FormItem label='收件人'>
                            {getFieldDecorator('reciptName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Input 
                                    disabled={disabled}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='手机号'>
                            {getFieldDecorator('reciptPhone', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Input 
                                    disabled={disabled}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='省份'>
                            {getFieldDecorator('prov', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Input 
                                    disabled={disabled}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='市区县'>
                            {getFieldDecorator('city', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Input 
                                    disabled={disabled}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='地址'>
                            {getFieldDecorator('reciptAddr', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Input 
                                    disabled={disabled}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default Index;


