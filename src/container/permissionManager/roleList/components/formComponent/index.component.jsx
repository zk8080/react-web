import React, { Component } from 'react';
import {Form, Row, Col, Input, Button} from 'antd';
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
                <Form>
                    <Row>
                        <Col span={8}>
                            <FormItem label="角色名" hasFeedback>
                                {getFieldDecorator('userName', {
                                    rules: [],
                                })(<Input />)}
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
                </Form>
                
            </div>
        );
    }
}


export default Index;


