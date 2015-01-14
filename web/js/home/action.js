"use strict";
/**
* @class HomeAction
* @property {String}		basePath							base path used for ajax call
* @property {ActionHelper}	[actionHelper = new ActionHelper()] Instance of ActionHelper
* @constructor
*/
var HomeAction = function(){
	this.basePath = $("html").attr("basePath");
};

/**
 * redirect to game selected
 * @param  {Object}   data data to send
 * @param  {Function} cb   callback of the ajax call
 */
HomeAction.prototype.play = function(type, data){
	var path = this.basePath+"/game/"+type;
	$.redirectPost(path, data);
};