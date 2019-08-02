import React, { Component } from 'react';
import { Modal } from '@pubComs';
import { Form, Row, Col, Input } from 'antd';
import './index.less';
import { formUtils } from '@utils/index';

const FormItem = Form.Item;
const { TextArea } = Input;

const onFieldsChange = (props, changedFields) => {
    props.setDetailData({...props.detailData, ...formUtils.formToObj(changedFields)});
};

const mapPropsToFields = (props) => {
    return formUtils.objToForm(props.detailData);
};

@Form.create({
    mapPropsToFields,
    onFieldsChange
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
        const { visible, cancelClick, disabled } = this.props;
        return (
            <div>
                <Modal
                    title='新增'
                    visible={visible}
                    className='detail-customer'
                    okText={disabled ? '修改': '确认'}
                    cancelText='取消'
                    onCancel={cancelClick}
                    width='550px'
                    onOk={disabled ? this.toggleDisabled: this.onOkClick}
                >
                    <Form className='query-component'>
                        <Row>
                            <Col span={24}>
                                <FormItem label='商家编码'>
                                    {getFieldDecorator('customerCode', {
                                        rules: [{
                                            required: true,
                                            message: '必填'
                                        }]
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='商家名称'>
                                    {getFieldDecorator('customerName', {
                                        rules: [{
                                            required: true,
                                            message: '必填'
                                        }]
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='联系人'>
                                    {getFieldDecorator('contactPerson', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='联系电话'>
                                    {getFieldDecorator('phone', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='公司地址'>
                                    {getFieldDecorator('address', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            {/* <Col span={24}>
                                <FormItem label='库位单价'>
                                    {getFieldDecorator('unitPrice',{
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='库位面积'>
                                    {getFieldDecorator('storeArea',{
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col> */}
                            <Col span={24}>
                                <FormItem label='备注'>
                                    {getFieldDecorator('remark')(
                                        <TextArea 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Index;