/* global Ext  */

Ext.define('Dashboard.view.system.sensor.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'sensorDetail',
    
    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        Ext.apply( me, {
            
//            dockedItems: [
//                {
//                    xtype: 'toolbar',
//                    defaults:{
//                        xtype: 'button',
//                        scale: 'small',
//                        ui: 'view-list',
//                        border: false
//                    },
//                    items: [
//
//                    ]
//                }
//            ],
            
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
        
        //this.setDock(null);
        this.down('toolbar').removeAll();
        
    },
    
    
    setData: function(data){
        if (!data) {
            return;
        }
        this.record = data;
        
        this.viewModel.setData(data);

        // Classic properties
        var characteristicsPanel = this.down('panel[reference=characteristics]');
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({name: getText('Name'), value: data.name}));
        characteristicsPanel.add(this.buildField({name: getText('value'), value: data.value}));
        characteristicsPanel.add(this.buildField({name: getText('Sensor type'), value: data.sensorType}));
        characteristicsPanel.add(this.buildField({name: getText('Connection type'), value: data.sensorConnectionType}));
        characteristicsPanel.add(this.buildField({name: getText('Enabled'), value: data.enabled}));
        characteristicsPanel.add(this.buildField({name: getText('Description'), value: data.description}));

        if (data.lastUpdateDate) {
            characteristicsPanel.add(this.buildField({
                name: getText('Last Updated'),
                value: Ext.Date.format(data.lastUpdateDate, getText('m/d/Y H:i:s'))
            }));
        }
    }


});