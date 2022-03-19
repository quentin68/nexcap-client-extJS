/* global Ext */

Ext.define('Dashboard.view.administration.reference.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'referenceMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.administration.reference.Detail',
        'Dashboard.view.administration.reference.ViewModel',
        'Dashboard.view.administration.reference.MainController'
    ],
    
    controller: 'referenceMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.administration.ReferencesManager.getProperties(),
    
    iconCls : 'fa fa-archive',
    border: false,
    heigth: '100%',
    layout: 'border',

    listeners:{
        render: 'onRenderMain'
    },
    
//    layout: {
//        type: 'accordion',
//        titleCollapse: false,
//        animate: true,
//        activeOnTop: false,
//        hideCollapseTool: false,
//        vertical:true,
//        multi: true
//    },
    
    defaults:{
        heigth: '100%'
    },
    

    //controller:['ReferencesManager'],

    initComponent: function() {
        
        this.getController().feature = this.feature;
        
        this.title = getText('Product references administration');
        
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
//            {
//                xtype: 'panel',
//                title: 'filters',
//                region: 'north',
//                minHeight : 150,
//                animate: false,
//                collapsed: true,
//                titleCollapse: false,
//                collapsible: true
////                split: {
////                    size: 20
////                }
//            },
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
                            xtype: 'referenceDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
    
    
    
});