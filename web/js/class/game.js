var Game = function(){
}
Game.prototype.finish = function(data, cb){
	$.ajax({
		type: "POST",
		data:data,
		url: '/'+$("body").attr("basepath")+'/game/result',
		dataType:'json',
		success: function(result){
			if(cb !== undefined){
				cb(result);
			}
		}
	});
}