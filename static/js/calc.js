/**
 * loading necessary script for requested calc, and
 * remove calc object when it's closed
 * 
 * @class NicheCalc
 */
var NicheCalc = function(){
	var oCalc = {
		"aspect_ratio": {"path":"js/aspectratio.js", "fn":"AspectRatioCalc"},
		"cost_per_year": {"path":"js/costperyear.js", "fn":"CostPerYearCalc"},
		"network_address": {"path":"js/networkaddress.js", "fn":"NetworkAddressCalc"},
		"packets_to_bytes": {"path":"js/packetstobytes.js", "fn":"PacketsToBytesCalc"},
		"pixel_per_inch": {"path":"js/pixelperinch.js", "fn":"PixelPerInchCalc"}
	};
	
	/**
	 * add event listener for page load and remove
	 * @method _init
	 * @private
	 * @return {void}
	 */
	var _init = function(){
		$.ajaxSetup({
			cache: true
		});
		
		$.each(oCalc, function(sKey, oData){
			$("#" + sKey).live("pageinit", function(){
				$.getScript(oData["path"]);
				$("form").submit(function(){return false});
			});
			
			$("#" + sKey).live("pageremove", function(){
				window[oData["fn"]].destroy();
				window[oData["fn"]] = undefined;
			});
		});
		
		$(applicationCache).bind("updateready", function(oEvent){
			applicationCache.swapCache();
		});
	}
	
	$("#toc").live("pageinit", _init);
	
	return {
		/**
		 * add "," every 3 digits
		 * @method addComma
		 * @public
		 * @param {number} Value
		 * @returns {string} FormattedValue
		 */
		addComma: function(nValue){
			var sFormatted = nValue.toString();
			while(sFormatted != (sFormatted = sFormatted.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
			return sFormatted;
		}
	}
}();
