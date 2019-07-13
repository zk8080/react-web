import type {LoadGrid} from '../../utils/load-serve';

/**
 * State 相关操作接口
 */
export interface StateOperation {
	/**
	 * 加载数据列表
	 * @param loadGrid
	 */
	loadGrid(loadGrid: LoadGrid): void;

	/**
	 * 刷新数据列表
	 * @param dataList
	 */
	refreshDataList(dataList: Array): void;

	/**
	 * 刷新分页信息
	 * @param
	 */
	refreshPage(pageInfo: {total: number, size: number, current: number}): void;

	/**
	 * table change function
	 * @param page
	 * @param search
	 * @param order
	 */
	tableChange(page: any, search: any, order: any): void;
}
