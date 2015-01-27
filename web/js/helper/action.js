/*global extendSingleton, getSingleton */
var ActionHelper;
(function(){
    "use strict";
    /**
    * @name ActionHelper
    * @description to make ajax call
    * @property {String} basePath base path used for ajax call
    * @constructor
    */
    ActionHelper = function(){
        extendSingleton(ActionHelper);
        this.basePath = $("html").attr("basepath")+"/";
    };

    /**
     * @member ActionHelper#getInstance
     * @description get the single class instance
     * @return {ActionHelper} the single class instance
     */
    ActionHelper.getInstance = function(){
        return getSingleton(ActionHelper);
    };

    /**
     * @method ActionHelper#execute
     * @description execute an ajax call
     * @param  {Object} data    data to send
     * @param  {Object} options options of the ajax call
     */
    ActionHelper.prototype.execute = function(data, options){
        $.ajax({
            type: options.type,
            data:data,
            url: this.basePath+options.action,
            dataType:options.dataType,
            success: options.cb
        });
    };
})();