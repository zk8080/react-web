import React, { Component } from 'react';
import {Form, Row, Col, Input, Button} from 'antd';
import {formUtils} from '@utils';
import { Select, AuthButton } from '@pubComs';
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
                this.props.getData();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {customerList} = this.props;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={8}>
                        <FormItem label="商家" hasFeedback>
                            {getFieldDecorator('customerCode', {
                                rules: [],
                            })(<Select 
                                option={customerList}
                                valueCode='customerCode'
                                valueName='customerName'
                                showSearch
                                filterOption={(input, option) => {
                                    
                                   return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                }}
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商品名称" hasFeedback>
                            {getFieldDecorator('skuName', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8} className='query-btn'>
                        <AuthButton
                            menuCode='storehouseRelationConfigQeruy'
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


