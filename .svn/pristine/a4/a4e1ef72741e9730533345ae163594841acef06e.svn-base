/*  global Ext  */

Ext.define('Dashboard.view.settings.notifMailConfig.edit', {
    extend: 'Ext.window.Window',
    xtype: 'notifMailConfigEdit',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor',
        'Ux.ComboBox',
        'Ux.NumberField'
    ],

    controller: 'notifMailConfigMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 550,
    iconCls: 'fa fa-envelope-o',
    plain: true,
    autoScroll: true,
    scrollable: 'y',

    record: null,

    profilesList: [],
    profilesStore: null,
    triggersStore: null,
    daysStore: null,
    controlStore: null,

    initComponent: function (){

        this.title = getText('Edit a notif mail');

        this.daysStore = Ext.create('Ext.data.Store', {
            fields: ['name'],
            data: [
                {
                    "name": "MONDAY"
                }, {
                    "name": "TUESDAY"
                }, {
                    "name": "WEDNESDAY"
                }, {
                    "name": "THURSDAY"
                }, {
                    "name": "FRIDAY"
                }, {
                    "name": "SATURDAY"
                }, {
                    "name": "SUNDAY"
                }
            ]
        });

        this.controlStore = Ext.create('Dashboard.store.settings.AlertsConfiguration', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts){
                    store.getProxy().actionMethods = {
                        read: 'GET'
                    };
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfiguration';
                },
                load: function (store, operation, eOpts){
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        var columnsPanel = Ext.create('Ext.panel.Panel', {
            title: getText('Columns'),
            name: 'columnsPanel',
            reference: 'columnsPanel',
            defaults: {
                labelWidth: 112,
                labelSeparator: getText(':')
            },
            items: [],
            tools: [
                {
                    xtype: 'button',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onAddNewColumn'
                }
            ]
        });

        var profilesFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Recipient'),
            name: 'profilesSelector',
            bodyStyle: 'background-color:#ffffff; padding: 5px',
            autoScroll: true,
            defaults: {
                flex:1
            },
            items: []
        });

        var triggersFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Periodicity'),
            name: 'triggersSelector',
            bodyStyle: 'background-color:#ffffff; padding: 5px',
            autoScroll: true,
            defaults: {
                flex:1
            },
            items: []
        });

        var notifMailConfigPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            title: getText('Alert'),
            reference: 'notifMailConfigPanel',
            defaults: {
                labelWidth: 112,
                width: '100%',
                labelSeparator: getText(':')
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    maxLength: 255,
                    allowBlank: false,
                    fieldLabel: getText('Name')
                }, {
                    xtype: 'textfield',
                    name: 'description',
                    maxLength: 255,
                    allowBlank: true,
                    fieldLabel: getText('Description')
                }, {
                    xtype: 'combo',
                    name: 'controlId',
                    store: this.controlStore,
                    displayField: 'name',
                    valueField: 'id',
                    editable: false,
                    fieldLabel: getText('Control')
                }, {
                    xtype: 'textfield',
                    name: 'mailFrom',
                    fieldLabel: getText('E-Mail from'),
                    allowBlank: false,
                    minLength: 4,
                    maxLength: 256,
                    vtype: 'email'
                }, {
                    xtype: 'htmleditor',
                    name: 'mailHeader',
                    height: 200,
                    maxLength: 4096,
                    fieldLabel: getText('Mail header'),
                    fontFamilies:[
                        'Arial',
                        'Courier New',
                        'Tahoma',
                        'Times New Roman',
                        'Verdana'
                    ]
                }, {
                    xtype: 'htmleditor',
                    name: 'mailFooter',
                    height: 200,
                    maxLength: 4096,
                    fieldLabel: getText('Mail footer'),
                    fontFamilies:[
                        'Arial',
                        'Courier New',
                        'Tahoma',
                        'Times New Roman',
                        'Verdana'
                    ]
                }
            ]
        });



        this.items = [
            {
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width: 630,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable: 'y',

                defaults: {
                    bodyPadding: 20,
                    ui: 'form-panel',
                    flex:1
                },

                fieldDefaults: {
                    labelWidth: 112,
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },

                items: [
                    notifMailConfigPanel,
                    profilesFieldSet,
                    triggersFieldSet,
                    columnsPanel
                ]
            }
        ];


        this.buttons = [
            {
                text: getText('Send test'),
                action: 'send'
            }, {
                text: getText('Save'),
                action: 'save'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
        this.addAlertOwner();
        this.setData(this.record);
        this.loadProfiles(this.record.profileIds);
        this.loadTriggers(this.record.triggers);

    },
    addAlertOwner: function() {
        var profilesSelector = Ext.ComponentQuery.query('panel[name="profilesSelector"]')[0];
        profilesSelector.removeAll();
        profilesSelector.add({
            xtype: 'checkbox',
            name: 'sendToOwner',
            // fieldLabel: getText('Alert owner'),
            checked: false,
            border: false,
            anchor: '100%',
            margin: '3 6 0 6',
            boxLabel: getText('Alert owner')
        });
    },

    removeColumn: function (filter){
        filter.up('panel[reference=columnsPanel]').remove(filter);
    },        

    loadProfiles: function (userProfiles){

        this.profilesStore = Ext.create('Dashboard.store.administration.Profiles', {
            autoLoad: true,
            listeners: {
                scope: this,
                load: function (){
                    this.setProfilesSelector(this.profilesStore.data.items, userProfiles);
                }
            }
        });

    },  

    loadTriggers: function (triggers){

        this.triggersStore = Ext.create('Dashboard.store.settings.NotifMailTriggerEnum', {
            autoLoad: true,
            listeners: {
                scope: this,
                load: function (){
                    this.setTriggersSelector(this.triggersStore.data.items, triggers);
                }
            }
        });

    },  

    /**
     * Clean and fill the profiles panel
     * @param {type} profilesList
     * @param {type} userProfiles
     * @returns {Boolean}
     */
    setProfilesSelector: function (profilesList, userProfiles){

        var profilesSelector = Ext.ComponentQuery.query('panel[name="profilesSelector"]')[0];
       // profilesSelector.removeAll();

        if (!profilesList) {
            return false;
        }

        var userProfilesId = [];
        for (var i = 0; i < userProfiles.length; i++) {
            userProfilesId.push(userProfiles[i]);
        }

        for (var i = 0; i < profilesList.length; i++) {

            var checked = false;
            if (Ext.Array.contains(userProfilesId, profilesList[i].data.id)) {
                checked = true;
            }
            this.addProfile(i, profilesList[i].data.name, parseInt(profilesList[i].data.id), profilesSelector, checked);
        }
    },

    /**
     * Clean and fill the triggers panel
     *  @argument {List} triggersList
     *  @argument {List} triggers
     */
    setTriggersSelector: function (triggersList, triggers){

        var triggersSelector = Ext.ComponentQuery.query('panel[name="triggersSelector"]')[0];
        triggersSelector.removeAll();

        if (!triggersList) {
            return false;
        }

        for (var i = 0; i < triggersList.length; i++) {

            var checked = false;
            var parameters = null;
            for (var j = 0; j < triggers.length; j++) {
                if (triggers[j].trigger === triggersList[i].data.name) {
                    checked = true;
                    if (triggers[j].parameters !== null) {
                        parameters = triggers[j].parameters.split(' ');
                    }
                    break;
                }
            }

            this.addTrigger(i, triggersList[i], parameters, triggersSelector, checked);
        }
    },

    /**
     * add checkBox
     * @argument {int} index description
     * @argument {string} name
     * @argument {int} id
     * @argument {panel} profilesSelector Target panel
     * @argument {boolean} checkBoxValue
     */
    addProfile: function (index, name, id, profilesSelector, checkBoxValue){

        profilesSelector.add({

            xtype: 'checkbox',
            checked: checkBoxValue,
            border: false,
            anchor: '100%',
            margin: '3 6 0 6',
            boxLabel: name,
            name: 'profileIds',
            inputValue: id
        });
    },

    addTrigger: function (index, triggerCurrent, parameters, triggersSelector, checked){

        var name = triggerCurrent.data.name;
        var description = triggerCurrent.data.description;
        
        var monthDay = null;  //value 1
        var hour = null; // value 2
        var minutes = null;
        var weekDay = null; // value 3

        if (parameters !== null && parameters.length > 2) {
            monthDay = parameters[0];
            weekDay = parameters[0];
            hour = parameters[1];
            minutes = parameters[2];

        } else if (parameters !== null && parameters.length === 2) {
            hour = parameters[0];
            minutes = parameters[1];
        } else if (parameters !== null && parameters.length === 1) {
            minutes = parameters[0];
        }

        var panel = Ext.create('Ext.panel.Panel', {
            border: false,
            layout: 'vbox',
            defaults: {
                hidden: true,
                margin: '3 6 0 26'
            },
            items: [
                {
                    xtype: 'checkbox',
                    checked: checked,
                    hidden: false,
                    border: false,
                    anchor: '100%',
                    margin: '12 6 0 6',
                    boxLabel: description,
                    name: 'triggers',
                    inputValue: name,
                    listeners: {
                        change: function (checkbox, newVal, oldVal)
                        {
                            var daysInWeek = Ext.ComponentQuery.query('combobox[name=daysInWeek_' + name + ']')[0];
                            var hour = Ext.ComponentQuery.query('numberfield[name=hour_' + name + ']')[0];
                            var dayInMonth = Ext.ComponentQuery.query('numberfield[name=dayInMonth_' + name + ']')[0];
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
                        },
                        render: function (field){

                            var daysInWeek = Ext.ComponentQuery.query('combobox[name=daysInWeek_' + name + ']')[0];
                            var hour = Ext.ComponentQuery.query('numberfield[name=hour_' + name + ']')[0];
                            var dayInMonth = Ext.ComponentQuery.query('numberfield[name=dayInMonth_' + name + ']')[0];
                            var minutes = Ext.ComponentQuery.query('numberfield[name=minutes_' + name + ']')[0];


                            if (field.checked) {
                                switch (field.inputValue) {
                                    case "NEW_DAY":
                                        hour.show();
                                        hour.allowBlank = false;
//                                        value2 = parameters[0];

                                        hour = parameters[0];
                                        minutes.show();
                                        minutes.allowBlank = false;
                                        minutes = parameters[1];
                                        break;
                                    case "NEW_HOUR":
                                         minutes.show();
                                         minutes.allowBlank = false;
                                         minutes = parameters[0];
                                        break;
                                    case "NEW_WEEK":
                                        daysInWeek.show();
                                        daysInWeek.allowBlank = false;
                                        hour.show();
                                        hour.allowBlank = false;
                                        minutes.show();
                                        minutes.allowBlank = false;
//                                        value1 = parameters[0];
//                                        value2 = parameters[1];
                                        monthDay = parameters[0];
                                        hour = parameters[1];
                                        minutes = parameters[2];
                                        break;
                                    case "NEW_MONTH":
                                        dayInMonth.show();
                                        dayInMonth.allowBlank = false;
                                        hour.show();
                                        hour.allowBlank = false;
                                        minutes.show();
                                        minutes.allowBlank = false;
//                                        value3 = parameters[0];
//                                        value2 = parameters[1];
                                        weekDay = parameters[0];
                                        hour = parameters[1];
                                        minutes = parameters[2];

                                        break;
                                }
                            }
                        }
                    }
                }, {
                    xtype: 'ux-combo',
                    name: 'daysInWeek_' + name,
                    store: this.daysStore,
                    displayField: 'name',
                    valueField: 'name',
                    value: monthDay,//value1,
                    fieldLabel: getText('Days of the week')
                }, {
                    xtype: 'ux-numberfield',
                    name: 'dayInMonth_' + name,
                    maxValue: 31,
                    minValue: 1,
                    value: weekDay,//value3,
                    fieldLabel: getText('Day')
                }, {
                    xtype: 'ux-numberfield',
                    name: 'hour_' + name,
                    maxValue: 23,
                    minValue: 0,
                    value: hour,//value2,
                    fieldLabel: getText('Hour')
                }, {
                    xtype: 'ux-numberfield',
                    name: 'minutes_' + name,
                    maxValue: 59,
                    minValue: 0,
                    value: minutes,
                    fieldLabel: getText('Minutes')
                }
            ]
        });

        triggersSelector.add(panel);
    },

    getRowColumns: function (){
        
        var columnsList = [];
        var configuredList = this.query('panel[name=column]');

        for (var i = 0; i < configuredList.length; i++) {
            try {
                columnsList.push(configuredList[i].column);
            } catch (ex) {
                console.log('ERROR :' + ex);
            }
        }
        return columnsList;
    },


    /**
     * Method alertConfig by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function (){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        values.id = this.record.id;
        values.sendToOwner = this.query('checkbox[name=sendToOwner][checked=true]')[0] ? true : false;
        values.triggers = [];
        values.profileIds = [];
        values.columns = this.getRowColumns();
        
        var controlCombo =  this.down('combo[name=controlId]');
        if(!controlCombo.getSelectedRecord()){
            values.controlId = this.record.data.controlId;
        }

        var profilesRecords = this.query('checkbox[name=profileIds][checked=true]');
        Ext.Array.each(profilesRecords, function (rec){
            if (rec.inputValue) {
                values.profileIds.push(rec.inputValue);
            }
        });

        var triggersRecords = this.query('checkbox[name=triggers][checked=true]');
        Ext.Array.each(triggersRecords, function (rec){
            if (rec.inputValue) {
                var triggerEnum = rec.inputValue;
                var parameters = null;
                if (triggerEnum === "NEW_DAY") {
                    parameters = values.hour_NEW_DAY + ' ' + values.minutes_NEW_DAY;
                }
                if (triggerEnum === "NEW_HOUR") {
                    parameters = values.minutes_NEW_HOUR;
                }
                if (triggerEnum === "NEW_WEEK") {
                    parameters = values.daysInWeek_NEW_WEEK + ' ' + values.hour_NEW_WEEK + ' ' + values.minutes_NEW_WEEK;
                }
                if (triggerEnum === 'NEW_MONTH') {
                    parameters = values.dayInMonth_NEW_MONTH + ' ' + values.hour_NEW_MONTH + ' ' + values.minutes_NEW_MONTH;
                }
                values.triggers.push({
                    'trigger': triggerEnum,
                    'parameters': parameters
                });
            }
        });
        return values;
    },

    setData: function (data){
        
        //fill control como box
//        if (data.controlId > 0) {
//            this.controlStore.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/control/' + data.controlId;
//        } else {
//            this.controlStore.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/control';
//        }

        this.down('form').getForm().setValues(data);

        /// Columns
        if (data.columns) {
            
            for (var i = 0; i < data.columns.length; i++) {
                
                var column = data.columns[i];

                var fields = column.field.split('.');
                
                if(fields[1] === "propertyvalues"){
                    fields[1] = "propertyValues";  // lowerCamelCase issue
                }
                
                var displayLabel = column.label;
                var model = fields[0];
                
                var isDynamicProperty = false;
                var propertyConfigurationType = null;
                
                if (fields[1] === 'propertyValues') {
                    isDynamicProperty = true;
                }
                
                if (isDynamicProperty === true) {
                    
                    if (model === 'material') {
                        propertyConfigurationType = 'MATERIAL';
                    } else if (model === 'productreference') {
                        propertyConfigurationType = 'PRODUCTREFERENCE';
                    }

                    var index = fields.indexOf('propertyValues');
                    while (index !== -1) {
                        fields.splice(index, 1);
                        index = fields.indexOf('propertyValues');
                    }
                    
                } else {

                    var index = fields.indexOf(model);
                    while (index !== -1) {
                        fields.splice(index, 1);
                        index = fields.indexOf(model);
                    }
                }

                var propertyName = fields.join('.');
                var label = this.getController().getLabelByModel(model);
                
                var rowData = {
                    data: {
                        column: column,
                        name: propertyName,
                        label: displayLabel,
                        propertyConfigurationType: propertyConfigurationType,
                        isDynamicProperty: isDynamicProperty,
                        configuration: {
                            field: {
                                fieldLabel: label,
                                model: model,
                                label: propertyName
                            }
                        }
                    }
                };

                var item = this.getController().buildColumnRaw(rowData);
                this.down('panel[reference=columnsPanel]').add(item);
            }
        }
    }

});   