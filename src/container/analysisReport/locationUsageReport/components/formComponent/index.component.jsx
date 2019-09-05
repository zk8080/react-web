import React, { Component } from 'react';
import {Form, Row, Col, Input, Button, DatePicker} from 'antd';
import {Select, AuthButton} from '@pubComs';
import {formUtils} from '@utils';
const FormItem = Form.Item;


const onFieldsChange = (props, changedFields) => {
    props.setQueryData({...props.queryData, ...formUtils.formToObj(changedFields)});
};

const mapPropsToFields = (props) => {
    return formUtils.objToForm(props.queryData);
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
                if(this.props.setCurrent){
                    this.props.setCurrent();
                }
                this.props.getData();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {merchantsList} = this.props;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={8}>
                        <FormItem label="商家" hasFeedback>
                            {getFieldDecorator('customerCode', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ],
                            })(<Select 
                                placeholder='请选择'
                                option={merchantsList}
                                valueCode='customerCode'
                                valueName='customerName'
                                showSearch
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            />)}
                        </FormItem>
                    </Col>
                    <Col span='8'></Col>
                    <Col span={8} className='query-btn'>
                        <AuthButton
                            menuCode='StorehouseUseringReposrtQuery'
                        >
                            <Button
                                type="primary"
                                onClick={this.handleSubmit}
                            >查询</Button>
                        </AuthButton>
                    </Col>
                    {/* <Col span={8}>
                        <FormItem label="起始时间" hasFeedback>
                            {getFieldDecorator('startDate', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ],
                            })(<DatePicker/>)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="结束时间" hasFeedback>
                            {getFieldDecorator('endDate', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ],
                            })(<DatePicker/>)}
                        </FormItem>
                    </Col> */}
                </Row>
                {/* <Row>
                    <Col span={24} className='query-btn'>
                        <Button
                            type="primary"
                            onClick={this.handleSubmit}
                        >查询</Button>
                    </Col>
                </Row> */}
            </div>
        );
    }
}


export default Index;
