Ext.define('Dashboard.view.system.updatePackage.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'updatePackageMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.system.updatePackage.Detail',
        'Dashboard.view.system.updatePackage.MainController'
    ],
    
    controller: 'updatePackageMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.system.PackagesManager.getProperties(),

    iconCls : 'fa fa-gift',
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
        
        this.title = getText('Update packages administration');
            
        this.items = [
            
            {
                xtype: 'panel',
                region: 'center',
                reference: 'body',
                layout: 'border',
                collapsible: false,
                //titleCollapse: false,
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
//                    ,{
//                        xtype: 'panel',
//                        region: 'east',
//                        reference: 'detailContainer',
//                        flex: 1,
//                        layout: 'fit',
//                        split: true,
//                        collapsible: false,
//                        items: {
//                            xtype: 'updatePackageDetail'
//                        }
//                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});