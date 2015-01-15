/*global TranslationManager, gameData */
"use strict";

var translationManager;
(function main(){
    /** on document ready */
    $(document).ready(init);

    /**
     * @name main#initTranslation
     * @event
     * @description initialize translation page with game data
     */
    function init(){
       translationManager = new TranslationManager(gameData); 
    }
    
})();