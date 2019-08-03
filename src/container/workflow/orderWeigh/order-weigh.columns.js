import {ColumnProps} from 'antd/es/table';
// city: "南京市,玄武区"
// customerCode: "0012"
// customerName: "悟空"
// expressFee: 0
// expressKey: "yz"
// goodsValue: 203.15
// id: 45
// isB2b: 0
// isBatch: 0
// isFinish: 0
// mailNo: "1564802385244"
// orderNo: "78965412300012"
// pickNo: "201908031119452898"
// presetWeight: 15.36
// prov: "江苏省"
// reciptAddr: "1205弄"
// reciptName: "李纳"
// reciptPhone: "12345678"
// state: 3
// systemOrderNo: "78965412300012"
// weightUnit: "kg"
export const orderWeighDataListColumns: ColumnProps[] = [{
	title:'快递公司',
	dataIndex: 'expressKey',
	render: text => {
		return text === 'yz' ? '邮政' : '其他';
	}
}, {
	title:'省份',
	dataIndex: 'prov'
}, {
	title:'快递单号',
	dataIndex: 'mailNo'
}, {
	title:'系统订单号',
	dataIndex: 'systemOrderNo'
}, {
	title:'包裹预重（kg）',
	dataIndex: 'presetWeight'
}, {
	title:'实际重量',
	dataIndex: 'realWeight'
}];
