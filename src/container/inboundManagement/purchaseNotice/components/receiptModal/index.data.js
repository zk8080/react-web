const noFoodColumns = [
    {
        title: '序号',
        dataIndex: 'seq',
        width: 100,
        render: (text, record, index) => {
            return index + 1;
        }
    },
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        width: 200,
        //editable: true,
        required: true,
        type: 'select',
        code: 'skuName',
        name: 'skuName'
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 150,
        //editable: true,
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 200,
        //editable: true,
    },
    {
        title: '单位',
        dataIndex: 'unit',
        width: 150,
        //editable: true,
        required: true
    },
    {
        title: '商品条码',
        dataIndex: 'barCode',
        width: 200,
        //editable: true,
        required: true
    },
    {
        title: '体积m³',
        dataIndex: 'volume',
        width: 150,
        //editable: true,
        required: true
    },
    {
        title: '重量KG',
        dataIndex: 'weight',
        width: 150,
        //editable: true,
        required: true
    },
    {
        title: '采购数量',
        dataIndex: 'purchaseNums',
        width: 150,
        //editable: true,
        required: true
    },
    {
        title: '到货日期',
        dataIndex: 'arrivalDate',
        width: 200,
        //editable: true,
        required: true,
        type: 'date'
    },
    {
        title: '备注',
        dataIndex: 'remark',
        width: 200,
        //editable: true,
    },
    {
        title: '签收数量',
        dataIndex: 'receivNums',
        width: 150,
        editable: true,
        required: true
    },
    {
        title: '签收说明',
        dataIndex: 'receivRemark',
        width: 150,
        editable: true,
        required: true
    }
];

const foodColumns = [
    {
        title: '序号',
        dataIndex: 'seq',
        width: 100,
        render: (text, record, index) => {
            return index + 1;
        }
    },
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        width: 200,
        //editable: true,
        required: true,
        type: 'select',
        code: 'skuName',
        name: 'skuName'
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 150,
        //editable: true,
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 200,
        //editable: true,
    },
    {
        title: '单位',
        dataIndex: 'unit',
        width: 150,
        //editable: true,
        required: true
    },
    {
        title: '商品条码',
        dataIndex: 'barCode',
        width: 200,
        //editable: true,
        required: true
    },
    {
        title: '体积m³',
        dataIndex: 'volume',
        width: 150,
        //editable: true,
        required: true
    },
    {
        title: '重量KG',
        dataIndex: 'weight',
        width: 150,
        //editable: true,
        required: true
    },
    {
        title: '采购数量',
        dataIndex: 'purchaseNums',
        width: 150,
        //editable: true,
        required: true
    },
    {
        title: '到货日期',
        dataIndex: 'arrivalDate',
        width: 200,
        //editable: true,
        required: true,
        type: 'date'
    },
    {
        title: '生产日期',
        dataIndex: 'productionDate',
        //editable: true,
        required: true,
        width: 200,
        type: 'date'
    },
    {
        title: '保质期',
        dataIndex: 'shilfLife',
        //editable: true,
        required: true,
        width: 200,
        type: 'date'
    },
    {
        title: '备注',
        dataIndex: 'remark',
        width: 200,
        //editable: true,
    },
    {
        title: '签收数量',
        dataIndex: 'receivNums',
        width: 150,
        editable: true,
        required: true
    },
    {
        title: '签收说明',
        dataIndex: 'receivRemark',
        width: 150,
        editable: true,
        required: true
    }
];

export {
    noFoodColumns,
    foodColumns
};
