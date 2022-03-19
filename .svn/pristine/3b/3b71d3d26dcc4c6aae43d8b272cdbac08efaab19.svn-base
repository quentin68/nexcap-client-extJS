Ext.define('Dashboard.view.alerts.operationAlert.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'operationAlertMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.alerts.operationAlert.Detail',
        'Dashboard.view.alerts.operationAlert.MainController'
    ],
    
    controller: 'operationAlertMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.alerts.OperationsAlertsManager.getProperties(),
    manager: null,
    
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
        
        this.title = getText('Current operations alerts');
        
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
                    },{
                        xtype: 'panel',
                        region: 'east',
                        reference: 'detailContainer',
                        flex: 1,
                        layout: 'fit',
                        split: true,
                        collapsible: false,
                        items: {
                            xtype: 'operationAlertDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});