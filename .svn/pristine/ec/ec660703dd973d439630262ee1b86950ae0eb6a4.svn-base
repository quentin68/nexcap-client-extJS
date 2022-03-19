/*  global Ext */

Ext.define('Dashboard.view.settings.notifMailConfig.create', {
    extend: 'Ext.window.Window',
    xtype: 'notifMailConfigCreate',

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
    height: 600,
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
        
        this.title = getText('Create a notif mail');

//        this.getDefaultConfig(this.setDefaultConfig.bind(this));
        // old: Dashboard.store.settings.AlertsConfig
        this.controlStore = Ext.create('Dashboard.store.settings.AlertsConfiguration', {
            autoLoad: true
        });

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

        //this.controlStore = this.loadControlStore();

        var columnsPanel = Ext.create('Ext.panel.Panel', {
            title: getText('Columns'),
            name: 'columnsPanel',
            reference: 'columnsPanel',
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            },
            width: 600,
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
                anchor: '100%'
            },
            items: []
        });

        var triggersFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Periodicity'),
            name: 'triggersSelector',
            bodyStyle: 'background-color:#ffffff; padding: 5px',
            autoScroll: true,
            defaults: {
                anchor: '100%'
            },
            items: []
        });

        var notifMailConfigPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            title: getText('Action'),
            reference: 'notifMailConfigPanel',
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    width: 500,
                    maxLength: 255,
                    allowBlank: false,
                    fieldLabel: getText('Name')
                }, {
                    xtype: 'textfield',
                    name: 'description',
                    width: 500,
                    maxLength: 255,
                    allowBlank: true,
                    fieldLabel: getText('Description')
                }, {
                    xtype: 'combo',
                    name: 'controlId',
                    store: this.controlStore,
                    displayField: 'name',
                    width: 500,
                    valueField: 'id',
                    allowBlank: false,
                    editable: false,
                    fieldLabel: getText('Control')
                }, {
                    xtype: 'textfield',
                    name: 'mailFrom',
                    fieldLabel: getText('E-Mail from'),
                    allowBlank: false,
                    width: 500,
                    minLength: 4,
                    maxLength: 256,
                    vtype: 'email'
                }, {
                    xtype: 'htmleditor',
                    name: 'mailHeader',
                    width: 580,
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
                    width: 580,
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
                 }, //{
                //     xtype: 'checkbox',
                //     name : 'sendToOwner',
                //     fieldLabel: getText('Alert owner')
                // }
            ]
        });

        this.items = [
            {
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width: '100%',
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable: 'y',

                defaults: {
                    bodyPadding: 20,
                    ui: 'form-panel'
                },

                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
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
        
        this.getDefaultConfig();
        this.addAlertOwner();
        this.loadProfiles();
        this.loadTriggers();
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
            boxLabel: getText('Alert owner'),


        });
    },

    removeColumn: function (filter){
        filter.up('panel[reference=columnsPanel]').remove(filter);
    },

    loadControlStore: function (){
        
        var store = Ext.create('Dashboard.store.settings.AlertsConfiguration', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts){
//                    store.getProxy().actionMethods = {
//                        read: 'GET'
//                    };
//                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/control';
                },
                load: function (store, operation, eOpts){
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });
        return store;
    },

    loadProfiles: function (){
        this.profilesStore = Ext.create('Dashboard.store.administration.Profiles', {
            autoLoad: true,
            listeners: {
                scope: this,
                load: function (){
                    this.setProfilesSelector(this.profilesStore.data.items);
                }
            }
        });
    },    

    loadTriggers: function (){
        this.triggersStore = Ext.create('Dashboard.store.settings.NotifMailTriggerEnum', {});
        this.setTriggersSelector(this.triggersStore.data.items);
    },  

    /**
     * Clean and fill the profiles panel
     * @param {type} profilesList
     * @returns {Boolean}
     */
    setProfilesSelector: function (profilesList){
         var profilesSelector = Ext.ComponentQuery.query('panel[name="profilesSelector"]')[0];
        // profilesSelector.removeAll();

        if (!profilesList) {
            return false;
        }

        for (var i = 0; i < profilesList.length; i++) {
            this.addProfile(i, profilesList[i].data.name, parseInt(profilesList[i].data.id), profilesSelector);
        }
    },

    /**
     * Clean and fill the triggers panel
     *  @argument {List} triggersList
     */
    setTriggersSelector: function (triggersList){

        var triggersSelector = Ext.ComponentQuery.query('panel[name="triggersSelector"]')[0];
        triggersSelector.removeAll();

        if (!triggersList) {
            return false;
        }

        for (var i = 0; i < triggersList.length; i++) {
            this.addTrigger(i, triggersList[i].data.name, triggersList[i].data.description, triggersSelector);
        }
    },

    /**
     * add checkBox
     * @argument {int} index description
     * @argument {string} name
     * @argument {int} id
     * @argument {panel} profilesSelector Target panel
     */
    addProfile: function (index, name, id, profilesSelector){

        profilesSelector.add({

            xtype: 'checkbox',
            checked: false,
            border: false,
            anchor: '100%',
            margin: '3 6 0 6',
            boxLabel: name,
            name: 'profileIds',
            inputValue: id

        });
    },

    /**
     * add checkBox
     * @argument {int} index description
     * @argument {string} name
     * @argument {string} description
     * @argument {panel} triggersSelector Target panel
     */
    addTrigger: function (index, name, description, triggersSelector){
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
                    checked: false,
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

    getDefaultConfig: function (callback){

        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/configuration/alert.mail/defaultTableDefinition',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'GET',
            scope: this,
            success: function (response, opts){
                
                var responseObj = JSON.parse(response.responseText);
                if (responseObj.success) {
                    
                    this.setDefaultConfig(responseObj.data);
                    
                } else {
                    throw '[notifMailConfig.Create.getDefaultConfig] ERROR ' + responseObj.error;

                }
            },
            failure: function (response, opts){
                Ext.Msg.show({
                    title: getText('Error'),
                    msg: getText('Failed loading default configuration'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });

            }
        });

    },

    parseDefaultConfig: function (configString){
        try {
            return JSON.parse(configString);
        } catch (ex) {
            Dashboard.engine.ResponseManager.showErrorMessage(getText('Error in default configuration format'));
            return [];
        }
    },

    setDefaultConfig: function (configString){
        
        if(!configString){
            Ext.Msg.show({
                title: getText('Error'),
                msg: getText('Failed loading default configuration'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return;
        }
        
        var defaultConfig = this.parseDefaultConfig(configString);
        this.setDefaultColumns(defaultConfig);
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
    

    setDefaultColumns: function (columns){
                
        for (var i = 0; i < columns.length; i++) {
            
            var column = columns[i];
            
            var fields = column.field.split('.');
            
            if(fields[1] === "propertyvalues"){
                fields[1] = "propertyValues";  // lowerCamelCase issue
            }
            
            var displayLabel = column.label;
            var model = fields[0];
            
            var isDynamicProperty = false;
            
            if (fields[1] === 'propertyValues') {
                isDynamicProperty = true;
            }

            if (isDynamicProperty === true) {

                if (model === 'material') {
                    var propertyConfigurationType = 'MATERIAL';
                } else if (model === 'productreference') {
                    var propertyConfigurationType = 'PRODUCTREFERENCE';
                }

                var index = fields.indexOf('propertyValues');
                while (index !== -1) {
                    fields.splice(index, 1);
                    index = fields.indexOf('propertyValues');
                }
            }else{

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
                            label: displayLabel
                        }
                    }
                }
            };

            var item = this.getController().buildColumnRaw(rowData);
            this.down('panel[reference=columnsPanel]').add(item);
        }
    },

    /**
     * Method NotifMailConfig by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function (){
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        values.sendToOwner = this.query('checkbox[name=sendToOwner][checked=true]')[0] ? true : false;
        values.triggers = [];
        values.profileIds = [];
        values.columns = this.getRowColumns();

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
                    parameters = values.daysInWeek_NEW_WEEK + ' ' + values.hour_NEW_WEEK+ ' ' + values.minutes_NEW_WEEK;
                }
                if (triggerEnum === 'NEW_MONTH') {
                    parameters = values.dayInMonth_NEW_MONTH + ' ' + values.hour_NEW_MONTH+ ' ' + values.minutes_NEW_MONTH;
                }
                values.triggers.push({
                    'trigger': triggerEnum,
                    'parameters': parameters
                });
            }
        });

        return values;
    }

});   