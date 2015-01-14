/*global ActionHelper */
"use strict";
/**
* @class GameAction
* @property {String}		basePath							base path used for ajax call
* @property {ActionHelper}	[actionHelper = new ActionHelper()] Instance of ActionHelper
* @constructor
*/
var GameAction = function(){
	this.basePath = "game";
	this.actionHelper = new ActionHelper();
};

/**
 * update game result
 * @param  {Object}   data data to send
 * @param  {Function} cb   callback of the ajax call
 */
GameAction.prototype.updateResult = function(data, cb){
	var options = {
		type: "post",
		action: this.basePath+"/result",
		cb: cb,
		dataType: "json"
	};
	this.actionHelper.execute(data, options);
};