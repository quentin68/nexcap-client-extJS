Ext.define('Dashboard.view.historic.alert.DeviceDetail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'historicDeviceAlertDetail',
        
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
        characteristicsPanel.add(this.buildField({name: getText('Source address'), value: data.sourceAddress}));
        characteristicsPanel.add(this.buildField({name: getText('Is acknowledged'), value: data.isAcknowledged}));

        characteristicsPanel.add(this.buildField({name: getText('Type'), value: data.deviceTypeLabel}));
        characteristicsPanel.add(this.buildField({name: getText('Signature'), value: data.signature}));
        characteristicsPanel.add(this.buildField({name: getText('Description'), value: data.description }));
        characteristicsPanel.add(this.buildField({name: getText('Software version'), value: data.softwareVersion}));
        characteristicsPanel.add(this.buildField({name: getText('Last update date'),value: this.dateToString(data.lastUpdateDate, 'DATE_TIME')}));
        characteristicsPanel.add(this.buildField({name: getText('Last connection date'),value: this.dateToString(data.lastConnectionDate, 'DATE_TIME')}));
        characteristicsPanel.add(this.buildField({name: getText('Authorized'),value: data.authorized}));

        if(data.location && data.location.address){
            characteristicsPanel.add(this.buildField({name: getText('Address'),value: data.location.address}));
        }else if(data.position && data.position.address){
            characteristicsPanel.add(this.buildField({name: getText('Address'),value: data.position.address}));
        }
        
    }
    
});