import React, { Component } from 'react';
import {Form, Row, Col, Input, Button, DatePicker} from 'antd';
import {formUtils} from '@utils'; 

const FormItem = Form.Item;

const onFieldsChange = (props, changedFields) => {
    props.setQueryData({...props.queryData, ...formUtils.formToObj(changedFields)});
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
                this.props.getData(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={8}>
                        <FormItem label="日期" hasFeedback>
                            {getFieldDecorator('orderDate', {
                                rules: [],
                            })(<DatePicker/>)}
                        </FormItem>
                    </Col>
                    <Col span={16} className='query-btn'>
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


