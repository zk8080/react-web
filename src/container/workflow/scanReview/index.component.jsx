import React ,{ Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Row, Input, Col, Modal, message, Form } from 'antd';
import {BarcodeComponent} from '@pubComs';
import ReviewComponent from './components/reviewComponent/index.component';
import './index.less';
import State from './index.state';
import { toJS } from 'mobx';
const FormItem = Form.Item;;

@Form.create()
@observer
class Index extends Component{
	constructor(props){
		super(props);
		this.state = {
            inputVal: ''
		};
	}
	componentDidMount() {
        this.input.focus();
        this.bindKeyDown();
    }
    
    // 绑定keyDown事件
    bindKeyDown = () => {
        let lastTime = null;
        let nextTime = null;
        let code = '';
        document.addEventListener('keydown', (e) => {
            const keycode = e.keyCode || e.which || e.charCode;
            this.props.form.resetFields();
            nextTime = new Date();
            if (keycode === 13) {
                this.props.form.setFieldsValue({
                    'field': code
                });
                // 如果没有拣货单数据 则请求数据
                if( !State.isAlreadyReview ){
                    State.getTableList(code);
                }else{
                    State.dealProductArr(code);
                }
                code = '';
                lastTime = null;
                e.preventDefault();
            }else {
                if (!lastTime) {
                    code = String.fromCharCode(keycode);
                } else {
                    code += String.fromCharCode(keycode);
                }
                lastTime = nextTime;
            }
        });
    }

	render(){
        const {getFieldDecorator} = this.props.form;
        return <div className='scanReview'>    
            <div className='query-component'>
                <Row>
                    <Col span={8} >
                        <FormItem>
                        {getFieldDecorator('field', {
                            rules: [
                                {
                                required: true,
                                message: 'Input something!',
                                },
                            ],
                        })(<Input
                            ref={input => this.input = input}
                        />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>  
                        <Button type='primary'>复检完毕</Button>
                    </Col>  
                    <Col span={8}>
                        <BarcodeComponent
                            code={'201908081127267685'}
                            height={50}
                        />
                    </Col>
                </Row>
            </div>
            
            <ReviewComponent
                packageList={toJS(State.packageList)}
            />
        </div>;
	}

}

export default Index;
