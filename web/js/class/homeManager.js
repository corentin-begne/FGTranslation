var HomeManager = function(){
	this.animationHelper = new AnimationHelper();
	this.pass = true;
	this.gameName = "translation";
	this.gameId;
	this.gameManager = new GameManager();
	this.init();
}
HomeManager.prototype.init = function(){
	var that = this;
	$(".up, .down").mousedown(function(){
		if(that.pass){
			that.pass = false;
			that.changeCat($(this).attr("class"), ".category");
		}
	});
	$(".game").mousedown(function(){
		that.gameId = $(this).attr("id");
		if(parseInt($(this).attr("id")) === 2){
			$(".langContainer").hide();
			$(".optionContainer .title").text($(this).text());
			that.gameName = "irregular";		
			$(".optionContainer").parent().removeClass("hide");			
			setTimeout(function(){
				$(".optionContainer").css({
					top:"calc(50% - "+($(".optionContainer").outerHeight()/2)+"px)"
				});
			}, 50);
		}else{
			that.animationHelper.hide($(this).parent(), function(){
				that.animationHelper.show($(".categoryContainer"));
			});
		}
	});
	$(".category").mousedown(function(){
		$(".optionContainer .title").text($(this).attr("name"));		
		$(".optionContainer").parent().removeClass("hide");
		setTimeout(function(){
			$(".optionContainer").css({
				top:"calc(50% - "+($(".optionContainer").outerHeight()/2)+"px)"
			});
		}, 50);
	});
	$(".difficulty").mousedown(function(){
		if(!$(this).hasClass("selected")){
			$(".difficulty").removeClass("selected");
			$(this).addClass("selected");
		}
	});
	$(".lang").mousedown(function(){
		if(!$(this).hasClass("selected")){
			$(".lang").removeClass("selected");
			$(this).addClass("selected");
		}
	});
	$(".play").mousedown(function(){
		that.gameManager.go(that.gameName, {
			lang:$(".lang.selected").attr("id"),
			difficultyId:$(".difficulty.selected").attr("id"),
			categoryId:$('.category:not(.hide)').attr("id"),
			gameId:that.gameId
		});
	});
}
HomeManager.prototype.changeCat = function(direction, className){
	var that = this;
	var cat = $(className+':not(.hide)');
	var newCat = (direction === "up") ? cat.prev(className) : cat.next(className);	
	if(newCat.length > 0){
		this.animationHelper.hide(cat, function(){
			that.animationHelper.show(newCat, function(){
				that.pass = true;
			});
		});
	}	
}