var GameManager = function(data){
	this.currentLevel = 0;
	this.points = 0;
	this.lives = $(".heart").length;
	this.lang = $(".gameContainer").attr("lang");
	this.data = data;
	this.audio;
	this.pass = true;
	this.init();
}
GameManager.prototype.init = function(){
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
	$(".menu").mousedown(function(){
		window.location.href = "/"+basepath;
	});
	$(".replay").mousedown(function(){
		$.redirectPost("/"+basepath+"/game/play", {
			gameId:$(".gameContainer").attr("gameId"),
			difficultyId:$(".gameContainer").attr("difficultyId"),
			categoryId:$(".gameContainer").attr("categoryId"),
			lang:that.lang		
		});
	});
	this.nextQuestion();
}
GameManager.prototype.next = function(){
	if(this.lives === 0 || this.currentLevel === this.data.length){
		this.finish();
	}else{		
		this.nextQuestion();
	}	
}
GameManager.prototype.nextQuestion = function(){
	this.pass = true;
	$("#answer").val("");
	$(".gameResult .result").text("");
	$("#answer").focus();
	animateText($(".lang:eq(0) .title"), this.data[this.currentLevel][this.lang]);	
}
GameManager.prototype.check = function(){
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
	if(!success){
		this.audio = new Audio("/"+basepath+"/sounds/error.mp3");
		this.lose();
		this.lives--;
	}else{
		this.audio = new Audio("/"+basepath+"/sounds/success.mp3");
		this.points++;
	}
	$(this.audio).bind("canplaythrough", function(){
		that.audio.play();
	});
	$(".gameResult .result").css("color", (success) ? "darkgreen" : "darkred").text(this.data[this.currentLevel][lang]);
	this.currentLevel++;	
}
GameManager.prototype.lose = function(){
	$(".heart:last .eyeOpen").remove();
	$(".heart:last .eyeClose").remove();
	heartDie($(".heart:last .stand"));
}
GameManager.prototype.finish = function(){
	var that = this;
	$.ajax({
		type: "POST",
		data:{
			points:this.points,
			gameId:$(".gameContainer").attr("gameId"),
			difficultyId:$(".gameContainer").attr("difficultyId"),
			categoryId:$(".gameContainer").attr("categoryId"),
			lang:this.lang
		},
		url: '/'+basepath+'/game/result',
		dataType:'json',
		success: function(data){
			if(data.success){
				if(that.points === this.data.length){
					$(".totalResult .title").css("color", "darkgreen").text("SUCCESS");
				}else{
					$(".totalResult .title").css("color", "darkred").text("FAILED");
				}
				$(".totalResult .points").text(that.points);
				$(".totalResult").parent().removeClass("hide");
			}
		}
	});	
}