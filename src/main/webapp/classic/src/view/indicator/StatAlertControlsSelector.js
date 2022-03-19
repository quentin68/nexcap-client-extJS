
/* global Ext  */

Ext.define('Dashboard.view.indicator.StatAlertControlsSelector', {
    extend: 'Ext.window.Window',
    xtype: 'statAlertControlsSelector',
    requires: ['Dashboard.tool.Utilities'],

    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    layout: 'fit',
    iconCls: 'fa fa-cog',

    mainController: null,
    
    modelProperties: null, 
    propertyConfigurationType: null,  //MATERIAL | ALERT ...
    statisticReference: null,
    target: null,
    
    config: {
        controlsStore: Ext.create('Dashboard.store.settings.AlertsConfig', {
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
                    name: 'controlDefinitions',
                    fieldLabel: getText('Type of control'),
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
                    width: 750,
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
        
        var propertyCombo = this.down('combo[name=controlDefinitions]');
        
        if(!propertyCombo.getSelection()){
            propertyCombo.setValue(filter.value);
        }
        
    },


    getData: function (){

        var controlDefinitionId = this.down('combo[name=controlDefinitions]').getValue();
        var controlDefinitionDescription = this.down('combo[name=controlDefinitions]').getRawValue();

        var data = {
            filter: "ALERT_CONFIGURATION",
            property: 'controlId',
            value: controlDefinitionId,
            displayValue: controlDefinitionDescription,
            label: controlDefinitionDescription
        };

        return data;
    }

});