/*global LoginManager */
"use strict";

var loginManager;
(function main(){
    /** on document ready */
    $(document).ready(init);

    /**
     * @name main#initLogin
     * @event
     * @description initialize login page
     */
    function init(){
       loginManager = new LoginManager(); 
    }
    
})();