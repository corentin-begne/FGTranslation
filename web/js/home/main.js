/*global HomeManager, JsHelper */
"use strict";

var homeManager;
(function main(){
    /** on document ready */
    $(document).ready(init);

    /**
     * @name main#initHome
     * @event
     * @description initialize home page
     */
    function init(){
        new JsHelper();
        homeManager = new HomeManager(); 
    }
    
})();