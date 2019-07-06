import React, { Component } from 'react';
import { Modal } from '@pubComs';
import { Form, Row, Col, Input, Button } from 'antd';
// import './index.less';
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
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onOkClick = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onOk({...this.props.detailData, ...values});
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible, cancelClick,  } = this.props;
        return (
            <div>
                <Modal
                    title='确认收货'
                    visible={visible}
                    className='receipt-component'
                    okText={'确认'}
                    cancelText='取消'
                    onCancel={cancelClick}
                    onOk={this.onOkClick}
                >
                    <Form className='query-component'>
                        <Row>
                            <Col span={24}>
                                <FormItem label='商品数量'>
                                    {getFieldDecorator('customerName', {
                                        rules: [{
                                            required: true,
                                            message: '必填'
                                        }]
                                    })(
                                        <Input 
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='备注'>
                                    {getFieldDecorator('skuName')(
                                        <TextArea 
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