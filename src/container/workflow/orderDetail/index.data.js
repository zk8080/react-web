const columns = [
    {
        title: '序号',
        dataIndex: 'seq',
        width: 50,
        render: (text, record, index) => {
            return index + 1;
        }
    },
    {
		title: '商品名称',
		dataIndex: 'skuName',
		width: 200
	},{
		title: '商品条形码',
		dataIndex: 'barCode',
		width: 200
	}, {
		title: '商品规格',
        dataIndex: 'spec',
        width: 100
	}, {
		title: '商品型号',
        dataIndex: 'modelNo',
        width: 100
	}, {
		title: '购买量',
        dataIndex: 'numbers',
        width: 100
	}, {
		title: '单位',
        dataIndex: 'unit',
        width: 100
	}
];


export {
    columns,
};
