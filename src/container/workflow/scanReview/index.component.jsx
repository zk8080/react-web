import React ,{ Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Row, Input, Col, Modal, message, Form } from 'antd';
import {BarcodeComponent, AuthButton} from '@pubComs';
import ReviewComponent from './components/reviewComponent/index.component';
import './index.less';
import State from './index.state';
import { toJS } from 'mobx';
import {session} from '@utils';
import {getLodop} from '@assets/LodopFuncs';

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

    printExpress = () => {
        const Lodop = new getLodop();
        Lodop.PRINT_INITA(-1,0,380,570,'邮政快递电子面单打印');
        Lodop.SET_PRINT_PAGESIZE(1,1000,1500,'');
        Lodop.ADD_PRINT_BARCODE(9,148,190,60,'128C','123456789012');
        Lodop.ADD_PRINT_LINE(80,5,79,375,2,1);
        Lodop.ADD_PRINT_TEXT(88,38,100,30,'快递包裹');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',16);
        Lodop.SET_PRINT_STYLEA(0,'Bold',1);
        Lodop.ADD_PRINT_TEXT(88,315,45,30,'2');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',16);
        Lodop.SET_PRINT_STYLEA(0,'Bold',1);
        Lodop.ADD_PRINT_LINE(121,5,120,375,2,1);
        Lodop.ADD_PRINT_TEXT(135,10,30,67,'收件');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',14);
        Lodop.SET_PRINT_STYLEA(0,'Bold',1);
        Lodop.ADD_PRINT_TEXT(133,65,70,24,'姓名');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(133,228,115,24,'1888888888');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(158,65,304,35,'上海市上海市上海市浦东新区浦东新区上海市上海市上海市浦东新区');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_LINE(210,4,209,374,2,1);
        Lodop.ADD_PRINT_TEXT(215,10,65,24,'订单号：');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(215,76,100,24,'2019090123');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(215,204,90,24,'收件人签名：');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(238,203,75,24,'签收时间：');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(238,281,20,24,'月');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(238,310,20,24,'日');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(238,339,20,24,'时');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(248,10,100,20,'品名：');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(267,10,346,20,'博客苏打卢克撒娇抵抗力撒娇');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(312,12,90,20,'重量（克）：');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(312,105,65,20,'200');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(312,218,135,20,'上海徐汇30局已检视');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_LINE('90.28mm',5,340,375,2,1);
        Lodop.ADD_PRINT_BARCODE(362,22,175,50,'128C','123456789012');
        Lodop.ADD_PRINT_TEXT(420,10,25,45,'收件');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',12);
        Lodop.SET_PRINT_STYLEA(0,'Bold',1);
        Lodop.ADD_PRINT_TEXT(419,66,65,20,'姓名');
        Lodop.ADD_PRINT_TEXT(419,216,100,20,'1848989879');
        Lodop.ADD_PRINT_TEXT(438,51,322,20,'上海市上海市浦东新区上海市上海市浦东新区上海市上海市浦东新区');
        Lodop.ADD_PRINT_LINE(474,4,475,374,2,1);
        Lodop.ADD_PRINT_TEXT(491,11,25,55,'寄件');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',12);
        Lodop.SET_PRINT_STYLEA(0,'Bold',1);
        Lodop.ADD_PRINT_TEXT(496,51,100,20,'滨中信息');
        Lodop.ADD_PRINT_TEXT(518,51,313,20,'上海市浦东新区龙东大道4877号二期大楼2层徐汇邮政');

        //水印效果begin----
		// Lodop.ADD_PRINT_TEXT(133, 180, 200,200, 1);
		// Lodop.SET_PRINT_STYLEA(0,'FontSize',100);
		// Lodop.SET_PRINT_STYLEA(0,'FontColor','#ddd');
		// Lodop.SET_PRINT_STYLEA(0,'ItemType',1);
		//水印效果end-----
        Lodop.PREVIEW();
        // Lodop.PRINT_DESIGN();	
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
                        <AuthButton
                            menuCode='ScanReviewFinish'
                        >
                            <Button type='primary' onClick={State.getOmitStore}>打印缺货单</Button>
                        </AuthButton>
                        <AuthButton
                            menuCode='ScanReviewReport'
                        >
                            <Button type='primary' onClick={State.allCheckFinished}>复检完毕</Button>
                        </AuthButton>
                        {/* <Button type='primary' onClick={this.printExpress}>打印快递单</Button> */}
                    </Col>  
                    {/* <Col span={6}>
                        <BarcodeComponent
                            code={'JH201908282033100927'}
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
