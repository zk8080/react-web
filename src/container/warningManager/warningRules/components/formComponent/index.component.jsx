import React, { Component } from 'react';
import {Form, Row, Col, Input, Button, DatePicker} from 'antd';
import {formUtils} from '@utils';
import {Select} from '@pubComs'; 

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
        return (
            <div className='query-component'>
                <Row>
                    <Col span={6}>
                        <FormItem label="规则类型" hasFeedback>
                            {getFieldDecorator('ruleType', {
                                rules: [],
                            })(<Select 
                                option={[
                                    {
                                        code: 'food',
                                        name: '食品类'
                                    },
                                    {
                                        code: 'unsalableGoods',
                                        name: '滞销品'
                                    },
                                    {
                                        code: 'logistics',
                                        name: '物流信息预警'
                                    },
                                    {
                                        code: 'replenishment',
                                        name: '补货预警'
                                    },
                                    {
                                        code: 'inventory',
                                        name: '库存预警'
                                    },
                                    {
                                        code: 'split',
                                        name: '商品拆分'
                                    },
                                ]}
                                valueCode='code'
                                valueName='name'
                            />)}
                        </FormItem>
                    </Col>
                    {/* <Col span={6}>
                        <FormItem label="状态" hasFeedback>
                            {getFieldDecorator('state', {
                                rules: [],
                            })(<Select 
                                option={[
                                    {
                                        code: '1',
                                        name: '已处理'
                                    },
                                    {
                                        code: '0',
                                        name: '未处理'
                                    }
                                ]}
                                valueCode='code'
                                valueName='name'
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="创建时间" hasFeedback>
                            {getFieldDecorator('createTime', {
                                rules: [],
                            })(<DatePicker/>)}
                        </FormItem>
                    </Col> */}
                    <Col span={18} className='query-btn'>
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


