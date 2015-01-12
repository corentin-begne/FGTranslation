"use strict";
/**
 * @class Autocompletion
 * @constructor
 * @property {Boolean}	_pass		value to know if the ajax call can be made
 * @property {String}	username	name of the user validate in the input
 * @property {String}	basePath    base path url for the ajax call
 */
var LoginManager = function(){
	this._pass = true;
	this.username = "";
	this.basePath = $("body").attr("basepath");
	this.init();
};

/** initialize event */
LoginManager.prototype.init = function(){
	var that = this;
	var input = $("#login");
	
	/** initialize input keyup event */
	input.keyup(inputKeyup);

	/**
	 * @name LoginManager#inputKeyup
     * @event
     * @param {Event} event keyup event object
     * @description log user on validate
     */
	function inputKeyup(event){
		if(event.keyCode === 13 && input.val() !== "" && that._pass){
			that._pass = false;			
			that.username = input.val();
			$(".backdrop").show();
			that.logUser();
		}
	};

    input.focus();
};

/** log user and redirect to home page */
LoginManager.prototype.logUser = function(){
	var that = this;		
	
	/** ajax call to log user in session */
	$.ajax({
		type: "POST",
		data:{name:that.username},
		url: that.basePath+"/login/user",
		dataType:"json",
		success: logUserSuccess
	});	

	/** ajax success callback */
	function logUserSuccess(data){
		if(data.success){
			window.location.href = that.basepath+"/";
		}
		that._pass = true;
	};
};