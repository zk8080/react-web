import React, { Component } from 'react';
import { Modal, Table } from '@pubComs';
// import './index.less';
import moment from 'moment';
import {columns} from './index.data';
import { message } from 'antd';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
    }

    onOkClick = () => {
        const {selectedRows} = this.state;
        if(selectedRows.length < 1){
            message.warning('请选择商品！');
            return;
        }
        this.props.addPackage(selectedRows);
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
    }   

    rowSelection = {
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
                selectedRowKeys,
                selectedRows
            });
        },
        selectedRowKeys: []
    }

    onCancel = () => {
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
        this.props.cancelClick();
    }

    render() {
        const { visible, data} = this.props;
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        return (
            <div>
                <Modal
                    title='拆包'
                    visible={visible}
                    className={'detail-package'}
                    onCancel={this.onCancel}
                    onOk={this.onOkClick}
                    // footer={null}
                >
                    <div>
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                            rowKey='mailNo'
                            bordered
                            rowSelection={this.rowSelection}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Index;