
const colums = [
    {
        title: '商家编码',
        dataIndex: 'customerCode',
        width: 150
    },
    {
        title: '商家名称',
        dataIndex: 'customerName',
        width: 150
    },
    {
        title: '商品条码',
        dataIndex: 'skuCode',
        width: 150
    },
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        width: 150
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 100
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 100
    },
    {
        title: '库存类型',
        dataIndex: 'storeType',
        width: 100,
        // render: (text) => {
        //     return text =='1'? '已用库存': text == '2'? '未用库存': text == '3'? '占用库存': '';
        // }
    },
    {
        title: '库位编码',
        dataIndex: 'storeCode',
        width: 100
    },
    {
        title: '库存数量',
        dataIndex: 'storeNums',
        width: 100
    }
];

export default colums;