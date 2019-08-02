import React, { Component } from 'react';
import { Modal, EditTable, Select, Table } from '@pubComs';
import { Form, Row, Col, Input, Button, DatePicker,  } from 'antd';
import './index.less';
import { formUtils } from '@utils/index';
import moment from 'moment';
import {data} from './index.data';
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
    mapPropsToFields,
    onFieldsChange
})
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: [],
            columns: data,
            isFood: ''
        };
    }

    handleDelete = () => {
        const record = this.state.selectedRows[0];
        this.props.handleDelete(record);
        this.setState({
            selectedRowKeys: []
        });
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

    handleClick = () => {
        window.print();
    }

    rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
                selectedRowKeys,
                selectedRows
            });
        },
        selectedRowKeys: []
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible, cancelClick, disabled, dataSource, customerList } = this.props;
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        const foot = this.props.isLook? 'hide' : '';
        return (
            <div>
                <Modal
                    title='订单'
                    visible={visible}
                    className={`detail-product ${foot}`}
                    okText={disabled ? '修改': '确认'}
                    cancelText='取消'
                    onCancel={cancelClick}
                    onOk={disabled ? this.toggleDisabled: this.onOkClick}
                    footer={null}
                >
                    <Form className='query-component'>
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
                                    {getFieldDecorator('customerName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Select 
                                            option={customerList}
                                            disabled={disabled}
                                            valueCode='customerName'
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
                        <div className='opreat-btn'>
                            {/* <Button
                                type='primary'
                                onClick={this.props.handleAdd}
                                disabled={this.props.isLook}
                            >新增行</Button>
                            <Button
                                type='primary'
                                onClick={this.handleDelete}
                                disabled={this.props.isLook}
                            >删除行</Button> */}
                        </div>
                        {
                            disabled ? <Table
                                columns={this.state.columns}
                                dataSource={dataSource}
                                pagination={false}
                                rowSelection={this.rowSelection}
                                rowKey='key'
                                bordered
                            />: <EditTable
                                    columns={this.state.columns}
                                    dataSource={dataSource}
                                    handleSave={this.props.handleSave}
                                    pagination={false}
                                    rowSelection={this.rowSelection}
                                    optionarr={this.props.productList}
                                    rowKey='key'
                                />
                        }
                        {/* <Row>
                            <Col span={8}>
                                <FormItem label='制单人'>
                                    <span>管理员</span>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='制单时间'>
                                    <span>{moment().format('YYYY-MM-DD')}</span>
                                </FormItem>
                            </Col>
                        </Row> */}
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Index;