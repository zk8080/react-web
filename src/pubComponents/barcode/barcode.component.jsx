import React from 'react';
import JsBarcode from 'jsbarcode';
import * as PropTypes from 'prop-types';

/**
 * 条形码组件
 */
export default class BarcodeComponent extends React.Component{
	constructor() {
		super();
		this.props = {
			// 条形码CODE
			code: PropTypes.string.isRequired,
			// 条形码高度
			height: PropTypes.number.isRequired
		};
	}

	componentDidMount(): void {
		JsBarcode(
			this.elementRef,
			this.props.code,
			{
				height: this.props.height,
				displayValue: true,
				width: 2,
				fontSize: 10,
				margin: 0
			}
		);
	}

	render(){
		return <svg ref={ref => this.elementRef = ref}></svg>;
	}
}

