import React, { Component } from 'react';
import { Modal } from '@pubComs';
import './index.less';
import { Row, Col, Form, Input, Button } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

@Form.create()
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
    }
    
    onCancel = () => {
        this.props.cancelClick();
    }

    confirmAudit = (flag, e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onOk({ ...{result: flag}, ...values});
            }
        });
    }

    render() {
        const { visible } = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Modal
                    title='审核'
                    visible={visible}
                    className='detail-audit'
                    onCancel={this.onCancel}
                    width='550px'
                    footer={null}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label='审核意见'>
                                {getFieldDecorator('approveDesc')(
                                    <TextArea />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <div className='btn-box'>
                        <Button
                            type='primary'
                            onClick={this.confirmAudit.bind(this, '0')}
                        >审核不通过</Button>
                        <Button
                            type='primary'
                            onClick={this.confirmAudit.bind(this, '1')}
                        >审核通过</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default Index;