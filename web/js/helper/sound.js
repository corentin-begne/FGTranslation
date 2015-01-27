/*global extendSingleton, getSingleton */
var SoundHelper;
(function(){
    "use strict";
    /**
    * @name SoundHelper
    * @property {String}    basePath    base path to create sound url
    * @constructor
    * @description Manage sounds
    */
    SoundHelper = function(){
        extendSingleton(SoundHelper);
        this.basePath = $("html").attr("basePath")+"/sounds/";
        this.audio = new Audio();
        this.init();
    };

    /**
     * @member SoundHelper#getInstance
     * @description get the single class instance
     * @return {SoundHelper} the single class instance
     */
    SoundHelper.getInstance = function(){
        return getSingleton(SoundHelper);
    };

    /** 
     * @method SoundHelper#init
     * @description initialize events     
     */
    SoundHelper.prototype.init = function() {
        var that = this;

        /** assign events */
        $(this.audio).bind("canplaythrough", playSound);

        /**
         * @event SoundHelper#playSound
         * @description Play a sound on canplaythrough
         */
        function playSound(){
            that.audio.play();
        }

    };

    /** 
     * @method SoundHelper#play
     * @param  {String} name Name of the sound
     * @description Load a sound
     */
    SoundHelper.prototype.play = function(name) {   
        this.audio.src = this.basePath+"/"+name+".mp3";
        this.audio.load();
    };
})();