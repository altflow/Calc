/**
 * calculate aspect ratio and pixel
 * @class AspectRatioCalc
 */
var AspectRatioCalc = function(){
	var _oInput     = $("#ratio");
	var _oRatioW    = $("#ratio_width");
	var _oRatioH    = $("#ratio_height");
	var _oPxWidth   = $("#px_width");
	var _oPxHeight  = $("#px_height");
	
	// calculation: target = src * required[0] / required[1]
	var _oRelation = {
		"ratio_width": {"src":_oRatioW, "required":[_oPxHeight, _oRatioH], "target":_oPxWidth},
		"ratio_height": {"src":_oRatioH, "required":[_oPxWidth, _oRatioW], "target":_oPxHeight},
		"px_width": {"src":_oPxWidth, "required":[_oRatioH, _oRatioW], "target":_oPxHeight},
		"px_height": {"src":_oPxHeight, "required":[_oRatioW, _oRatioH], "target":_oPxWidth}
	};
	
	/**
	 * calculate aspect ratio or pixel
	 * @method _calc
	 * @private
	 * @param {object} Event
	 * @return {void}
	 */
	var _calc = function(oEvent){
		var sSrcId     = oEvent.target.id;
		var nSrcValue  = parseFloat( _oRelation[sSrcId]["src"].val() );
		var nRequired0 = parseFloat( _oRelation[sSrcId]["required"][0].val() );
		var nRequired1 = parseFloat( _oRelation[sSrcId]["required"][1].val() );
		
		if (isNaN(nSrcValue) || isNaN(nRequired0) || isNaN(nRequired1)) {
			return;
		}
		
		_oRelation[sSrcId]["target"].val( nSrcValue * nRequired0 / nRequired1 );
	};
	
	_oInput.keyup(_calc);
	
	return {
		/**
		 * clean up event listener
		 * @method destroy
		 * @public
		 * @return {void}
		 */
		destroy: function(){
			_oInput.unbind("keyup");
		}
	};
}();