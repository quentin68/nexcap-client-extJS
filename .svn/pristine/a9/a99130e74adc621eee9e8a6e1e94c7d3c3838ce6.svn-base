Ext.define('Dashboard.view.settings.notifMailConfig.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'notifMailConfigMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.settings.notifMailConfig.ViewModel',
        'Dashboard.view.settings.notifMailConfig.MainController'
    ],
    
    controller: 'notifMailConfigMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.settings.NotifMailConfigManager.getProperties(),
    
    iconCls : 'fa fa-envelope-o',
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

        this.title = getText('Notif mail configuration');
            
        this.items = [
            
            {
                xtype: 'panel',
                region: 'center',
                reference: 'body',
                layout: 'border',
                collapsible: false,
                items: [
                    {
                        xtype: 'viewList',
                        region: 'center',
                        reference: 'mainListContainer',
                        collapsible: false,
                        flex: 2,
                        configuration: this.configuration,
                        store: this.store,
                        mainView: this,
                        modelProperties: this.modelProperties
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});