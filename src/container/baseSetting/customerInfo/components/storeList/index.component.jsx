import React, { Component } from 'react';
import { Modal, Select, Table } from '@pubComs';
import { Form, Row, Col, Input, Button } from 'antd';
import './index.less';
import {colums} from './index.data';
import {pubFunction} from '@utils';

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
                this.props.getData({
                    search: values
                });
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
        const selectedRows = this.state.selectedRows;
        const storehouseIds = selectedRows.map(item => item.id);
        const params = {
            storehouseIds
        };
        this.props.onOk(params);
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible,  storeList, storeListPage } = this.props;
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
                                <FormItem label="仓库区位" hasFeedback>
                                    {getFieldDecorator('houseCode', {
                                        rules: [],
                                    })(<Select 
                                        option={pubFunction.getDictSelect('CK-GN')}
                                        valueCode='code'
                                        valueName='name'
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="区域编号" hasFeedback>
                                    {getFieldDecorator('areaCode', {
                                        rules: [],
                                    })(<Input />)}
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
                        dataSource={storeList}
                        columns={colums}
                        getQueryData={this.props.getData}
                        pagination={storeListPage}
                        rowSelection={this.rowSelection}
                        rowKey='id'
                    />
                </Modal>
            </div>
        );
    }
}

export default Index;