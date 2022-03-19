Ext.define('Dashboard.view.settings.specificCheckConfig.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'specificCheckConfigMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.settings.specificCheckConfig.ViewModel',
        'Dashboard.view.settings.specificCheckConfig.MainController'
    ],
    
    controller: 'specificCheckConfigMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.settings.SpecificCheckConfigManager.getProperties(),
    
    iconCls : 'fa fa-cog',
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

        this.title = getText('Specific check configuration');
        
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