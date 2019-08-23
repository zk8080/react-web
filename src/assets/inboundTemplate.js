import _ from 'lodash';
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
const template = `<head>
<title>打印模板</title>
<style>
    .title{
        display: flex;
        justify-content: center;
    }
    .form_box{
        display: flex;
        flex-wrap: wrap;
    }
    .form_cont{
        flex: 1;
        line-height: 30px;
    }
    .form_cont span:first-child{
        display: inline-block;
        width: 100px;
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
</style>
</head>
<body>
<h1 class='title'>{{title}}</h1>
<div class='form_box'>
    <div class='form_cont'>
        <span>采购单号：</span>
        <span>{{purchaseNo}}</span>
    </div>
    <div class='form_cont'>
        <span>商家名称：</span>
        <span>{{customerName}}</span>
    </div>
    <div class='form_cont'>
        <span>采购日期：</span>
        <span>{{purchaseDate}}</0.0span>
    </div>
</div>
<div class='form_box'>
    <div class='form_cont'>
        <span>联系人：</span>
        <span>{{contacts}}</span>
    </div>
    <div class='form_cont'>
        <span>联系电话：</span>
        <span>{{contactsTel}}</span>
    </div>
    <div class='form_cont'>
        <span>食品：</span>
        <span>
            <% if(isFood == 0){ %>
                否
            <% } else { %>
                是
            <% } %>
        </span>   
    </div>
    
</div>
<div class='form_box'>
    <div class='form_cont'>
        <span>地址：</span>
        <span>{{address}}</span>
    </div>
</div>

</body>`;
const tableTemplate = `
    <head>
    <title>打印模板</title>
    <style>
        table{
            width: 100%;
            border-collapse: collapse;
        }
        table th{
            border: 1px solid #000;
            border-collapse:collapse
        }
        table td{
            border: 1px solid #000;
            border-collapse:collapse
        }
    </style>
    </head>
    <body>
        <table border="0" cellspacing="0" cellpadding='0'>
            <thead>
                <tr>
                    <th>商品名称</th>
                    <th>型号</th>
                    <th>规格</th>
                    <th>单位</th>
                    <th>商品条码</th>
                    <th>体积m³</th>
                    <th>重量KG</th>
                    <th>采购数量</th>
                    <th>到货日期</th>
                    <th>生产日期</th>
                    <th>保质期(天)</th>
                    <th>备注</th>
                </tr>
            </thead>
            <tbody>
                <% _.forEach(tableData, function(data){ %>
                    <tr>
                        <td>{{data.commodityName}}</td>
                        <td>{{data.modelNo}}</td>
                        <td>{{data.spec}}</td>
                        <td>{{data.unit}}</td>
                        <td>{{data.barCode}}</td>
                        <td>{{data.volume}}</td>
                        <td>{{data.weight}}</td>
                        <td>{{data.purchaseNums}}</td>
                        <td>{{data.arrivalDate}}</td>
                        <td>{{data.productionDate}}</td>
                        <td>{{data.shilfLife}}</td>
                        <td>{{data.remark}}</td>
                    </tr>
                <% }) %>
            </tbody>
        </table>
    </body>
`;
export {
    template,
    tableTemplate
};