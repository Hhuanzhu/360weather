function $$(element){
	return document.querySelector(element);
}
var citybtn=$$('.citybtn');
var city=$$('#city');
var area=$$('#area');
var province=$$('#province');
var wethercity=$$('.wethercity');
var wethertime=$$('.wethertime');
var youxiu=$$('.youxiu');
var temperature=$$('#temperature');
var weathertype=$$('#weathertype');
var humidity=$$('#humidity');
var winddir=$$('#winddir');
var windpower=$$('#windpower');
var icon_tu=document.querySelectorAll('.icon-tu');
var otherinfo=document.querySelectorAll('.otherinfo');
var colora=document.querySelectorAll('.colora');

	province.addEventListener('change',function(){
		jsonp({
			url:'http://cdn.weather.hao.360.cn/sed_api_area_query.php',
			cbName:'_jsonp',
			params:{
				app:'tq360',
				code:province.value,
				grade:'city'
			},
			backFunc:function(msg){
				// console.log(msg);
				var str = '';
				for(var i in msg){
					var oneMsg = msg[i] 
					str+= '<option value="'+oneMsg[1]+'">'+oneMsg[0]+'</option>';
				}
				city.innerHTML=str;
				// console.log(city);
			},
		});
	});
	city.addEventListener('change',function(){
		jsonp({
			url:'http://cdn.weather.hao.360.cn/sed_api_area_query.php',
			cbName:'_jsonp',
			params:{
				app:'tq360',
				code:city.value,
				grade:'town'
			},
			backFunc:function(msg){
				// console.log(msg);
				var str = '';
				for(var i in msg){
					var oneMsg = msg[i] 
					str+= '<option value="'+oneMsg[1]+'">'+oneMsg[0]+'</option>';
				}
				area.innerHTML=str;
			},
		});
	});
	area.addEventListener('change',function(){
		jsonp({
			url:'http://cdn.weather.hao.360.cn/sed_api_area_query.php',
			cbName:'_jsonp',
			params:{
				app:'tq360',
				code:area.value,
				// grade:'town'
			},
			backFunc:function(msg){
				// console.log(msg)
			}
		});
	});
	citybtn.addEventListener('click',function(){
		var timestamp = (new Date()).getTime();
		// console.log(timestamp)
		var num = timestamp+area.value;
		console.log(num)
		var num = 0;
		t=num+'';
		c=num+area.value+'';
		jsonp({
			url:'http://tq.360.cn/api/weatherquery/querys',
			cbName:'_jsonp',
			params:{
				app:'tq360',
				code:area.value,
				t:t,
				c:c
				/*t:'1528654472971',
				c:'1528755703173'*/
				//t=1528654472971&c=1528755703173
			},	
			backFunc:function(msg){
				// console.log(msg)
				// console.log(area.value)
				wethertime.innerHTML=msg.realtime.time+' 发布';
				youxiu.innerHTML='空气'+msg.pm25.quality+' '+msg.pm25.aqi;
				temperature.innerHTML=msg.realtime.weather.temperature+'°';
				weathertype.innerHTML=msg.realtime.weather.info;
				humidity.innerHTML='湿度'+msg.realtime.weather.humidity+'％';
				winddir.innerHTML=msg.realtime.wind.direct;
				windpower.innerHTML=msg.realtime.wind.power;
				for (var i = 0; i < 5 ; i++) {
					colora[i].innerHTML=msg.weather[i+1].date;
					icon_tu[i].innerHTML='<i class="icon-xiaoyu"></i><br>'+msg.weather[i+1].info.day[1];
					otherinfo[i].innerHTML='<span>'+msg.weather[i+1].info.night[2]+'~'+msg.weather[i+1].info.day[2]+'°'+'</span>'+msg.weather[i+1].info.day[4];
				}
			},

		});
	});
