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

    render() {
        const { visible, cancelClick, data = {} } = this.props;
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