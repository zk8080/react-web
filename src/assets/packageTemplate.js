import _ from 'lodash';
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
const packageTemplate = `<head>
<meta charset="UTF-8">
<title>包裹清单列表</title>
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
        justify-content: flex-end;
    }
</style>
</head>
<body>
<h1>包裹清单</h1>
<div class='package_info'>
    <div class='info_cont'>
        <span>订单号：</span>
        <span>2131231213</span>
    </div>
    <div class='info_cont'>
        <span>收件人：</span>
        <span>小李</span>
    </div>
</div>
<table border="0" cellspacing="0" cellpadding='0'>
    <thead>
        <tr>
            <th>商品条码</th>
            <th>商品名称</th>
            <th>型号</th>
            <th>规格</th>
            <th>数量</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td class="">123</td>
        </tr>
    </tbody>
</table>
<div class='sum_box'>
    <span>合计：</span>
    <span>123</span>
</div>
</body>`;

export {
    packageTemplate
};