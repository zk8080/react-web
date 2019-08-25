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
        <td class="b brn f13 pl5" width="275">
            <img height="32" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAiCAMAAABMbYZPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhQTFRFFhYWWFhY1tbWf39/v7+/Pz8/AAAA////uiq4sAAAAoVJREFUeNrsl9tu7CAMRX0B5///uLYBOyEwk1bnaFSpPEwTAizYvlE4PtXgt5ALfYhchC+vlxbdUjfTWco7smR7QS5yaVcyeZ8Pp9oaw1uyPCUDRxsj9fBSSyH9WKENzx3CSZwN+dbV963L+e47uUYLcmdU22TNM9oj9G/lBXll4XMLcvTUJLNK4WSSXF3JujnTBpgW5JR4Fru48ZraJcnpUEm2DifzsI0+VN2QnZbC/TZkeUjmYYGyIIPQiaxW13lFcEPeWXpDDrlPdratOLkOipPtQz0wTL8m312sNN/qv5PaAOep6WEjipysjypC6LBRe0Veelgjo+l7V/sYhh5kFMgsA08SiEdV6kwRVR7P7sq8IvetBZkipO7kb2XPZQ5Lcg1Ds6B5WLWInsnzEpujz+SaWftu50ga3P0QQEBihTVZHpIhk9jJt+3Nz8zDwfxZowzU1FLpAfkHalc3rYJOQ0vnY/tzzp5tWv7u7D18a/GG+Gqo76kR6VIxps3Hsf//neROlk+QXew7WQMD2RyV3F1dTnYFGV1dvBRUq0gFAVx0sqjiuCLQFM8JWli6GNfis91oqhytAFsydKfCiBf36jZ0xDT4ZCbvZ76Tr5aerlDsjkszWQ9gZPJ6cAoAjSDwxa1GeCT56XlVMV6Sq8QWTC8YZE1PTtb1RxnSQlgYhXtBtHEqCGA53pMXYQVJVrk4yLooGxmAsR+6hTmOS4BvgCyP4Zb86j7UDoQyq22PmpBdiV4UI4e0ioh2D+Ih24q8ucIOh9VDqZ43D7MvViEgq2ZJVwNzqUp6IWPz8x+RNSI07eKRZHL79cLRYNUPmXmz9DkaVaY/PSH//Uf3R/5H7UuAAQBJVmQXqLW9eQAAAABJRU5ErkJggg=="
             alt="" />
        </td>
        <td class="bln f13">
            <div style="display: none">代收货款
            </div>
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="56">
        <td class="tc f30 b fam"> {{city}}
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="34">
        <td width="275" class="pl5 f16"> {{prov}}{{city}}
        </td>
        <td class="tc">
            <!--<img  width="85" height="20" src="" alt=""/>-->
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="71">
        <td width="20"> 收件</td>
        <td class="f11 vt">
            <div style="height: 70px;overflow:hidden;"> {{reciptName}} {{reciptPhone}}
                <br/> {{prov}}{{city}}{{reciptAddr}}
            </div>
        </td>
        <td class="f9 lh14 vt" rowspan="2" width="92">
            <div style="height: 70px;">
                <div class="f10 tc" style="border-bottom:1px solid #000;line-height: 20px;">服务
                </div>
                <div class="f6 pl5 pt5" style="line-height: 14px;"> 付款方式：寄付现结
                    <div style="display: None">保价金额：￥0元
                    </div>
                    <!--<br/>签单返还：-->
                    <div style="display: none">代收金额：￥0元
                    </div>
                </div>
            </div>
        </td>
    </tr>
    <tr height="48">
        <td width="20"> 寄件</td>		<td class="f8 vt">
            <div style="height: 47px;overflow:hidden;"> 滨中 1888888888
                <br/> 上海市徐汇区滨中仓库
            </div>
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="80">
        <td class="tc f15 lh14 b fam">
            <img width="270" height="56" src="data:image/gif;base64,R0lGODlhDgE4APAAAAAAAP///ywAAAAADgE4AEAI/wADCBxIUCCAgwAMJhyIECHBgwobRmy4UGJBhRgZOgxAcaPFjxQnQuS48GFJjSNHTjR5MWXHiiFJqpS5MaPLmSJh4qTpcuXFn0B9zuzIkqfOmBZbwjR5E6nHpyBBKlXaE+XJnU2jQr0a0+ZRqlvBVk0atKxQrmSzHtUKtOpZojTfbnWrEWxGn3frGlWL12jRpmK/FoQL2KxhqVaHrl1ceCpJpowFa+X7ePDJs5CL/n2Zsy9cr307x7WMmKzhtk8hKxb9UrBjxWoLT16ct/Zo2Fxfc/Y7WjTo3oldB/e68zTppcP1Et5tWjnayHJZO3WcubLny5VbS8e9OnvN5M2Xh/82fjzvZ++zG1s2PzfsbaeINVtl333zcrbJf4eHj108cPLlWccbce2pt1l12r1HmX/yYTafXvbxp955Y323XX/T/Qfgg9zlxluCzf0mF36zSUcdh881iJ6EwlGI3H74qfaihRs66NuKsQl3IIr3ScaibVil9iCQ0H34nYsEBjaefyFuGN+AOBbZJF3p+bhghio+mRaGOV3Z4Y4wuidjkjUG+KVzVY4nooL8jUibgERSeSSXe7255ZZkjqkhkzTWqGVXUXapo3MIMudej3TFidx1uiHaIqAVBhkjeIP6KeSNXrb5k5w5Rmfkk4rS52GEJQKH5IpK7plhkwD+ieenmur/VmiPbpq4npkpQojmj6ZCOqOkYlKqppOXQpnppDu6KVt7tmZZ7KukMtvrqwbCmmq1lnI654XIEsqjpqUyqKuNvTbK653bonpctXwWR6y23TmKrXezgiutuKEKCO2u4c5J7aC0rvsrdtkuaqydhrqrraCeOkqkXfqmG22meupHY8B6ztvqs75yG2yybJJ4L5bjvlfdw3VeWDG9qnbbLsHvGnyqvJWyrKyVCIMKp8lD7typtfmxHCa7q/YZs6jxsjjvwimz6THKhZ7ss5SxHpwnpcBGCvPG8HpI87BMg3jouXRG3XOQDAON6cDXXly0u1zL3DGs3a6ZptN0G5wvbs6m/42x1epm7HZpRseNtNdK1xx2wjhfeSK5+xLY75kWZw3w21uT52q6X2tod4E4Pz01xHyX/PPfM1/uMuZl4rrysR97e3PDZD/OM6O3ij1p6ktWbSurmnP8791Tyn362P3avnnfTaM+N9GrEw538F1H67fRiwc8ebF754qy7sHy3nLsL7du9toeL2081csmf+v55ebO+ITPq04+6+ZDXj/x2K9/ffsjU57wRsWvkVFOaIO7n/QyZ5zNJY1/CvNf85AXwPehSGpom+Du6te76AkJeA0c4ANBBzYJgq9WRhIg0743v0f9q4MK/GDhqLe+ER4vgqL6X+MQpkIJstBh0+Kc/f+gJ8PphbB6BdQhanKowR02y3QDZB746PfC8RFRa/nT3/BI6DmbhYyCossg/CIXJYoFDYsCgyEa8+dAxEEQZtmzF+ygdsGz0WmKLhSiGofItiy20XpNXGLEbujEFFpQiwSUnAGfk7Q9OjJw5vtjEgO5KRMyDoX4mtoKR9dEKurRiny8WuskqUglVpKJJ/ziE7uHwTu28DpVHFooITlKEbqRi8VD5SVVaUhnbTKDeITlJ2X5SI3R8HCATKWsviWyOXJyjBIroBnRR0u1CauLhhukEN8oyNKlcnuJ0qQPORnMIDYSlMWsWTYPCDv16VJ7iwwnsJj4Q7Kxs4+Cs5woy0T/ykBRcpmzwxsQxVhH3E0sZ4xEXDr1Wc2CIXOSypRfvZqJUHli6JeuHKi/hpnAK+IzkrZM5i4B+kUAhrFsBY3fQVV2xo+yVHDDWmdCRfo3kHGTl5mcpzal+EpzKhSdQDXmEWt4S0J2M1ffjKfexElPcvYUXeckZlDVeUxt2pB9cLQkPJ1JUETyVKP33GdNDQnC0/SznYrTqhwrulSdlq6e23udS635uxkO9aGl/KdEmQnGvNHRq1DUoSej2tFZCtWsIYXoSPcaUIo67pC3U6k0ESpXsfqOrHZFLBLzGlGb4pKCj/XlOIH51I0SlqFSPexhEsvZxXrWqDglGSvtaK64ILbUsh5cI0g368/Oyq6kofPrM1NKRkIO9qepLew+LxIQADs="
             alt="" />
            <br/> {{mailNo}}
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="82">
        <td class="f8" width="166"> 快件送达收件人地址，经收件人或收件人（寄件人）允许的代收人签字，视为送达，您的签字代表您已验收此包裹，并以确定商品信息无误，包装完好，没有划痕，破损等质量问题。
        </td>
        <td class="pl5"> 签收人：
            <br/>
            <br/>时间：</td>
        <td class="tc" width="74"></td>
    </tr>
</table>
<table class="print_paper">
    <tr height="60">
        <td class="b brn f13" width="150">
            <img width="140" style="margin-left:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAiCAMAAABMbYZPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhQTFRFFhYWWFhY1tbWf39/v7+/Pz8/AAAA////uiq4sAAAAoVJREFUeNrsl9tu7CAMRX0B5///uLYBOyEwk1bnaFSpPEwTAizYvlE4PtXgt5ALfYhchC+vlxbdUjfTWco7smR7QS5yaVcyeZ8Pp9oaw1uyPCUDRxsj9fBSSyH9WKENzx3CSZwN+dbV963L+e47uUYLcmdU22TNM9oj9G/lBXll4XMLcvTUJLNK4WSSXF3JujnTBpgW5JR4Fru48ZraJcnpUEm2DifzsI0+VN2QnZbC/TZkeUjmYYGyIIPQiaxW13lFcEPeWXpDDrlPdratOLkOipPtQz0wTL8m312sNN/qv5PaAOep6WEjipysjypC6LBRe0Veelgjo+l7V/sYhh5kFMgsA08SiEdV6kwRVR7P7sq8IvetBZkipO7kb2XPZQ5Lcg1Ds6B5WLWInsnzEpujz+SaWftu50ga3P0QQEBihTVZHpIhk9jJt+3Nz8zDwfxZowzU1FLpAfkHalc3rYJOQ0vnY/tzzp5tWv7u7D18a/GG+Gqo76kR6VIxps3Hsf//neROlk+QXew7WQMD2RyV3F1dTnYFGV1dvBRUq0gFAVx0sqjiuCLQFM8JWli6GNfis91oqhytAFsydKfCiBf36jZ0xDT4ZCbvZ76Tr5aerlDsjkszWQ9gZPJ6cAoAjSDwxa1GeCT56XlVMV6Sq8QWTC8YZE1PTtb1RxnSQlgYhXtBtHEqCGA53pMXYQVJVrk4yLooGxmAsR+6hTmOS4BvgCyP4Zb86j7UDoQyq22PmpBdiV4UI4e0ioh2D+Ih24q8ucIOh9VDqZ43D7MvViEgq2ZJVwNzqUp6IWPz8x+RNSI07eKRZHL79cLRYNUPmXmz9DkaVaY/PSH//Uf3R/5H7UuAAQBJVmQXqLW9eQAAAABJRU5ErkJggg=="
             alt="" />
        </td>
        <td class="bln tc lh14 fam">
            <img width="176" height="30" src="data:image/gif;base64,R0lGODlhsAAeAPAAAAAAAP///ywAAAAAsAAeAEAI/wADCBxIsKDBggAABFC4MKFAhQkhRmxIEOJDiQ4zYmxo8eHAjBc9eoy40SHHkRQvSvwI0uTBlzBjyjQI8uTCkyRToqSYUyPOmjdDMjTJ8GZPnzYtupy4tGXRmVCjyqw50ahGpDuvrryK8yPLoES9Hl2Z1CpLsl1dSl3LVqjKkVp1GhXKdCvXong7hoV7d2hYtHXPmm1LWCrVv3HV6sVo92fHoDxDQmb88+3cpoCdFt488/BQx2jn8gzc93FesJ/5lvT7ObPrwZxj01zcOvHTxRwb1zX91a9Iq30tK837OrTs45755paL++jokl7dpsS7PHDZ4sRhH0dOW7lzsXR9lv+e3Fsy9bHT/+q0nvbp9tjJgVe/jXr+866/D+efT7bqcMGYafceZ/GthpVott3HVHSRTSfWbum1th5WC6o14GYFgsZcfc6NR510ewG3mnCwsVehexcSluFuoTVHmoHkgZiaiJVdN2FxcqWoYnfyfZcVZeLdxaB+5KFHlHoBJpmjjmytmCB4z+kmZH64FQnhkRImmZ1xTK7lJJD0+dYhjB82GCKY/SG55ZZLdhnVl/ZBmaCHQ1Z53pWsoaQlgG262RmPBrbI4YuOxWjmjGhGqOeafFroJ1Rw+oggmAoCdZpvVgZn455vcfnoVIBqqNigQRZaJpF3aupfiRRq9qlhobK5uKGYhF5ZZ32Zjrgpo532+epBkbI3qX10Uolrqrquil2jKP76UrAHuliqrcZiimyNyt6orafOzoZabZTKSWmxk9n5oKpqAsimo916m2ePwkorJXTVmndusul2um6z7VYU65M/Ekvmrdbei22+NbbXb0zQCkrrtFOWe6zB1mXLqcILP/tvuAGPaSrB9qp2cJa8YpyxuyTKOurD8+InccEiV4ywia6ejNDGcXZca8SXhkyjzCSry+x7AQEAOw=="
             alt="" />
            <br/> {{mailNo}}
        </td>
    </tr>
</table>
<table class="print_paper">
    <tr height="48">
        <td width="20"> 收件</td>
        <td class="f8 vt">			<div style="height: 47px;overflow:hidden;"> {{reciptName}} {{reciptPhone}}
                <br/> {{prov}}{{city}}{{reciptAddr}}
            </div>
        </td>
        <td class="f9 lh14 tc" rowspan="2" width="74"> 自定义二维码
        </td>
    </tr>
    <tr height="37">
        <td width="20"> 寄件</td>
        <td class="f8 vt" >
        <div style=" height:36px;overflow:hidden; "> 滨中 1888888888 <br/> 上海市徐汇区滨中仓库
        </div>
    </td>
</tr>
</table>
</body>`;

export {
    template
};