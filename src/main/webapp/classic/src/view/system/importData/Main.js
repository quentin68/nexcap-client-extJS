Ext.define('Dashboard.view.system.importData.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'importMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.system.importData.Detail',
        'Dashboard.view.system.importData.MainController'
    ],

    controller: 'importMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.system.ImportManager.getProperties(),
    
    iconCls : 'fa fa-file-text-o',
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
        
        this.title = getText('Imports');
        
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
                            xtype: 'importDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
    
});