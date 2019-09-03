import React, { Component } from 'react';
import {Form, Row, Col, Input, Button} from 'antd';
import {formUtils} from '@utils';
import {Select, AuthButton} from '@pubComs';

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

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.getData();
            }
        });
    };

    componentWillUnmount() {

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {productList} = this.props;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={8}>
                        <FormItem label="商品" hasFeedback>
                            {getFieldDecorator('customerName', {
                                rules: [],
                            })(<Select 
                                option={productList}
                                valueCode='skuName'
                                valueName='skuName'
                                showSearch
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商品条形码" hasFeedback>
                            {getFieldDecorator('barCode', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8} className='query-btn'>
                        <AuthButton
                            menuCode='consumablesQuery'
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


