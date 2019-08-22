import _ from 'lodash';
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
const template = `<head>
<title>打印模板</title>
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
    .sum_box{
        display: flex;
        justify-content: flex-end;
    }
</style>
</head>
<body>
<h1 class='title'>{{title}}</h1>
<div class='package_info'>
        <div class='info_cont'>
            <span>打印时间：</span>
            <span>2131231213</span>
        </div>
        <div class='info_cont'>
            <span>包裹数量：</span>
            <span>20</span>
        </div>
        <div class='info_cont'>
            <span>配货人：</span>
            <span>小李</span>
        </div>
    </div>
    <div class='package_info'>
        <div class='info_cont'>
            <span>快递公司：</span>
            <span>邮政</span>
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
                    <th>序号</th>
                    <th>商品条码</th>
                    <th>商品名称</th>
                    <th>型号</th>
                    <th>规格</th>
                    <th>拣货数量</th>
                    <th>库位</th>
                </tr>
            </thead>
            <tbody>
                <% _.forEach(tableData, function(data){ %>
                    <tr>
                        <td>1</td>
                        <td>123</td>
                        <td>123</td>
                        <td>123</td>
                        <td>123</td>
                        <td>123</td>
                        <td>dsa54</td>
                    </tr>
                <% }) %>
            </tbody>
        </table>
    </body>
`
export {
    template,
    tableTemplate
};