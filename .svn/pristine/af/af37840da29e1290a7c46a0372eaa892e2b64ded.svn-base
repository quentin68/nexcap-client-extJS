Ext.define('Dashboard.view.settings.alertsConfig.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'alertsConfigMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.settings.alertsConfig.ViewModel',
//        'Dashboard.view.alerts.currentAlert.ItemDetail',
//        'Dashboard.view.alerts.currentAlert.InventoryDetail',
//        'Dashboard.view.alerts.currentAlert.StockDetail',
//        'Dashboard.view.alerts.currentAlert.UserDetail',
//        'Dashboard.view.alerts.currentAlert.LocationDetail',
//        'Dashboard.view.alerts.currentAlert.DeviceDetail',
        'Dashboard.view.system.alertsConfiguration.Detail',
        'Dashboard.view.settings.alertsConfig.MainController'
    ],
    
    controller: 'alertsConfigMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.settings.AlertsConfigManager.getProperties(),
    detailAlias: null,
    manager: null,
    
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
       
        //this.title = getText('Alerts configuration');
        
        this.getController().feature = this.feature;
        
        //debugger;
        
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
                    }, {
                        xtype: 'panel',
                        region: 'east',
                        reference: 'detailContainer',
                        flex: 1,
                        layout: 'fit',
                        split: true,
                        collapsible: false,
                        items: {
                            xtype: this.detailAlias // 'currentAlertDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});