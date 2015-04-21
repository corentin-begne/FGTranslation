/*global SoundHelper, ActionModel */
"use strict";
/**
 * @class GameManager
 * @constructor
 * @property {AnimationHelper}	[animation = new AnimationHelper()]			Instance of AnimationHelper
 * @property {SoundHelper}		[sound = new SoundHelper()]					Instance of SoundHelper
 * @property {GameAction}		[action = new ActionModel()]				Instance of GameAction
 * @property {Number}			[_dieSpeed = 500]							time to wait to launch die animation in ms
 * @description Manage games
 */
var GameManager = function(){
	this.animation =  AnimationHelper.getInstance();
	this.sound = SoundHelper.getInstance();
	this.action = ActionModel.getInstance();
	this._dieSpeed = 500;
};

/** initialize events */
GameManager.prototype.init = function(){
	var that = this;
	var points = 0;
	var lives = $(".heart").length;

	/** assign events */
	$(".menu").mousedown(redirectHome);
	$(".replay").mousedown(replay);

	/**
	 * @name GameManager#redirectHome
	 * @event
	 * @description redirect to homepage on mousedown
	 */
	function redirectHome(){
		that.action.redirectHome();
	}

	/**
	 * @name GameManager#replay
	 * @event
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