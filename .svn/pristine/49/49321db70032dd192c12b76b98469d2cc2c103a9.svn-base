Ext.define('Dashboard.manager.DashboardSceneManager', {
    xtend: 'Ext.app.Controller',
    alias: 'sceneManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities',
        'Dashboard.model.DashboardScene',
        'Dashboard.store.DashboardScenes',
        'Dashboard.view.dashboard.DashboardScene',
        'Dashboard.engine.ResponseManager'
    ],
    
    models:['DashboardScene'],
    
    dashboardsStore: null,
   
    
    /**
     * Load saved dashboard from server to store
     * @returns {} nothing
     */
    loadDashboards: function(){
        
        this.dashboardsStore = Ext.create('Dashboard.store.DashboardScenes');

        this.dashboardsStore.load({
            callback: function(records, operation, success) {
                
                
                if (success) {
                    Dashboard.tool.Utilities.info(
                            '[DashboardSceneManager.loadDashboards] dashboards loading success. Length:'+records.length);
//                    
                    Dashboard.manager.MainMenuManager.updateDashboardsMenu(records);
                    Dashboard.manager.MainMenuManager.updateDashboardsBottomMenu(records);
                    
                    var dashboardEditor = Ext.ComponentQuery.query('dashboardEditor')[0];
                     
                    // If can only see but not edit & has no dashboards 
                    if (Dashboard.manager.FeaturesManager.isEnabled('DASHBOARD_CONFIGURATION') === false && records.length === 0) {
                        Dashboard.tool.Utilities.info('User has no dashboards and going ');
                        // Check if use can access Consultation > items
                        if (Dashboard.manager.FeaturesManager.isEnabled('MAT_INVENTORY') === true) {
                            Dashboard.manager.MainMenuManager.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MAT_INVENTORY');
                            Dashboard.manager.administration.MaterialManager.loadConfiguration(Dashboard.manager.MainMenuManager.currentFeature, false);
                        } 
                    }
                    if(Dashboard.manager.FeaturesManager.isEnabled('DASHBOARD_CONFIGURATION') === false){
                        dashboardEditor.down('button[reference=toogleEditionMode]').setVisible(false);
                    }else{
                        dashboardEditor.down('button[reference=toogleEditionMode]').setVisible(true);
                    }
                    
                    if(records[0] !== undefined){
                        this.showFirstDashboard(records[0].data);
                    }                  
                } else {
                    //console.log('error');
                }
            },
            scope: this
        });
    },
    
    
    showFirstDashboard: function(data){
        
        if(!data){
            throw new Error('[dashboardSceneManager.showFirstDashboard] data param is null or empty!');
        }
        
        // Go out if is not the first
        if(Ext.ComponentQuery.query('dashboardScene')[0] !== undefined){
            return;
        }
        
        var model = Ext.create('Dashboard.model.DashboardScene');
        model.data = data;

        model.data.configuration = Ext.decode(model.data.configuration);

        var dashboardEditorController = Ext.ComponentQuery.query('dashboardEditor')[0].getController();
        dashboardEditorController.displayDashboard(model);

    },
    
    
    loadIndicatorsByIds: function(indicatorsIds){
        
        if(!indicatorsIds){
            throw new Error('[dashboardSceneManager.loadIndicatorsByIds] indicatorsIds param is null or empty!');
        }
        
        var currentDashboard = Ext.ComponentQuery.query('dashboardScene')[0];
        
        for(var i=0; i < indicatorsIds.length; i++){
            
            var indicatorId = indicatorsIds[i];
            
            Dashboard.model.Indicator.load(indicatorId,{
                success: function(indicatorModel){
                    
                    indicatorModel.data.dataBinding = Ext.decode(indicatorModel.data.dataBinding);
                    
                    var index = currentDashboard.record.indicatorIds.indexOf(indicatorModel.data.id);
                    
                    Dashboard.tool.Utilities.trace('[DashboardSceneManager.loadIndicatorsByIds] indicator loaded id:'+indicatorModel.data.id);
                    
                    try{
                        var indicator = Dashboard.view.indicator.IndicatorController.buildIndicator(indicatorModel);
                    }catch(ex){
                        Dashboard.tool.Utilities.error('[DashboardSceneManager.loadIndicatorsByIds] building error'+ ex);
                    }
                    
                    try{
                        Dashboard.manager.DashboardEditorManager.addIndicator(indicator, index);
                    }catch(ex){
                        Dashboard.tool.Utilities.error('[DashboardSceneManager.loadIndicatorsByIds] adding scene error'+ ex);
                    }
                } 
            });
        }
        
    },
    
    
     loadIndicatorsByDashboardId: function(id){
         
        if(!id){
            throw new Error('[dashboardSceneManager.loadIndicatorsByDashboardId] id param is null or empty!');
        } 
        
        var indicatorsStore = Ext.create('Dashboard.store.Indicators');
        indicatorsStore.filterByDashboardId(id);

        indicatorsStore.load({
            callback: function(records, operation, success) {

                if (success) {
                    Dashboard.tool.Utilities.info(
                            '[DashboardSceneManager.loadIndicatorsByDashboardId] loading success. Length:'+records.length);
                    
                    for(var i = 0; i < records.length; i++){
                        
                        var indicatorModel = records[i];
                        indicatorModel.data.dataBinding = Ext.decode(indicatorModel.data.dataBinding);

                        try{
                            var indicator = Dashboard.view.indicator.IndicatorController.buildIndicator(indicatorModel);
                        }catch(ex){
                            Dashboard.tool.Utilities.error(
                            '[DashboardSceneManager.loadIndicatorsByDashboardId] building error: '+ex);
                        }
                        try{
                            Dashboard.manager.DashboardEditorManager.addIndicator(indicator);
                        }catch(ex){
                            Dashboard.tool.Utilities.error(
                            '[DashboardSceneManager.loadIndicatorsByDashboardId] adding scene error: '+ex);
                        }
                    }
                } else {
                    Dashboard.tool.Utilities.error('[DashboardSceneManager.loadIndicatorsByDashboardId] indicator loading: success false');
                }
            }
        });
    },
    
    
    /**
     * Save new dashboard into server
     * @param {model.DashboardScene} dashboardModel
     * @returns {unresolved}
     */
    save: function(dashboardModel){
        if(!dashboardModel){
            throw new Error('[dashboardSceneManager.save] dashboardModel param is null or empty!');
        }
        
        delete dashboardModel.data.id;
        
        if(dashboardModel.data.authorName === ''){
            dashboardModel.data.authorName = 'Unknown'; //TODO get user
        }
        
        dashboardModel.data.creationDate = Ext.Date.format(new Date(), 'c');
        dashboardModel.data.indicatorIds = [];
        dashboardModel.data.configuration = Ext.encode(dashboardModel.data.configuration);
        
        dashboardModel.save({
            scope: this,
            success: function(_dashboard, response) {
                
                dashboardModel.id = Ext.decode(response._response.responseText).data.id;
                dashboardModel.data.configuration = Ext.decode(dashboardModel.data.configuration);
                
                Dashboard.tool.Utilities.info('[Dashboard.manager.DashboardSceneManager] new dashboard saved. id: '+ dashboardModel.serverId);
            
                var editorController = Ext.ComponentQuery.query('dashboardEditor')[0].getController();
                editorController.displayDashboard(dashboardModel);
                
                this.addItemToMenus(dashboardModel);

            }
        }); 

    },
    
    
    /**
     * Get one dashboard from server
     * @param {int} dashboardId
     * @returns {undefined}
     */
    read: function(dashboardId){
        if(!dashboardId){
            throw new Error('['+ Ext.getDisplayName(arguments.callee) +'] dashboardId is null!');
        }
        
        this.getDashboardModel().load(dashboardId, {
            success: function(_dashboard) {
                
                //model.data.configuration = Ext.decode(model.data.configuration);
                console.log(_dashboard.getId());
            }
        });
        
    },
    
    
    /**
     * Save updated dashboard into server
     * @param {model.DashboardScene} dashboardModel
     * @returns {undefined}
     */
    update: function(dashboardModel){
        
        if(!dashboardModel){
            throw new Error('[DashboardSceneManager.update] dashboardModel is null or empty!');
        }
        
        dashboardModel.data.configuration = Ext.encode(dashboardModel.data.configuration);
        
        dashboardModel.save({
            scope: this,
            success: function(_dashboard, response) {
                
                dashboardModel.data.configuration = Ext.decode(dashboardModel.data.configuration);
                
                this.refreshDashboard(dashboardModel);
                this.refreshGeneralMenu(dashboardModel);

                Dashboard.tool.Utilities.info('[Dashboard.manager.DashboardSceneManager] new dashboard saved. id: '+ dashboardModel.data.id);

            }
        });
        
    },
    
    
    /**
     * Destroy dashboard into server
     * @param {type} dashboard
     * @returns {undefined}
     */
    deleteDashboard: function(dashboard){
        if(!dashboard){
            throw new Error('['+ Ext.getDisplayName(arguments.callee) +'] dashboard is null or empty!');
        }
        
        var scene = Ext.create('Dashboard.model.DashboardScene', {
            id:dashboard.serverId
        });
        
        scene.erase({
            scope: this,
            success: function(dashboard) {
                
                Dashboard.tool.Utilities.trace('[DashboardCeneManager.delete] delete dashboard : success true');
                
                var scene = Ext.ComponentQuery.query('panel[name=scene]')[0];
                scene.removeAll();
                
                this.loadDashboards();

            }
        });
        
        
    },

    
    /**
     * Update view
     * @param {DashboardScene} dashboardModel
     * @returns {undefined}
     */
    refreshDashboard: function(dashboardModel){
        
         var currentDashboard = Ext.ComponentQuery.query('dashboardScene')[0];//.getController();
         
         if(currentDashboard === undefined){
             Dashboard.tool.Utilities.error('[DashboardSceneManager.refreshDashboard] error : currentDashboar undefined');
             return;
         }
         
         currentDashboard.setData(dashboardModel);
    },
    
    
    /**
     * Update side bar menu and bottom menu
     * @param {type} dashboardModel
     * @returns {undefined}
     */
    refreshGeneralMenu: function(dashboardModel){
        Dashboard.manager.MainMenuManager.refreshMenuItem(dashboardModel);
    },
   
    
    /**
     * Add new item into side bar menu and bottom menu
     * @param {type} dashboardModel
     * @returns {undefined}
     */
    addItemToMenus: function(dashboardModel){
        Dashboard.manager.MainMenuManager.addMenuItem(dashboardModel);
    }
    
    
}, function(){
    //Dashboard.tool.Utilities.trace('Class loaded :  Dashboard.manager.DashboardSceneManager');
});
