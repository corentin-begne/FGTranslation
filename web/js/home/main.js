/*global HomeManager, JsHelper */
"use strict";

var homeManager;
(function main(){
    /** on document ready */
    $(document).ready(init);

    /**
     * @event main#initHome
     * @description Initialize home page
     */
    function init(){
        new JsHelper();
        homeManager = new HomeManager(); 
    }
    
})();