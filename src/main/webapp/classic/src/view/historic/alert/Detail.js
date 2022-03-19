Ext.define('Dashboard.view.historic.alert.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'historicAlertDetail',
        
    initComponent: function() {
        
        this.configDetail();
                
        var me = this;
        Ext.apply( me, {
                        
            items: [
                 {
                    xtype: 'displayfield',
                    bind: {
                        value: '{controlName}' 
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                },{
                    title: getText('Characteristics'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
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
        characteristicsPanel.add(this.buildField({name: getText('Alert level'), value: data.alertLevel}));
        characteristicsPanel.add(this.buildField({name: getText('Operation'), value: data.operationName}));
        characteristicsPanel.add(this.buildField({name: getText('Operator'), value: data.userSticker}));
        characteristicsPanel.add(this.buildField({name: getText('Start date'), value: this.dateToString(data.startDate)}));
        characteristicsPanel.add(this.buildField({name: getText('End date'), value: this.dateToString(data.endDate)}));
        characteristicsPanel.add(this.buildField({name: getText('Acknowledgment date'), value: this.dateToString(data.acknowledgmentDate)}));
        characteristicsPanel.add(this.buildField({name: getText('Item name'), value: data.materialName}));
        characteristicsPanel.add(this.buildField({name: getText('Ref. code'), value: data.productReferenceCode}));
        characteristicsPanel.add(this.buildField({name: getText('Ref. designation'), value: data.productReferenceDesignation}));
        characteristicsPanel.add(this.buildField({name: getText('Category'), value: data.productCategoryName}));
        characteristicsPanel.add(this.buildField({name: getText('Is acknowledged'), value: data.isAcknowledged}));
        characteristicsPanel.add(this.buildField({name: getText('Source location'), value: data.sourceLocation}));
        characteristicsPanel.add(this.buildField({name: getText('Source address'), value: data.sourceAddress}));
        
    }
    
});