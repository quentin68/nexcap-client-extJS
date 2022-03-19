Ext.define('Dashboard.view.historic.alert.UserDetail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'historicUserAlertDetail',
        
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

        characteristicsPanel.add(this.buildField({name: getText('Login'), value: data.userInAlertLogin}));
        characteristicsPanel.add(this.buildField({name: getText('Name'), value: data.userInAlertLastName}));
        characteristicsPanel.add(this.buildField({name: getText('First name'), value: data.userInAlertFirstName}));
        characteristicsPanel.add(this.buildField({name: getText('Badge number'), value: data.BadgeNumber}));
        characteristicsPanel.add(this.buildField({name: getText('Mail'), value: data.mail}));
        characteristicsPanel.add(this.buildField({name: getText('Profiles'), value: data.Profiles})); // TODO CHECK FOR LIST
        characteristicsPanel.add(this.buildField({name: getText('Dynamic properties'), value: data.dynamicProperties}));  // TODO CHECK FOR LIST

    }
    
});