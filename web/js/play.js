var basepath;
var gameManager;
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
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var heartDie = function(container){
	var max = 4;
	var currentAnim = 1;
	var timer = setInterval(function(){
		if(currentAnim <= max){
			container.attr("class", "die"+currentAnim);
			currentAnim++;
		}else{
			clearInterval(timer);
			container.parent().remove();
		}
	}, 110);
}
var animHeart = function(container){
	setTimeout(function(){
		if(container.find(".eyeOpen").length === 1){
			container.find(".eyeOpen").removeClass("eyeOpen").addClass("eyeClose");
			setTimeout(function(){
				container.find(".eyeClose").removeClass("eyeClose").addClass("eyeOpen");
			}, 250);
		}
		if(container.find("div").length === 2){
			requestAnimationFrame(function(){
				animHeart(container);
			});
		}	
	}, getRandomInt(0,5000));
};
var animateText = function(container, text){
	container.empty();
	var timer = setInterval(function(){
		if(container.text().length < text.length){
			container.text(container.text()+text[container.text().length]);
		}else{
			clearInterval(timer);
		}	
	}, 100);
}
$(document).ready(function(){
	basepath = $("body").attr("basepath");
	$(".heart").each(function(){
		var container = $(this);
		requestAnimationFrame(function(){
			animHeart(container);
		});
	});	
	gameManager = new GameManager(gameData);
});