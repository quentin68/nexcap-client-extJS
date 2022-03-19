Ext.define('Dashboard.view.dashboard.DashboardMenu', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard_editor_menu',

    requires: [
        'Dashboard.view.dashboard.DashboardMenuController'
    ],
    
    controller: 'dashboardMenu',
    
    name: 'dashboard_editor_menu',
    ui: 'dashboard-editor-menu',
    border: false,
    width: '100%',
    
    layout: {
        type:'hbox'
    },
    
    //Add widgets into menu
    listeners: {
        render: 'onEditorMenuRender'
    },


    items:[

    ],
    
    addWidgetIcon: function(_cls, _action){
       
        
        var widgetIcon = {
            xtype: 'button',
            ui: 'dashboard-editor-menu-button',
            width:96,
            height:96,
            scale:'large',
            border: false,
            enableToggle: false,
            cls: _cls,
            action: _action,
            listeners: {
                click: 'onWidgetIconClick'
            }
        };   
        
        this.add(widgetIcon);

    }
                

});