var basepath;
var irregularManager;
$(document).ready(function(){
	basepath = $("body").attr("basepath");		
	irregularManager = new IrregularManager(gameData);
});