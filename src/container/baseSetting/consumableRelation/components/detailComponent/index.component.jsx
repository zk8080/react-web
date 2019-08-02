import React, { Component } from 'react';
import { Modal, Select, ProductSelect } from '@pubComs';
import { Form, Row, Col, Input, Checkbox, Tree } from 'antd';
import './index.less';
import { formUtils } from '@utils';

const FormItem = Form.Item;
const { TreeNode, DirectoryTree } = Tree;

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
    constructor(props){
        super(props);
        this.state = {
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
        };
    }

    onOkClick = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log( values, '---values---' );
                const useCommodityCodes = values.useCommodityCodes.filter(item => item.indexOf('parent') == '-1');
                const commodityCodes = [values.commodityCode];
                this.props.onOk({...this.props.detailData, ...values, ...{useCommodityCodes, commodityCodes}});
            }
        });
    }

    toggleDisabled = () => {
        this.props.toggleDisabled(false);
    }

    onCheck = (checkedKeys, e) => {
        this.setState({ checkedKeys });
        this.props.form.setFieldsValue({
            'useCommodityCodes': checkedKeys
        });
    };

    renderTreeNodes = data =>
        data.map(item => {
        if (item.children) {
            return (
            <TreeNode title={item.skuName} key={item.barCode} dataRef={item}>
                {this.renderTreeNodes(item.children)}
            </TreeNode>
            );
        }
        return <TreeNode {...item} title={item.skuName}  key={item.barCode} />;
    });


    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible, cancelClick, disabled, treeData, productList } = this.props;
        return (
            <div>
                <Modal
                    title='新增'
                    visible={visible}
                    className='detail-customer'
                    okText={disabled ? '修改': '确认'}
                    cancelText='取消'
                    onCancel={cancelClick}
                    width='550px'
                    onOk={disabled ? this.toggleDisabled: this.onOkClick}
                >
                    <Form className='query-component'>
                        <Row>
                            <Col span={24}>
                                <FormItem label='商品'>
                                    {getFieldDecorator('commodityCode', {
                                        rules: [{
                                            required: true,
                                            message: '必填'
                                        }]
                                    })(
                                        <ProductSelect 
                                            option={productList}
                                            disabled={disabled}
                                            valueCode='barCode'
                                            valueName='skuName'
                                            showSearch
                                            filterOption={(input, option) => {
                                                return  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                            }}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='数量'>
                                    {getFieldDecorator('rightValue', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Input 
                                            type='number'
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="耗材">
                                    {getFieldDecorator('useCommodityCodes', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <DirectoryTree
                                            checkable
                                            disabled={disabled}
                                            onCheck={this.onCheck}
                                            autoExpandParent={true}
                                            // checkedKeys={this.state.checkedKeys}
                                            // selectedKeys={this.state.selectedKeys}
                                            showIcon={false}
                                        >
                                            {this.renderTreeNodes(treeData)}
                                        </DirectoryTree>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Index;