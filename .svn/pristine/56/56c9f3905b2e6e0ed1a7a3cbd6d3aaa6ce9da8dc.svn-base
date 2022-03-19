/*  global Ext  */

Ext.define('Dashboard.view.system.dynamicProperties.SelectOrigin', {
    extend: 'Ext.window.Window',
    xtype: 'dynamicPropertiesSelectOrigin',

    requires: [],

    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    layout: 'fit',

    initComponent: function (){
        
        this.title = getText('Select origin');
        this.subtitle = getText('property');
                        
        var propertyOriginTypesStore = Ext.create('Dashboard.store.enums.PropertyOriginType');
        
        var form = {
            xtype: 'panel',
            border: false,
            flex: 1,
            height: '100%',
            bodyPadding: '24',
            scrollable: 'y',
            defaults: {
                labelSeparator: getText(':')
            },

            items: [
                {
                    xtype: 'combo',
                    name: 'origin',
                    width: '100%',
                    fieldLabel: getText('Origin'),
                    store: propertyOriginTypesStore,
                    queryMode: 'local',
                    displayField: 'localizedLabel',
                    valueField: 'value',
                    editable: false,
                    allowBlank: true,
                    value: '',
                    forceSelection: true,
                    listeners:{
                        render: function(combo, eOpts){
                            var monitoringEnabled = Dashboard.manager.FeaturesManager.isEnabled('SENSOR_ADMINISTRATION');
                            if(!monitoringEnabled){
                                var record = combo.getStore().findRecord('value', 'TELEMETRY');
                                combo.getStore().remove(record);
                            }
                        }
                    }
                }
            ]
        };

        var me = this;
        Ext.apply(me, {
            items: [{
                    xtype: 'form',
                    border: false,
                    width: 400,
                    height: 250,
                    items: [
                        form
                    ],
                    buttons: [
                        {
                            text: getText('Cancel'),
                            scope: this,
                            handler: this.close
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
        
    },



    /**
     * Method used by the controller to get values
     * 
     * @return (object) data
     */
    getData: function (){

        var values = this.down('form').getValues();
        return values;
    }
});
