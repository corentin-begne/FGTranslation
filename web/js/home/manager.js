/*global AnimationHelper, ActionModel */
"use strict";
/**
 * @class HomeManager
 * @constructor
 * @property {AnimationHelper}	[animation = new AnimationHelper()]	Instance of AnimationHelper
 * @property {ActionModel}	    [animation = new ActionModel()]	    Instance of ActionModel
 * @description Manage homepage
 */
var HomeManager = function(){
	this.animation = AnimationHelper.getInstance();
	this.action = ActionModel.getInstance();
	this.init();
};

/** 
 * @description Initialize events
 * @method HomeManager#init
 */
HomeManager.prototype.init = function(){
	var that = this;
	var isAvailable = true;
	var gameId = 0;
	var gameName = "";

	/** assign events */
	$(".up, .down").mousedown(changeCategory);
	$(".category").mousedown(selectCategory);
	$(".game").mousedown(selectGame);
	$(".difficulty").mousedown(selectDifficulty);
	$(".lang").mousedown(selectLang);
	$(".play").mousedown(launchGame);

	/**
     * @event HomeManager#changeCategory
     * @description Change category switch direction mousedown
     */
	function changeCategory(){
		if(!isAvailable){
			return false;			
		}

		isAvailable = false;
		var direction = $(this).attr("class");
		var className = ".category";
		var cat = $(className+":not(.hide)");
		var newCat = (direction === "up") ? cat.prev(className) : cat.next(className);	

		if(newCat.length === 0){
			isAvailable = true;
			return false;			
		}

		that.animation.hide(cat, showNextCategory);

		/**
		 * @event HomeManager#showNextCategory
		 * @description Show next category
		 */
		function showNextCategory(){
			that.animation.show(newCat, setActionAvailable);

			/**
			 * @event HomeManager#setActionAvailable
			 * @description Change private value to set action available
			 */
			function setActionAvailable(){
				isAvailable = true;
			}

		}
	}

	/**
     * @event HomeManager#selectCategory
     * @description show option interface on category selection mousedown
     */
	function selectCategory(){	
		showOptionContainer($(this).attr("name"));
	}

	/**
     * @event HomeManager#selectGame
     * @description Show option interface or category container switch game selection mousedown
     */
	function selectGame(){
		gameId = Number($(this).attr("id"));
		gameName = $(this).attr("name");

		/** switch game */
		switch(gameId){
			case 2 :
				$(".langContainer").hide();
				showOptionContainer($(this).text());
				break;

			default :
				that.animation.hide($(this).parent(), showCategoryContainer);
				break;
		}

		/**
		 * @event HomeManager#showCategoryContainer
		 * @description Show category container on game container hide
		 */
		function showCategoryContainer(){
			that.animation.show($(".categoryContainer"));
		}
	}

	/**
	 * @method HomeManager#showOptionContainer
	 * @private
	 * @description Show option container on game select
	 * @param  {String} [title] Title of the option container
	 */
	function showOptionContainer(title){
		var optionContainer = $(".optionContainer");

		/** initialize configuration interface */
		optionContainer.find(".title").text(title);	
		optionContainer.parent().removeClass("hide");
		setTimeout(fontReady, 200);

		/**
		 * @event HomeManager#fontReady
		 * @description Center option container on font ready
		 */	
		function fontReady(){
			optionContainer.css({
				top:"calc(50% - "+(optionContainer.outerHeight()/2)+"px)"
			});
		}

	}	
	
	/**
	 * @event HomeManager#selectDifficulty
	 * @description select difficulty on mousedown
	 */
	function selectDifficulty(){
		if(!$(this).hasClass("selected")){
			$(".difficulty").removeClass("selected");
			$(this).addClass("selected");
		}
	}

	/**
	 * @name HomeManager#selectLang
	 * @description select lang on mousedown
	 */	
	function selectLang(){
		if(!$(this).hasClass("selected")){
			$(".lang").removeClass("selected");
			$(this).addClass("selected");
		}
	}

	/**
	 * @event HomeManager#launchGame
	 * @description launch game on mousedown
	 */	
	function launchGame(){
		that.action.redirectPost("game/"+gameName, {
			lang			: $(".lang.selected").attr("id"),
			difficultyId	: $(".difficulty.selected").attr("id"),
			categoryId		: $(".category:not(.hide)").attr("id"),
			gameId			: gameId
		});
	}						

};