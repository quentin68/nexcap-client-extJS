Ext.define('Dashboard.view.system.serverLogs.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'serverLogsMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.system.serverLogs.MainController'
    ],
    
    controller: 'serverLogsMain',
    store: null,
    configuration: null,
    feature: null,
    //modelProperties: Dashboard.manager.administration.ServerLogsManager.getProperties(),
    
    iconCls : 'fa fa-paw',
    border: false,
    heigth: '100%',
    layout: 'border',

    listeners:{
        render: 'onRenderMain'
    },
    
    defaults:{
        heigth: '100%'
    },

    initComponent: function() {
        
        this.getController().feature = this.feature;
        
        this.title = getText('Server logs');
        
        this.items = [
            {
                xtype: 'panel',
                region: 'center',
                reference: 'body',
                layout: 'border',
                collapsible: false,
                items: [
                    {
                        xtype: 'serverLogsTree',
                        region: 'center',
                        reference: 'mainListContainer',
                        collapsible: false,
                        flex: 1,
                        configuration: this.configuration
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
    
});