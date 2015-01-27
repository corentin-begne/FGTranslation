/*global TemplateManager */

var templateManager;
(function(){
    "use strict";
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