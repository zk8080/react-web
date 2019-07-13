import React from 'react';
import JsBarcode from 'jsbarcode';
export class BarcodeUtils {
	static generator(element, code, height: number = 50) {
		JsBarcode(element, code, {
			height: height,
			displayValue: true,
			width: 2,
			fontSize: 10,
			margin: 0
		});
	}

	static generatorElement(code, height: number = 50) {
		return <svg ref={ref => this.generator(ref, code, height)} />;
	}
}
