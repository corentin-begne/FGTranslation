/*global ActionHelper */
"use strict";
/**
* @class TemplateAction
* @property {String}		basePath							base path used for ajax call
* @property {ActionHelper}	[actionHelper = new ActionHelper()] Instance of ActionHelper
* @constructor
*/
var TemplateAction = function(){
	this.basePath = "module";
	this.actionHelper = new ActionHelper();
};

/**
 * update module
 * @param  {Object}   data data to send
 * @param  {Function} cb   callback of the ajax call
 */
TemplateAction.prototype.update = function(data, cb){
	var options = {
		type: "post",
		action: this.basePath+"/update",
		cb: cb,
		dataType: "json"
	};
	this.actionHelper.execute(data, options);
};