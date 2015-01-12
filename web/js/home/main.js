/*global HomeManager */
"use strict";

var homeManager;
(function main(){
    /** on document ready */
    $(document).ready(init);

    /**
     * @event
     * @description initialize home page
     */
    function init(){
       homeManager = new HomeManager(); 
    }
})();