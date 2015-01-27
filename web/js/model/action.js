/*global ActionHelper, InterfaceHelper, extendSingleton, getSingleton */
var ActionModel;
(function(){
    "use strict";
    /**
    * @name ActionModel
    * @description Manage all manager actions
    * @property {ActionHelper} [actionHelper = worldManager.actionHelper] shortcut to interfaceHelper action helper
    * @property {InterfaceHelper} [interfaceHelper = worldManager.interfaceHelper] Instance of InterfaceHelper
    * @constructor
    */
    ActionModel = function(){
        extendSingleton(ActionModel);
       // this.interfaceHelper = InterfaceHelper.getInstance();
        this.actionHelper = ActionHelper.getInstance();
        this.basePath = this.actionHelper.basePath;
    };

    /**
     * @member ActionModel#getInstance
     * @description get the single class instance
     * @return {ActionModel} the single class instance
     */
    ActionModel.getInstance = function(){
        return getSingleton(ActionModel);
    };

    /**
     * @method ActionModel#getPartial
     * @description get a partial html from an action
     * @param  {String}   path partial name
     * @param  {Object}   data data to send to the partial
     * @param  {Function} cb   Callback trigger on success with html content
     */
    ActionModel.prototype.getPartial = function(path, data, cb){
        this.interfaceHelper.getPartial(path, data, cb);
    };

    /**
     * @method ActionModel#getModal
     * @description get a modal interface (delete others)
     * @param  {String} path interface path
     * @param  {Object} data data to send to the interface
     */
    ActionModel.prototype.getModal = function(path, data){
        this.interfaceHelper.getModal(path, data);
    };

    /**
     * @method ActionModel#getInterface
     * @description get an interface (keep other)
     * @param  {String} path interface path
     * @param  {Object} data data to send to the interface
     */
    ActionModel.prototype.getInterface = function(path, data){   
        this.interfaceHelper.getInterface(path, data);
    };

    /**
     * @method ActionModel#sendData
     * @description send data to the manager action
     * @param  {String}   path action name
     * @param  {Object}   data data to send to the action
     * @param  {Function} cb   Callback trigger on success with Object data
     */
    ActionModel.prototype.sendData = function(path, data, cb){
        var options = {
            type: "post",
            action: path,
            cb: cb,
            dataType: "json"
        };
        this.actionHelper.execute(data, options);
    };
})();