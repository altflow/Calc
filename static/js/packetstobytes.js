/**
 * calculate packets, MB, KB and bytes for given value
 * @class PacketsToBytesCalc
 */
var PacketsToBytesCalc = function(){
	var _oP2bInput  = $("#p2b_in");
	var _oP2bUnit   = $("input[name='unit']");
	var _oP2bOutput = $("#p2b_out");
	var _sResults   = "";
	var _nPackets   = 0;
	var _nMB        = 0;
	var _nKB        = 0;
	var _nBytes     = 0;
	var _nSrcValue  = 0;
	var _sSrcUnit   = "";
	
	/**
	 * returns packets to given value
	 * @method _getPackets
	 * @private
	 * @param {number} SrcValue
	 * @param {string} SrcUnit
	 * @return {number} Packets
	 */
	var _getPackets = function(nSrcValue, sSrcUnit){
		var nPackets = 0;
		
		var oCalc = {
			"packets": nSrcValue,
			"bytes": nSrcValue / 128,
			"kb": (nSrcValue*1024) / 128,
			"mb": (nSrcValue*1024*1024) / 128
		};
		
		return oCalc[sSrcUnit];
	};

	/**
	 * calculate packets, bytes, KB and MB
	 * @method _calc
	 * @private
	 * @return {void}
	 */
	var _calc = function(){
		_oP2bOutput.html("");
		
		_nSrcValue = parseFloat(_oP2bInput.val());
		_sSrcUnit  = _oP2bUnit.filter(":checked").val();

		if (isNaN(_nSrcValue) || !_sSrcUnit || _sSrcUnit === "") {
			return;
		}
		
		_nPackets = _getPackets(_nSrcValue, _sSrcUnit);
		_nBytes   = _nPackets * 128;
		_nKB      = Math.round(_nBytes / 1024);
		_nMB      = Math.round(_nBytes / 1024 / 1024);
		
		_sResults = NicheCalc.addComma(_nPackets) + " packets <br />"
				  + NicheCalc.addComma(_nBytes)   + " bytes <br />"
				  + NicheCalc.addComma(_nKB)      + " KB <br />"
				  + NicheCalc.addComma(_nMB)      + " MB";
		
		_oP2bOutput.html(_sResults);
	};
	
	_oP2bInput.keyup(_calc);
	_oP2bUnit.change(_calc);
	
	return {
		/**
		 * clean up event listener
		 * @method destroy
		 * @public
		 * @return {void}
		 */
		destroy: function(){
			_oP2bInput.unbind("keyup");
			_oP2bUnit.unbind("change");
		}
	};
}();