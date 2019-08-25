import React ,{ Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Row, Input, Col, Modal, message, Form } from 'antd';
import {BarcodeComponent} from '@pubComs';
import ReviewComponent from './components/reviewComponent/index.component';
import './index.less';
import State from './index.state';
import { toJS } from 'mobx';
import {session} from '@utils';

const FormItem = Form.Item;
let lastTime = null;
let nextTime = null;
let code = '';
@Form.create()
@observer
class Index extends Component{
	constructor(props){
		super(props);
		this.state = {
            inputVal: '',
            reviewUser: null
		};
	}
	componentDidMount() {
        const pathName = this.props.location.pathname;
        this.input.focus();
        this.bindKeyDown(pathName);
        this.setState({
            reviewUser: session.getItem('userInfo').name
        });
    }

    // keydown事件
    handleKeyDown = (e) => {
        const keycode = e.keyCode || e.which || e.charCode;
        this.props.form.resetFields();
        nextTime = new Date();
        if (keycode === 13) {
            e.preventDefault();
            
            code = code.replace(/\s+/g,'');
            this.props.form.setFieldsValue({
                'pickNo': code
            });
            //如果没有拣货单数据 则请求数据
            if( !State.isAlreadyReview ){
                State.getTableList(code);
            }else{
                if(!State.isAlreadyPicker){
                    State.setPickUser(code);
                }else{
                    State.dealProductArr(code);
                }
            }
            code = '';
            lastTime = null;
        }else {
            console.log(e, '----e---');
            if(keycode !== 16){
                if (!lastTime) {
                    code = String.fromCharCode(keycode);
                } else {
                    code += String.fromCharCode(keycode);
                }
                lastTime = nextTime;
            }
        }
    }
    
    // 绑定keyDown事件
    bindKeyDown = (pathName) => {
        if(pathName == '/workflow/scanReview'){
            window.addEventListener('keydown', this.handleKeyDown);    
        }
        
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleKeyDown);
    }

	render(){
        const {getFieldDecorator} = this.props.form;
        return <div className='scanReview'>    
            <div className='query-component'>
                <Row>
                    <Col span={6} >
                        <FormItem label=''>
                        {getFieldDecorator('pickNo')(<Input
                            ref={input => this.input = input}
                            autoComplete='off'
                        />)}
                        </FormItem>
                    </Col>
                    <Col span={6} className='btn-box'> 
                        <Button type='primary' onClick={State.getOmitStore}>打印缺货单</Button>
                        <Button type='primary' onClick={State.printData}>复检完毕</Button>
                    </Col>  
                    {/* <Col span={6}>
                        <BarcodeComponent
                            code={'201908081127267685'}
                            height={50}
                        />
                    </Col> */}
                </Row>
            </div>
            
            <ReviewComponent
                packageList={toJS(State.packageList)}
                curProduct={State.curProductInfo}
                reviewUser={this.state.reviewUser}
                pickerUser={State.pickUser}
            />
        </div>;
	}

}

export default Index;
