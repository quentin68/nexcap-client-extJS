Ext.define('Dashboard.view.administration.stocks.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'stocksMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.administration.stocks.ViewModel',
        'Dashboard.view.administration.stocks.MainController'
    ],
    
    controller: 'stocksMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.administration.StocksManager.getProperties(),
    
    iconCls : 'fa fa-battery-half',
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
        
        this.title = getText('Monitoring of stock levels');
        
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
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});