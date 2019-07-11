const noFoodColumns = [
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
        dataIndex: 'commodityName',
        width: 250,
        editable: true,
        required: true
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 200,
        editable: true,
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 100,
        editable: true,
    },
    {
        title: '单位',
        dataIndex: 'unit',
        width: 100,
        editable: true,
        required: true
    },
    {
        title: '商品条码',
        dataIndex: 'barCode',
        width: 200,
        editable: true,
        required: true
    },
    {
        title: '体积m³',
        dataIndex: 'volume',
        width: 100,
        editable: true,
        required: true
    },
    {
        title: '重量KG',
        dataIndex: 'weight',
        width: 100,
        editable: true,
        required: true
    },
    {
        title: '采购数量',
        dataIndex: 'purchaseNums',
        width: 100,
        editable: true,
        required: true
    },
    {
        title: '到货日期',
        dataIndex: 'arrivalDate',
        width: 200,
        editable: true,
        required: true,
        type: 'date'
    },
    {
        title: '备注',
        dataIndex: 'remark',
        width: 200,
        editable: true,
    }
];

const foodColumns = [
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
        dataIndex: 'commodityName',
        editable: true,
        required: true
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        editable: true,
    },
    {
        title: '规格',
        dataIndex: 'spec',
        editable: true,
    },
    {
        title: '单位',
        dataIndex: 'unit',
        editable: true,
        required: true
    },
    {
        title: '商品条码',
        dataIndex: 'barCode',
        editable: true,
        required: true
    },
    {
        title: '体积m³',
        dataIndex: 'volume',
        editable: true,
        required: true
    },
    {
        title: '重量KG',
        dataIndex: 'weight',
        editable: true,
        required: true
    },
    {
        title: '采购数量',
        dataIndex: 'purchaseNums',
        editable: true,
        required: true
    },
    {
        title: '到货日期',
        dataIndex: 'arrivalDate',
        editable: true,
        required: true,
        type: 'date'
    },
    {
        title: '生产日期',
        dataIndex: 'productionDate',
        editable: true,
        required: true,
        type: 'date'
    },
    {
        title: '保质期',
        dataIndex: 'shilfLife',
        editable: true,
        required: true,
        type: 'date'
    },
    {
        title: '备注',
        dataIndex: 'remark',
        editable: true,
    }
];

export {
    noFoodColumns,
    foodColumns
};
