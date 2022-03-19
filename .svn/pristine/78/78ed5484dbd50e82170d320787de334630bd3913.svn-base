
Ext.define('Dashboard.view.main.MainPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'app_main',

    requires: [
        'Ext.MessageBox',
        
        'Dashboard.view.dashboard.DashboardEditor'
    ],

    fullscreen: true,

    defaults: {
        //styleHtmlContent: true
    },

    tabBarPosition: 'bottom',

           items: [
               {
                    title: 'Dashboard',
                    iconCls: 'icon-menu-dashboard',
                    items: [
                        {
                            xtype: 'dashboardEditor'
                        }
                    ]
                },
                {
                    title: 'Search',
                    iconCls: 'icon-menu-search',
                    html: 'Search Screen'
                },
                {
                    title: 'Notifications',
                    iconCls: 'icon-menu-notifications',
                    html: 'Notifications Screen'
                },
                {
                    title: 'Consultation',
                    iconCls: 'icon-menu-administration',
                    html: 'Consultation Screen'
                }
           ]
});
