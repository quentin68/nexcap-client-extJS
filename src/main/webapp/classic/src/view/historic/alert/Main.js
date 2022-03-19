Ext.define('Dashboard.view.historic.alert.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'historicAlertMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.historic.alert.Detail',
        'Dashboard.view.historic.alert.ItemDetail',
        'Dashboard.view.historic.alert.InventoryDetail',
        'Dashboard.view.historic.alert.StockDetail',
        'Dashboard.view.historic.alert.UserDetail',
        'Dashboard.view.historic.alert.LocationDetail',
        'Dashboard.view.historic.alert.DeviceDetail',
        'Dashboard.view.historic.alert.ViewModel',
        'Dashboard.view.historic.alert.MainController'
    ],
    
    controller: 'historicAlertMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.historic.AlertsManager.getProperties(),
    detailAlias: null,
    
    iconCls : 'fa fa-bug',
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
        
        //this.title = getText('Anomalies');
        
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
                            xtype: this.detailAlias //'historicAlertDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});