/*global getSingleton, extendSingleton, isDefined, requestAnimationFrame, getRandomInt */
var AnimationHelper;
(function(){
    "use strict";
    /**
     * @name AnimationHelper
     * @constructor
     * @property {Integer} [speed = 250] animation transition speed
     * @description Manage animations
     */
    AnimationHelper = function(){
        extendSingleton(AnimationHelper);
        this.speed = 250;
    };

    /**
     * @member AnimationHelper#getInstance
     * @description get the single class instance
     * @return {AnimationHelper} the single class instance
     */
    AnimationHelper.getInstance = function(){
        return getSingleton(AnimationHelper);
    };

    /**
     * @method AnimationHelper#show
     * @description fade in a container
     * @param  {DOMElement} container DOM element to show
     * @param  {Function} cb          Callback trigger when animation is terminated
     */
    AnimationHelper.prototype.show = function(container, cb){
        container.css({
            opacity:0
        }).removeClass("hide").animate({
            opacity: "+=1"
        },{
            duration: this.speed,
            complete: cb
        });
    };

    /**
     * @method AnimationHelper#lose
     * @decscription lose a live
     * @param  {Function} cb Callback trigger when lose animation terminated
     */
    AnimationHelper.prototype.lose = function(cb){
        var max = 4;
        var currentAnim = 1;
        var heart = $(".heart:last");
        heart.find(".eyeOpen").remove();
        heart.find(".eyeClose").remove();
        heart = heart.find(".stand");
        var timer = setInterval(heartDie, 110);

        /**
         * @method AnimationHelper#heartDie
         * @private
         * @description play animation heart die
         */
        function heartDie(){
            if(currentAnim <= max){                    
                heart.attr("class", "die"+currentAnim);
                currentAnim++;
            }else{
                clearInterval(timer);           
                heart.parent().remove();            
                if(isDefined(cb)){
                    cb();
                }
            }          
        }

    };

    /**
     * @method AnimationHelper#hide
     * @description fade out a container
     * @param  {DOMElement} container DOM element to show
     * @param  {Function}   cb        Callback trigger when animation is terminated
     */
    AnimationHelper.prototype.hide = function(container, cb){
        container.css({
            opacity:1
        }).animate({
            opacity:"-=1"
        },{
            duration: this.speed,
            complete: animationComplete
        }); 

        function animationComplete(){
            container.addClass("hide");
            if(isDefined(cb)){
                cb();
            }
        }
    };

    /**
     * @method AnimationHelper#animateText
     * @description set text in a container letter by letter
     * @param  {DOMElement} container DOM element target container
     * @param  {String} text          Text to insert in the container
     */
    AnimationHelper.prototype.animateText = function(container, text){
        container.empty();
        var timer = setInterval(addLetter, 100);

        /**
         * @method AnimationHelper#addLetter
         * @private
         * @description Add a letter in a container
         */
        function addLetter(){
            if(container.text().length >= text.length){
                clearInterval(timer);
                return false;
            }
 
            container.text(container.text()+text[container.text().length]);
        }
    };

    /**
     * @method AnimationHelper#heartStand
     * @description Initialize stand heart animation on all heart
     */
    AnimationHelper.prototype.heartStand = function(){
        $(".heart").each(addHeartAnimation);

        /**
         * @method AnimationHelper#addHeartAnimation
         * @private
         * @param {Integer}    i       Index of the loop
         * @param {DOMElement} element DOM element corresponding to the heart
         * @description Add heart stand animation on an element
         */
        function addHeartAnimation(i, element){
            requestAnimationFrame(animationFrameReady);

            /**
             * @event AnimationHelper#animationFrameReady
             * @description Trigger when frame is ready
             */
            function animationFrameReady(){
                setTimeout(animateHeart, getRandomInt(0,5000));

                /**
                 * @event AnimationHelper#animateHeart
                 * @description Start to play stand animation on time out
                 */
                function animateHeart(){
                    var eye = $(element).find(".eyeOpen");                   
                    if(eye.length === 1){
                        eye.removeClass("eyeOpen").addClass("eyeClose");
                        setTimeout(closeEye, getRandomInt(0,250));
                    }
                    if($(element).find("div").length === 2){
                        requestAnimationFrame(animationFrameReady);
                    }

                    /**
                     * @event AnimationHelper#closeEye
                     * @description Play close eye animation on time out
                     */
                    function closeEye(){
                        eye.removeClass("eyeClose").addClass("eyeOpen");
                    }
                }
            }
        }
    };

})();