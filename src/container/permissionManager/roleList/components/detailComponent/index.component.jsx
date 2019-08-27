import React, { Component } from 'react';
import { Modal } from '@pubComs';
import { Form, Row, Col, Input, Tree } from 'antd';
import './index.less';
import { formUtils } from '@utils/index';
import {treeData} from '../../index.data';

const FormItem = Form.Item;
const { TreeNode } = Tree;

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

    state = {
        checkedKeys: [],
        menuKeyList: []
    };

    onCheck = (checkedKeys, e) => {
        const menuKeyList = [...e.halfCheckedKeys, ...checkedKeys];
        this.setState({ checkedKeys, menuKeyList });
    };
    
    renderTreeNodes = data =>
        data.map(item => {
            if (item.childMenu) {
                return (
                    <TreeNode title={item.menuName} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.childMenu)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });

    onOkClick = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log( values, '---values---' );
                const params = {
                    ...values,
                    menuKeyList: this.state.menuKeyList
                };
                this.props.onOk(params);
            }
        });
    }

    toggleDisabled = () => {
        this.props.toggleDisabled(false);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible, toggleVisible, disabled, menuList } = this.props;
        return (
            <div>
                <Modal
                    title='角色信息'
                    visible={visible}
                    className='detail-component'
                    okText={disabled ? '修改': '确认'}
                    cancelText='取消'
                    onCancel={toggleVisible}
                    onOk={disabled ? this.toggleDisabled: this.onOkClick}
                >
                    <Form className='query-component'>
                        <Row>
                            <Col span={12}>
                                <FormItem label='角色名称'>
                                    {getFieldDecorator('roleName', {
                                        rules: [{
                                            required: true,
                                            message: '必填'
                                        }]
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='角色描述'>
                                    {getFieldDecorator('roleDesc', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <Input 
                                            disabled={disabled}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label='权限详情'>
                                    {getFieldDecorator('roleDetail')(
                                        <Tree
                                            checkable
                                            onCheck={this.onCheck}
                                            checkedKeys={this.state.checkedKeys}
                                            disabled={disabled}
                                        >
                                            {this.renderTreeNodes(menuList)}
                                        </Tree>
                                    )}
                                    
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    
                </Modal>
            </div>
        );
    }
}

export default Index;