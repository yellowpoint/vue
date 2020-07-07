module.exports = function(e) {
	
	isNumber : function (checkVal){
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
		return reg.test(checkVal);
	},
	isMobile : function (checkVal){
		var reg = /^1[3456789]\d{9}$/;
		return reg.test(checkVal);
	},
	isEmail : function (checkVal){
		var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return reg.test(checkVal);
	},
	isCode : function (checkVal){
		var reg = /^[0-9]{6}$/;
		return reg.test(checkVal);
	}
	
}
