/* global Ext */

Ext.define('Dashboard.view.alerts.currentAlert.LocationDetail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'currentAlertLocationDetail',
        
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
                    title: getText('Location'),
                    reference: 'location',
                    iconCls: 'fa fa-map-marker'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    setLocationData: function (model) {
        
        var data = model.data;
        var panel = this.query('panel[reference=location]')[0];
        panel.removeAll();
        
        panel.add(this.buildField({name: getText('Name'), value: data.name}));
        var addressValue = data.path + '/' + data.name;
        panel.add(this.buildField({name: getText('Address'), value: addressValue}));
        panel.add(this.buildField({name: getText('Description'), value: data.description}));
        
        // Dynamic properties
        var properties = data.properties;
        
        if (!properties) {
            Dashboard.tool.Utilities.error('[location.Detail.setData] properties null or empty !');
            return;
        }
        
        for (var i = 0; i < properties.length; i++) {
                                    
            try {
                
                var property = Ext.create('Dashboard.model.PropertyConfiguration', properties[i].configuration);
                property.value = properties[i].value;
                
                var characteristicFields = null;
                var control = Dashboard.model.PropertyConfiguration.getControl(property);

                if (control !== undefined) {
                    var configuration = control.configuration;
                    if (configuration && configuration.enabledInDetails !== undefined) {
                        if (configuration.enabledInDetails === true) {
                            characteristicFields = this.buildField(property);
                            panel.add(characteristicFields);
                        }
                    } else {
                        characteristicFields = this.buildField(property);
                        panel.add(characteristicFields);
                    }
                }

            } catch (ex) {
                Dashboard.tool.Utilities.error('[location.Detail.setData] error :' + ex);
            }
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

        var locationPanel = this.query('panel[reference=location]')[0];
        locationPanel.removeAll();
        
        // Get location 
        if (data.location) {
            Dashboard.manager.administration.LocationsManager.getOne(data.location.id, this, 'setLocationData');
        }

        
    }
    
});