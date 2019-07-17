import React, { Component } from 'react';
import { toJS } from 'mobx';
import {Form, Row, Col, Input, Button, DatePicker} from 'antd';
import {formUtils} from '@utils';
import { Select } from '@pubComs';
import inventoryInfoState from '../../../inventoryInfo/index.state';
import { from } from '_array-flatten@2.1.2@array-flatten';
import './index.less';

const FormItem = Form.Item;


const onFieldsChange = (props, changedFields) => {
    if(props.setQueryData){
        props.setQueryData({...props.queryData, ...formUtils.formToObj(changedFields)});
    }
};

const mapPropsToFields = (props) => {
    let fn = () => {};
    return formUtils.objToForm(props.queryData || fn);
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
                if(props.getData){
                    props.getData(values);
                }
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='query-component approve-query'>
                <Row>
                    <Col span={8}>
                        <FormItem label="单据状态" hasFeedback>
                            {getFieldDecorator('status', {
                                rules: [
                                    // {
                                    //     required: true,
                                    //     message: '必填'
                                    // }
                                ],
                            })(
                                <Select 
                                    option={[{
                                        '1': '状态1',
                                        '2': '状态2'
                                    }]}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="盘点时间" hasFeedback>
                            {getFieldDecorator('time', {
                                rules: [
                                    // {
                                    //     required: true,
                                    //     message: '必填'
                                    // }
                                ],
                            })(
                                <DatePicker />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="盘点人" hasFeedback>
                            {getFieldDecorator('name', {
                                rules: [
                                    // {
                                    //     required: true,
                                    //     message: '必填'
                                    // }
                                ],
                            })(
                                <Input 
                                    placeholder='请输入'
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商家" hasFeedback>
                            {getFieldDecorator('productName', {
                                rules: [
                                    {
                                        // required: true,
                                        // message: '必填'
                                    }
                                ],
                            })(
                                <Select 
                                    option={toJS(inventoryInfoState.merchantsList)}
                                    valueCode='customerCode'
                                    valueName='customerName'
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        
                    </Col>
                    <Col span={8} className='query-btn'>
                        <Button
                            type="primary"
                            onClick={this.handleSubmit}
                        >查询</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default Index;


