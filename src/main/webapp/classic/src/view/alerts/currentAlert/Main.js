/* global Ext */

Ext.define('Dashboard.view.alerts.currentAlert.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'currentAlertMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.alerts.currentAlert.Detail',
        'Dashboard.view.alerts.currentAlert.ItemDetail',
        'Dashboard.view.alerts.currentAlert.InventoryDetail',
        'Dashboard.view.alerts.currentAlert.StockDetail',
        'Dashboard.view.alerts.currentAlert.UserDetail',
        'Dashboard.view.alerts.currentAlert.LocationDetail',
        'Dashboard.view.alerts.currentAlert.DeviceDetail',
        'Dashboard.view.alerts.currentAlert.MainController'
    ],
    
    controller: 'currentAlertMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: null, //Dashboard.manager.alerts.CurItemsAlertsManager.getProperties(),
    detailAlias: null,
        
    iconCls : 'x-fa fa-exclamation-triangle',
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
      //  console.log("store", this.store);
      //  console.log("modelProperties", this.modelProperties);
        this.getController().feature = this.feature;
                        
        var filtersPanel = {
            xtype: Ext.create('Dashboard.view.shared.filtering.FiltersBar',{
                store : this.store,
                parentView: this,
                modelProperties: this.modelProperties,
                filtersList: this.getController().getFilters(),
                region: 'north'
            })
        };
            
        this.items = [
            
            filtersPanel,
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