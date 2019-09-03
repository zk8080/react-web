import React, { Component } from 'react';
import {Form, Row, Col, Input, Button} from 'antd';
import {formUtils} from '@utils';
import { Select, AuthButton } from '@pubComs';

const FormItem = Form.Item;


const onFieldsChange = (props, changedFields) => {
    if(props.setQueryData){
        props.setQueryData({...props.queryData, ...formUtils.formToObj(changedFields)});
    }
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
            if(this.props.setCurrent){
                this.props.setCurrent();
            }
            if(this.props.getData){
                this.props.getData();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {merchantsList=[]} = this.props;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={8}>
                        <FormItem label="补货单号" hasFeedback>
                            {getFieldDecorator('replenishmentNo', {
                                rules: [
                                    {
                                        required: false,
                                        message: '必填'
                                    }
                                ],
                            })(
                                <Input  placeholder='请输入'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商品名称" hasFeedback>
                            {getFieldDecorator('skuName', {
                                rules: [
                                    {
                                        required: false,
                                        message: '必填'
                                    }
                                ],
                            })(
                                <Input  placeholder='请输入'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商品条码" hasFeedback>
                            {getFieldDecorator('commodityCode', {
                                rules: [
                                    {
                                        required: false,
                                        message: '必填'
                                    }
                                ],
                            })(
                                <Input  placeholder='请输入'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24} className='query-btn'>
                        <AuthButton
                            menuCode='ReplenishProdcutQuery'
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


