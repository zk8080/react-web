import React, { Component } from 'react';
import { Modal, Select, Table } from '@pubComs';
import { Form, Row, Col, Input, Button } from 'antd';
import './index.less';
import {colums} from './index.data';

const FormItem = Form.Item;


@Form.create()
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
    }

    rowSelection = {
        // type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
                selectedRowKeys,
                selectedRows
            });
        },
        selectedRowKeys: []
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.getData(values);
            }
        });
    };

    onCancel = () => {
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
        this.props.cancelClick();
    }

    onOkClick = e => {
        const params = this.state.selectedRows;
        this.props.onOk(params);
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible,  productList } = this.props;
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        return (
            <div>
                <Modal
                    title='商品详情'
                    visible={visible}
                    className='detail-customer'
                    okText={'确认'}
                    cancelText='取消'
                    onCancel={this.onCancel}
                    width='1100px'
                    onOk={this.onOkClick}
                >
                    <Form className='query-component'>
                        <Row>
                            <Col span={8}>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('skuName')(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='商品条码'>
                                    {getFieldDecorator('barCode')(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8} className='query-btn'>
                                <Button
                                    type="primary"
                                    onClick={this.handleSubmit}
                                >查询</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table
                        dataSource={productList}
                        columns={colums}
                        rowSelection={this.rowSelection}
                        rowKey='id'
                    />
                </Modal>
            </div>
        );
    }
}

export default Index;