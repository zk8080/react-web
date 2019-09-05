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
        const {customerList, productList} = this.props;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={8}>
                        <FormItem label="查询类型" hasFeedback>
                            {getFieldDecorator('type', {
                                rules: [],
                            })(<Select 
                                placeholder='请选择'
                                option={[
                                    {
                                        code: '1',
                                        name: '包裹信息'
                                    },
                                    {
                                        code: '2',
                                        name: '当天无物流信息'
                                    },
                                    {
                                        code: '3',
                                        name: '历史无物流信息'
                                    }
                                ]}
                                valueCode='code'
                                valueName='name'
                                showSearch
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="订单号" hasFeedback>
                            {getFieldDecorator('orderNo', {
                                rules: [],
                            })(<Input
                                placeholder='请输入' 
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="快递单号" hasFeedback>
                            {getFieldDecorator('mailNo', {
                                rules: [],
                            })(<Input
                                placeholder='请输入' 
                            />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
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
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
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
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="订单日期" hasFeedback>
                            {getFieldDecorator('orderDate', {
                                rules: [],
                            })(<DatePicker/>)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className='query-btn'>
                        <AuthButton
                            menuCode='ScanReviewQuery'
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
