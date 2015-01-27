/*global HomeAction, AnimationHelper */
"use strict";
/**
 * @class HomeManager
 * @constructor
 * @property {Boolean}			[_isAvailable=true]							to know if action is available
 * @property {String}			[gameName=""]								name of the game selectioned
 * @property {Number}			[gameId=0]									Id of the game selectioned
 * @property {Number}			[_fontLoadingSpeed=100]						font loading time speed in ms
 * @property {HomeAction}		[homeAction = new HomeAction()]				Instance of HomeAction
 * @property {AnimationHelper}	[animationHelper = new AnimationHelper()]	Instance of AnimationHelper
 * @description Manage homepage
 */
var HomeManager = function(){
	this._isAvailable = true;
	this._fontLoadingSpeed = 100;
	this.gameName = "";
	this.gameId = 0;
	this.homeAction = new HomeAction();
	this.animation = AnimationHelper.getInstance();
	this.init();
};

/** initialize events */
HomeManager.prototype.init = function(){
	var that = this;

	/** assign events */
	$(".up, .down").mousedown(changeCategory);
	$(".category").mousedown(selectCategory);
	$(".game").mousedown(selectGame);
	$(".difficulty").mousedown(selectDifficulty);
	$(".lang").mousedown(selectLang);
	$(".play").mousedown(launchGame);

	/**
     * @name HomeManager#changeCategory
     * @event
     * @description change category switch direction mousedown
     */
	function changeCategory(){
		if(!that._isAvailable){
			return false;			
		}

		that._isAvailable = false;
		var className = $(this).attr("class");
		that.changeCategory(className, ".category");
	}

	/**
     * @name HomeManager#selectCategory
     * @event
     * @description show option interface on category selection mousedown
     */
	function selectCategory(){	
		that.showOptionContainer($(this).attr("name"));
	}

	/**
     * @name HomeManager#selectGame
     * @event
     * @description show option interface or category container switch game selection mousedown
     */
	function selectGame(){
		that.gameId = Number($(this).attr("id"));
		that.gameName = $(this).attr("name");

		/** switch game */
		switch(that.gameId){
			case 2 :
				$(".langContainer").hide();
				that.showOptionContainer($(this).text());
				break;

			default :
				that.animation.hide($(this).parent(), showCategoryContainer);
				break;
		}

		/**
		 * @name HomeManager#showCategoryContainer
		 * @event
		 * @description show category container on game container hide
		 */
		function showCategoryContainer(){
			that.animation.show($(".categoryContainer"));
		}

	}
	
	/**
	 * @name HomeManager#selectDifficulty
	 * @event
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
	 * @event
	 * @description select lang on mousedown
	 */	
	function selectLang(){
		if(!$(this).hasClass("selected")){
			$(".lang").removeClass("selected");
			$(this).addClass("selected");
		}
	}

	/**
	 * @name HomeManager#launchGame
	 * @event
	 * @description launch game on mousedown
	 */	
	function launchGame(){
		that.homeAction.play(that.gameName, {
			lang			: $(".lang.selected").attr("id"),
			difficultyId	: $(".difficulty.selected").attr("id"),
			categoryId		: $(".category:not(.hide)").attr("id"),
			gameId			: that.gameId
		});
	}						

};

/**
 * @description show option container on game select
 * @param  {String} title title of the option container
 */
HomeManager.prototype.showOptionContainer = function(title){
	var optionContainer = $(".optionContainer");

	/** initialize configuration interface */
	optionContainer.find(".title").text(title);	
	optionContainer.parent().removeClass("hide");
	setTimeout(fontReady, this._fontLoadingSpeed);

	/**
	 * @name HomeManager#fontReady
	 * @event
	 * @description center option container on font ready
	 */	
	function fontReady(){
		optionContainer.css({
			top:"calc(50% - "+(optionContainer.outerHeight()/2)+"px)"
		});
	}

};

/**
 * @description change category on mousedown
 * @param  {String} direction [description]
 * @param  {String} className [description]
 */
HomeManager.prototype.changeCategory = function(direction, className){
	var that = this;
	var cat = $(className+":not(.hide)");
	var newCat = (direction === "up") ? cat.prev(className) : cat.next(className);	

	if(newCat.length > 0){
		this.animation.hide(cat, showNextCategory);
	}

	/**
	 * @name HomeManager#showNextCategory
	 * @event
	 * @description show next category
	 */
	function showNextCategory(){
		that.animation.show(newCat, setActionAvailable);

		/**
		 * @name HomeManager#setActionAvailable
		 * @event
		 * @description change private value to set action available
		 */
		function setActionAvailable(){
			that._isAvailable = true;
		}

	}

};