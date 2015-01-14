"use strict";
/**
* @class ActionHelper
* @description to made ajax call
* @constructor
*/
var ActionHelper = function(){
	this.basePath = $("html").attr("basePath")+"/";
};

/**
 * global action
 * @param  {Object} data    data to send
 * @param  {[type]} options options of the ajax call
 */
ActionHelper.prototype.execute = function(data, options){
	$.ajax({
		type: options.type,
		data:data,
		url: this.basePath+options.action,
		dataType:options.dataType,
		success: options.cb
	});
};

/** redirect to homepage */
ActionHelper.prototype.redirectHome = function(){
	window.location.href = that.basePath;
};