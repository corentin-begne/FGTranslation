var AnimationHelper = function(){
 	this.speed = 250;
}
AnimationHelper.prototype.show = function(container, cb){
	container.css({
		opacity:0
	}).removeClass('hide').animate({
		opacity:"+=1"
	},{
		duration:this.speed,
		complete:function(){
			container.removeClass('hide');
			if(cb !== undefined){
				cb();
			}
		}
	});
}
AnimationHelper.prototype.hide = function(container, cb){
	container.css({
		opacity:1
	}).animate({
		opacity:"-=1"
	},{
		duration:this.speed,
		complete:function(){
			container.addClass('hide');
			if(cb !== undefined){
				cb();
			}
		}
	});	
}