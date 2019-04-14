function jsonp(options) {
	options = options ||{};
	var cbName = options.cbName || null; 
	var params = options.params || {};
	var url = options.url || "";
	var backFunc = options.backFunc || null;
	var funName = 'jQuery'+Math.random();

	funName = funName.replace('.','');
	params[cbName] = funName;
	window[funName] = backFunc;
	var script = document.querySelector('#aj')
	if(script != null){
		document.body.removeChild(script)
	}
	script = document.createElement('script');
	script.src = url + '?'+conver(params);
	script.setAttribute('id', 'aj')
	document.body.appendChild(script);
};
function conver(obj){
	var str = "";
	for(var key in obj){
		str += key + "=" + obj[key] + "&";
	}
	return str.substring(0,str.length - 1);
}