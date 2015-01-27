/*global isDefined */
var JsHelper;
(function(){
    "use strict";
    /**
    * @name JsHelper
    * @description globalize some javascript functions/consts
    * @constructor
    */
    JsHelper = function(){
        this.init();
    };

    /** 
     * @method JsHelper#init
     * @description  initialize global function
     */
    JsHelper.prototype.init = function(){
        /** extend jquery */
        $.extend(
        {
            redirectPost: function(location, args)
            {
                var form = "";
                $.each( args, function( key, value ) {
                    form += "<input type='hidden' name='"+key+"' value='"+value+"'>";
                });
                $("<form action='"+location+"' method='POST'>"+form+"</form>").appendTo("body").submit();
            }
        });
        $.extend($.expr[":"],{
            isEmpty: function(el){
                return $(el).val() === "";
            }
        });
        
        
        /** assign functions */
        $.each(this, addGlobalFunction);

        /**
         * @method JsHelper#addGlobalFunction
         * @private
         * @param {String} name  function name
         * @param {String} value function to globalize
         * @description globalize all JsHelper function except init
         */
        function addGlobalFunction(name, value){

            if(name !== "init"){
                window[name] = value;
            }
            
        }
    };

    /**
     * @method JsHelper#getRandomInt
     * @description get random interger between a range
     * @param  {Integer} min Minimal value of the range
     * @param  {Integer} max Maximal value of the range
     * @return {Integer}     Random result between the range
     */
    JsHelper.prototype.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * @method JsHelper#isDefined
     * @description check if a variable is defined
     * @param  {Any}  obj  variable to check
     * @return {Boolean}    return the result of the check
     */
    JsHelper.prototype.isDefined = function(obj){

        if(typeof obj === "undefined" || typeof obj === "null"){
            return false;
        }

        return true;
    };

    /**
     * @method JsHelper#ucfirst
     * @description set first letter in uppercase
     * @param  {String} str text to use
     * @return {String}     text with first letter in uppercase
     */
    JsHelper.prototype.ucfirst = function(str){
        return str.charAt(0).toUpperCase()+str.substr(1);
    };

    /**
     * @method JsHelper#cloneObject
     * @description clone an object
     * @param  {Object} obj object to clone
     * @return {Object}     object cloned
     */
    JsHelper.prototype.cloneObject = function(obj){
        return $.extend({}, obj);
    };

    /**
     * @method JsHelper#cloneArray
     * @description  clone an array
     * @param  {Array} arr array to clone
     * @return {Array}     array cloned
     */
    JsHelper.prototype.cloneArray = function(arr){
        return arr.slice(0);
    };

    /**
     * @method JsHelper#getSingleton
     * @description Return the singleton instance of a class
     * @param  {Object} obj the instance class needed
     * @return {Object}     instance of the class
     */
    JsHelper.prototype.getSingleton = function(obj){

        if(!isDefined(obj.instance)){
            obj.instance = false;
            obj.instance = new obj();
        }

        return obj.instance;
    };

    /**
     * @method JsHelper#extendSingleton
     * @description Extend a class to singleton
     * @param  {Object} obj class instance to extend
     */
    JsHelper.prototype.extendSingleton = function(obj){
        if((isDefined(obj.instance) && obj.instance !== false) || !isDefined(obj.instance)){
            throw new Error("This class cannot be instanciated directly");
        }
    };
})();