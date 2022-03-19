Ext.define('Dashboard.view.consultation.sendings.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'consultationSendingsMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.consultation.sendings.Detail',
        'Dashboard.view.consultation.sendings.MainController'
    ],
    
    controller: 'consultationSendingsMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.operation.SendingsManager.getProperties(),
    
    iconCls : 'fa fa-paper-plane-o',
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
        
        this.title = getText('Current sendings');
        
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
//                    ,
//                    {
//                        xtype: 'panel',
//                        region: 'east',
//                        reference: 'detailContainer',
//                        flex: 1,
//                        layout: 'fit',
//                        split: true,
//                        collapsible: false,
//                        items: {
//                            xtype: 'sendingsDetail'
//                        }
//                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});