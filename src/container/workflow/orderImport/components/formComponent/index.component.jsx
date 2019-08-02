import React, { Component } from 'react';
import {Form, Row, Col, Input, Button, DatePicker} from 'antd';
import {Select} from '@pubComs';
const FormItem = Form.Item;


@Form.create({
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
                    <Col span={8}>
                        <FormItem label="姓名" hasFeedback>
                            {getFieldDecorator('reciptName', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="电话" hasFeedback>
                            {getFieldDecorator('commodityName', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="地址" hasFeedback>
                            {getFieldDecorator('billState', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="订单状态" hasFeedback>
                            {getFieldDecorator('purchaseDate', {
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


