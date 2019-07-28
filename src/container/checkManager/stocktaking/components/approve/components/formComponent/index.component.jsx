import React, { Component } from 'react';
import { toJS } from 'mobx';
import {Form, Row, Col, Input, Button, DatePicker} from 'antd';
import {formUtils} from '@utils';
import { Select } from '@pubComs';
import inventoryInfoState from '../../../inventoryInfo/index.state';
import './index.less';

const FormItem = Form.Item;


const onFieldsChange = (props, changedFields) => {
    if(props.setQueryData){
        props.setQueryData({...props.queryData, ...formUtils.formToObj(changedFields)});
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
            if (!err) {
                if(this.props.getData){
                    this.props.getData(values);
                }
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='query-component approve-query'>
                <Row>
                    <Col span={8}>
                        <FormItem label="单据状态" hasFeedback>
                            {getFieldDecorator('billState', {
                                rules: [
                                    // {
                                    //     required: true,
                                    //     message: '必填'
                                    // }
                                ],
                            })(
                                <Select
                                    placeholder='请选择'
                                    option={[
                                        {'save': '初始化'},
                                        {'approving': '审批中'},
                                        {'approved': '审批完成'},
                                        {'approve_fail': '审批失败'},
                                        {'cancel': '作废'}
                                    ]}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="盘点时间" hasFeedback>
                            {getFieldDecorator('checkDate', {
                                rules: [
                                    // {
                                    //     required: true,
                                    //     message: '必填'
                                    // }
                                ],
                            })(
                                <DatePicker placeholder='请选择'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="盘点人" hasFeedback>
                            {getFieldDecorator('checkUser', {
                                rules: [
                                    // {
                                    //     required: true,
                                    //     message: '必填'
                                    // }
                                ],
                            })(
                                <Select
                                    placeholder='请选择'
                                    option={toJS(this.props.checkUserList)}
                                    valueCode='userNo'
                                    valueName='name'
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商家" hasFeedback>
                            {getFieldDecorator('customerCode', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填'
                                    }
                                ],
                            })(
                                <Select
                                    placeholder='请选择'
                                    option={toJS(inventoryInfoState.merchantsList)}
                                    valueCode='customerCode'
                                    valueName='customerName'
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>

                    </Col>
                    <Col span={8} className='query-btn'>
                        <Button
                            type="primary"
                            onClick={this.handleSubmit}
                        >查询</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default Index;


