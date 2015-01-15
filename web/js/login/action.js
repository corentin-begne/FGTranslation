/*global ActionHelper */
"use strict";
/**
* @class LoginAction
* @property {String} basePath base path used for ajax call
* @property {ActionHelper} [actionHelper = new ActionHelper()] Instance of ActionHelper
* @constructor
*/
var LoginAction = function(){
	this.basePath = "login";
	this.actionHelper = new ActionHelper();
};

/**
 * log user
 * @param  {Object}   data data to send
 * @param  {Function} cb   callback of the ajax call
 */
LoginAction.prototype.connect = function(data, cb){
	var options = {
		type: "post",
		action: this.basePath+"/connect",
		cb: cb,
		dataType: "json"
	};
	this.actionHelper.execute(data, options);
};