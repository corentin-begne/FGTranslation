var basepath;
var translationManager;
$(document).ready(function(){
	basepath = $("body").attr("basepath");		
	translationManager = new TranslationManager(gameData);
});