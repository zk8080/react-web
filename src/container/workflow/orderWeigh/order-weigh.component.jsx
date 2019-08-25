import React from 'react';
import {Button, Col, Icon, Input, Row, Table, Form} from 'antd';
import OrderWeighState from './order-weigh.state';
import { orderWeighDataListColumns } from './order-weigh.columns';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';


const FormItem = Form.Item;

// 记录快递单号和称重数据
let weightValue = null;
let pickNoValue = null;
let lastTime = null;
let nextTime = null;
let code = '';
@Form.create()
@observer
class OrderWeighComponent extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    // keydown事件
    handleKeyDown = (e) => {
        const keycode = e.keyCode || e.which || e.charCode;
        this.props.form.resetFields();
        nextTime = new Date();
        console.log(code, '---code---');
        if (keycode === 13) {
            e.preventDefault();
            
            code = code.replace(/\s+/g,'');
            code = code.replace(/。+/g,'.');
            
            if( code.split('.').length > 1 ){
                weightValue = code;
                this.props.form.setFieldsValue({
                    'weight': code,
                    'pickNo': pickNoValue
                });
                OrderWeighState.diffWeight(code);
            }else{
                pickNoValue = code;
                this.props.form.setFieldsValue({
                    'pickNo': code,
                    'weight': weightValue
                });
                OrderWeighState.getTableData(code);
            }
            code = '';
            lastTime = null;
            
        }else {
            if(keycode !== 16 && keycode !== 32 && keycode !== 17 && keycode !== 18 && keycode !== 20 && keycode !== 8){
                if (!lastTime) {
                    // code = String.fromCharCode(keycode);
                    code = e.key;
                } else {
                    // code += String.fromCharCode(keycode);
                    code += e.key;
                }
                lastTime = nextTime;
            }
        }
    }

    // 绑定keyDown事件
    bindKeyDown = (pathName) => {
        
        if(pathName == '/workflow/orderWeigh'){
            window.addEventListener('keydown', this.handleKeyDown);  
        }
         
    }

	componentDidMount() {
        // this.orderWeighState.loadGrid();
        const pathName = this.props.location.pathname;
        this.noInput.focus();
        this.bindKeyDown(pathName);
    }
    
    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleKeyDown);
    }

	render() {
        const {getFieldDecorator} = this.props.form;
		return <Row>
			<div className='query-component'>
                <Row>
                    <Col span={6} >
                        <FormItem label='快递单号'>
                            {getFieldDecorator('pickNo')(<Input
                                ref={ref => this.noInput = ref}
                                autoComplete='off'
                            />)}
                        </FormItem>
                    </Col>
                    <Col span={6} >
                        <FormItem label='重量'>
                        {getFieldDecorator('weight')(<Input
                            ref={input => this.weightInput = input}
                            autoComplete='off'
                        />)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        {/* <Button type="danger" onClick={OrderWeighState.confirmWeigh.bind(OrderWeighState)}>忽略异常</Button> */}
                    </Col>
                </Row>
            </div>
			<Table
				pagination={OrderWeighState.page}
				loading={OrderWeighState.loading}
				columns={orderWeighDataListColumns}
			   	dataSource={toJS(OrderWeighState.tableList)}
			/>
		</Row>;
	}
}
export default OrderWeighComponent;
