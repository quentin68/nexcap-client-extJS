Ext.define('Dashboard.view.cartography.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'cartographyMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.cartography.MainController',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.administration.material.Detail'
    ],
    
    controller: 'cartographyMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.cartography.CartographyManager.getProperties(),
    
    iconCls : 'fa fa-map-o',
    border: false,
    heigth: '100%',
    layout: 'border',

    listeners:{
        render: 'onRenderMainCarto'
    },
    
    defaults:{
        heigth: '100%'
    },
    
    initComponent: function() {
        
        
       //this.getController().feature = this.feature;
       this.title = getText('Maps');
            
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
                        //flex: 2,
                        configuration: this.configuration,
                        store: this.store,
                        mainView: this,
                        modelProperties: this.modelProperties,
                        defaultView: 'album'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});