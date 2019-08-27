import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import {Table} from '@pubComs';
import {colums} from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Button} from 'antd';

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
        const orderNoList = selectedRows.map(item => item.systemOrderNo);
        State.mergeOrder( {systemOrderNos:orderNoList});
    }

    render() {
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        return (
            <div>
                <div>
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