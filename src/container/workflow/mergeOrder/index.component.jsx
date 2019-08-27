import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import {Table} from '@pubComs';
import {colums} from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Button, message} from 'antd';

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        State.getTableData();
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


    mergeOrder = () => {
        const {selectedRows} = this.state;
        if(selectedRows.length < 1){
            message.warning('请选择要合单的数据！');
            return;
        }
        for (let i = 0; i < selectedRows.length; i++) {
            for (let j = i; j < selectedRows.length; j++) {
                if( selectedRows[i].customerName != selectedRows[j].customerName ){
                    message.warning('选择的订单中商家不同！');
                    return;
                }
                if( selectedRows[i].reciptName != selectedRows[j].reciptName ){
                    message.warning('选择的订单中收件人不同！');
                    return;
                }
                if( selectedRows[i].reciptPhone != selectedRows[j].reciptPhone ){
                    message.warning('选择的订单中手机号不同！');
                    return;
                }
                if( selectedRows[i].reciptAddr != selectedRows[j].reciptAddr ){
                    message.warning('选择的订单中地址不同！');
                    return;
                }
            }
            
        }
        const orderNoList = selectedRows.map(item => item.systemOrderNo);
        State.mergeOrder( {systemOrderNos:orderNoList});
    }

    render() {
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        return (
            <div className='merge_order'> 
                <div className='head_btn'>
                    <Button
                        type='primary'
                        onClick={this.mergeOrder}
                    >
                        合包
                    </Button>
                </div>
                <Table
                    dataSource={toJS(State.tableList)}
                    // getQueryData={State.getProductList}/
                    pagination={false}
                    columns={colums}
                    rowKey='id'
                    rowSelection={this.rowSelection}
                />
            </div>
        );
    }
}


export default Index;