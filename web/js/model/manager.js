/*global ActionModel, ucfirst, isDefined, extendSingleton, getSingleton */
var ManagerModel;
(function(){
    "use strict";
    /**
    * @name ManagerModel
    * @constructor
    * @property {ActionModel} [action = new ActionModel()] Instance of ActionModel
    * @description Manage global manager functions and actions
    */
    ManagerModel = function(){
        extendSingleton(ManagerModel);
        this.action = ActionModel.getInstance();
    };

    /**
     * @member ManagerModel#getInstance
     * @description get the single class instance
     * @return {ManagerModel} the single class instance
     */
    ManagerModel.getInstance = function(){
        return getSingleton(ManagerModel);
    };

    /**
     * @method ManagerModel#init
     * @description bind all interface global events
     * @param  {Object} manager     Instance of the manager to use
     * @param  {String} containerId Id of the Interface to init
     */
    ManagerModel.prototype.init = function(manager) {
        var that = this;
        var interfaceId = manager.baseName+"Interface";

        /** assign global event */
        $("#"+interfaceId+" .actionInterface").mousedown(initInterface);
        $("#"+interfaceId+" .actionPartial").mousedown(initPartial);
        $("#"+interfaceId+" .actionDelete").mousedown(initDelete);

        /**
         * @event ManagerModel#initInterface
         * @description initialize actionInterface on mousedown
         */
        function initInterface(){
            var path = $(this).attr("path");
            var type = $(this).attr("type");
            that.action["get"+ucfirst(type)](path);
        }

        /**
         * @event ManagerModel#initPartial
         * @description initialize actionPartial on mousedown
         */
        function initPartial(){
            var path = $(this).attr("path");
            var data = $(this).attr("data");
            var name = $(this).attr("name");
            data = isDefined(data) ? $.parseJSON($(this).attr("data")) : {};
            that.action.getPartial(path, data, manager[name].bind(manager));
        }

        /**
         * @event ManagerModel#initDelete
         * @description initialize actionDelete on mousedown
         */
        function initDelete(){
            $("#"+interfaceId).remove();
        }

    };
})();