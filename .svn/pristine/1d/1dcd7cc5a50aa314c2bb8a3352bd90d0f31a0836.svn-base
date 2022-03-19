
/* global Ext, Dashboard  */

Ext.define('Dashboard.view.dashboard.DashboardSceneController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboardScene',
    
    requires:[
        'Dashboard.model.DashboardScene',
        'Dashboard.view.dashboard.DashboardScene',
        'Dashboard.manager.DashboardEditorManager',
        'Dashboard.tool.Utilities'
    ],

    /**
     * Event handler
     * @param {button} sender
     * @returns {undefined}
     */
    onDeleteWidget: function(sender){
        //from indicatorController
        this.deleteWidget(sender.up('panel[name=indicator]'));
    },
    
    
    /**
     * Delete indicator
     * @param {indicator} indicator
     * @returns {undefined}
     */
    deleteWidget: function(indicator){
        
        if(!indicator){
            throw new Error('[IndicatorController.deleteWidget] indicator param is null or empty!');
        }
        
        Ext.MessageBox.show({
            title: 'Delete indicator confirmation',
            //msg: getText('Do you really want to delete this item:') +" \"" + selectedRaw.data.name + "\" ?",
            msg: getText('Are you sure you want to delete this indicator') + getText('?'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    Dashboard.manager.DashboardEditorManager.deleteIndicator(indicator);   
                }
            }
        }); 
    },
    
    
    /**
     * Event handler 
     * @param {button} sender
     * @returns {undefined}
     */
    onEditDashboard: function(sender){
        
        this.editDashboard(sender.up('dashboardScene'));
    },
    
    /**
     * Edit
     * @param {(view)Dashboard} dashboard
     * @returns {undefined}
     */
    editDashboard: function(dashboard){
        
        var editorWindow = Ext.create('Dashboard.view.dashboard.DashboardSceneEditor',{
            action: 'EDIT',
            serverId: dashboard.record.id
        });
        
        var indicators = dashboard.items.items;
        var indicatorIds = [];
        
        for (var i=0; i < indicators.length; i++ ){
            indicatorIds.push(indicators[i].serverId);
        }
        
        var model = Ext.create('Dashboard.model.DashboardScene',{});
        model.data = dashboard.record;
        model.data.indicatorIds = indicatorIds;
        
        editorWindow.record = model.data;

        editorWindow.down('form').getForm().loadRecord(model);
        
        editorWindow.show();

        editorWindow.down('ux-panel').body.setStyle('background', model.data.configuration.backgroundColor); 
        editorWindow.down('hiddenfield[name=color]').setValue(model.data.configuration.backgroundColor);
    },
    
    
    
    /**
     * Event handler
     * @param {button} sender
     * @returns {undefined}
     */
    onDeleteDashboard: function(sender){
        
        this.deleteDashboard(sender.up('dashboardScene'));

    },
    
    
    /**
     * Delete dashboard
     * @param {(view)Dashboard} dashboard
     * @returns {undefined}
     */
    deleteDashboard: function(dashboard){
        
        Ext.MessageBox.show({
            title: 'Delete dashboard',
            msg: getText('Are you sure you want to delete this dashboard?'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    Dashboard.manager.DashboardEditorManager.deleteDashboard(dashboard);
                    Dashboard.manager.DataCollectionManager.cleanUpStatisticReferencesList();
                }
            }
        }); 
    },
    
    
    onRefreshDashboard: function(sender){
        this.refreshWidgets();
    },
    
    
    refreshWidgets: function(){
        
        //refreshData
        var widgetsList = this.getView().query('indicator');
        
        Ext.each(widgetsList, function(widget){
            
            widget.getController().refreshData();
            
        });
        
    },
    
    
    statics: {
        
    
        /**
         * Build dashboard
         * @param {model.Dashboard} dashboardModel
         * @returns {view.Dashboard} Dashboard
         */
        buildDashboard: function(dashboardModel){
            
            if(!dashboardModel.data.id){
                throw new Error('[DashboardSceneController.buildDashboard] dashboardModel.data.id is null!');
            }
            
            var backgroundColor = "#F2F2F2";
            

            if(dashboardModel.data.configuration !== undefined && 
                    dashboardModel.data.configuration.backgroundColor !== undefined){
                
                backgroundColor = dashboardModel.data.configuration.backgroundColor;
            }
            
            Dashboard.manager.DataCollectionManager.statisticReferencesList = [];
            
            var scene = Ext.create('Dashboard.view.dashboard.DashboardScene',{
                    record: dashboardModel.data,
                    serverId: dashboardModel.data.id,
                    border: false,
                    title: dashboardModel.data.title,
                    bodyStyle: {
                        background: backgroundColor
                    }
            });
            
            return scene;
        }  
    }
    


}, function(){
    //Dashboard.tool.Utilities.trace('Dashboard.view.dashboard.DashboardSceneController');
});
