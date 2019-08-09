import React, { Component } from 'react';
import { Table } from '@pubComs';
import { Form, Row, Col, Input, } from 'antd';
import './index.less';
import { formUtils } from '@utils/index';
import moment from 'moment';
import {columns} from './index.data';
import State from './index.state';
const FormItem = Form.Item;

const onFieldsChange = (props, changedFields) => {
    props.setDetailData({...props.detailData, ...formUtils.formToObj(changedFields)});
};

const mapPropsToFields = (props) => {
    // const originData = props.detailData;
    const detailData = {
        ...props.detailData
    };
    // if(typeof originData.purchaseDate == 'string'){
    //     detailData = {
    //         ...props.detailData,
    //         purchaseDate: {value: moment(props.detailData.purchaseDate)}
    //     };
    // }
    return formUtils.objToForm(detailData);
};

@Form.create({
    // mapPropsToFields,
    // onFieldsChange
})
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
    }

    onOkClick = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const saveData = {
                    ...values,
                    purchaseDate: moment(values.purchaseDate).format('YYYY-MM-DD')
                };
                this.props.onOk({...this.props.detailData, ...saveData});
            }
        });
    }

    toggleDisabled = () => {
        this.props.toggleDisabled(false);
    }

    componentDidMount(){

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { disabled, dataSource } = this.props;
        return (
            <div className='order-detail'>
                <Form className='query-component'>
                    <div className='detail'>
                        <div className='title'>订单信息</div>
                        <Row>
                            <Col span={8}>
                                <FormItem label='订单号'>
                                    {getFieldDecorator('orderNo', {})(
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
                            <Col span={8}>
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
                            </Col>
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
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='市区县'>
                                    {getFieldDecorator('city', {
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
                    <div className='product-list'>
                        <div className='title'>商品列表</div>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={false}
                            rowSelection={this.rowSelection}
                            rowKey='key'
                            bordered
                        />
                    </div>
                    <div className='package-list'>
                        <div className='title'>包裹列表</div>   
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={false}
                            rowSelection={this.rowSelection}
                            rowKey='key'
                            bordered
                        />
                    </div>
                </Form>
            </div>
        );
    }
}

export default Index;