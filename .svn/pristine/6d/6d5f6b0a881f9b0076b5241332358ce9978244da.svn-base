Ext.define('Dashboard.view.dashboard.DashboardMenuController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboardMenu',
    
    require:[
        'Dashboard.config.Config',
        'Dashboard.manager.DashboardEditorManager'
    ],
    
    
    
    /**
     * Add widget type buttons into editor menu
     * @param {type} sender
     * @returns {undefined}
     */
    onEditorMenuRender: function (sender) {
        
        if(sender.name !== 'dashboard_editor_menu'){
            return;
        }
        
        if (Ext.os.deviceType !== 'Desktop'){
            return;
        }
        
        sender.addWidgetIcon('icon-dashboard-menu-donut','DONUT');
        sender.addWidgetIcon('icon-dashboard-menu-postit','POST_IT');
        sender.addWidgetIcon('icon-dashboard-menu-pie','PIE');
        sender.addWidgetIcon('icon-dashboard-menu-verticalbargraph','VERTICAL_BAR_GRAPH');
        sender.addWidgetIcon('icon-dashboard-menu-bargraph','BAR_GRAPH');
        sender.addWidgetIcon('icon-dashboard-menu-stackedbargraph','STACKED_BAR_GRAPH');
        sender.addWidgetIcon('icon-dashboard-menu-line','LINE');
        
        sender.up('dashboardEditor').getController().disableEditionMode();

    },
    
    
    /**
     * Editor menu icon events listener
     * @param {type} sender
     * @returns {undefined}
     */
    onWidgetIconClick: function(sender){
        
        Dashboard.manager.DashboardEditorManager.createIndicator(sender.action);
        
    }
   
    
}, function(){
    //Dashboard.tool.Utilities.trace('Dashboard.view.dashboard.DashboardMenuController');
});