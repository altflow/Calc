/**
 * calculate pixel per inch
 * 
 * @class PixelPerInchCalc
 */
var PixelPerInchCalc = function(){
	var _oInch   = $("#inch");
	var _oWidth  = $("#px_x");
	var _oHeight = $("#px_y");
	var _nInch, _nWidth, _nHeight, _nSqrt, _nPPI;
	
	/**
	 * calculate pixel per inch if input values are valid
	 * @method _calc
	 * @private
	 * @return {void}
	 */
	var _calc = function(){
		_nInch   = parseFloat(_oInch.val());
		_nWidth  = parseFloat(_oWidth.val());
		_nHeight = parseFloat(_oHeight.val());
		
		$("#ppi").text("");
		if (_nInch && _nWidth && _nHeight) {
			_nSqrt = Math.sqrt(_nWidth*_nWidth + _nHeight*_nHeight);
			_nPPI  = Math.round(_nSqrt*1000/_nInch) / 1000;
			$("#ppi").text(_nPPI + " ppi (" + _nInch + " inch, " + _nWidth + " x " + _nHeight + ")");
		}
	};
	
	$("#ppi_input").keyup(_calc);
	
	return {
		/**
		 * clean up event listener
		 * @method destroy
		 * @public
		 * @return {void}
		 */
		destroy: function(){
			$("#ppi_input").unbind("keyup");
		}
	}
}();