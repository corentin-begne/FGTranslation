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
AnimationHelper.prototype.lose = function(cb){
	$(".heart:last .eyeOpen").remove();
	$(".heart:last .eyeClose").remove();
	this.heartDie($(".heart:last .stand"), cb);	
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
AnimationHelper.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
AnimationHelper.prototype.heartDie = function(container, cb){
	var max = 4;
	var currentAnim = 1;
	var timer = setInterval(function(){
		if(currentAnim <= max){
			container.attr("class", "die"+currentAnim);
			currentAnim++;
		}else{
			clearInterval(timer);			
			container.parent().remove();			
			if(cb !== undefined){
				cb();
			}
		}
	}, 110);
}
AnimationHelper.prototype.animateHeart = function(container){
	var that = this;
	setTimeout(function(){
		if(container.find(".eyeOpen").length === 1){
			container.find(".eyeOpen").removeClass("eyeOpen").addClass("eyeClose");
			setTimeout(function(){
				container.find(".eyeClose").removeClass("eyeClose").addClass("eyeOpen");
			}, 250);
		}
		if(container.find("div").length === 2){
			requestAnimationFrame(function(){
				that.animateHeart(container);
			});
		}	
	}, that.getRandomInt(0,5000));
};
AnimationHelper.prototype.animateText = function(container, text){
	container.empty();
	var timer = setInterval(function(){
		if(container.text().length < text.length){
			container.text(container.text()+text[container.text().length]);
		}else{
			clearInterval(timer);
		}	
	}, 100);
}
AnimationHelper.prototype.heartStand = function(){
	var that = this;
	$(".heart").each(function(){
		var container = $(this);
		requestAnimationFrame(function(){
			that.animateHeart(container);
		});
	});
}
