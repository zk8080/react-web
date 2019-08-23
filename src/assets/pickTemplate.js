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

<div class='package_info'>
        <div class='info_cont'>
            <span>打印时间：</span>
            <span>{{date}}</span>
        </div>
        <div class='info_cont'>
            <span>包裹数量：</span>
            <span>{{packageNums}}</span>
        </div>
        <div class='info_cont'>
            <span>配货人：</span>
            <span>{{pickUser}}</span>
        </div>
    </div>
    <div class='package_info'>
        <div class='info_cont'>
            <span>快递公司：</span>
            <span>{{expressCompany}}</span>
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
                <% _.forEach(tableData, function(data, index){ %>
                    <tr>
                        <td>{{index + 1}}</td>
                        <td>{{data.barCode}}</td>
                        <td>{{data.skuName}}</td>
                        <td>{{data.modelNo}}</td>
                        <td>{{data.spec}}</td>
                        <td>{{data.bayNums}}</td>
                        <td>{{data.storeCode}}</td>
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