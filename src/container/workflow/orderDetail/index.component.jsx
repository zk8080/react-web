import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import { Table, AuthButton } from '@pubComs';
import { Form, Row, Col, Input, Button } from 'antd';
import './index.less';
import moment from 'moment';
import {columns, packageColumn} from './index.data';
import State from './index.state';
import {session} from '@utils';

import FormComponent from './components/formComponent/index.component';
import DetailComponent from './components/detailComponent/index.component';
import PackageComponent from './components/packageModal/index.component';
import ProductModal from './components/productModal/index.component';
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: [],
            form: null
        };
    }

    componentWillMount(){
        document.title = '订单详情';
    }

    onOkClick = e => {
        e.preventDefault();
        this.state.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                State.updateOrder();
            }
        });
    }

    componentDidMount(){
        let queryData = this.props.location.state;
        if( queryData ){
            session.setItem('orderDetail', queryData);
        }else {
            queryData = session.getItem('orderDetail') || {};
        }
        State.setDetailData(queryData);
        State.getDetailData();
    }

    setForm = (obj) => {
        this.setState({
            form: obj
        });
    }

    componentWillUnmount(){
        // session.removeItem('orderDetail');
    }

    render() {
        return (
            <div className='order-detail'>
                <Form className='query-component'>
                    <div className='detail'>
                        <div className='title'>订单信息</div>
                        <FormComponent
                            {...toJS(State)}
                            detailData={toJS(State.detailData)}
                            setDetailData={State.setDetailData}
                            disabled={State.disabled}
                            onCityChange={State.onCityChange}
                            onProvChange={State.onProvChange}
                            setForm={this.setForm}
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
                                State.detailData.isLock != 1 ?
                                    State.disabled ?
                                        <AuthButton
                                            menuCode='ShipmentsOrderDetailUpdate'
                                        >
                                            <Button
                                                type='primary'
                                                onClick={State.editOrder}
                                            >
                                                修改
                                            </Button>
                                        </AuthButton>
                                        
                                        : <React.Fragment>
                                            <Button
                                                type='primary'
                                                onClick={State.cancelEdit}
                                            >
                                                取消
                                            </Button>
                                            <Button
                                                type='primary'
                                                onClick={this.onOkClick}
                                            >
                                                保存
                                            </Button>
                                    </React.Fragment>
                                : null
                            }
                            <AuthButton
                                menuCode='ShipmentsOrderDetailChaibao'
                            >
                                <Button
                                    type='primary'
                                    onClick={State.unPackageClick}
                                >
                                    拆包
                                </Button>
                            </AuthButton>
                        </div>
                    }
                    
                </Form>
                <DetailComponent
                    visible={State.visible}
                    data={toJS(State.packageDetail)}
                    cancelClick={State.closeModal}
                />
                <PackageComponent
                    visible={State.unPackageVisible}
                    data={toJS(State.unPackageList)}
                    cancelClick={State.closePackage}
                    openProductModal={State.openProductModal}
                    deletePackage={State.deletePackage}
                    unPackage={State.unPackage}
                />
                <ProductModal
                    visible={State.productVisible}
                    data={toJS(State.productList)}
                    cancelClick={State.closeProductModal}
                    addPackage={State.addPackage}
                />
            </div>
        );
    }
}

export default Index;