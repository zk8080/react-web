import React, { Component } from 'react';
import {Form, Row, Col, Input, Button, DatePicker} from 'antd';
import {Select} from '@pubComs';
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
                this.props.getData(values);
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
                        <FormItem label="商家" hasFeedback>
                            {getFieldDecorator('customerName', {
                                rules: [],
                            })(<Select 
                                option={customerList}
                                valueCode='customerName'
                                valueName='customerName'
                                showSearch
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商品" hasFeedback>
                            {getFieldDecorator('commodityName', {
                                rules: [],
                            })(<Select 
                                option={productList}
                                valueCode='skuName'
                                valueName='skuName'
                                showSearch
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="状态" hasFeedback>
                            {getFieldDecorator('billState', {
                                rules: [],
                            })(<Select 
                                option={[
                                    {
                                        code: 'save',
                                        name: '保存'
                                    },
                                    {
                                        code: 'recevieing',
                                        name: '待收货'
                                    },
                                    {
                                        code: 'recevied',
                                        name: '已收货'
                                    },
                                    {
                                        code: 'stored',
                                        name: '已入库'
                                    },
                                    {
                                        code: 'approved',
                                        name: '已审核'
                                    }
                                ]}
                                valueCode='code'
                                valueName='name'
                            />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="采购日期" hasFeedback>
                            {getFieldDecorator('purchaseDate', {
                                rules: [],
                            })(<DatePicker/>)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="收货日期" hasFeedback>
                            {getFieldDecorator('receivDate', {
                                rules: [],
                            })(<DatePicker/>)}
                        </FormItem>
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
