/* global Ext, Dashboard */

Ext.define('Dashboard.manager.DashboardEditorManager', {
    extend: 'Ext.app.Controller',
    alias: 'dashboardEditorManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities',
        'Dashboard.manager.IndicatorManager',
        'Dashboard.view.dashboard.DashboardEditor'
    ],
    
    
    /**
     * Show dashboard feature in main view
     * @returns {undefined}
     */
    displayInMain: function(){
        
        Dashboard.tool.Utilities.info('[DashboardEditorManager.displayInMain] show dashboard editor main panel');
        
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        try{
            mainController.displayInMain({ xtype: 'dashboardEditor' });
        }catch(ex){
            Dashboard.tool.Utilities.error('[DashboardEditorManager.displayInMain] error ' + ex);
        }

    },
    
    
    /**
     * Display indicator editor window
     * @param {type} indicatorType
     * @returns {undefined}
     */
    createIndicator: function(indicatorType){
        if(!indicatorType){
            throw new Error('[DashboardEditorManager.createIndicator] indicatorType param is null!');
        }
        
        var dashboards = Ext.ComponentQuery.query('dashboardScene');
        
        if(dashboards.length < 1){
            Ext.Msg.show({
                title: getText('No dashboard'), 
                message: getText('Please create new dashboard before add indicator.'),
                icon: Ext.Msg.WARNING
            });
            return;
        }
        
        Dashboard.manager.IndicatorManager.displayIndicatorEditor(indicatorType);
    },
    
    /**
     * Add indicator into current dashboard
     * @param {type} indicator
     * @param {type} index
     * @returns {undefined}
     */
    addIndicator: function(indicator, index){
        if(!indicator){
            throw new Error('[DashboardEditorManager.addIndicator] indicatorType param is null!');
        }
        
        var dashboardEditorController = Ext.ComponentQuery.query('dashboardEditor')[0].getController();
        dashboardEditorController.addIndicator(indicator, index);
        
    },
    

    /**
     * Destroy poor sad indicator
     * @param {indicator} indicator view
     * @returns {undefined}
     */
    deleteIndicator: function(indicator){
        
        if(!indicator){
            throw new Error('[DashboardEditorManager.deleteIndicator] indicator param is null!');
        }
        
        Dashboard.manager.IndicatorManager.deleteIndicator(indicator);
        
    },
    
    
    /**
     * Remove indicator from edited dashboard
     * @param {indicator} indicator view
     * @returns {undefined}
     */
    removeIndicator: function(indicator){
        if(!indicator){
            throw new Error('[DashboardEditorManager.removeIndicator] indicator param is null!');
        }
        var editorController = Ext.ComponentQuery.query('dashboardEditor')[0].getController();
        editorController.removeIndicator(indicator);
        
        this.updateIndicatorsPosition();
        
    },
    
    
    /**
     * Resfresh indicator into current dashboard
     * @param {indicator} indicatorModel
     * @returns {undefined}
     */
    refreshIndicator: function(indicatorModel){
        if(!indicatorModel){
            throw new Error('[DashboardEditorManager.refreshIndicator] indicatorModel param is null!');
        }
        var editorController = Ext.ComponentQuery.query('dashboardEditor')[0].getController();
        editorController.refreshIndicator(indicatorModel);
    },
    
    
    /**
     * Update sorted indicators list
     * @returns {undefined}
     */
    updateIndicatorsPosition: function(){
        
        var currentDashboard = Ext.ComponentQuery.query('dashboardScene')[0];
        var indicators = currentDashboard.items.items;
        var indicatorIds = [];
        
        for (var i=0; i < indicators.length; i++ ){
            indicatorIds.push(indicators[i].serverId);
        }
        
        var model = Ext.create('Dashboard.model.DashboardScene',{
            id: currentDashboard.record.id
        });
        
        model.data = currentDashboard.record;
        model.data.indicatorIds = indicatorIds;
        model.data.id = currentDashboard.record.id;
        
        Dashboard.manager.DashboardSceneManager.update(model);
        
    },
    
    
    /**
     * Move indicator UP
     * @param {type} indicator
     */
    moveIndicatorAfter: function(indicator){
        
        var currentDashboard = Ext.ComponentQuery.query('dashboardScene')[0];
        var oldIndex = currentDashboard.items.items.indexOf(indicator);
        var newIndex = oldIndex + 1;
        
        if(oldIndex >= currentDashboard.items.items.length -1){
            newIndex = 0;
        }
        
        var editorController = Ext.ComponentQuery.query('dashboardEditor')[0].getController();
        editorController.addIndicator(indicator, newIndex);
        
        this.updateIndicatorsPosition();
        
    },
    
    
    /**
     * Move indicator DOWN
     * @param {type} indicator
     */
    moveIndicatorBefore: function(indicator){
        
        var currentDashboard = Ext.ComponentQuery.query('dashboardScene')[0];
        var oldIndex = currentDashboard.items.items.indexOf(indicator);
        
        var newIndex = 0;
        
        if(oldIndex < 1){
            newIndex = currentDashboard.items.items -1;
        }else{
            newIndex = oldIndex -1;
        }

        var editorController = Ext.ComponentQuery.query('dashboardEditor')[0].getController();
        editorController.addIndicator(indicator, newIndex);
        
        this.updateIndicatorsPosition();
        
    },
   
    
    
    /**
     * Delete selected dashboard
     * @param {type} dashboard
     * @returns {undefined}
     */
    deleteDashboard: function(dashboard){
        if(!dashboard){
            throw new Error('['+ Ext.getDisplayName(arguments.callee) +'] dashboard param is null!');
        }
        
        Dashboard.manager.DashboardSceneManager.deleteDashboard(dashboard);

    },
    
    
    /**
     * Get and show dashboard by id
     * @param {type} dashboardId
     * @returns {undefined}
     */
    displayDashboardById: function(dashboardId){
        if(!dashboardId){
            throw new Error('[DashboardEditorManager.displayDashboardById] param dashbaordId is null or empty!');
        }

        Dashboard.tool.Utilities.info('[DashboardEditorManager.displayDashboardById] display dashboard id: '+ dashboardId);
        
        try{
            Dashboard.model.DashboardScene.load(dashboardId, {
                //scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[DashboardEditorManager.displayDashboardById] error: loading failure');
                },
                success: function(record, operation) {
                    
                    console.log('dashboard: ' + record.get('name'));

                    record.data.configuration = Ext.decode(record.data.configuration);

                    var editorController = Ext.ComponentQuery.query('dashboardEditor')[0].getController();
                    editorController.displayDashboard(record);
                    
                    var dashboardEditor = Ext.ComponentQuery.query('dashboardEditor')[0];
                    if(Dashboard.manager.FeaturesManager.isEnabled('DASHBOARD_CONFIGURATION') === false){
                        dashboardEditor.down('button[reference=toogleEditionMode]').setVisible(false);
                    }else{
                        dashboardEditor.down('button[reference=toogleEditionMode]').setVisible(true);
                    }
                    
                },
                callback: function(record, operation, success) {
                    //do
                }
            });
        }catch(err){
            Dashboard.tool.Utilities.error('[DashboardEditorManager.displayDashboardById] error: ' + err);
        }


    },
    
    
    /**
     * Reload dashboard from server
     * @returns {undefined}
     */
    refreshCurrentDashboard: function(){
        
        //TODO reload dashboard from server
        
        var editorController = Ext.ComponentQuery.query('dashboardEditor')[0].getController();
        editorController.refreshDashboard();
    }

    
}, function(){
    //Dashboard.tool.Utilities.trace('Class loaded :  Dashboard.manager.DashboardEditorManager');
});
