import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import { Table } from '@pubComs';
import { Form, Row, Col, Input, Button } from 'antd';
import './index.less';
import moment from 'moment';
import {columns, packageColumn} from './index.data';
import State from './index.state';

import FormComponent from './components/formComponent/index.component';
import DetailComponent from './components/detailComponent/index.component';
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
    }

    componentWillMount(){
        document.title = '订单详情';
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

    componentDidMount(){
        const queryData = this.props.location.state || {};
        State.setDetailData(queryData);
        const { orderNo, customerCode, systemOrderNo } = queryData;
        State.getDetailData({
            orderNo,
            customerCode,
            systemOrderNo
        });
    }

    render() {
        return (
            <div className='order-detail'>
                <Form className='query-component'>
                    <div className='detail'>
                        <div className='title'>订单信息</div>
                        <FormComponent
                            detailData={toJS(State.detailData)}
                            setDetailData={State.setDetailData}
                            disabled={State.disabled}
                        />
                    </div>
                    <div className='product-list'>
                        <div className='title'>商品列表</div>
                        <Table
                            columns={columns}
                            dataSource={toJS(State.productList)}
                            pagination={false}
                            rowSelection={this.rowSelection}
                            rowKey='key'
                            bordered
                        />
                    </div>
                    <div className='package-list'>
                        <div className='title'>包裹列表</div>   
                        <Table
                            columns={packageColumn}
                            dataSource={toJS(State.packageList)}
                            pagination={false}
                            rowSelection={this.rowSelection}
                            rowKey='key'
                            bordered
                        />
                    </div>
                    {
                        State.detailData.isMatched == 0 && <div className='btn-box'>
                            {
                                State.detailData.isLock == 0 ?
                                    State.disabled ?
                                        <Button
                                            type='primary'
                                            onClick={State.editOrder}
                                        >
                                            修改
                                        </Button>
                                        : <React.Fragment>
                                            <Button
                                                type='primary'
                                                onClick={State.cancelEdit}
                                            >
                                                取消
                                            </Button>
                                            <Button
                                                type='primary'
                                                onClick={State.updateOrder}
                                            >
                                                保存
                                            </Button>
                                    </React.Fragment>
                                : null
                            }
                            <Button
                                type='primary'
                            >
                                拆包
                            </Button>
                        </div>
                    }
                    
                </Form>
                <DetailComponent
                    visible={State.visible}
                    data={toJS(State.packageDetail)}
                    cancelClick={State.closeModal}
                />
            </div>
        );
    }
}

export default Index;