/**
 * calculate bunch of network information from network address (IP/Subnet)
 * @class NetworkAddressCalc
 */
var NetworkAddressCalc = function(){
	var _oNetAddrForm = $("#netaddr_input");
	var _oIpAndMask   = $("#ipmask");
	var _sIp          = "";
	var _aIp          = [];
	var _nSubnetMask  = 0;
	var _sSubnetMask  = "";
	var _aSubnetMask  = [];
	
	/**
	 * calculate IP address bandwidth from given IP and subnet mask
	 * @method _calc
	 * @private
	 * @return {void}
	 */
	var _calc = function(){
		var _aNetIp     = [];
		var _sNetIp     = "";
		var _aBroadCast = [];
		var _sBroadCast = "";
		var _nNumOfIp   = 0;
		var _nHostPart  = Math.floor(_nSubnetMask/8);
		var _sResults   = "";

		for (var i=0; i<4; i++) {
			// convert subnet from bits (/n) to IP format (xxx.xxx.xxx.xxx)
			if (i < _nHostPart) {
				_aSubnetMask[i] = 255;
			} else if (i == _nHostPart) {
				_aSubnetMask[i] = 256 - Math.pow(2, 8 - _nSubnetMask%8);
			} else {
				_aSubnetMask[i] = 0;
			}
			
			// calculation
			_aNetIp[i]     = _aIp[i] & _aSubnetMask[i];
			_aBroadCast[i] = 256 + (_aIp[i] | ~_aSubnetMask[i]);
		}
		
		_sNetIp      = _aNetIp.join(".");
		_nNumOfIp    = Math.pow(2, 32-_nSubnetMask);
		_sBroadCast  = _aBroadCast.join(".");
		_sSubnetMask = _aSubnetMask.join(".");
		
		_sResults = "Network Address: " + _sNetIp + "<br />"
		          + "Number of IPs: " + _nNumOfIp + "<br />"
				  + "Broadcast Address: " + _sBroadCast + "<br />"
				  + "Subnet Mask: " + _sSubnetMask;
		
		$("#netaddr").html(_sResults);
	};
	
	/**
	 * parse IP and then execute calculation if the given value is in valid format
	 * @method _exec
	 * @private
	 * @return {void}
	 */
	var _exec = function(){
		var _aTmp    = _oIpAndMask.val().split("/");
		_sIp         = _aTmp[0];
		_aIp         = _sIp.split(".");
		_nSubnetMask = parseInt(_aTmp[1]); // will be NaN if empty
		
		$("#netaddr").text("");
		
		if (_aIp.length == 4 && _nSubnetMask) {
			_calc();
		}
	};
	
	_oNetAddrForm.keyup(_exec);
	
	return {
		/**
		 * clean up event listener
		 * @method destroy
		 * @public
		 * @return {void}
		 */
		destroy: function(){
			_oNetAddrForm.unbind("keyup");
		}
	};
}();