/*global LoginAction */
"use strict";
/**
 * @class LoginManager
 * @constructor
 * @property {Boolean}		_isAvailable						value to know if the ajax call can be made
 * @property {String}		username							name of the user validate in the input
 * @property {LoginAction}	[loginAction = new LoginAction()]	Instance of LoginAction
 * @property {String}		basePath							base path url for the ajax call
 */
var LoginManager = function(){
	this._isAvailable = true;
	this.username = "";
	this.loginAction = new LoginAction();
	this.basePath = $("body").attr("basepath");
	this.init();
};

/** initialize event */
LoginManager.prototype.init = function(){
	var that = this;
	var input = $("#login");
	
	/** initialize input keyup event */
	input.keyup(validLogin);

	/**
	 * @name LoginManager#validLogin
     * @event
     * @param {Event} event keyup event object
     * @description valid input value on enter keyup
     */
	function validLogin(event){
		if(event.keyCode === 13 && input.val() !== "" && that._isAvailable){
			that._isAvailable = false;			
			that.username = input.val();
			$(".backdrop").show();
			that.logUser();
		}
	}

    input.focus();
};

/** log user and redirect to home page */
LoginManager.prototype.logUser = function(){
	var that = this;		
	
	/** ajax call to log user in session */
	this.loginAction.connect({name:that.username}, redirectHome);	

	/**
     * @name LoginManager#redirectHome
     * @event
     * @description redirect user to home page on connection success
     */
	function redirectHome(data){
		if(data.success){
			window.location.href = that.basepath+"/";
		}
		that._isAvailable = true;
		$(".backdrop").hide();
	}

};