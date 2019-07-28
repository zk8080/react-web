import React, { Component } from 'react';
import { Modal, EditTable, Select } from '@pubComs';
import { Form, Row, Col, Input, Button, DatePicker } from 'antd';
import './index.less';
import { formUtils } from '@utils/index';
import moment from 'moment';
import {noFoodColumns, foodColumns} from './index.data';
const FormItem = Form.Item;

const onFieldsChange = (props, changedFields) => {
    props.setDetailData({...props.detailData, ...formUtils.formToObj(changedFields)});
};

const mapPropsToFields = (props) => {
    const originData = props.detailData;
    let detailData = {
        ...props.detailData
    };
    if(typeof originData.purchaseDate == 'string'){
        detailData = {
            ...props.detailData,
            purchaseDate: {value: moment(props.detailData.purchaseDate)}
        };
    }
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
            columns: noFoodColumns,
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

    changeFood = (value) => {
        if(value == '0'){
            this.setState({
                isFood: value,
                columns: noFoodColumns
            });
        }else{
            this.setState({
                isFood: value,
                columns: foodColumns
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.detailData){
            const value = nextProps.detailData.isFood;
            if(value != this.state.isFood){
                this.changeFood(value);
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible, cancelClick, disabled, dataSource, detailData } = this.props;
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        console.log(dataSource, '-----dataSource----', detailData,'detailData');
        const foot = this.props.isLook? 'hide' : '';
        return (
            <div>
                <Modal
                    title='采购通知单'
                    visible={visible}
                    className={`detail-product ${foot}`}
                    okText={disabled ? '修改': '确认'}
                    cancelText='取消'
                    onCancel={cancelClick}
                    onOk={disabled ? this.toggleDisabled: this.onOkClick}
                    foot
                >
                    <Form className='query-component'>
                        <h1>采购通知单</h1>
                        <Row>
                            <Col span={8}>
                                <FormItem label='采购订单号'>
                                    {getFieldDecorator('purchaseNo', {})(
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
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='采购日期'>
                                    {getFieldDecorator('purchaseDate', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <DatePicker 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='联系人'>
                                    {getFieldDecorator('contacts', {
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
                                <FormItem label='联系电话'>
                                    {getFieldDecorator('contactsTel', {
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
                                    {getFieldDecorator('address', {
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
                                <FormItem label='食品'>
                                    {getFieldDecorator('isFood', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ],
                                        initialValue: 0
                                    })(
                                        <Select 
                                            option={[{code: 0, name: '否'},
                                                {code: 1, name: '是'}]}
                                            disabled={disabled}
                                            valueCode='code'
                                            valueName='name'
                                            onChange={this.changeFood}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <div className='opreat-btn'>
                            <Button
                                type='primary'
                                onClick={this.props.handleAdd}
                                disabled={this.props.isLook}
                            >新增行</Button>
                            <Button
                                type='primary'
                                onClick={this.handleDelete}
                                disabled={this.props.isLook}
                            >删除行</Button>
                            <Button
                                type='primary'
                                onClick={this.handleClick}
                            >打印采购单</Button>
                            {/* <Button
                                type='primary'
                                onClick={this.props.handleReceipt}
                            >收货</Button> */}
                        </div>
                        <EditTable
                            columns={this.state.columns}
                            dataSource={dataSource}
                            handleSave={this.props.handleSave}
                            pagination={false}
                            rowSelection={this.rowSelection}
                            optionarr={this.props.productList}
                            rowKey='key'
                        />
                        <Row>
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
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Index;