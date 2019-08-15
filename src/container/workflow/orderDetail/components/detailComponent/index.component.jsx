import React, { Component } from 'react';
import { Modal, Table } from '@pubComs';
import './index.less';
import moment from 'moment';
import {column} from './index.data';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
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


    render() {
        const { visible, cancelClick, data = {} } = this.props;
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        return (
            <div>
                <Modal
                    title='包裹详情'
                    visible={visible}
                    className={'detail-product'}
                    onCancel={cancelClick}
                    footer={null}
                >
                    <div>
                        <div className='title'>
                            物流信息：
                        </div>
                        <div className='logistics'>
                            {data.logistics || '无'}
                        </div>
                    </div>
                    <div>
                        <div className='title'>
                            商品列表：
                        </div>
                        <Table
                            columns={column}
                            dataSource={data.mailCommodities}
                            pagination={false}
                            rowKey='mailNo'
                            bordered
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Index;