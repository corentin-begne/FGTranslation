var IrregularManager = function(data){
	this.currentLevel = 0;
	this.points = 0;
	this.game = new Game();
	this.animationHelper = new AnimationHelper();
	this.lives = $(".heart").length;
	this.lang = $(".gameContainer").attr("lang");
	this.data = data;
	this.audio;
	this.pass = true;
	this.init();
}
IrregularManager.prototype.init = function(){
	var that = this;
	this.animationHelper.heartStand();
	this.nextQuestion();
}
IrregularManager.prototype.next = function(){
	if(this.lives === 0 || this.currentLevel === this.data.length){
		this.finish();
	}else{		
		this.nextQuestion();
	}	
}
IrregularManager.prototype.nextQuestion = function(){

}
IrregularManager.prototype.check = function(){
	
}
IrregularManager.prototype.lose = function(){

}
IrregularManager.prototype.finish = function(){
	this.game.finish({
		points:this.points,
		gameId:$(".gameContainer").attr("gameId"),
		difficultyId:$(".gameContainer").attr("difficultyId"),
		categoryId:$(".gameContainer").attr("categoryId"),
		lang:this.lang
	});	
}