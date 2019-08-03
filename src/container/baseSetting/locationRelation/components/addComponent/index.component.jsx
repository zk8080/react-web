import React, { Component } from 'react';
import { Modal, Select, ProductSelect } from '@pubComs';
import { Form, Row, Col, Input } from 'antd';
import './index.less';
// import { formUtils } from '@utils';

const FormItem = Form.Item;
const { TextArea } = Input;

// const onFieldsChange = (props, changedFields) => {
//     props.setDetailData({...props.detailData, ...formUtils.formToObj(changedFields)});
// };

// const mapPropsToFields = (props) => {
//     return formUtils.objToForm(props.detailData);
// };

@Form.create({
    // mapPropsToFields,
    // onFieldsChange
})
class Index extends Component {

    onOkClick = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onOk({...this.props.detailData, ...values});
            }
        });
    }

    toggleDisabled = () => {
        this.props.toggleDisabled(false);
    }
    
    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible, cancelClick, customerList, productList, storeList } = this.props;
        return (
            <div>
                <Modal
                    title='库位关系配置'
                    visible={visible}
                    className='detail-product'
                    okText={'确认'}
                    cancelText='取消'
                    onCancel={cancelClick}
                    width='550px'
                    onOk={this.onOkClick}
                >
                    <Form className='query-component'>
                        <Row>
                            <Col span={24}>
                                <FormItem label='商家名称'>
                                    {getFieldDecorator('customerId', {
                                        rules: [{
                                            required: true,
                                            message: '必填'
                                        }]
                                    })(
                                        <Select 
                                            option={customerList}
                                            valueCode='id'
                                            valueName='customerName'
                                            onChange={this.props.getProductList}
                                            showSearch
                                            filterOption={(input, option) => {
                                                return  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                            }}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('commodityId', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <ProductSelect 
                                            option={productList}
                                            valueCode='id'
                                            valueName='skuName'
                                            showSearch
                                            filterOption={(input, option) => {
                                                return  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                            }}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='库位'>
                                    {getFieldDecorator('storehouseIds', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Select 
                                            mode="multiple"
                                            option={storeList}
                                            valueCode='id'
                                            valueName='storeCode'
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='库容'>
                                    {getFieldDecorator('storeNums', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Input 
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            {/* <Col span={24}>
                                <FormItem label='库位可用量'>
                                    {getFieldDecorator('availableNums', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Input 
                                        />
                                    )}
                                </FormItem>
                            </Col> */}
                            
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Index;