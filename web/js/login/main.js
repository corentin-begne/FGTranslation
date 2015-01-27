/*global LoginManager, JsHelper */
var loginManager;
(function(){
    "use strict";
    /** on document ready */
    $(document).ready(init);

    /**
     * @event main#initLogin
     * @description initialize login page on document ready
     */
    function init(){
        new JsHelper();
        loginManager = new LoginManager(); 
    }
    
})();