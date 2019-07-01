import React, { Component } from 'react';
import {Form, Icon, Input, Button} from 'antd';
import './index.less';
const FormItem = Form.Item;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='login-cont'>
                <div className='title'>
                    滨中WMS仓库管理系统
                </div>
                <div className="form">
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名！' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="密码"
                            />,
                        )}
                    </FormItem>  
                    <FormItem>
                        <Button
                            type='primary'
                            // onClick={this.props.submitLogin}
                            htmlType='submit'
                        >
                            登录
                        </Button>
                    </FormItem>   
                    <span className='forget'>
                        <a href="javaScript:;">忘记密码</a>
                    </span>     
                </div>
            </div>
        );
    }
}


export default Index;