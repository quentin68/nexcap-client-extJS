/* global Ext */

Ext.define('Dashboard.view.system.alertsConfiguration.EditAlert', {
    extend: 'Ext.window.Window',
    xtype: 'editAlert',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.enums.AlertModelType',
        'Ux.NumberField',
        'Ux.ComboBox',
    ],
    
    controller: 'alertsConfigMain',

    layout: 'fit',
    autoShow: false,
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 550,
    iconCls: 'fa fa-cog',
    plain : true,
    autoScroll: true,
    scrollable:'y',

    record: null,
    controlDefStore: null,
    
    triggerStore : null,

    initComponent: function() {
        
        this.title = getText('Edit an alert');

        this.alertModelTypesStore = Ext.create('Dashboard.store.enums.AlertModelType');

        this.daysStore = Ext.create('Ext.data.Store', {
            fields: ['name'],
            data: [
                { "name": "SATURDAY" },
                { "name": "SUNDAY" },
                { "name": "MONDAY" },
                { "name": "TUESDAY" },
                { "name": "WEDNESDAY" },
                { "name": "THURSDAY" },
                { "name": "FRIDAY" }
            ]
        });

        var comboAlertModelTypes = {
            xtype: 'combo',
            name: 'alertType',
            reference: 'comboModelType',
            fieldLabel: getText('Alert type'),
            displayField: 'localizedLabel',
            valueField: 'name',
            //value: 'ITEM',
            allowBlank: false,
            queryParam: false,
            editable: false,
            store: this.alertModelTypesStore,
            forceSelection: true,
            matchFieldWidth: true
        };

        var comboCalculation = {
            xtype: 'textfield',
            name : 'beanid',
            maxLength: 255,
            fieldLabel: getText('Alert computing module')
        };

        var alertConfigPanel = Ext.create('Ext.panel.Panel',{
            border: false,
            title: getText('Alert'),
            reference: 'alertConfigPanel',
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            },
            items: [
                comboAlertModelTypes,
                comboCalculation,

                {
                    xtype: 'radiogroup',
                    fieldLabel: getText('Alert level'),
                    allowBlank: false,
                    items: [
                        { boxLabel: getText('Low'), name: 'alertLevel', inputValue: 'LOW', width: 100},
                        { boxLabel: getText('Medium'), name: 'alertLevel', inputValue: 'MEDIUM', width: 100 },
                        { boxLabel: getText('High'), name: 'alertLevel', inputValue: 'HIGH', width: 100 }
                    ]
                }, {
                    xtype: 'textfield',
                    name : 'name',
                    maxLength: 255,
                    fieldLabel: getText('Name')
                }, {
                    xtype: 'textfield',
                    name : 'description',
                    maxLength: 255,
                    fieldLabel: getText('Description')
                }, //old
                {
                    xtype: 'textfield',
                    name : 'params',
                    fieldLabel: getText('Parameters'),
                    validator: function(val){
                        if(val !== null && Ext.String.startsWith(val,'{')&& Ext.String.endsWith(val,'}') ){
                            try {
                                JSON.parse(val);
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }
                        return true;

                    }
                }, /*{
                     xtype: 'container',
                     reference : 'params',
                     defaults: {
                        labelWidth: 112,
                        width: "100%",
                        labelSeparator: getText(':')
                    },
                    layout: 'vbox'
                }, */ {
                    xtype: 'checkbox',
                    name : 'enabled',
                    fieldLabel: getText('Enabled')
                }
            ]
        });

        var triggersFieldSet = Ext.create('Ext.panel.Panel',{
            title: getText('Trigger selection'),
            name: 'triggersSelector',
            bodyStyle: 'background-color:#ffffff; padding: 5px',
            autoScroll: true,
            defaults: {
                anchor: '100%'
            },
            items:[]
        });

        this.items = [
            {
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width : 650,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable:'y',

                defaults:{
                    bodyPadding: 20,
                    ui: 'form-panel'
                },

                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },

                items : [
                    alertConfigPanel,
                    triggersFieldSet
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Save'),
                action: 'save'
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },

    displayTriggers: function(obj){
        var operations = obj.compatibleTriggers;
        var triggerStore = Ext.create('Dashboard.store.settings.TriggerEnum');
        var models = [];

        Ext.each(operations, function(operationName){
            triggerStore.each(function(item){
                if (item.data.name == operationName) {
                    models.push(item);
                }
            });
        }, this);

        this.setTriggersSelector(models);
    },

    /**
     * Clean and fill the triggers panel
     * @param {type} triggersList
     * @returns {undefined}
     */
    setTriggersSelector: function (triggersList){

        var triggersSelector = Ext.ComponentQuery.query('panel[name="triggersSelector"]')[0];
        triggersSelector.removeAll();

        for(var i = 0; i < triggersList.length; i++){
            this.addTrigger(i, triggersList[i].data.name, triggersList[i].data.description, triggersSelector);
        }
    },

    /**
     * add checkBox
     * @param {type} index
     * @param {type} name
     * @param {type} description
     * @param {type} triggersSelector
     * @returns {undefined}
     */
    addTrigger: function(index, name, description, triggersSelector){

        var enabled = false;
        for (var i = 0; i < this.record.triggers.length ; i++) {
            if (this.record.triggers[i].trigger === name) {
                enabled = true;

                //TODO ADD CASE OF DATE TIME FOR VALUES
            }
        }

        var panel = Ext.create('Ext.panel.Panel', {
            border: false,
            layout: 'vbox',
            defaults:{
                hidden: true,
                margin: '3 6 0 26'
            },
            items: [
                {
                    xtype: 'checkbox',
                    checked: enabled,
                    hidden: false,
                    border: false,
                    anchor: '100%',
                    margin: '12 6 0 6',
                    boxLabel: description,
                    name: 'triggers',
                    inputValue: name,
                    listeners: {
                        change: function (checkbox, newVal, oldVal) {
                            var dayInMonth = Ext.ComponentQuery.query('numberfield[name=dayInMonth_' + name + ']')[0];
                            var daysInWeek = Ext.ComponentQuery.query('combobox[name=daysInWeek_' + name + ']')[0];
                            var hour = Ext.ComponentQuery.query('numberfield[name=hour_' + name + ']')[0];
                            var minutes = Ext.ComponentQuery.query('numberfield[name=minutes_' + name + ']')[0];
                            switch (checkbox.inputValue) {
                                case "NEW_DAY":
                                    if (newVal) {
                                        hour.show();
                                        hour.allowBlank = false;
                                        minutes.show();
                                        minutes.allowBlank = false;
                                    } else {
                                        hour.hide();
                                        hour.allowBlank = true;
                                        hour.setValue(null);
                                        minutes.hide();
                                        minutes.allowBlank = true;
                                        minutes.setValue(null);
                                    }
                                    break;
                                case "NEW_HOUR":
                                    if (newVal) {
                                        minutes.show();
                                        minutes.allowBlank = false;
                                    } else {
                                        minutes.hide();
                                        minutes.allowBlank = true;
                                        minutes.setValue(null);
                                    }
                                    break;
                                case "NEW_WEEK":
                                    if (newVal) {
                                        daysInWeek.show();
                                        hour.show();
                                        daysInWeek.allowBlank = false;
                                        hour.allowBlank = false;
                                        minutes.show();
                                        minutes.allowBlank = false;
                                    } else {
                                        daysInWeek.hide();
                                        daysInWeek.allowBlank = true;
                                        daysInWeek.setValue(null);
                                        hour.hide();
                                        hour.allowBlank = true;
                                        hour.setValue(null);
                                        minutes.hide();
                                        minutes.allowBlank = true;
                                        minutes.setValue(null);
                                    }
                                    break;
                                case "NEW_MONTH":
                                    if (newVal) {
                                        dayInMonth.show();
                                        hour.show();
                                        dayInMonth.allowBlank = false;
                                        hour.allowBlank = false;
                                        minutes.show();
                                        minutes.allowBlank = false;
                                    } else {
                                        dayInMonth.hide();
                                        dayInMonth.allowBlank = true;
                                        dayInMonth.setValue(null);
                                        hour.hide();
                                        hour.allowBlank = true;
                                        hour.setValue(null);
                                        minutes.hide();
                                        minutes.allowBlank = true;
                                        minutes.setValue(null);
                                    }
                                    break;
                            }
                        }
                    }
                }, {
                    xtype: 'ux-combo',
                    name: 'daysInWeek_' + name,
                    store: this.daysStore,
                    displayField: 'name',
                    valueField: 'name',
                    editable: false,
                    fieldLabel: getText('Days of the week')
                }, {
                    xtype: 'ux-numberfield',
                    name: 'dayInMonth_' + name,
                    maxValue: 31,
                    minValue: 1,
                    fieldLabel: getText('Day')
                }, {
                    xtype: 'ux-numberfield',
                    name: 'hour_' + name,
                    maxValue: 23,
                    minValue: 0,
                    fieldLabel: getText('Hour')
                }, {
                    xtype: 'ux-numberfield',
                    name: 'minutes_' + name,
                    maxValue: 59,
                    minValue: 0,
                    fieldLabel: getText('Minutes')
                }
            ]
        });

        triggersSelector.add(panel);
    },

    /**
     * Method alertConfig by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function(){
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        var id = this.record.alertConfigurationBean.id;
        values.id = this.record.id;
        values.enabled = this.query('checkbox[name=enabled][checked=true]')[0] ? true : false;
        values.alertConfigurationBean = {'id' : id};

        values.triggers = [];
        var triggersRecords = this.query('checkbox[name=triggers][checked=true]');
        Ext.Array.each(triggersRecords, function (rec){
            if (rec.inputValue) {
                var triggerEnum = rec.inputValue;
                var parameters = null;
                if (triggerEnum === "NEW_DAY") {
                    parameters = values.hour_NEW_DAY + ':' + values.minutes_NEW_DAY;
                }
                if (triggerEnum === "NEW_HOUR") {
                    parameters =  '0:' + values.minutes_NEW_DAY;
                }
                if (triggerEnum === "NEW_WEEK") {
                    parameters = values.daysInWeek_NEW_WEEK + ' ' + values.hour_NEW_WEEK+ ':' + values.minutes_NEW_WEEK;
                }
                if (triggerEnum === 'NEW_MONTH') {
                    parameters = values.dayInMonth_NEW_MONTH + ' ' + values.hour_NEW_MONTH+ ':' + values.minutes_NEW_MONTH;
                }
                values.triggers.push({
                    'trigger': triggerEnum,
                    'parameters': parameters
                });
            }
        });

        return values;
    },            
            
    setData: function(data){
        this.record = data;
        this.down('form').getForm().setValues(data);
        this.down('combo[name=alertType]').setReadOnly(true);
        this.down('textfield[name=beanid]').setValue(data.alertConfigurationBean.description);
        this.down('textfield[name=beanid]').setReadOnly(true);

         this.calculationRulesStore = Ext.create('Dashboard.store.settings.AlertsConfiguration', {
             autoLoad: true,
             listeners: {
                 scope: this,
                 beforeLoad: function (store, operation, eOpts) {
                     store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfigurationbean/listwithtrigger/' + this.record.alertType;
                 },
                 load: function(store, records, successful) {
                    var store_length = store.getCount();
                     for (var i = 0; i < store_length ; i++) {
                         if (records[i].data.id == this.record.alertConfigurationBean.id) {
                             var Obj = records[i].data;
                         }
                     }
                     this.displayTriggers(Obj);
                 }
             }
        });
    }

});   