Ext.define('Dashboard.view.historic.alert.InventoryDetail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'historicInventoryAlertDetail',
        
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
        characteristicsPanel.add(this.buildField({name: getText('Alert Configuration Name'), value: data.alertConfigurationName}));
        characteristicsPanel.add(this.buildField({name: getText('Alert level'), value: data.alertLevel}));
        characteristicsPanel.add(this.buildField({name: getText('Alert Configuration Description'), value: data.alertConfigurationDescription}));
        characteristicsPanel.add(this.buildField({name: getText('Trigger'), value: data.triggerEventLabel}));
        characteristicsPanel.add(this.buildField({name: getText('User'), value: data.userSticker}));
        characteristicsPanel.add(this.buildField({name: getText('Start date'), value: this.dateToString(data.startDate)}));
        characteristicsPanel.add(this.buildField({name: getText('End date'), value: this.dateToString(data.endDate)}));
        characteristicsPanel.add(this.buildField({name: getText('Acknowledgment date'), value: this.dateToString(data.acknowledgmentDate)}));
        characteristicsPanel.add(this.buildField({name: getText('Is acknowledged'), value: data.isAcknowledged}));

        characteristicsPanel.add(this.buildField({name: getText('Inventory type'), value: data.context})); // check this with flo
        characteristicsPanel.add(this.buildField({name: getText('Inventory Date'), value: data.inventoryDate}));
        characteristicsPanel.add(this.buildField({name: getText('Criteria'), value: data.reference})); // this should be different
        characteristicsPanel.add(this.buildField({name: getText('Expected items'), value: data.expectedMaterialCount}));
        characteristicsPanel.add(this.buildField({name: getText('Scanned items'), value: data.scannedMaterialCount}));
        characteristicsPanel.add(this.buildField({name: getText('Present items'), value: data.presentMaterialCount}));
        characteristicsPanel.add(this.buildField({name: getText('Missing items'), value: data.missingMaterialCount}));
        characteristicsPanel.add(this.buildField({name: getText('Foreign items'), value: data.foreignMaterialCount}));
        characteristicsPanel.add(this.buildField({name: getText('Unknown items'), value: data.unknownMaterialCount}));

    }
    
});