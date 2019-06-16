import React, { Component } from 'react';
import { Modal } from '@pubComs';
import { Form, Row, Col, Input } from 'antd';
import './index.less';

const FormItem = Form.Item;

const objToForm = (obj = {}) => {
    const target = {};
    for(const [key,value] of Object.entries(obj)){
	    target[key] = Form.createFormField({value});
    }
    return target;
};

const formToObj = (obj = {}) => {
    const target = {};
    for(const [key,value] of Object.entries(obj)){
	    target[key] = value.value;
    }
    return target;
};

const onFieldsChange = (props, changedFields) => {
    props.setDetailData({...props.detailData, ...formToObj(changedFields)});
};

const mapPropsToFields = (props) => {
    return objToForm(props.detailData);
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
                this.props.onOk(values);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible, cancelClick, disabled } = this.props;
        return (
            <div>
                <Modal
                    title='新增'
                    visible={visible}
                    className='detail-component'
                    okText='确认'
                    cancelText='取消'
                    onCancel={cancelClick}
                    onOk={this.onOkClick}
                >
                    <Form className='query-component'>
                        <Row>
                            <Col span={24}>
                                <FormItem label='商家名称'>
                                    {getFieldDecorator('merchant', {
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
                                <FormItem label='品牌'>
                                    {getFieldDecorator('brand', {
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
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('productName', {
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
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Index;