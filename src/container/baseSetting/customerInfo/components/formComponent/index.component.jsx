import React, { Component } from 'react';
import {Form, Row, Col, Input, Button} from 'antd';
import './index.less';
const FormItem = Form.Item;

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
                        <FormItem label="商家" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="品牌" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8} className='query-btn'>
                        <Button
                            type="primary"
                        >查询</Button>
                    </Col>
                </Row>
                {/* <div className='query-btn'>
                    
                </div> */}
            </div>
        );
    }
}


export default Index;


