import React, { Component } from 'react';
import {Form, Row, Col, Input, Button} from 'antd';
import {formUtils} from '@utils';
import { Select, AuthButton } from '@pubComs';

const FormItem = Form.Item;


const onFieldsChange = (props, changedFields) => {
    const clearObj = {
        areaCode: null, 
        commodityId: null
    };
    if( changedFields.customerId ){
        props.setQueryData({...props.queryData, ...formUtils.formToObj(changedFields), ...clearObj});
    }else{
        if(props.setQueryData){
            props.setQueryData({...props.queryData, ...formUtils.formToObj(changedFields)});
        }
    }
};

const mapPropsToFields = (props) => {
    return formUtils.objToForm(props.queryData);
};

@Form.create({
    mapPropsToFields,
    onFieldsChange
})
class Index extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // if (!err) {
            if(this.props.getData){
                this.props.getData(values);
            }
            // }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {merchantsList=[], areaCodeList=[], commodityIdList=[]} = this.props;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={8}>
                        <FormItem label="商家名称" hasFeedback>
                            {getFieldDecorator('customerId', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ],
                            })(
                                <Select 
                                    placeholder='请选择'
                                    option={merchantsList}
                                    valueCode='id'
                                    valueName='customerName'
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value)=>{
                                        // if(!value){
                                        //     this.props.form.setFiledsVlaue({
                                        //         areaCode: undefined,
                                        //         commodityId: undefined
                                        //     })
                                        // }
                                        this.props.changeCustomerId(value);
                                    }}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="库区" hasFeedback>
                            {getFieldDecorator('areaCode', {
                                rules: [
                                    {
                                        required: false,
                                        message: '必填'
                                    }
                                ],
                            })(
                                <Select 
                                    placeholder='请选择'
                                    option={areaCodeList}
                                    valueCode='code'
                                    valueName='name'
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商品名称" hasFeedback>
                            {getFieldDecorator('commodityId', {
                                rules: [
                                    {
                                        required: false,
                                        message: '必填'
                                    }
                                ],
                            })(
                                <Select 
                                    placeholder='请选择'
                                    mode="multiple"
                                    option={commodityIdList}
                                    valueCode='commodityId'
                                    valueName='commodityName'
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24} className='query-btn'>
                        <AuthButton
                            menuCode='CheckIngQuery'
                        >
                            <Button
                                type="primary"
                                onClick={this.handleSubmit}
                            >查询</Button>
                        </AuthButton>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default Index;


