import React, { Component } from 'react';
import {Form, Row, Col, Input, Button} from 'antd';
import {formUtils, pubFunction} from '@utils';
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

    componentWillUnmount() {

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.getData();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='query-component'>
                <Row>
                    <Col span={8}>
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
                    <Col span={8}>
                        <FormItem label="区域编号" hasFeedback>
                            {getFieldDecorator('areaCode', {
                                rules: [],
                            })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8} className='query-btn'>
                        <AuthButton
                            menuCode='strorehouseRecordQuery'
                        >
                            <Button
                                type="primary"
                                onClick={this.handleSubmit}
                            >查询</Button>
                        </AuthButton>
                        
                    </Col>
                </Row>
                {/* <div className='query-btn'>
                    
                </div> */}
            </div>
        );
    }
}


export default Index;


