import _ from 'lodash';
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
const template = `<head>
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
        <span>补货单号：</span>
        <span>{{replenishmentNo}}</span>
    </div>
    <div class='info_cont'>
        <span>日期：</span>
        <span>{{createTime}}</span>
    </div>
    <div class='info_cont'>
        <span>补货人：</span>
        <span>system</span>
    </div>
</div>
<table border="0" cellspacing="0" cellpadding='0'>
    <thead>
        <tr>
            <th>序号</th>
            <th>商品名称</th>
            <th>型号</th>
            <th>规格</th>
            <th>单位</th>
            <th>数量</th>
            <th>商品条码</th>
            <th>存储库位</th>
            <th>零拣库位</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{1}}</td>
            <td>{{skuName}}</td>
            <td>{{modelNo}}</td>
            <td>{{spec}}</td>
            <td>{{singleUnit}}</td>
            <td>{{stockoutNums}}</td>
            <td>{{commodityCode}}</td>
            <td>{{storeCode}}</td>
            
            <td></td>
                
            
            
        </tr>
    </tbody>
</table>
<div class='sum_box'>
    <span>打印时间：</span>
    <span>{{date}}</span>
</div>
</body>`;

export {
    template
};