/* global Ext */

Ext.define('Dashboard.view.system.alertsConfiguration.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'alertsConfigurationDetail',
        
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
                }, {
                    title: getText('Alert configuration'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Triggers'),
                    reference: 'triggers',
                    iconCls: 'fa fa-bullhorn'
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
        
        // var alertLevelString;
        // switch (data.alertLevel) {
        //     case '0':
        //     case 0:
        //         alertLevelString = getText('Low');
        //         break;
        //     case '1':
        //     case 1:
        //         alertLevelString = getText('Medium');
        //         break;
        //     case '2':
        //     case 2:
        //         alertLevelString = getText('High');
        //         break;
        //     default:
        //         alertLevelString = '';
        //         break;
        // }
        
        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        characteristicsPanel.add(this.buildField({name: getText('Alert name'), value: data.name}));
        characteristicsPanel.add(this.buildField({name: getText('Alert level'), value: data.alertLevel}));
        characteristicsPanel.add(this.buildField({name: getText('Alert computing module'), value: data.alertConfigurationBean.description}));
        characteristicsPanel.add(this.buildField({name: getText('Type'), value: data.alertType}));
        characteristicsPanel.add(this.buildField({name: getText('Description'), value: data.description}));
        characteristicsPanel.add(this.buildField({name: getText('Enabled'), value: data.enabled}));
        characteristicsPanel.add(this.buildField({name: getText('Params'), value: data.params}));
        
        // add compatibleTriggers list
        
        var itemPanel = this.query('panel[reference=triggers]')[0];
        itemPanel.removeAll();
        for (var i = 0; i < data.triggers.length; i++) {
            itemPanel.add(this.buildField({name: getText('Trigger') + (i + 1), value: data.triggers[i].trigger}));
        }
        
    }
    
});