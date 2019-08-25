import _ from 'lodash';
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
const template = `<head>
<meta charset="utf-8" />
<title>邮政 100*180,110</title>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    .print_paper {
        font-size: 14px;
        border: none;
        border-collapse: collapse;
        width: 375px;
        margin-top: -1px;
        table-layout: fixed;
    }

    .print_paper td {
        border: solid #000 1px;
        border-collapse: collapse;
    }

    .no_border td {
        border: none;
        vertical-align: top;
    }

    .fhei {
        font-family: 'SimHei';
    }

    .fam {
        font-family: '微软雅黑';
    }

    .f30 {
        font-size: 30pt;
    }

    .f16 {
        font-size: 16pt;
    }

    .f15 {
        font-size: 15pt;
    }

    .f13 {
        font-size: 13pt;
    }

    .f12 {
        font-size: 12pt;
    }

    .f9 {
        font-size: 9pt;
    }

    .f8 {
        font-size: 8pt;
    }

    .f7 {
        font-size: 7pt;
    }

    .b {
        font-weight: bold;
    }

    .tc {
        text-align: center;
    }

    .vt {
        vertical-align: top;
    }

    .print_paper .bln {
        border-left: none;
    }

    .print_paper .brn {
        border-right: none;
    }

    .lh14 {
        line-height: 14px;
    }

    .lh14 {
        line-height: 16px;
    }

    .pp-bn td {
        border: none;
    }

    .t-bn td {
        border: none;
    }

    .pl5 {
        padding-left: 5px;
    }

    .rel {
        position: relative;
    }

    .abs {
        position: absolute;
    }
</style>
</head>

<body class="fhei f12">
<table class="print_paper">
    <tr height="39">
        <td class="b f13 pl5" width="275"><img height="32"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAiCAMAAABMbYZPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhQTFRFFhYWWFhY1tbWf39/v7+/Pz8/AAAA////uiq4sAAAAoVJREFUeNrsl9tu7CAMRX0B5///uLYBOyEwk1bnaFSpPEwTAizYvlE4PtXgt5ALfYhchC+vlxbdUjfTWco7smR7QS5yaVcyeZ8Pp9oaw1uyPCUDRxsj9fBSSyH9WKENzx3CSZwN+dbV963L+e47uUYLcmdU22TNM9oj9G/lBXll4XMLcvTUJLNK4WSSXF3JujnTBpgW5JR4Fru48ZraJcnpUEm2DifzsI0+VN2QnZbC/TZkeUjmYYGyIIPQiaxW13lFcEPeWXpDDrlPdratOLkOipPtQz0wTL8m312sNN/qv5PaAOep6WEjipysjypC6LBRe0Veelgjo+l7V/sYhh5kFMgsA08SiEdV6kwRVR7P7sq8IvetBZkipO7kb2XPZQ5Lcg1Ds6B5WLWInsnzEpujz+SaWftu50ga3P0QQEBihTVZHpIhk9jJt+3Nz8zDwfxZowzU1FLpAfkHalc3rYJOQ0vnY/tzzp5tWv7u7D18a/GG+Gqo76kR6VIxps3Hsf//neROlk+QXew7WQMD2RyV3F1dTnYFGV1dvBRUq0gFAVx0sqjiuCLQFM8JWli6GNfis91oqhytAFsydKfCiBf36jZ0xDT4ZCbvZ76Tr5aerlDsjkszWQ9gZPJ6cAoAjSDwxa1GeCT56XlVMV6Sq8QWTC8YZE1PTtb1RxnSQlgYhXtBtHEqCGA53pMXYQVJVrk4yLooGxmAsR+6hTmOS4BvgCyP4Zb86j7UDoQyq22PmpBdiV4UI4e0ioh2D+Ih24q8ucIOh9VDqZ43D7MvViEgq2ZJVwNzqUp6IWPz8x+RNSI07eKRZHL79cLRYNUPmXmz9DkaVaY/PSH//Uf3R/5H7UuAAQBJVmQXqLW9eQAAAABJRU5ErkJggg=="
                alt="" />
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="56">
        <td class="tc f30 b fam"> {{county}}
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="34">
        <td class="pl5 f16"> {{prov}}{{cityStr}}
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="71">
        <td width="20"> 收件</td>
        <td class="f11 vt">
            <div style="height: 70px;overflow:hidden;"> {{reciptName}} {{reciptPhone}} <br /> {{detailAdress}}
            </div>
        </td>
    </tr>
    <tr height="48">
        <td width="20"> 寄件</td>
        <td class="f8 vt">
            <div style="height: 47px;overflow:hidden;"> 上海滨中 18888888888 <br /> 上海徐汇区滨中
            </div>
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="80">
        <td class="tc f15 lh14 b fam">

        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="82">
        <td class="f8" width="166"> 快件送达收件人地址，经收件人或收件人（寄件人）允许的代收人签字，视为送达，您的签字代表您已验收此包裹，并以确定商品信息无误，包装完好，没有划痕，破损等质量问题。
        </td>
        <td class="pl5"> 签收人： <br /> <br />时间：</td>
    </tr>
</table>
<table class="print_paper">
    <tr height="60">
        <td class="b brn f13" width="150"><img width="140" style="margin-left:5px;"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAiCAMAAABMbYZPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhQTFRFFhYWWFhY1tbWf39/v7+/Pz8/AAAA////uiq4sAAAAoVJREFUeNrsl9tu7CAMRX0B5///uLYBOyEwk1bnaFSpPEwTAizYvlE4PtXgt5ALfYhchC+vlxbdUjfTWco7smR7QS5yaVcyeZ8Pp9oaw1uyPCUDRxsj9fBSSyH9WKENzx3CSZwN+dbV963L+e47uUYLcmdU22TNM9oj9G/lBXll4XMLcvTUJLNK4WSSXF3JujnTBpgW5JR4Fru48ZraJcnpUEm2DifzsI0+VN2QnZbC/TZkeUjmYYGyIIPQiaxW13lFcEPeWXpDDrlPdratOLkOipPtQz0wTL8m312sNN/qv5PaAOep6WEjipysjypC6LBRe0Veelgjo+l7V/sYhh5kFMgsA08SiEdV6kwRVR7P7sq8IvetBZkipO7kb2XPZQ5Lcg1Ds6B5WLWInsnzEpujz+SaWftu50ga3P0QQEBihTVZHpIhk9jJt+3Nz8zDwfxZowzU1FLpAfkHalc3rYJOQ0vnY/tzzp5tWv7u7D18a/GG+Gqo76kR6VIxps3Hsf//neROlk+QXew7WQMD2RyV3F1dTnYFGV1dvBRUq0gFAVx0sqjiuCLQFM8JWli6GNfis91oqhytAFsydKfCiBf36jZ0xDT4ZCbvZ76Tr5aerlDsjkszWQ9gZPJ6cAoAjSDwxa1GeCT56XlVMV6Sq8QWTC8YZE1PTtb1RxnSQlgYhXtBtHEqCGA53pMXYQVJVrk4yLooGxmAsR+6hTmOS4BvgCyP4Zb86j7UDoQyq22PmpBdiV4UI4e0ioh2D+Ih24q8ucIOh9VDqZ43D7MvViEgq2ZJVwNzqUp6IWPz8x+RNSI07eKRZHL79cLRYNUPmXmz9DkaVaY/PSH//Uf3R/5H7UuAAQBJVmQXqLW9eQAAAABJRU5ErkJggg=="
                alt="" /></td>
        <td class="bln tc lh14 fam">
        
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="48">
        <td width="20"> 收件</td>
        <td class="f8 vt">
            <div style="height: 47px;overflow:hidden;"> {{reciptName}} {{reciptPhone}} <br /> {{detailAdress}}
            </div>
        </td>
    </tr>
    <tr height="37">
        <td width="20"> 寄件</td>
        <td class="f8 vt >
        <div style=" height:36px;overflow:hidden;"> 上海滨中 18888888888 <br /> 上海徐汇区滨中
            </div>
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="106">
        <td class="vt rel" style="height: 106px;overflow:hidden;">
            <div>订单号:{{orderNo}}</div>
            <div>{{remark}}</div>
            <div class="abs" style="top: 85px;right: 5px;">
            </div>
        </td>   
    </tr>
</table>
</body>`;

export {
    template
};