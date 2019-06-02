const getScrollY = () => {
    // 总高度
    const totalScrollY = document.body.clientHeight;
    // header高度
    const headerHeight = document.querySelector('.header').offsetHeight || 0;
    // 面包屑高度
    const breadcrumbHeight = document.querySelector('.breadcrumb-content').offsetHeight || 0;
    // 查询组件高度
    const queryHeight = document.querySelector('.query-component') ? document.querySelector('.query-component').offsetHeight : 0;
    // 表头高度
    const tableHeaderHeight = document.querySelector('.ant-table-thead').offsetHeight || 0;
    // 获取表格scrollY
    const tableScrollY = totalScrollY - headerHeight - breadcrumbHeight - queryHeight - tableHeaderHeight - 64 - 20 - 10;
    console.log( tableScrollY, 'tableScrollY' );
    return tableScrollY;
};

export {
    getScrollY
};