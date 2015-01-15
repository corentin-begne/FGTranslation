/*global TemplateManager */
"use strict";

var templateManager;
(function main(){
    /** on document ready */
    $(document).ready(init);

    /**
     * @name main#initTemplate
     * @event
     * @description initialize template
     */
    function init(){
       templateManager = new TemplateManager(); 
    }
    
})();