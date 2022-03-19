Ext.define('Dashboard.view.system.updatePackage.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'updatePackageDetail',
    
    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        Ext.apply( me, {
            
            items: [
                 {
                    xtype: 'displayfield',
                    bind: {
                        value: '{name}' 
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'

                },{
                    title: getText('Characteristics'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }
//                ,{
//                    title: getText('Features'),
//                    reference: 'features',
//                    iconCls: 'fa fa-check'
//                }
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
        characteristicsPanel.add(this.buildField({name: getText('Name'), value: data.name}));
        
//        var featuresPanel = this.query('panel[reference=features]')[0];
//        featuresPanel.removeAll();
//        for(var i=0; i<data.features.length; i++){
//            
//            var store = Ext.create('Dashboard.store.Rights');
//            var feature = store.findRecord('name', data.features[i].name);
//            
//            //featuresPanel.add(this.buildField({name: null, value: data.features[i].name}));
//            featuresPanel.add(this.buildField({name: null, value: feature.data.label}));
//        }

    }
    
});