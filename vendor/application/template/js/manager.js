/*global ActionModel, ManagerModel */
var TemplateManager;
(function(){
    "use strict";
    /**
    * @class TemplateManager
    * @constructor
    * @property {String} [baseName = "template"] base name of the interface associated with
    * @property {ActionModel} action Instance of ActionModel
    * @property {ManagerModel} manager Instance of ManagerModel
    * @description  Manage template
    */
    TemplateManager = function(){
        this.basePath = "path/";
        this.action = ActionModel.getInstance();
        this.manager = ManagerModel.getInstance();
    };

    /** initialize events */
    TemplateManager.prototype.init = function(){
        this.manager.init(this);
    };
})();