/* global Ext */

Ext.define('Dashboard.view.alerts.currentAlert.DeviceDetail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'currentAlertDeviceDetail',
        
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
                }, {
                    title: getText('Alert'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Acknowledgment'),
                    reference: 'acknowledgment',
                    iconCls: 'fa fa-check-circle-o'
                }, {
                    title: getText('Device'),
                    reference: 'device',
                    iconCls: 'fa fa-laptop'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    setDeviceData: function(model){

        var data = model.data;
        var panel = this.query('panel[reference=device]')[0];
        
        panel.add(this.buildField({name: getText('Type'), value: data.deviceTypeLabel}));
        panel.add(this.buildField({name: getText('Signature'), value: data.signature}));
        panel.add(this.buildField({name: getText('Description'), value: data.description }));
        panel.add(this.buildField({name: getText('Software version'), value: data.softwareVersion}));
        panel.add(this.buildField({name: getText('Last update date'),value: this.dateToString(data.lastUpdateDate, 'DATE_TIME')}));
        panel.add(this.buildField({name: getText('Last connection date'),value: this.dateToString(data.lastConnectionDate, 'DATE_TIME')}));
        panel.add(this.buildField({name: getText('Authorized'),value: data.authorized}));
        
        if(data.location && data.location.address){
            panel.add(this.buildField({name: getText('Address'),value: data.location.address}));
        }else if(data.position && data.position.address){
            panel.add(this.buildField({name: getText('Address'),value: data.position.address}));
        }
        
    },
    
    setData: function(data){
        
        if(!data){
            return;
        }
        
        this.viewModel.setData(data);
        
        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        characteristicsPanel.add(this.buildField({name: getText('Alert name'), value: data.alertConfiguration.name}));
        characteristicsPanel.add(this.buildField({name: getText('Description'), value: data.alertConfiguration.description}));
        characteristicsPanel.add(this.buildField({name: getText('Alert level'), value: data.alertConfiguration.alertLevel}));
        characteristicsPanel.add(this.buildField({name: getText('Trigger'), value: data.triggerEventLabel}));
        characteristicsPanel.add(this.buildField({name: getText('User'), value: data.userId}));
        characteristicsPanel.add(this.buildField({name: getText('Creation date'), value: this.dateToString(data.startDate, 'DATE_TIME')}));
        characteristicsPanel.add(this.buildField({name: getText('Informations'), value: data.informations}));  // this one to be discuss with marie
    
        // Acknowledgment properties
        var acknowledgmentPanel = this.query('panel[reference=acknowledgment]')[0];
        acknowledgmentPanel.removeAll();

        acknowledgmentPanel.add(this.buildField({name: getText('Is acknowledged'), value: data.isAcknowledged}));
        acknowledgmentPanel.add(this.buildField({name: getText('Reason'), value: data.acknowledmentDescription}));
        acknowledgmentPanel.add(this.buildField({name: 'Acknowledgment Date', value: this.dateToString(data.acknowledgmentDate, 'DATE_TIME')}));
        acknowledgmentPanel.add(this.buildField({name: getText('User'), value: data.userSticker}));
        acknowledgmentPanel.add(this.buildField({name: getText('Address'), value: data.address})); // this one to be discuss with Marie
        
        var devicePanel = this.query('panel[reference=device]')[0];
        devicePanel.removeAll();

        // Get device data 
        if (data.device) {
            Dashboard.manager.system.DevicesManager.getOne(data.device.id, this, 'setDeviceData');
        }
        
    }
    
});