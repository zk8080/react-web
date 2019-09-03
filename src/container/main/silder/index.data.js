const menuData = [
    {
        title: '单量统计',
        key: '00',
        icon: 'dashboard',
        url: '/home/index'
    },
    {
        title: '库内管理',
        key: '01',
        icon: 'setting',
        children: [
            {
                title: '商品档案',
                key: '01-01',
                url: '/product/list'
            },
            {
                title: '客户档案',
                key: '01-02',
                url: '/customer/list'
            },
            {
                title: '耗材关系设置',
                key: '01-03',
                url: '/consumableRelation/list'
            },
            {
                title: '仓库档案',
                key: '01-04',
                url: '/warehouse/list'
            },
            {
                title: '库位管理',
                key: '01-05',
                url: '/locationRelation/list'
            },
            {   
                title: '上传快递单号',
                key: '01-06',
                url: '/trackingNumber/list'
            },
            {
                title: '库存盘点',
                key: '01-07',
                url: '/stocktaking/list'
            },
            {
                title: '库位补货',
                key: '01-08',
                url: '/restocking/list'
            },
        ]
    },
    {
        title: '入库管理',
        key: '02',
        icon: 'fullscreen-exit',
        children: [
            {
                title: '采购通知',
                key: '02-01',
                url: '/inboundManagement/purchaseNotice'
            },
            {
                title: '入库上架',
                key: '02-02',
                url: '/inboundManagement/shelf'
            },
            {
                title: '退货管理',
                key: '02-03',
                url: '/returned/list'
            }
        ]
    },
    {
        title: '出库管理',
        key: '03',
        icon: 'fullscreen',
        children: [
			{
				title: '订单管理',
				key: '03-01',
				url: '/workflow/orderImport'
            },
            {
				title: '合并订单',
				key: '03-06',
				url: '/order/mergeOrder'
			},
			{
				title: '拣货单管理',
				key: '03-02',
				url: '/workflow/pickingBill'
			},
            {
                title: '扫描复核',
                key: '03-03',
                url: '/workflow/scanReview'
            },
            {
                title: '称重',
                key: '03-04',
                url: '/workflow/orderWeigh'
            },
            {
                title: '信息跟踪',
                key: '03-05',
                url: '/infoTracking/list'
            }
        ]
    },
    {
        title: '统计分析',
        key: '05',
        icon: 'file-excel',
        children: [
            {
                title: '入库报表',
                key: '05-01',
                url: '/inboundReport/list'
            },
            {
                title: '出库报表',
                key: '05-02',
                url: '/outboundReport/list'
            },
            {
                title: '库存报表',
                key: '05-03',
                url: '/inventoryReport/list'
            },
            {
                title: '库位使用报表',
                key: '05-04',
                url: '/locationUsageReport/list'
            }
        ]
    },
    {
        title: '预警管理',
        key: '06',
        icon: 'control',
        children: [
            {
                title: '预警代办',
                key: '05-01',
                url: '/warningAgent/list'
            },
            {
                title: '预警规则',
                key: '05-02',
                url: '/warningAgent/config'
            },
        ]
    },
    {
        title: '权限管理',
        key: '07',
        icon: 'team',
        children: [
            {
                title: '用户管理',
                key: '07-01',
                url: '/userManager/index'
            },
            {
                title: '角色管理',
                key: '07-02',
                url: '/roleManager/index'
            }
        ]
    }
];

export default menuData;
