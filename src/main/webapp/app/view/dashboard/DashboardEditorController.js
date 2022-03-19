/*  global Ext, Dashboard  */

Ext.define('Dashboard.view.dashboard.DashboardEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboardEditor',
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    editionMode: false,
    
    /**
     * event handler
     * enable or disable edition mode
     * @returns {undefined}
     */
    toogleEditionMode: function(sender){

        if(this.editionMode === true){
            this.disableEditionMode();
        }else{
            this.enableEditionMode();
        }
    },
    
    
    /**
     * Display edition controls
     * @returns {undefined}
     */
    enableEditionMode: function(){
        this.editionMode = true;
        this.showWidgetMenu();
        this.showEditionButtons();
        Dashboard.tool.Utilities.info('Edition mode: enabled');
    },
    
    
    /**
     * Hide edition controls
     * @returns {undefined}
     */
    disableEditionMode: function(){
        this.editionMode = false;
        this.hideWidgetMenu();
        this.hideEditionButtons();
        Dashboard.tool.Utilities.info('Edition mode: disabled');
    },
    
    
    /**
     * Display tools
     * @returns {undefined}
     */
    showWidgetMenu: function(){
        var menu = Ext.ComponentQuery.query('dashboardEditor panel[name=dashboardEditorBottom]')[0];
        
        if(menu === undefined){
            return;
        }
        
        menu.height = 96;
        menu.up('panel').height = 120;
        
        Ext.ComponentQuery.query('dashboardEditor')[0].updateLayout();
    },
    
    
    /**
     * Hide tools
     * @returns {undefined}
     */
    hideWidgetMenu: function(){
        var menu = Ext.ComponentQuery.query('dashboardEditor panel[name=dashboardEditorBottom]')[0];
        
        if(menu === undefined){
            return;
        }
        
        menu.height = 0;
        menu.up('panel').height = 24;
        
        Ext.ComponentQuery.query('dashboardEditor')[0].updateLayout();
    },
    
    
    showEditionButtons: function(){
        
        var indicators = Ext.ComponentQuery.query('indicator'); 
        
        Ext.each(indicators, function(indicator){
            indicator.showEditionButtons();
        }); 
        
        var scenes = Ext.ComponentQuery.query('dashboardScene'); 
        
        Ext.each(scenes, function(scene){
            scene.showEditionButtons();
        });
    },
    
    
    hideEditionButtons: function(){
        
        var indicators = Ext.ComponentQuery.query('indicator'); 
        
        Ext.each(indicators, function(indicator){
            indicator.hideEditionButtons();
        }); 
        
        var scenes = Ext.ComponentQuery.query('dashboardScene'); 
        
        Ext.each(scenes, function(scene){
            scene.hideEditionButtons();
        });
    },
    
    
    /**
     * Event handler
     * @returns {undefined}
     */
    onCreateDashboardClick: function(){
        
        this.displayDashboardSceneEditor();
        
    },
    
    
    /**
     * Display dashboard scene editor
     * @returns {undefined}
     */
    displayDashboardSceneEditor: function(){
        
        var editorWindow = Dashboard.view.dashboard.DashboardSceneEditorController.createDashboardSceneEditor();

        if(editorWindow){
            editorWindow.show();
        }
    },
    
    
    /**
     * Add indicator into current dashboard
     * @param {type} indicator
     * @param {int} index
     * @returns {undefined}
     */
    addIndicator: function(indicator, index){
        if(!indicator){
            Dashboard.tool.Utilities.error('[DashboardEditorController.addIndicator] indicatorType param is null!');
        }
        
        var currentDashboard = Ext.ComponentQuery.query('dashboardScene')[0];

        var margin = Dashboard.tool.Ihm.DASHBOARD_INDICATOR_MARGIN;
        indicator.setMargin(margin + ' 0 0 ' + margin); // '24 0 0 24'
        
        try{
            // add into Dashboard
            if(index !== undefined){
                currentDashboard.insert(index,indicator);
            }else{
                currentDashboard.add(indicator);
            }
        }catch(ex){
            Dashboard.tool.Utilities.error('[DashboardEditorController.addIndicator] adding error: '+ex);
        }
        
        // after add
        if(this.editionMode === true){
            indicator.showEditionButtons();
        }else{
            indicator.hideEditionButtons();
        }
        
        Dashboard.tool.Utilities.info('[DashboardEditorController.addIndicator] add indicator id: '+indicator.id);
    },
    
    
    /**
     * Remove indicator from edited dashboard
     * @param {Indicator} indicator 
     * @returns {undefined}
     */
    removeIndicator: function(indicator){
        if(!indicator){
            throw new Error('[DashboardEditorController.removeIndicator] indicator param is null!');
        }
        
        var currentDashboard = this.getCurrentDashboard();
        currentDashboard.remove(indicator, true);
                
        var statistics = indicator.record.data.dataBinding.statisticReferences;
        
        if(Ext.isArray(statistics)){
            
            Ext.each(statistics, function(stat){
                Dashboard.manager.DataCollectionManager.removeStatisticReferencefromList(stat);
            });
            
        }else{
            Dashboard.manager.DataCollectionManager.removeStatisticReferencefromList(indicator.record.data.dataBinding);
        }
                
        Dashboard.tool.Utilities.info('[DashboardEditorController.removeIndicator] remove indicator: id -'+indicator.id);
        
    },
    
    
    /**
     * Replace old ugly widget by a better
     * @param {type} indicatorModel
     * @returns {undefined}
     */
    refreshIndicator: function(indicatorModel){
        
        var currentDashboard = this.getCurrentDashboard(); 
        
        var indicator = currentDashboard.child('indicator[serverId='+ indicatorModel.data.id +']');
        var index = currentDashboard.items.indexOf(indicator);
        this.removeIndicator(indicator);
        
        var newIndicator = null;
        
        try{
            newIndicator = Dashboard.view.indicator.IndicatorController.buildIndicator(indicatorModel);
        }catch(ex){
            throw new Error('[DashboardEditorController.refreshIndicator] build indicator failed! ' + ex);
        }
        
        this.addIndicator(newIndicator, index);
        Dashboard.tool.Utilities.info('[DashboardEditorController.refreshIndicator] indicator updated : id-'+newIndicator.id);
    },
    
    
    /**
     * get current dashboard
     * @returns {unresolved}
     */
    getCurrentDashboard: function(){
        
        var currentDashboard = Ext.ComponentQuery.query('dashboardScene')[0];
        if(!currentDashboard){
            return null;
        }
        return currentDashboard;
    },
    
    
    /**
     * Convert model to viewComponent and show dashboard
     * @param {(model)Dashboard} dashboardModel
     * @returns {undefined}
     */
    displayDashboard: function(dashboardModel){
        if(!dashboardModel){
            throw new Error('[DashboardEditorManager.displayDashboard] dashboard param is null or empty!');
        }

        var viewDashboard = Dashboard.view.dashboard.DashboardSceneController.buildDashboard(dashboardModel);
        
        // Clear the previous content
        var editorScene = this.getView().down('panel[name=scene]');
        editorScene.removeAll();

        // Add new panel into viewport
        editorScene.add(viewDashboard);
        
        //Refresh data
        //Dashboard.manager.DataCollectionManager.enableTimer();
        
        // before add
        if(this.editionMode === true){
            viewDashboard.showEditionButtons();
        }else{
            viewDashboard.hideEditionButtons();
        }
        
        if(dashboardModel.data.indicatorIds.length > 0){
            
            Dashboard.manager.DashboardSceneManager.loadIndicatorsByDashboardId(dashboardModel.data.id);
        
        }
    },

    
    /**
     * 
     * @param {type} dashboard
     * @returns {undefined}
     */
    closeDashboard: function(dashboard){
        if(!dashboard){
            throw new Error('['+ Ext.getDisplayName(arguments.callee) +'] dashboard param is null or empty!');
        }
        
        var scene = Ext.ComponentQuery.query('panel[name=scene]')[0];//this.getView().down('panel[name=scene]')
        
        // Clear previous content
        scene.removeAll();
    },
    

    refreshDashboard: function(){
        
        this.showFirstDashboard();
        
    }


}, function(){
    //Dashboard.tool.Utilities.trace('Class loaded :  Dashboard.view.dashboard.DashboardEditorController');
});
