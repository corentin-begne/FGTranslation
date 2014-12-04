var GameManager = function(){
	this.basePath = $("body").attr("basepath");
	this.points = 0;
	this.animationHelper = new AnimationHelper();
	this.lives = $(".heart").length;
	this.audio;
}
GameManager.prototype.check = function(success){
	var that = this;
	if(!success){
		this.audio = new Audio(this.basePath+"/sounds/error.mp3");
		setTimeout(function(){
			that.animationHelper.lose(function(){
				that.audio = new Audio(that.basePath+"/sounds/pop.mp3");
				$(that.audio).unbind("canplaythrough");
				$(that.audio).bind("canplaythrough", function(){
					that.audio.play();
				});
				that.audio.load();
			});
		}, 500);
		this.lives--;
	}else{
		this.audio = new Audio(this.basePath+"/sounds/success.mp3");
		this.points++;
	}
	$(this.audio).unbind("canplaythrough");
	$(this.audio).bind("canplaythrough", function(){
		that.audio.play();
	});
	this.audio.load();
}
GameManager.prototype.init = function(game){
	var that = this;
	$(".menu").mousedown(function(){
		window.location.href = that.basePath+"/";
	});
	$(".replay").mousedown(function(){
		that.go(game, {
			gameId:$(".gameContainer").attr("gameId"),
			difficultyId:$(".gameContainer").attr("difficultyId"),
			categoryId:$(".gameContainer").attr("categoryId"),
			lang:$(".gameContainer").attr("lang")		
		});
	});	
	this.animationHelper.heartStand();
}
GameManager.prototype.go = function(type, data){
	var path = this.basePath+"/game/"+type
	if(type === "home"){
		path = this.basePath;
	}
	$.redirectPost(path, data);
}
GameManager.prototype.finish = function(cb){
	$.ajax({
		type: "POST",
		data:{
			points:this.points,
			gameId:$(".gameContainer").attr("gameId"),
			difficultyId:$(".gameContainer").attr("difficultyId"),
			categoryId:$(".gameContainer").attr("categoryId"),
			lang:$(".gameContainer").attr("lang")	
		},
		url: this.basePath+'/game/result',
		dataType:'json',
		success: function(result){
			if(cb !== undefined){
				cb(result);
			}
		}
	});
}