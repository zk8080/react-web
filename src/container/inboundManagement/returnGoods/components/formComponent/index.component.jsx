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
                        <FormItem label="订单号" hasFeedback>
                            {getFieldDecorator('orderNo', {
                                rules: [],
                            })(<Input 
                                placeholder='请输入'
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商品名称" hasFeedback>
                            {getFieldDecorator('commodityName', {
                                rules: [],
                            })(<Input 
                                placeholder='请输入'
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="收件人姓名" hasFeedback>
                            {getFieldDecorator('reciptName', {
                                rules: [],
                            })(<Input 
                                placeholder='请输入'
                            />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="收件人电话" hasFeedback>
                            {getFieldDecorator('reciptPhone', {
                                rules: [],
                            })(<Input 
                                placeholder='请输入'
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="退货时间" hasFeedback>
                            {getFieldDecorator('createTime', {
                                rules: [],
                            })(<DatePicker format='YYYY-MM-DD'/>)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商品状态" hasFeedback>
                            {getFieldDecorator('commodityState', {
                                rules: [],
                            })(<Select 
                                placeholder='请选择'
                                option={[
                                    {
                                        code: 'normal',
                                        name: '正常'
                                    },
                                    {
                                        code: 'residual',
                                        name: '残次'
                                    }
                                ]}
                                valueCode='code'
                                valueName='name'
                            />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className='query-btn'>
                        <AuthButton
                            menuCode='PurchaseInformQuery'
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
