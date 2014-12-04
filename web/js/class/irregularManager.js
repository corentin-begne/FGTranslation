var IrregularManager = function(data){
	this.currentLevel = 0;	
	this.data = data;
	this.gameManager = new GameManager();
	this.templateContent = '<div class="content">'+
						   		'<input class="hide" type="text" autocomplete="off"/>'+			
						   '</div>';
	this.difficultyId = parseInt($(".gameContainer").attr("difficultyId"));	
	this.types = [];
	this.init();
}
IrregularManager.prototype.init = function(){
	var that = this;
	$(".irregularContainer > div").each(function(){
		that.types.push($(this).attr("class"));
	});	
	this.gameManager.init("irregular");
	this.nextQuestion();
}
IrregularManager.prototype.next = function(){
	if(this.gameManager.lives === 0 || this.currentLevel === this.data.length){
		this.finish();
	}else{		
		this.nextQuestion();
	}	
}
IrregularManager.prototype.nextQuestion = function(){
	var that = this;
	var types = this.types.slice();
	var max = 4;
	$(".irregularContainer > div").each(function(){
		$(this).append($(that.templateContent).css("display", "none"));
		$(this).find(".content:last").show("slide", {direction: "up"});
	});
	$("input").unbind("keyup");
	$("input").keyup(function(event){
		if(event.keyCode == 13 && $(this).val() != ''){
			if($("input:isEmpty").length !== 0){		
				$("input:isEmpty:not(.hide):first").focus();	
			}else{
				that.check();
			}
		}
	});
	for(var i=0; i<this.difficultyId; i++){
		var nb = this.gameManager.animationHelper.getRandomInt(1, max);
		var type = types.splice((nb-1), 1)[0];
		$("."+type).find(".content:last input").removeClass("hide");
		max--; 
	}
	types.forEach(function(type, i){
		that.gameManager.animationHelper.animateText($("."+type).find(".content:last"), that.data[that.currentLevel][type]);
	});	
	$("input:not(.hide):first").focus();
}
IrregularManager.prototype.check = function(){
	var that = this;
	var success = true;
	$("input:not(.hide)").each(function(){
		var input = $(this);
		var valid = false;
		var answers = that.data[that.currentLevel][input.parent().parent().attr("class")].split(" / ");
		answers.forEach(function(answer, i){
			if(answer === input.val()){
				valid = true;
				return;
			}
		});
		if(valid){
			$(this).parent().css("backgroundColor", "darkgreen");
		}else{
			$(this).parent().css("backgroundColor", "darkred");
			success = false;
		}
		that.gameManager.animationHelper.animateText($(this).parent(), that.data[that.currentLevel][input.parent().parent().attr("class")]);		
		$(this).fadeOut(function(){			
			$(this).remove();
		})
	});
	this.gameManager.check(success);	
	this.currentLevel++;
	this.next();
}
IrregularManager.prototype.finish = function(){
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