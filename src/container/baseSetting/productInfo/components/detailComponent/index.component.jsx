import React, { Component } from 'react';
import { Modal, Select } from '@pubComs';
import { Form, Row, Col, Input } from 'antd';
import './index.less';
import { formUtils } from '@utils/index';

const FormItem = Form.Item;
const { TextArea } = Input;
// const Option = Select.Option;

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

    state = {
        isConsumable: false
    }

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

    onConsumable = (value) => {
        console.log(value, '111');
        if(value == '1'){
            this.setState({
                isConsumable: true
            });
        }else{
            this.setState({
                isConsumable: false
            });
        }
    }

    componentDidUpdate(prevProps){
        // debugger;
        if(JSON.stringify(this.props.detailData) != JSON.stringify(prevProps.detailData)){
            const detailData = this.props.detailData;
            if(detailData.isConsumable && (detailData.isConsumable == '1' || detailData.isConsumable.value == '1')){
                this.setState({
                    isConsumable: true
                });
            }else{
                this.setState({
                    isConsumable: false
                });
            }
        }
        
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible, cancelClick, disabled } = this.props;
        return (
            <div>
                <Modal
                    title='新增'
                    visible={visible}
                    className='detail-product'
                    okText={disabled ? '修改': '确认'}
                    cancelText='取消'
                    onCancel={cancelClick}
                    onOk={disabled ? this.toggleDisabled: this.onOkClick}
                >
                    <Form className='query-component'>
                        <Row>
                            <Col span={8}>
                                <FormItem label='商品名称'>
                                    {getFieldDecorator('skuName', {
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
                            <Col span={8}>
                                <FormItem label='商品品牌'>
                                    {getFieldDecorator('banner', {
                                        rules: [
                                            {
                                                required: false,
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
                            <Col span={8}>
                                <FormItem label='规格'>
                                    {getFieldDecorator('spec', {
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
                            <Col span={8}>
                                <FormItem label='商品条码'>
                                    {getFieldDecorator('barCode', {
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
                            <Col span={8}>
                                <FormItem label='是否食品'>
                                    {getFieldDecorator('isFoodstuff', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Select 
                                            disabled={disabled} 
                                            option={[
                                                {
                                                    code: '1',
                                                    name: '是'
                                                },{
                                                    code: '0',
                                                    name: '否'
                                                }
                                            ]}
                                            valueCode='code'
                                            valueName='name'
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='是否耗材'>
                                    {getFieldDecorator('isConsumable', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Select 
                                            disabled={disabled} 
                                            option={[
                                                {
                                                    code: '1',
                                                    name: '是'
                                                },{
                                                    code: '0',
                                                    name: '否'
                                                }
                                            ]}
                                            valueCode='code'
                                            valueName='name'
                                            onChange={this.onConsumable}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            {
                                this.state.isConsumable && <Col span={8}>
                                    <FormItem label='商品类型'>
                                        {getFieldDecorator('commodityType', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '必填'
                                                }
                                            ]
                                        })(
                                            <Select 
                                                disabled={disabled} 
                                                option={[
                                                    {
                                                        code: 'carton',
                                                        name: '纸箱'
                                                    },{
                                                        code: 'froth',
                                                        name: '泡沫'
                                                    },{
                                                        code: 'packing_bag',
                                                        name: '快递袋'
                                                    }
                                                ]}
                                                valueCode='code'
                                                valueName='name'
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            }
                            <Col span={8}>
                                <FormItem label='商品型号'>
                                    {getFieldDecorator('modelNo', {
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
                            <Col span={8}>
                                <FormItem label='单个重量'>
                                    {getFieldDecorator('singleWeight', {
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
                            <Col span={8}>
                                <FormItem label='单个体积'>
                                    {getFieldDecorator('singleVolume', {
                                        
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            {/* <Col span={8}>
                                <FormItem label='商品单位'>
                                    {getFieldDecorator('singleUnit', {
                                        
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col> */}
                            {/* <Col span={8}>
                                <FormItem label='打包单位'>
                                    {getFieldDecorator('packingNum', {
                                        
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='打包商品量'>
                                    {getFieldDecorator('packingUnit', {
                                        
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='打包体积单位'>
                                    {getFieldDecorator('packingVolumeUnit', {
                                        
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='打包重量单位'>
                                    {getFieldDecorator('packingWeightUnit', {
                                        
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col> */}
                            {/* <Col span={8}>
                                <FormItem label='商品重量单位'>
                                    {getFieldDecorator('singleWeightUnit', {
                                        
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='商品体积单位'>
                                    {getFieldDecorator('singleVolumeUnit', {
                                        
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