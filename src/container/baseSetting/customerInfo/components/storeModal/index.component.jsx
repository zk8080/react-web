import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {Table, Modal} from '@pubComs';
import {colums} from './index.data';
import './index.less';
import {Button, Row, Col} from 'antd';

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    

    render() {
        const {tableList, customerInfo, visible, cancelClick, onOk, bindStorePage} = this.props;
        return (
            <Modal
                title='商品列表'
                visible={visible}
                className='product-list'
                okText='确认'
                cancelText='取消'
                onCancel={cancelClick}
                width='1100px'
                onOk={onOk}
                footer={null}
            >
                    <div className='customer-info'>
                        <Row>
                            <Col span={12}>
                                <span>商家名称：</span>
                                <span>{customerInfo.customerName}</span>
                            </Col>
                            <Col span={12}>
                                <span>联系人：</span>
                                <span>{customerInfo.contactPerson}</span>
                            </Col>
                        </Row>
                    </div>
                    <div className='handle-btn'>
                        <Button
                            type='primary'
                            onClick={this.props.addClick}
                        >
                            新增
                        </Button>
                    </div>
                    <Table
                        dataSource={tableList}
                        columns={colums}
                        getQueryData={this.props.getStoreList}
                        pagination={bindStorePage}
                        rowKey='id'
                    />
            </Modal>
        );
    }
}


export default Index;