import React, { Component } from 'react';
import {Form, Row, Col, Input, Button, DatePicker} from 'antd';
import {Select} from '@pubComs';
import { formUtils } from '@utils/index';
import {observer} from 'mobx-react';
const FormItem = Form.Item;

const onFieldsChange = (props, changedFields) => {
    const cityObj = {
        city: null
    };
    const countyObj = {
        county: null
    };
    if( changedFields.prov ){
        props.setDetailData({...props.detailData,...formUtils.formToObj(changedFields), ...cityObj, ...countyObj});
    }else if(changedFields.city){
        props.setDetailData({...props.detailData,...formUtils.formToObj(changedFields), ...countyObj});
    }else{
        props.setDetailData({...props.detailData, ...formUtils.formToObj(changedFields)});
    }
    
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
        this.state={
        };
    }

    onProvChange = (value) => {
        // this.props.form.setFieldsValue({
        //     'city': null
        // });
        this.props.onProvChange(value);
    }

    onCityChange = (value) => {
        // this.props.form.setFieldsValue({
        //     'county': null
        // });
        this.props.onCityChange(value);
    }

    
    componentDidMount() {
        this.props.setForm(this.props.form);
    }
    

    render() {
        const {getFieldDecorator} = this.props.form;
        const {disabled, provList, cityList, countyList} = this.props;
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
                                <Select 
                                    disabled={disabled}
                                    option={provList}
                                    valueCode='name'
                                    valueName='name'
                                    onChange={this.onProvChange}
                                />
                                
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='市'>
                            {getFieldDecorator('city', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Select 
                                    disabled={disabled}
                                    option={cityList}
                                    valueCode='name'
                                    valueName='name'
                                    onChange={this.onCityChange}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='区县'>
                            {getFieldDecorator('county', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Select 
                                    disabled={disabled}
                                    option={countyList}
                                    valueCode='name'
                                    valueName='name'
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


