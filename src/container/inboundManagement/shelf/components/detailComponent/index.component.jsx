import React, { Component } from 'react';
import { Modal, EditTable, Select } from '@pubComs';
import { Form, Row, Col, Input, Button, DatePicker, message } from 'antd';
import './index.less';
import { formUtils } from '@utils/index';
import moment from 'moment';
import {noFoodColumns, foodColumns} from './index.data';
const FormItem = Form.Item;

const onFieldsChange = (props, changedFields) => {
    props.setDetailData({...props.detailData, ...formUtils.formToObj(changedFields)});
};

const mapPropsToFields = (props) => {
    let detailData = { ...props.detailData };
    if(typeof props.detailData.purchaseDate === 'string'){
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
            columns: noFoodColumns
        };
    }

    onOkClick = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onOk({...this.props.detailData, ...values});
                this.setState({
                    selectedRowKeys: [],
                    selectedRows: []
                });
            }
        });
    }

    auditClick = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.auditClick();
                this.setState({
                    selectedRowKeys: [],
                    selectedRows: []
                });
            }
        });
    }

    cancelClick = () => {
        this.props.cancelClick();
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
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

    shelf = () => {
        const {selectedRows} = this.state;
        if( selectedRows.length < 1 ){
            message.warning('请选择商品！');
            return;
        }
        const record = selectedRows[0];
        this.props.shelf(record);
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible, dataSource, isDetail} = this.props;
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        return (
            <div>
                <Modal
                    title='入库单'
                    visible={visible}
                    className={isDetail? 'detail-product': 'detail-product hidden-footer'}
                    okText={'提交'}
                    cancelText='取消'
                    onCancel={this.cancelClick}
                    onOk={this.onOkClick}
                >
                    <Form className='query-component'>
                        <h1>入库单</h1>
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
                                            disabled
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
                                            disabled
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
                                            disabled
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
                                            disabled
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
                                            disabled
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
                                        initialValue: '0'
                                    })(
                                        <Select 
                                            option={[{code: '0', name: '否'},
                                                {code: '1', name: '是'}]}
                                            disabled
                                            valueCode='code'
                                            valueName='name'
                                            onChange={this.changeFood}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <div className='opreat-btn'>
                            {
                                isDetail == '1' ? <Button
                                    type='primary'
                                    onClick={this.shelf}
                                >上架</Button>
                                : null
                            }
                            {
                                isDetail == '2'? <Button
                                    type='primary'
                                    onClick={this.auditClick}
                                >审核</Button>
                                : null
                            }
                        </div>
                        <EditTable
                            columns={this.state.columns}
                            dataSource={dataSource}
                            handleSave={this.props.handleSave}
                            pagination={false}
                            rowSelection={this.rowSelection}
                            rowKey='barCode'
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