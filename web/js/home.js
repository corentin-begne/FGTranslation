var animationHelper = new AnimationHelper();
var pass = true;
var basepath;
function changeCategory(direction){
	var cat = $('.category:not(.hide)');
	var newCat = (direction === "left") ? cat.prev(".category") : cat.next(".category");
	if(newCat.length > 0){
		animationHelper.hide(cat, function(){
			animationHelper.show(newCat);
		});
	}	
}
$.extend(
{
    redirectPost: function(location, args)
    {
        var form = '';
        $.each( args, function( key, value ) {
            form += '<input type="hidden" name="'+key+'" value="'+value+'">';
        });
        $('<form action="'+location+'" method="POST">'+form+'</form>').appendTo('body').submit();
    }
});
$(document).ready(function(){
	basepath = $("body").attr("basepath");
	$(".left, .right").mousedown(function(){
		changeCategory($(this).attr("class"));
	});
	$(".category").mousedown(function(){
		animationHelper.hide($(this).parent(), function(){
			animationHelper.show($(".gameContainer"));
		});
	});
	$(".game").mousedown(function(){
		$(".optionContainer .title").text($('.category:not(.hide)').attr("name"));		
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
			$.redirectPost("/"+basepath+"/game/play", {
				lang:$(".lang.selected").attr("id"),
				difficultyId:$(".difficulty.selected").attr("id"),
				categoryId:$('.category:not(.hide)').attr("id"),
				gameId:$('.game:not(.hide)').attr("id")
			});
		}
	});
});