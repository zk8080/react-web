const colums = [
    {
        title: '库位',
        dataIndex: 'storeCode',
        width: 200,
        editable: true,
        required: true,
        type: 'select',
        code: 'storeCode',
        name: 'storeCode'
    },
    {
        title: '上架数量',
        dataIndex: 'num',
        width: 150,
        editable: true,
        required: true,
    },
];

export {
    colums
};