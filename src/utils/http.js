import axios, { AxiosPromise } from 'axios';
import { toJS } from 'mobx';

class Http {
	_get(url: string, param:{}, successCallback: (result: Result) => void, finallyCallback: ()=> void = ()=>{}) {
		this.requestHandler(axios.get(url, {params: param}), successCallback, finallyCallback);
	}

	_post(url: string, param:{}, successCallback: (result: Result) => void, finallyCallback: ()=> void = ()=>{}) {
		this.requestHandler(axios.post(url, toJS(param)), successCallback, finallyCallback);
	}

	requestHandler(http: AxiosPromise<T>, successCallback: (result: Result) => void, finallyCallback: ()=> void) {

		http.then(value => {
			// 设置过滤器
			if (value.status === 200) {
				if (this.resultFilter(value.data)) {
					successCallback(value.data);
				}
			}
			

		}).catch(error => this.catchHandler(error)).finally( () => {
			if (finallyCallback) finallyCallback();
		});
	}

	/**
	 * 结果过滤器
	 * @param result
	 */
	resultFilter(result: Result): boolean {
		return true;
	}

	/**
	 * 异常处理器
	 * @param error
	 */
	catchHandler(error: any) {
		console.error(toJS(error));
	}
}
export const $http = new Http();

/**
 * 返回值定义
 */
export interface Result {
	/**
	 * 返回代码 0-成功
	 */
	code: number,
	/**
	 * 返回描述信息
	 */
	msg: string,
	/**
	 * 是否有业务数据0-没有 1-有
	 */
	status: number,
	/**
	 * 业务对象数据
	 */
	data: any | {total: number, size: number, current: number, rows: []}
}
