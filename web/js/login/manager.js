/*global ActionModel */
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
	this.init();
};

/**
 * @method LoginManager#init
 * @description initialize event
 */
LoginManager.prototype.init = function(){
	var action = ActionModel.getInstance();
    var username = "";
    var isAvailable = true;
	var input = $("#login");
	
	/** initialize input keyup event */
	input.keyup(validLogin);

	/**
	 * @event LoginManager#validLogin
     * @param {Event} event keyup event object
     * @description valid input value on enter keyup
     */
	function validLogin(event){
        var backdrop = $(".backdrop");
        username = input.val();
		if(event.keyCode === 13 && username !== "" && isAvailable){
			isAvailable = false;						
			backdrop.show();
			action.sendData("login/connect", {name:username}, redirectHome);    
		}

        /**
         * @method LoginManager#redirectHome
         * @private
         * @description redirect user to home page on connection success
         */
        function redirectHome(data){
            if(data.success){
                window.location.href = action.basePath;
            }
            isAvailable = true;
            backdrop.hide();
        }
	}

    input.focus();
};