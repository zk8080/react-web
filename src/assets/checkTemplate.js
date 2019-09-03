import _ from 'lodash';
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
const template = `<head>
<meta charset="UTF-8">
<title>盘点表</title>
<style>
    h1{
        display: flex;
        justify-content: center;
    }
    .package_info{
        display: flex;
    }
    .info_cont{
        flex: 1;
        flex-grow: 1;
        margin-bottom: 10px;
    }
    .info_cont span:first-child{
        display: inline-block;
        width: 80px;
        text-align: right;
    }
    table{
        width: 100%;
        border-collapse: collapse;
    }
    table th{
        border: 1px solid #000;
    }
    table td{
        border: 1px solid #000;
    }
    .sum_box{
        display: flex;
        justify-content: flex-start;
    }
    .info_no{
        flex-grow: 2;
    }
</style>
</head>
<body>
<div class='package_info'>
    <div class='info_cont'>
        <span>盘点日期：</span>
        <span>{{date}}</span>
    </div>
    <div class='info_cont'>
        <span>盘点人：</span>
        <span>{{user}}</span>
    </div>
</div>
<table border="0" cellspacing="0" cellpadding='0'>
    <thead>
        <tr>
            <th>商品名称</th>
            <th>商品条码</th>
            <th>型号</th>
            <th>规格</th>
            <th>库位类型</th>
            <th>库位编号</th>
            <th>库存数量</th>
        </tr>
    </thead>
    <tbody>
        <% _.forEach(tableList, function(data, index){ %>
            <tr>
                <td>{{data.skuName}}</td>
                <td>{{data.commodityCode}}</td>
                <td>{{data.modelNo}}</td>
                <td>{{data.spec}}</td>
                <td>{{data.storehouseType}}</td>
                <td>{{data.storehouseCode}}</td>
                <td>{{data.storeNums}}</td>
            </tr>
        <% }) %>
    </tbody>
</table>
</body>`;

export {
    template
};