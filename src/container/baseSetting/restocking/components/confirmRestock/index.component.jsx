import React, { Component } from 'react';
import {observer} from 'mobx-react';
import { Modal, Select,  EditTable } from '@pubComs';
import { Form, Row, Col, Input, Table,Button } from 'antd';
import './index.less';
import {colums} from './index.data';
import { toJS } from 'mobx';

const FormItem = Form.Item;


@Form.create()
@observer
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
    }

    rowSelection = {
        type:'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
                selectedRowKeys,
                selectedRows
            });
        }
    }

    onCancel = () => {
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
        this.props.onCancel();
    }

    onOkClick = () => {
        this.props.onOk();
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
    }


    addRow = () => {
        if(this.props.addRow){
            this.props.addRow();
        }
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        })
    }

    delRow = () => {
        if(this.state.selectedRowKeys.length == 0){
            return;
        }
        if(this.props.delRow){
            this.props.delRow(this.state.selectedRowKeys[0], ()=>{
                this.setState({
                    selectedRowKeys: [],
                    selectedRows: []
                })
            });
        }
        
    }

    render() {
        const { visible=false,  dataSource=[], restockObj={} } = this.props;
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        return (
            <div>
                <Modal
                    title='确认补货'
                    visible={visible}
                    className='confirmRestock'
                    okText={'确认'}
                    cancelText='取消'
                    onCancel={this.onCancel}
                    width='1100px'
                    onOk={this.onOkClick}
                >
                    <p>补货单号：{restockObj.replenishmentNo || ''}</p>
                    <div className='head'>
                        <Button onClick={this.addRow}>新增行</Button>
                        <Button onClick={this.delRow}>删除行</Button>
                    </div>
                    <Table
                        dataSource={dataSource}
                        columns={colums}
                        pagination={false}
                        rowSelection={this.rowSelection}
                        rowKey={(v, i) => i}
                        bordered
                        scroll={{x: 1850}}
                    />
                </Modal>
            </div>
        );
    }
}

export default Index;