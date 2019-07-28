import React, { Component } from 'react';
import { Modal, Select } from '@pubComs';
import { Form, Row, Col, Input } from 'antd';
import './index.less';
import { formUtils, pubFunction } from '@utils/index';

const FormItem = Form.Item;

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
                console.log( {...this.props.detailData, ...values}, '{...this.props.detailData, ...values}' );
                const dataArr = [];
                for (let i = values.storeMinCode; i <= values.storeMaxCode; i++) {
                    const newArr = [`${values.houseName}-`, `${values.areaCode}-`, values.shelfCode, values.floorCode, i];
                    dataArr.push(newArr);
                }
                
                const resultArr = dataArr.map( item => {
                    return item.join('');
                });
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
                    className='detail-component'
                    okText={disabled ? '修改': '批量生成'}
                    cancelText='取消'
                    onCancel={cancelClick}
                    width='550px'
                    onOk={disabled ? this.toggleDisabled: this.onOkClick}
                >
                    <Form className='query-component'>
                        <Row>
                            <Col span={24}>
                                <FormItem label="仓库区位" hasFeedback>
                                    {getFieldDecorator('houseCode', {
                                        rules: [],
                                    })(<Select 
                                        option={pubFunction.getDictSelect('CK-GN')}
                                        valueCode='code'
                                        valueName='name'
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    />)}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='仓库区域'>
                                    {getFieldDecorator('areaCode', {
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
                                <FormItem label='通道'>
                                    {getFieldDecorator('channelNo', {
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
                                <FormItem label='货架号'>
                                    {getFieldDecorator('rockNo')(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='层号'>
                                    {getFieldDecorator('tierNo')(
                                        <Select 
                                            disabled={disabled}
                                            option={[
                                                {
                                                    code: 'A',
                                                    name: 'A'
                                                },
                                                {
                                                    code: 'B',
                                                    name: 'B'
                                                },
                                                {
                                                    code: 'C',
                                                    name: 'C'
                                                },
                                            ]}
                                            valueCode='code'
                                            valueName='name'
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='库位最小编号'>
                                    {getFieldDecorator('storeMinNo', {
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
                                <FormItem label='库位最大编号'>
                                    {getFieldDecorator('storeMaxNo', {
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
                                <FormItem label='库位优先值'>
                                    {getFieldDecorator('priorityValue', {
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