var animationHelper = new AnimationHelper();
var pass = true;
var basepath;
var targetPath = "/game/play";
var gameId;
function changeCat(direction, className){
	var cat = $(className+':not(.hide)');
	var newCat = (direction === "left") ? cat.prev(className) : cat.next(className);
	if(newCat.length > 0){
		animationHelper.hide(cat, function(){
			animationHelper.show(newCat);
		});
	}	
}
$(document).ready(function(){
	basepath = $("body").attr("basepath");
	$(".left, .right").mousedown(function(){
		changeCat($(this).attr("class"), ".category");
	});
	$(".game").mousedown(function(){
		gameId = $(this).attr("id");
		if(parseInt($(this).attr("id")) === 2){
			//window.location.href = "/"+basepath+"/game/irregular";
			$(".langContainer").hide();
			$(".optionContainer .title").text($(this).text());
			targetPath = "/game/irregular";		
			$(".optionContainer").parent().removeClass("hide");			
			setTimeout(function(){
				$(".optionContainer").css({
					top:"calc(50% - "+($(".optionContainer").outerHeight()/2)+"px)"
				});
			}, 50);
		}else{
			animationHelper.hide($(this).parent(), function(){
				animationHelper.show($(".categoryContainer"));
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
		if(pass){
			pass = false;
			$.redirectPost("/"+basepath+targetPath, {
				lang:$(".lang.selected").attr("id"),
				difficultyId:$(".difficulty.selected").attr("id"),
				categoryId:$('.category:not(.hide)').attr("id"),
				gameId:gameId
			});
		}
	});
});