//路由按需加载
import loadComponent from './loadable';
// import {OrderImportComponent, OrderPackageComponent, PickingBellComponent} from '../../container/workflow';
/**
 * webpackChunkName: webpack按需加在打包时的chunk名字
 */


//基础设置
const ProductList = loadComponent(() => import(/* webpackChunkName: "productList" */ '@container/baseSetting/productInfo/index.component'));
const CustomerList = loadComponent(() => import(/* webpackChunkName: "customerList" */ '@container/baseSetting/customerInfo/index.component'));
const WarehouseInfo = loadComponent(() => import(/* webpackChunkName: "WarehouseInfo" */ '@container/baseSetting/warehouseInfo/index.component'));
const ConsumableRelation = loadComponent(() => import(/* webpackChunkName: "ConsumableRelation" */ '@container/baseSetting/consumableRelation/index.component'));
const LocationRelation = loadComponent(() => import(/* webpackChunkName: "LocationRelation" */ '@container/baseSetting/locationRelation/index.component'));
const TrackingNumber = loadComponent(() => import(/* webpackChunkName: "trackingNumber" */ '@container/baseSetting/trackingNumber/index.component'));
// 库存补货
const Restocking = loadComponent(()=> import(/* webpackChunkName: "restocking" */ '@container/baseSetting/restocking/index.component'));



// 入库管理
const PurchaseNotice = loadComponent(() => import(/* webpackChunkName: "PurchaseNotice" */ '@container/inboundManagement/purchaseNotice/index.component'));
// const Receipt = loadComponent(() => import(/* webpackChunkName: "Receipt" */ '@container/inboundManagement/receipt/index.component'));
const Shelf = loadComponent(() => import(/* webpackChunkName: "Shelf" */ '@container/inboundManagement/shelf/index.component'));
// 退货管理
const ReturnGoods = loadComponent(() => import(/* webpackChunkName: "returnGoods" */ '@container/inboundManagement/returnGoods/index.component'));


// 出库管理
const OrderImportComponent = loadComponent(/* webpackChunkName: "Order Import" */() => import('@container/workflow/orderImport/order-import.component'));
const OrderPackageComponent = loadComponent(/* webpackChunkName: "OrderPackageComponent" */() => import('@container/workflow/orderPackage/order-package.component'));
const PickingBellComponent = loadComponent(/* webpackChunkName: "PickingBellComponent" */() => import('@container/workflow/pickingBill/picking-bill.component'));
const OrderWeighComponent = loadComponent(/* webpackChunkName: "OrderWeighComponent" */() => import('@container/workflow/orderWeigh/order-weigh.component'));
const ScanReviewComponent = loadComponent(/* webpackChunkName: "ScanReviewComponent" */() => import('@container/workflow/scanReview/index.component'));
const OrderDetailComponent = loadComponent(/* webpackChunkName: "OrderDetailComponent" */() => import('@container/workflow/orderDetail/index.component'));
// 信息跟踪
const InfoTracking = loadComponent(/* webpackChunkName: "InfoTracking" */() => import('@container/workflow/infoTracking/index.component'));



// 权限管理
const UserList = loadComponent(() => import(/* webpackChunkName: "UserList" */ '@container/permissionManager/userList/index.component'));
const RoleList = loadComponent(() => import(/* webpackChunkName: "RoleList" */ '@container/permissionManager/roleList/index.component'));

//盘点管理
const StocktakingList = loadComponent(() => import(/* webpackChunkName: "StocktakingList" */ '@container/checkManager/stocktaking/index.component'));

// 预警管理
const WarningAgentList = loadComponent(() => import(/* webpackChunkName: "WarningAgentList" */ '@container/warningManager/commission/index.component'));
const WarningAgentConfig = loadComponent(() => import(/* webpackChunkName: "WarningAgentConfig" */ '@container/warningManager/warningRules/index.component'));

// 单量统计
const HomeComponent = loadComponent(() => import(/* webpackChunkName: "HomeComponent" */ '@container/home/index.component'));


const routers = [
    {
        path: '/product/list',
        exact: true,
        component: ProductList,
        breadcrumbName: '商品档案'
    },
    {
        path: '/customer/list',
        exact: true,
        component: CustomerList,
        breadcrumbName: '客户档案'
    },
    {
        path: '/consumableRelation/list',
        exact: true,
        component: ConsumableRelation,
        breadcrumbName: '耗材关系设置'
    },
    {
        path: '/warehouse/list',
        exact: true,
        component: WarehouseInfo,
        breadcrumbName: '仓库档案'
    },
    {
        path: '/locationRelation/list',
        exact: true,
        component: LocationRelation,
        breadcrumbName: '库位管理'
    },
    {
        path: '/trackingNumber/list',
        exact: true,
        component: TrackingNumber,
        breadcrumbName: '上传快递单号'
    },
    {
        path: '/inboundManagement/purchaseNotice',
        exact: true,
        component: PurchaseNotice,
        breadcrumbName: '采购通知'
    },
    // {
    //     path: '/inboundManagement/receipt',
    //     exact: true,
    //     component: Receipt,
    //     breadcrumbName: '收货'
    // },
    {
        path: '/inboundManagement/shelf',
        exact: true,
        component: Shelf,
        breadcrumbName: '入库上架'
    },
    {
        path: '/workflow/orderImport',
        exact: true,
        component: OrderImportComponent,
        breadcrumbName: '订单'
    },
    {
        path: '/workflow/pickingBill',
        exact: true,
        component: PickingBellComponent,
        breadcrumbName: '拣货单管理'
    },
    {
        path: '/workflow/scanReview',
        exact: true,
        component: ScanReviewComponent,
        breadcrumbName: '扫描复核'
    },
    {
        path: '/workflow/orderWeigh',
        exact: true,
        component: OrderWeighComponent,
        breadcrumbName: '称重'
    },
    {
        path: '/userManager/index',
        exact: true,
        component: UserList,
        breadcrumbName: '用户管理'
    },
    {
        path: '/roleManager/index',
        exact: true,
        component: RoleList,
        breadcrumbName: '角色管理'
    },
    {
        path: '/stocktaking/list',
        exact: true,
        component: StocktakingList,
        breadcrumbName: '库存盘点'
    },
    {
        path: '/warningAgent/list',
        exact: true,
        component: WarningAgentList,
        breadcrumbName: '预警代办'
    },
    {
        path: '/restocking/list',
        exact: true,
        component: Restocking,
        breadcrumbName: '库位补货'
    },
    {
        path: '/warningAgent/config',
        exact: true,
        component: WarningAgentConfig,
        breadcrumbName: '预警规则'
    },
    {
        path: '/home/index',
        exact: true,
        component: HomeComponent,
        breadcrumbName: '单量统计'
    },
    {
        path: '/orderDetail/index',
        exact: true,
        component: OrderDetailComponent,
        breadcrumbName: '订单详情'
    },
    {
        path: '/returned/list',
        exact: true,
        component: ReturnGoods,
        breadcrumbName: '退货管理'
    },
    {
        path: '/infoTracking/list',
        exact: true,
        component: InfoTracking,
        breadcrumbName: '信息跟踪'
    }
];

export default routers;
