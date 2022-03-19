Ext.define('Dashboard.view.historic.calibration.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'calibrationDetail',

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
                },{
                    title: getText('Features'),
                    reference: 'features',
                    iconCls: 'fa fa-check'
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
        
        //var model = this.config.configuration;
        
        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({name: 'Description', value: data.description}));
        
        var featuresPanel = this.query('panel[reference=features]')[0];
        featuresPanel.removeAll();
        for(var i=0; i<data.authorizedLocationIdList.length; i++){
            featuresPanel.add(this.buildField({name: 'Feature '+ (i+1), value: data.features[i]}));
        }

    }
    
});