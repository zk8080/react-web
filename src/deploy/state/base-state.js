import { observable, action } from 'mobx';
import { PaginationProps } from 'antd/es/pagination';

import { StateOperation } from './state-operation';
import {defaultPage, LoadGridUtil} from '../../utils/load-serve';
import { Result, $http } from '../../utils/http';

export class BaseState implements StateOperation{
	@observable dataList = [];
	@observable loading = false;
	@observable page: PaginationProps = {...defaultPage};

	loadGrid(loadGrid) {
	}

	@action refreshDataList(dataList = []) {
		this.dataList = dataList;
		this.refreshPage({total: 454, pageSize: 200, current: 78});
	}

	/**
	 * 刷新分页数据
	 * @param pageInfo
	 */
	refreshPage(pageInfo: {total: number, pageSize: number, current: number}) {
		this.page = {...this.page, current: pageInfo.current, pageSize: pageInfo.pageSize, total: pageInfo.total};
	}

	/**
	 * 标准的LoadGrid数据加载完成处理
	 * @param data
	 */
	loadGridFinished(data: {total: number, size: number, current: number, rows: []}) {
		this.refreshDataList(data.rows);
		this.refreshPage(data);
	}

	/**
	 * Table Change function binding this
	 * @param page
	 * @param search
	 * @param order
	 */
	tableChange(page, search, order) {
		this.loadGrid(LoadGridUtil.paramsBuild(page, search, order));
	}

	/**
	 * http get request
	 * @param url
	 * @param param
	 * @param successCallback
	 * @param loading
	 */
	get(url: string, param:{}, successCallback: (result: Result) => void, loading: boolean = true) {

		if (loading) {
			this.startLoading();
		}

		$http._get(url, param, successCallback, this.endLoading);
	}

	/**
	 * http post request
	 * @param url
	 * @param param
	 * @param successCallback
	 * @param loading
	 */
	post(url: string, param:{}, successCallback: (result: Result) => void, loading: boolean = true) {

		if (loading) {
			this.startLoading();
		}

		$http._post(url, param, successCallback, this.endLoading);
	}

	/**
	 * 开始加载服务数据
	 */
	startLoading = () => {
		if (!this.loading) this.loading = true;
	};

	/**
	 * 结束加载，不论成功失败
	 */
	endLoading = () => {
		if (this.loading)  this.loading = false;
	};
}
