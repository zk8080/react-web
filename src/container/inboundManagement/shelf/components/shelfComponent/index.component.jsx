import React, { Component } from 'react';
import { Modal, EditTable } from '@pubComs';
import './index.less';
import {Button} from 'antd';
import {colums} from './index.data';

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

    handleDelete = () => {
        const record = this.state.selectedRows[0];
        this.props.handleDelete(record);
        this.setState({
            selectedRowKeys: []
        });
    }

    render() {
        const { visible,  dataSource } = this.props;
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        return (
            <div>
                <Modal
                    title='上架'
                    visible={visible}
                    className='detail-shelf'
                    okText={'确认'}
                    cancelText='取消'
                    onCancel={this.onCancel}
                    width='1100px'
                    onOk={this.onOkClick}
                >
                    <div className='opreat-btn'>
                        <Button
                            type='primary'
                            onClick={this.props.handleAdd}
                        >新增行</Button>
                        <Button
                            type='primary'
                            onClick={this.handleDelete}
                        >删除行</Button>
                    </div>
                    <EditTable
                        columns={colums}
                        dataSource={dataSource}
                        handleSave={this.props.handleSave}
                        pagination={false}
                        rowSelection={this.rowSelection}
                        optionarr={this.props.storeList}
                        rowKey='key'
                    />
                </Modal>
            </div>
        );
    }
}
export default Index;