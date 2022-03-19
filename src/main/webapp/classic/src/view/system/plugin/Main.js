Ext.define('Dashboard.view.system.plugin.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'pluginMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.system.plugin.Detail',
        'Dashboard.view.system.plugin.MainController',
        'Dashboard.view.shared.component.SelectFile'
    ],
    
    controller: 'pluginMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.system.PluginsManager.getProperties(),
    
    iconCls : 'fa fa-puzzle-piece',
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

        this.title = getText('Plug-ins administration');
            
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
                    },{
                        xtype: 'panel',
                        region: 'east',
                        reference: 'detailContainer',
                        flex: 1,
                        layout: 'fit',
                        split: true,
                        collapsible: false,
                        items: {
                            xtype: 'pluginDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});