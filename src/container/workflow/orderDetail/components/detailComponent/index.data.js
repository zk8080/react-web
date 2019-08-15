const column = [
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
		dataIndex: 'commodityCode',
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
        dataIndex: 'packageNums',
        width: 100
	},
];


export {
    column,
};
