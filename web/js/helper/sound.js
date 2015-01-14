"use strict";
/**
* @class SoundHelper
* @property {String}	basePath	base path to create sound url
* @constructor
* @description Manage sounds
*/
var SoundHelper = function(){
	this.basePath = $("html").attr("basePath")+"/sounds/";
	this.audio = new Audio();
	this.init();
};

/** initialize events */
SoundHelper.prototype.init = function() {
	var that = this;

	/** assign events */
	$(this.audio).bind("canplaythrough", playSound);

	/**
	 * @name SoundHelper#playSound
     * @event
     * @description play sound on canplaythrough
     */
	function playSound(){
		that.audio.play();
	}

};

/** load a sound */
SoundHelper.prototype.play = function(name) {	
	this.audio.src = this.basePath+"/"+name+".mp3";
	this.audio.load();
};