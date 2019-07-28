import React, { Component } from 'react';
import { Modal } from '@pubComs';
import { Form, Row, Col, Input, Checkbox, Tree } from 'antd';
import './index.less';
import { formUtils } from '@utils';

const FormItem = Form.Item;
const { TreeNode } = Tree;

const onFieldsChange = (props, changedFields) => {
    props.setDetailData({...props.detailData, ...formUtils.formToObj(changedFields)});
};

const mapPropsToFields = (props) => {
    return formUtils.objToForm(props.detailData);
};

const treeData = [
    {
      title: '纸箱(尺寸cm)',
      key: '0-0',
      children: [
        {
          title: '11#快递箱(7*6*70)',
          key: '0-0-0'
        },
        {
          title: '6#快递箱(16*22*73)',
          key: '0-0-1'
        },
        {
          title: '24#快递箱(36*29*43)',
          key: '0-0-2'
        },
        {
            title: '23#快递箱(45*33*33)',
            key: '0-0-3'
        },
        {
            title: '16#快递箱(44*19*33.5)',
            key: '0-0-4'
        },
        {
            title: '3#快递箱(13*17*36)',
            key: '0-0-5'
        },
        {
            title: '22#快递箱(61*17*39)',
            key: '0-0-6'
        },
        {
            title: '1#快递箱(10.5*10.5*27)',
            key: '0-0-7'
        },
        {
            title: '2#快递箱(20*13*13)',
            key: '0-0-8'
        },
        {
            title: '15#快递箱(73*22*31)',
            key: '0-0-9'
        },
        {
            title: '8#快递箱(34.5*25*24)',
            key: '0-0-10'
        },
        {
            title: '7#快递箱(55*13*49)',
            key: '0-0-11'
        },
        {
            title: '9#快递箱(29.5*28*37)',
            key: '0-0-12'
        },
      ]
    },
    {
      title: '泡沫(尺寸cm)',
      key: '0-1',
      children: [
        { 
            title: '大袋(70*90)', 
            key: '0-1-0-0' 
        },
        { 
            title: '中袋(42*60)', 
            key: '0-1-0-1' 
        },
        { 
            title: '小袋(30*20)', 
            key: '0-1-0-2' 
        },
        { 
            title: '气泡卷(1卷-10公斤)', 
            key: '0-1-0-3' 
        }
      ]
    }
  ];

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
                this.props.onOk({...this.props.detailData, ...values});
            }
        });
    }

    toggleDisabled = () => {
        this.props.toggleDisabled(false);
    }


    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = checkedKeys => {
        this.setState({ checkedKeys });
        this.props.form.setFieldsValue({
            ['checkbox-group']: checkedKeys
        })
    };

    renderTreeNodes = data =>
        data.map(item => {
        if (item.children) {
            return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
            </TreeNode>
            );
        }
        return <TreeNode {...item} />;
    });


    render() {
        const {getFieldDecorator} = this.props.form;
        const { visible, cancelClick, disabled, checkData } = this.props;
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
                                    {getFieldDecorator('customerName', {
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
                                <FormItem label='数量'>
                                    {getFieldDecorator('brandName', {
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
                                <Form.Item label="耗材">
                                    {getFieldDecorator('checkbox-group', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        // <Checkbox.Group style={{ width: '100%' }}>
                                        //     <Row>
                                        //         {
                                        //             checkData.map(item => {
                                        //                 return <Col span={8} key={Math.random()}>
                                        //                     <Checkbox disabled={disabled} value={item.code}>{item.name}</Checkbox>
                                        //                 </Col>;
                                        //             })
                                        //         }
                                        //     </Row>
                                        // </Checkbox.Group>,
                                        <Tree
                                            checkable
                                            onExpand={this.onExpand}
                                            expandedKeys={this.state.expandedKeys}
                                            autoExpandParent={this.state.autoExpandParent}
                                            onCheck={this.onCheck}
                                            checkedKeys={this.state.checkedKeys}
                                            selectedKeys={this.state.selectedKeys}
                                        >
                                            {this.renderTreeNodes(treeData)}
                                        </Tree>
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