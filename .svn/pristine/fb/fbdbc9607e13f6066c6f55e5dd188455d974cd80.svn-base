
/* global Ext */

Ext.define('Dashboard.view.indicator.StatSensorsSelector', {
    extend: 'Ext.window.Window',
    xtype: 'StatSensorsSelector',
    requires: ['Dashboard.tool.Utilities'],

    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    layout: 'fit',
    iconCls: 'fa fa-dot-circle-o',

    mainController: null,
    
    modelProperties: null, 
    propertyConfigurationType: null,  //MATERIAL | ALERT ...
    statisticReference: null,
    target: null,
    
    config: {
        controlsStore: Ext.create('Dashboard.store.system.Sensors', {
            autoLoad: false
        })
    },

    initComponent: function (){

        this.title = getText('Filter configuration');
        
        this.getControlsStore().on('load', this.onControlsLoaded, this);
        this.getControlsStore().load();

        var newFilter = {
            xtype: 'panel',
            reference: 'newFilter',
            defaults:{
                labelSeparator: getText(':'),
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'combo',
                    name: 'sensor',
                    fieldLabel: getText('Sensor'),
                    store: this.getControlsStore(),
                    displayField: 'name',
                    valueField: 'id',
                    editable: true,
                    allowBlank: false,
                    forceSelection: true
                }
            ]
        };


        var form = {
            xtype: 'panel',
            border: false,
            flex: 1,
            height: '100%',
            bodyPadding: '0 0 24 0',
            scrollable: 'y',

            defaults: {
                width: '100%',
                ui: 'property-create',
                minHeight: 80,
                bodyPadding: '24',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                }
            },
            
            items: [
                newFilter
            ]
        };

        var me = this;
        Ext.apply(me, {

            items: [
                {
                    xtype: 'form',
                    border: false,
                    width: 500,
                    height: 250,
                    layout: 'hbox',

                    items: [form],

                    buttons: [
                        {
                            text: getText('Validate'),
                            reference: 'onAddNewFilter',
                            disabled: false
                        }, {
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
    
    

    // ==========================================================================
    // Methods
    // ==========================================================================


    onControlsLoaded: function(){
        this.setData(this.target.filter);
    },
    
    
    setData: function(filter){
        
                                
        if(!filter){
            return;
        }
        
        var propertyCombo = this.down('combo[name=sensor]');
        
        if(!propertyCombo.getSelection()){
            propertyCombo.setValue(filter.value);
        }
        
    },


    getData: function (){

        var sensorId = this.down('combo[name=sensor]').getValue();
        var sensorName = this.down('combo[name=sensor]').getRawValue();

        var data = {
            filter: "SENSOR",
            property: 'sensorId',
            value: sensorId,
            displayValue: sensorName,
            label: sensorName
        };

        return data;
    }

});