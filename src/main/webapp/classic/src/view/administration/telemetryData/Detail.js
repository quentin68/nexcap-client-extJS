/* global Ext  */

Ext.define('Dashboard.view.administration.telemetryData.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'telemetryDataDetail',
    
    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        Ext.apply( me, {
            
            items: [
                 {
                    reference: 'name',
                    xtype: 'displayfield',
                    bind: {
                        value: '{name}' 
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'

                }, {
                    title: getText('Characteristics'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    
    setData: function(data){
        if (!data) {
            return;
        }
        this.record = data;
        
        this.viewModel.setData(data);

        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({name: getText('Name'), value: data.name}));
        characteristicsPanel.add(this.buildField({name: getText('value'), value: data.value}));
        characteristicsPanel.add(this.buildField({name: getText('sensorType'), value: data.sensorType}));
        characteristicsPanel.add(this.buildField({name: getText('enabled'), value: data.enabled}));
        characteristicsPanel.add(this.buildField({name: getText('description'), value: data.description}));

        if (data.lastUpdateDate) {
            characteristicsPanel.add(this.buildField({
                name: getText('Last Updated'),
                value: Ext.Date.format(data.lastUpdateDate, getText('m/d/Y H:i:s'))
            }));
        }
    }


});