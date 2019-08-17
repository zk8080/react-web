import React, { Component } from 'react';
import { Modal, Table } from '@pubComs';
import './index.less';
import moment from 'moment';
import {column} from './index.data';
import {Button} from 'antd';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
    }

    handleDelete = () => {
        const record = this.state.selectedRows[0];
        this.props.deletePackage(record);
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
        const { visible, cancelClick, data, openProductModal, unPackage} = this.props;
        return (
            <div>
                <Modal
                    title='拆包'
                    visible={visible}
                    className={'detail-package'}
                    onCancel={cancelClick}
                    onOk={unPackage}
                    // footer={null}
                >
                    <div>
                        <div className='package-header'>
                            <Button
                                type='primary'
                                onClick={openProductModal}
                            >新增包裹</Button>
                            <Button
                                type='primary'
                                onClick={this.handleDelete}
                            >删除包裹</Button>
                        </div>
                        <Table
                            columns={column}
                            dataSource={data}
                            pagination={false}
                            rowSelection={this.rowSelection}
                            rowKey='id'
                            bordered
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Index;