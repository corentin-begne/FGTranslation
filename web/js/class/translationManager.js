var TranslationManager = function(data){
	this.currentLevel = 0;
	this.gameManager = new GameManager();
	this.lang = $(".gameContainer").attr("lang");
	this.data = data;
	this.pass = true;
	this.init();
}
TranslationManager.prototype.init = function(){
	var that = this;
	$('.valid').mousedown(function(){
		if(that.pass){
			that.pass = false;
			that.check();
		}else{
			that.next();
		}
	});
	$('#answer').keyup(function(){
		if(event.keyCode == 13 && $(this).val() != ''){
			if(that.pass){
				that.pass = false;
				that.check();
			}else{
				that.next();
			}
		}
	});	
	this.gameManager.init("translation");
	this.nextQuestion();
}
TranslationManager.prototype.next = function(){
	if(this.gameManager.lives === 0 || this.currentLevel === this.data.length){
		this.finish();
	}else{		
		this.nextQuestion();
	}	
}
TranslationManager.prototype.nextQuestion = function(){
	this.pass = true;
	$("#answer").val("");
	$(".gameResult .result").text("");
	$("#answer").focus();
	this.gameManager.animationHelper.animateText($(".lang:eq(0) .title"), this.data[this.currentLevel][this.lang]);
}
TranslationManager.prototype.check = function(){
	var that = this;
	var lang = (this.lang == "fr") ? "en" : "fr";
	var answers = this.data[this.currentLevel][lang].split(', ');
	var currentAnswer = $("#answer").val().toLowerCase();
	var success = false;
	answers.forEach(function(answer){
		if(currentAnswer == answer.toLowerCase()){
			success = true;
			return;
		}
	});
	this.gameManager.check(success);
	$(".gameResult .result").css("color", (success) ? "darkgreen" : "darkred").text(this.data[this.currentLevel][lang]);
	this.currentLevel++;	
}
TranslationManager.prototype.finish = function(){
	var that = this;
	this.gameManager.finish(function(data){
		if(data.success){
			if(that.gameManager.points === that.data.length){
				$(".totalResult .title").css("color", "darkgreen").text("SUCCESS");
			}else{
				$(".totalResult .title").css("color", "darkred").text("FAILED");
			}
			$(".totalResult .points").text(that.gameManager.points);
			$(".totalResult").parent().removeClass("hide");
		}
	});
}