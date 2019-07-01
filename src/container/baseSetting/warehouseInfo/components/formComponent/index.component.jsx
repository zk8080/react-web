import React, { Component } from 'react';
import {Form, Row, Col, Input, Button} from 'antd';
import {formUtils, pubFunction} from '@utils';
import {Select} from '@pubComs';

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
                        <FormItem label="仓库区位" hasFeedback>
                            {getFieldDecorator('houseName', {
                                rules: [],
                            })(<Select 
                                option={pubFunction.getDictSelect('CK-GN')}
                                valueCode='code'
                                valueName='name'
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="区域编号" hasFeedback>
                            {getFieldDecorator('areaCode', {
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


