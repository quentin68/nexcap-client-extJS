Ext.define('Dashboard.view.administration.category.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'categoryMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.administration.category.Detail',
        'Dashboard.view.administration.category.ViewModel',
        'Dashboard.view.administration.category.MainController'
    ],
    
    controller: 'categoryMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.administration.CategoriesManager.getProperties(),
    
    
    iconCls : 'fa fa-object-group',
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

    initComponent: function() {
        
        this.title = getText('Product categories administration');
        
        this.getController().feature = this.feature;
        
        this.items = [
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
                        xtype: 'categoryTree',
                        region: 'center',
                        reference: 'mainListContainer',
                        collapsible: false,
                        flex: 2,
                        configuration: this.configuration//,
//                        store: this.store
                    },{
                        xtype: 'panel',
                        region: 'east',
                        reference: 'detailContainer',
                        flex: 1,
                        layout: 'fit',
                        split: true,
                        collapsible: false,
                        items: {
                            xtype: 'categoryDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
    
    
    
});