Ext.define('Dashboard.view.dashboard.DashboardEditor', {
    extend: 'Ext.Carousel',
    xtype: 'dashboardEditor',


    //controller: 'dashboardEditor',
    
    fullscreen: true,

    direction: 'vertical',

    defaults: {
        styleHtmlContent: true
    },

    items: [
        {
            html : 'Item 1',
            style: 'background-color: #759E60'
        },
        {
            html : 'Item 2',
            style: 'background-color: #5E99CC'
        }
    ]

    
});