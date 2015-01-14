/*global SoundHelper, AnimationHelper, GameAction */
"use strict";
/**
 * @class GameManager
 * @constructor
 * @property {Number}			[points = 0]								current user points
 * @property {AnimationHelper}	[animationHelper = new AnimationHelper()]	Instance of AnimationHelper
 * @property {SoundHelper}		[soundHelper = new SoundHelper()]			Instance of SoundHelper
 * @property {GameAction}		[gameAction = new GameAction()]				Instance of GameAction
 * @property {Number}			[lives = $(".heart").length]				current user lives
 * @property {Number}			[_dieSpeed = 500]							time to wait to launch die animation in ms
 * @description Manage games
 */
var GameManager = function(){
	this.points = 0;
	this.animationHelper = new AnimationHelper();
	this.soundHelper = new SoundHelper();
	this.gameAction = new GameAction();
	this.lives = $(".heart").length;
	this._dieSpeed = 500;
};

/** initialize events */
GameManager.prototype.init = function(){
	var that = this;

	/** assign events */
	$(".menu").mousedown(redirectHome);
	$(".replay").mousedown(replay);

	/**
	 * @name GameManager#redirectHome
	 * @description redirect to homepage on mousedown
	 */
	function redirectHome(){
		that.gameAction.actionHelper.redirectHome();
	}

	/**
	 * @name GameManager#replay
	 * @description redirect to homepage on mousedown
	 */
	function replay(){
		window.location.reload();
	}

	/** animate hearts */
	this.animationHelper.heartStand();
};

/**
 * @description play sound, manage point and lives switch success
 * @param  {Boolean} success let know if the answer is valid
 */
GameManager.prototype.valid = function(success){
	var that = this;

	if(!success){
		this.soundHelper.play("success");
		this.points++;				
	}else{
		this.lives--;
		this.soundHelper.play("error");
		setTimeout(dieReady, this._dieSpeed);
	}
	
	/**
	 * @name GameManager#dieReady
	 * @description play sond and heart animation on timeout
	 */	
	function dieReady(){
		that.soundHelper.play("pop");
		that.animationHelper.lose();
	}

};

/** send result on game finish */
GameManager.prototype.finish = function(cb){
	var container = $(".gameContainer");

	this.gameAction.updateResult({
		points			: this.points,
		gameId			: container.attr("gameId"),
		difficultyId	: container.attr("difficultyId"),
		categoryId		: container.attr("categoryId"),
		lang			: container.attr("lang")	
	}, cb);
};