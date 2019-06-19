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

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={8}>
                        <FormItem label="用户名" hasFeedback>
                            {getFieldDecorator('userName', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="账号" hasFeedback>
                            {getFieldDecorator('userNo', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8} className='query-btn'>
                        <Button
                            type="primary"
                            onClick={this.props.getData}
                        >查询</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default Index;


