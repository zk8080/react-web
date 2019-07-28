import {PaginationProps} from "antd/es/pagination";

/**
 * 默认分页信息
 * @type {{total: number, defaultPageSize: number, pageSizeOptions: string[], showTotal: (function(*, *): string), defaultCurrent: number, pageSize: number, showLessItems: boolean, showQuickJumper: boolean, showSizeChanger: boolean}}
 */
export const defaultPage = {
	total: 0,
	defaultCurrent: 1,
	defaultPageSize: 10,
	pageSize: 10,
	pageSizeOptions: ['10', '20', '30', '40'],
	showSizeChanger: true,
	showQuickJumper: true,
	showLessItems: true,
	showTotal: (total, range) => {
		return `${range[0]}-${range[1]} of ${total} items`;
	}
};

/**
 * 加载服务查询数据
 */
export interface LoadGrid {
	/**
	 * 每页显示条数
	 */
	pageSize: number;
	/**
	 * 当前页
	 */
	current: number;
	/**
	 * 搜索信息
	 */
	search: {[string]: any};
	/**
	 * 排序信息
	 */
	order: {[string]: any};
}

/**
 * 加载服务查询数据
 */
export class LoadGridUtil {
	/**
	 * 构建查询数据
	 * @returns {{}}
	 */
	static paramsBuild(page: PaginationProps, search, order): LoadGrid {
		return {
			pageSize: page.pageSize,
			current: page.current,
			order: {
				[order.field]: order.order == 'ascend'? 'asc': 'desc'
			}
		};
	}
}
