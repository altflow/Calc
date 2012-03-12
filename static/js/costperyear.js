/**
 * calculate cost per year, month and day
 * @class CostPerYearCalc
 */
var CostPerYearCalc = function(){
	var _oCostInput  = $("#cost");
	var _oPeriod     = $("input[name='period']");
	var _oCostOutput = $("#cost_output");
	var _nYearlyCost = 0;
	var _sResults    = "";
	var _nSrcValue   = 0;
	var _sSrcPeriod  = "";
	
	/**
	 * returns yearly cost
	 * @method _getYearlyCost
	 * @private
	 * @param {number} SrcValue
	 * @param {string} SrcPeriod
	 * @return {number} Cost
	 */
	var _getYearlyCost = function(nSrcValue, sSrcPeriod){
		var nCost = 0;
		
		var oCalc = {
			"day": nSrcValue * 365,
			"month": nSrcValue * 12,
			"year": nSrcValue
		};
		
		return oCalc[sSrcPeriod];
	};

	/**
	 * calculate cost for all period - year, month and day
	 * @method _calc
	 * @private
	 * @return {void}
	 */
	var _calc = function(){
		_oCostOutput.html("");
		
		_nSrcValue  = parseFloat(_oCostInput.val());
		_sSrcPeriod = _oPeriod.filter(":checked").val();

		if (isNaN(_nSrcValue) || !_sSrcPeriod || _sSrcPeriod === "") {
			return;
		}
		
		_nYearlyCost = _getYearlyCost(_nSrcValue, _sSrcPeriod);
		
		_sResults = "Year: " + NicheCalc.addComma( Math.round(_nYearlyCost) ) + "<br />"
				  + "Month: " + NicheCalc.addComma( Math.round(_nYearlyCost/12) ) + "<br />"
				  + "Day: " + NicheCalc.addComma( Math.round(_nYearlyCost/365) );
	
		_oCostOutput.html(_sResults);
	};
	
	_oCostInput.keyup(_calc);
	_oPeriod.change(_calc);
	
	return {
		/**
		 * clean up event listener
		 * @method destroy
		 * @public
		 * @return {void}
		 */
		destroy: function(){
			_oCostInput.unbind("keyup");
			_oPeriod.unbind("change");
		}
	};
}();