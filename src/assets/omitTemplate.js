import _ from 'lodash';
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
const omitTemplate = `<head>
<meta charset="UTF-8">
<title>补货单列表</title>
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
    <div class='info_cont info_no'>
        <span>栏号：</span>
        <span>{{basketNum}}</span>
    </div>
</div>
<table border="0" cellspacing="0" cellpadding='0'>
    <thead>
        <tr>
            <th>商品条码</th>
            <th>商品名称</th>
            <th>型号</th>
            <th>拣货库位</th>
            <th>缺货数量</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <% _.forEach(productList, function(data, index){ %>
                <tr>
                    <td>{{data.commodityCode}}</td>
                    <td>{{data.skuName}}</td>
                    <td>{{data.modelNo}}</td>
                    <td>{{data.storeCode}}</td>
                    <td>{{data.omitNums}}</td>
                </tr>
            <% }) %>
        </tr>
    </tbody>
</table>
<div class='sum_box'>
    <span>合计：</span>
    <span>{{totalOmitNums}}</span>
</div>
</body>`;

export {
    omitTemplate
};