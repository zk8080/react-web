import React, { Component } from 'react';
import { Modal, Select } from '@pubComs';
import { Form, Row, Col, Input } from 'antd';
import './index.less';
import { formUtils } from '@utils/index';

const FormItem = Form.Item;
const { TextArea } = Input;

const ruleTypeList = [
    {
        code: 'food',
        name: '食品类'
    },
    {
        code: 'unsalableGoods',
        name: '滞销品'
    },
    {
        code: 'logistics',
        name: '物流信息预警'
    },
    {
        code: 'replenishment',
        name: '补货预警'
    },
    {
        code: 'inventory',
        name: '库存预警'
    },
    {
        code: 'split',
        name: '商品拆分'
    },
];

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
                const ruleTypeNameArr = ruleTypeList.filter(item => item.code == values.ruleType);
                const ruleTypeName = ruleTypeNameArr[0].name;
                this.props.onOk({...this.props.detailData, ...values, ruleTypeName});
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
                    title='规则详情'
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
                                <FormItem label='规则名称'>
                                    {getFieldDecorator('ruleName', {
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
                                <FormItem label='规则类型'>
                                    {getFieldDecorator('ruleType', {
                                        rules: [{
                                            required: true,
                                            message: '必填'
                                        }]
                                    })(
                                        <Select 
                                            disabled={disabled}
                                            option={ruleTypeList}
                                            valueCode='code'
                                            valueName='name'
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='左侧规则值'>
                                    {getFieldDecorator('leftValue', {
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
                                <FormItem label='右侧规则值'>
                                    {getFieldDecorator('rightValue', {
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