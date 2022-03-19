Ext.define('Dashboard.view.consultation.items.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'consultationItemsMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.administration.material.Detail',
        //'Dashboard.view.administration.reference.Detail',
        'Dashboard.view.consultation.items.MainController'
    ],
    
    controller: 'consultationItemsMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.consultation.ItemsManager.getProperties(),
    
    iconCls : 'x-fa fa-tag',
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
        
        this.title = getText('Items inventory');
        
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
                    },
                    {
                        xtype: 'panel',
                        region: 'east',
                        reference: 'detailContainer',
                        flex: 1,
                        layout: 'fit',
                        split: true,
                        collapsible: false,
                        items: {
                            xtype: 'materialDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }//,
            
//    showDetail: function(modelType){
//
//        if(!modelType){
//            Dashboard.tool.Utilities.error('[items.Main.showDetail] error: detail type is null !');
//        }
//
//        var container = this.down('panel[reference=detailContainer]');
//        container.removeAll();
//
//        if(modelType === 'material'){
//            container.add({xtype: 'materialDetail'});
//        }else{
//            container.add({xtype: 'referenceDetail'});
//        }
//
//    }

});