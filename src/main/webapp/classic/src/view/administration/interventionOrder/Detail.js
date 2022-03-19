Ext.define('Dashboard.view.administration.interventionOrder.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'interventionOrderDetail',
    
    referencesStore: null,
    
    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        Ext.apply( me, {
            
            
            items: [
                 {
                    xtype: 'displayfield',
                    bind: {
                        value: '{number}' 
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                    //cls: 'view-list-title'

                },{
                    title: getText('Characteristics'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                },{
                    title: getText('Associated References'),
                    reference: 'references',
                    iconCls: 'fa fa-archive',
                    height: 400,
                    items:{
                        xtype: 'grid',
                        store: this.referencesStore,
                        name : 'referencesGrid',
                        columns: [
                            { text: getText('Ref. Code'), dataIndex: 'referenceCode', flex:1 },
                            { text: getText('Ref. Designation'), dataIndex: 'designation', flex:1 },
                            { text: getText('Category'), dataIndex: 'productCategory', flex:1 ,
                                renderer : function(productCategory) {
                                    if (productCategory) {
                                        return productCategory.name;
                                    } 
                                    return '';
                                }
                            },
                            { 
                                text: getText('Type'), 
                                dataIndex: 'identified', 
                                flex:1,
                                renderer : function(val) {
                                    if (val === true) {
                                        return '<span>' + getText('Item') + '</span>';
                                    } else {
                                        return '<span>' + getText('Items Set') + '</span>';
                                    }
                                    return val;
                                }
                            }
                        ],
                        height: 400,
                        width: '100%'
                    }
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    
    setData: function(data){
        
        if(!data){
            return;
        }
        
        this.viewModel.setData(data);
        
        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({name: 'Label', value: data.label}));
        characteristicsPanel.add(this.buildField({name: 'Description', value: data.description}));
        
        
        var store  = Ext.create('Dashboard.store.administration.InterventionOrderReferences',{
            listeners:{
                scope: this,
                beforeload: function( store , operation , eOpts){
                    
                    var myFilter = {
                        property: 'interventionOrderList.id',
                        value: data.id,
                        type: 'LONG',
                        comparison: 'EQ'
                    };
                    
                    if(!store.getProxy().extraParams.filter){
                        store.getProxy().extraParams.filter = [];
                    }
                    
                    store.getProxy().extraParams.filter.push(myFilter);
                },
                load: function( store , operation , eOpts){
                    if(store.getProxy().extraParams.filter){
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });
        store.load();
        var grid = this.down('grid[name=referencesGrid]');
        grid.reconfigure(store);
        
        
    }//,
    
//    setReferences: function(){
//        var referencesPanel = this.query('panel[reference=references]')[0];
//        for(var i=0; i<data.authorizedLocationIdList.length; i++){
//            referencesPanel.add(this.buildField({name: 'Feature '+ (i+1), value: data.features[i]}));
//        }
//    }
    
});