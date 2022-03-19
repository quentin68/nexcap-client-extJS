Ext.define('Dashboard.view.menu.Menu',{
    extend: 'Ext.panel.Panel',
    xtype: 'general_menu',
    
    requires: [
        'Dashboard.view.menu.MenuController'
    ],

    controller: 'menu',
    width: 190,
    
    listeners:{
        render: 'onRenderMenu'
    },
    

    defaults: {

        ui: 'accordion',
        colapsed: true

    },

    layout: {

        type: 'accordion',
        titleCollapse: true,
        animate: true,
        activeOnTop: false,
        hideCollapseTool: true,
        vertical:true,
        multi: false

    },
    

    items: [
        {
            title: 'Dashboard',
            name: 'dashboardsGeneralMenu',
            action: 'show_dashboard',
            iconCls: 'icon-menu-dashboard',
            items: [
            ]
        }//,
//        {
//            title: 'Search',
//            iconCls: 'icon-menu-search',
//            html: 'Search content!'
//        },
//        {
//            title: 'Notifications',
//            iconCls: 'icon-menu-notifications',
//            html: 'Notifications content!'
//        },
//        {
//            title: 'Settings',
//            iconCls: 'icon-menu-settings',
//            html: 'Setting content!'
//        },
//        {
//            title: 'Administration',
//            iconCls: 'icon-menu-administration',
//            items: [
//                {
//                    xtype: 'button',
//                    text: 'Materials',
//                    width:'100%'
//                }
//                
//            ]
//        }
    ]
    
});
