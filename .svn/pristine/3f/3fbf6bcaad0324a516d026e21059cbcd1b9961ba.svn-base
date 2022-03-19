Ext.define('Dashboard.view.administration.position.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'positionMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.administration.position.Detail',
        'Dashboard.view.administration.location.Detail',
        'Dashboard.view.administration.position.ViewModel',
        'Dashboard.view.administration.position.MainController'
    ],
    
    controller: 'positionMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.administration.PositionsManager.getProperties(),
    
    iconCls : 'fa fa-map-marker', //fa fa-globe //fa fa-dot-circle-o
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
        
        this.getController().feature = this.feature;
        
        this.title = getText('Locations administration');
        
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
                        xtype: 'positionTree',
                        region: 'center',
                        reference: 'mainListContainer',
                        collapsible: false,
                        flex: 2,
                        configuration: this.configuration
                    },{
                        xtype: 'panel',
                        region: 'east',
                        reference: 'detailContainer',
                        flex: 1,
                        layout: 'fit',
                        split: true,
                        collapsible: false,
                        items: {
                            xtype: 'positionDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    },
            
            
    showDetail: function(type){
        
        if(!type){
            Dashboard.tool.Utilities.error('[position.Main.showDetail] error: detail type is null !');
        }

        var container = this.lookupReference('detailContainer');
        container.removeAll();
        
        if(type === 'position'){
            container.add({xtype: 'positionDetail'});
        }else{
            container.add({xtype: 'locationDetail'});
        }

    }
    
    
    
});