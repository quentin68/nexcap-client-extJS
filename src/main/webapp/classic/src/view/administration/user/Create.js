/* global Ext */

Ext.define('Dashboard.view.administration.user.Create', {
    extend: 'Ext.window.Window',
    xtype: 'userCreate',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor'
    ],

    controller: 'userMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 550,
    iconCls: 'fa fa-user',
    plain: true,
    autoScroll: true,
    scrollable: 'y',

    record: null,
    profilesList: [],
    requirementsList: [],
    profilesStore: null,
    requirementsStore: null,
    locationsStore: null,
    securityConfiguration: null,
    propertiesConfiguration: null,

    initComponent: function () {

        this.title = getText('Create a user');

        this.locationsStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'address', 'name']
        });

        var securityConfiguration = this.securityConfiguration;

        var characteristicsPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            title: getText('User'),
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            },
            items: [
                {
                    xtype: Ext.widget('thumbnailEditor')
                }, {
                    xtype: 'checkboxfield',
                    name: 'isTechnicalUser',
                    value: 'isTechnicalUser',
                    fieldLabel: getText('Technical user'),
                    hidden: true,
                    // boxLabelAlign: 'left',
                    checked: false,
                    // flex: 3,
                    listeners: {
                        scope: this,
                        change: function (me, newValue, oldValue, eOpts) {
                            this.onTechnichalUserToggle(newValue);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'sticker',
                    fieldLabel: getText('Identifier'),
                    allowBlank: false,
                    minLength: 1,
                    maxLength: 50,
                    // vtype:'alphanumeric',
                    listeners: {
                        afterrender: function (field) {
                            field.focus(false, 100);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'firstName',
                    fieldLabel: getText('First name'),
                    maxLength: 40
                }, {
                    xtype: 'textfield',
                    name: 'lastName',
                    fieldLabel: getText('Last name'),
                    maxLength: 40
                }, {
                    xtype: 'textfield',
                    name: 'email',
                    fieldLabel: getText('E-Mail'),
                    allowBlank: true,
                    minLength: 4,
                    maxLength: 256,
                    vtype: 'email'
                }]
        });

        var propertiesPanel = Ext.create('Ext.panel.Panel', {
            title: getText('Properties'),
            reference: 'propertiesPanel',
            defaults: {
                margin: '0 0 12 0',
                submitValue: false
            },
            items: []
        });

        Ext.apply(Ext.form.field.VTypes, {
            alphanumeric: function (v) {
                return this.alphanumericVal.test(v);
            },
            alphanumericVal: /^[A-Za-z0-9]+$/i,
            alphanumericMask: /[A-Za-z0-9]/,
            alphanumericText: getText('This field can only contain alphanumeric characters.')
        });
        

        var rightsFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Sign in'),
            //hidden: Dashboard.manager.ConfigurationManager.autoLoginMode,
            //disabled: Dashboard.manager.ConfigurationManager.autoLoginMode,
            items: [{
                    xtype: 'textfield',
                    name: 'login',
                    fieldLabel: getText('Login'),
                    allowBlank: false,
                    validator: function (value) {
                        var pwdRegEx = new RegExp(securityConfiguration.loginRegex, 'gi');
                        return pwdRegEx.test(value) ? true : getText('Invalid login');
                    }
                }, {
                    xtype: 'textfield',
                    name: 'password',
                    hidden: Dashboard.manager.ConfigurationManager.autoLoginMode,
                    disabled: Dashboard.manager.ConfigurationManager.autoLoginMode,
                    fieldLabel: getText('Password'),
                    inputType: 'password',
                    allowBlank: false,
                    invalidText: securityConfiguration.passwordRegexDescription,
                    validator: function (value) {
                        var pwdRegEx = new RegExp(securityConfiguration.passwordRegex, 'gi');
                        return pwdRegEx.test(value) ? true : securityConfiguration.passwordRegexDescription;
                    }
                }
            ]
        });

        var cardsFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Access card'),
            reference: 'badgeNumberPanel',
            items: [
                {
                    xtype: 'textfield',
                    name: 'badgeNumber',
                    fieldLabel: getText('Badge number'),
                    // allowBlank: false,
                    minLength: 4,
                    maxLength: 20,
                    vtype: 'alphanumeric'
                }, {
                    xtype: 'textfield',
                    name: 'pin',
                    fieldLabel: getText('Code PIN'),
                    allowBlank: true,
                    minLength: 6,
                    maxLength: 6,
                    vtype:'numeric'
                }
            ]
        });

        var profilesFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Profiles selection'),
            name: 'profilesSelector',
            bodyStyle: 'background-color:#ffffff; padding: 5px',
            autoScroll: true,
            defaults: {
                anchor: '100%'
            },
            items: []
        });

        var requirementsFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Requirements selection'),
            name: 'requirementsSelector',
            reference: 'requirements',
            bodyStyle: 'background-color:#ffffff; padding: 5px',
            autoScroll: true,
            defaults: {
                anchor: '100%'
            },
            items: []
        });

        var locationsPanel = {
            xtype: 'panel',
            title: getText('Authorized locations'),
            reference: 'locationsPanel',
            collapsible: false,
            ui: 'form-panel',
            items: [{
                    xtype: 'container',
                    reference: 'locations',
                    items: {
                        xtype: 'grid',
                        name: 'locationsGrid',
                        store: this.locationsStore,
                        multiSelect: true,
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [
                            {
                                text: getText('Address'),
                                dataIndex: 'address',
                                flex: 1
                            }
                        ],
                        height: 400,
                        width: '100%'
                    }
                }
            ],
            tools: [{
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onAddLocation'
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onDeleteLocation'
                }]
        };

        this.items = [{
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width: 650,
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
                    characteristicsPanel,
                    profilesFieldSet,
                    rightsFieldSet,
                    cardsFieldSet,
                    propertiesPanel,
                    requirementsFieldSet,
                    locationsPanel
                ]
            }];

        this.buttons = [{
                text: getText('Save'),
                action: 'save'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);

        this.loadProfiles();
        this.loadRequirements();
    },

    listeners: {
        scope: this,
        afterrender: function (me, layout, eOpts) {
            me.controller.buildFields({data: me.propertiesConfiguration});
            me.onCheckAllright();
        }
    },
    onCheckAllright: function(){
        var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var len = user.data.profiles.length;
        for (i=0;i<len;i++) {
            if (user.data.profiles[i].description === "All rights") {
                this.down('checkbox[name=isTechnicalUser]').setHidden(false);
            }
        }
    },
    onTechnichalUserToggle: function (enabled) {
        this.down('textfield[name=firstName]').setHidden(enabled);
        this.down('textfield[name=lastName]').setHidden(enabled);
        this.down('panel[reference=badgeNumberPanel]').setHidden(enabled);
        this.down('thumbnailEditor[name=thumbnailEditor]').setHidden(enabled);
        this.down('panel[reference=requirements]').setHidden(enabled);
        this.down('panel[reference=locationsPanel]').setHidden(enabled);
    },

    addField: function (field) {
        this.down('panel[reference=propertiesPanel]').add(field);
    },

    cleanFields: function () {
        this.down('panel[reference=propertiesPanel]').removeAll();
    },

    getProperties: function () {
        
        var list = this.query('component[tag=property]');
        var propertiesList = [];
        var sensorId = null;

        for (var i = 0; i < list.length; i++) {

            var include = true;
            var value = list[i].value;

            if (list[i].xtype === 'datefield') {
                if (list[i].rawValue.trim() !== '') {
                value = Ext.Date.format(list[i].value, 'Y-m-d'); // yyyy-MM-dd HH:mm
                } else {
                    value = null;
            }
            }

            if (list[i].xtype === 'radio') {
                if (list[i].value === true) {
                    value = list[i].inputValue;
                } else {
                    include = false;
                }
            }


            if (list[i].fieldType === 'datetimefield') {
                var date = list[i].down('field[xtype=datefield]').value;
                var time = list[i].down('field[xtype=timefield]').value;
                value = Ext.Date.format(date, 'Y-m-d') + ' ' + Ext.Date.format(time, 'H:i:s');
            }

            var property = {
                    name: list[i].name,
                    value: value
            };
            
            if(list[i].property){
                if(list[i].property.sensorId){
                    sensorId = list[i].property.sensorId;
                }else{
                    sensorId = null;
            }
                property.sensorId = sensorId;
        }

            if (include) {
                propertiesList.push(property);
            }
        }

        return propertiesList;
    },

    loadProfiles: function () {

        this.profilesStore = Ext.create('Dashboard.store.administration.Profiles', {
            autoLoad: true,
            listeners: {
                scope: this,
                load: function () {
                    this.setProfilesSelector(this.profilesStore.data.items);
                }
            }
        });

    },

    loadRequirements: function () {

        this.requirementsStore = Ext.create('Dashboard.store.administration.Requirements', {
            autoLoad: true,
            listeners: {
                scope: this,
                load: function () {
                    this.setRequirementsSelector(this.requirementsStore.data.items);
                }
            }
        });

    },

    setProfilesSelector: function (profilesList) {

        var profilesSelector = Ext.ComponentQuery.query('panel[name="profilesSelector"]')[0];
        profilesSelector.removeAll();

        if (!profilesList) {
            return false;
        }

        for (var i = 0; i < profilesList.length; i++) {
            this.addProfile(i, profilesList[i].data.name, parseInt(profilesList[i].data.id), profilesSelector);
        }
    },

    /**
     * Clean and fill the requirements panel
     */
    setRequirementsSelector: function (requirementsList) {

        var localisedLabel = "labelEn";

        // if(Ext.util.Format.substr(language, 3, 5) === "FR"){
        // localisedLabel = "labelFr";
        // }

        var requirementsSelector = Ext.ComponentQuery.query('panel[name="requirementsSelector"]')[0];
        requirementsSelector.removeAll();

        if (!requirementsList) {
            return false;
        }

        for (var i = 0; i < requirementsList.length; i++) {

            var checked = false;
            if (requirementsList[i].data.name === "FAST_BORROWING") {
                checked = true;
            }

            this.addRequirement(requirementsList[i].data[localisedLabel], requirementsList[i].data.name, requirementsSelector, checked);
        }
    },

    /**
     * add checkBox
     * 
     * @argument {int} index description
     * @argument {string} name
     * @argument {int} id
     * @argument {panel} profilesSelector Target panel
     */
    addProfile: function (index, name, id, profilesSelector) {

        profilesSelector.add({
            xtype: 'checkbox',
            checked: false,
            border: false,
            anchor: '100%',
            margin: '3 6 0 6',
            boxLabel: name,
            name: 'profiles',
            inputValue: id
        });
    },

    /**
     * Add item
     * 
     * @argument {string} name
     * @argument {panel} profilesSelector
     * @argument {boolean} checkBoxValue
     */
    addRequirement: function (label, name, profilesSelector, checkBoxValue) {

        profilesSelector.add({
            xtype: 'checkbox',
            checked: checkBoxValue,
            border: false,
            anchor: '100%',
            margin: '3 6 0 6',
            boxLabel: label,
            name: 'requirements',
            inputValue: name

        });
    },

    scrollIntoView: function (el, cmp) {
        var dy = cmp.scroller.offset.y + el.getY() - cmp.body.getY();
        cmp.scroller.setOffset({
            x: 0,
            y: -dy
        },
                true);
    },

    getAllowedLocations: function () {

        var list = [];
        var locations = this.down('grid').store.data.items;

        if (locations) {
            Ext.each(locations, function (row) {
                list.push(row.data.id);
            });
        }

        return list;
    },
    
    
    getInvalidFields: function (){

        var invalidFields = [];

        Ext.suspendLayouts();

        this.down('form').getForm().getFields().filterBy(function (field){
            if (field.validate())
                return;
            invalidFields.push(field);
        });

        Ext.resumeLayouts(true);
        
        var messages = [];

        for (var i = 0; i < invalidFields.length; i++) {
            messages.push(invalidFields[i].fieldLabel + " > " + invalidFields[i].activeErrors[0]);
        }

        Ext.Msg.show({
            title: getText('Errors'),
            message: messages.join('<br>'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });

        return invalidFields;
    },
    

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function () {
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        
        values.technical = values.isTechnicalUser === 'on';
        delete values.isTechnicalUser;
        
        // Get authorized locations
        values.authorizedLocationIdList = [];
        values.requirementsNameList = [];
        values.profileIdList = [];

//        var authorizedLocationsRecords = this.down('addressTreePanel').getChecked();
//        Ext.each(authorizedLocationsRecords, function(rec){
//            if (rec.raw['locationId']) {
//                values.authorizedLocationIdList.push(rec.raw['locationId']);
//            }
//        });
        values.authorizedLocationIdList = this.getAllowedLocations();

        var profilesRecords = this.query('checkbox[name=profiles][checked=true]');
        Ext.Array.each(profilesRecords, function (rec) {
            if (rec.inputValue) {
                values.profileIdList.push(rec.inputValue);
            }
        });

        var requirementsRecords = this.query('checkbox[name=requirements][checked=true]');
        Ext.Array.each(requirementsRecords, function (rec) {
            if (rec.inputValue) {
                values.requirementsNameList.push(rec.inputValue);
            }
        });

        if (!values.profileIdList || values.profileIdList.length < 1) {
            Ext.Msg.alert(getText('Error'), getText('Please, select a profile.'));
            return;
        }

        values.properties = this.getProperties();

        delete values.requirements;
        delete values.profiles;
        return values;
    },

    setThumbnail: function (tumb) {

        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var img = Ext.ComponentQuery.query('userEdit image[name=thumbnailToEdit]')[0];

        if (tumb !== null) {
            thumbnailSrc = tumb;
        }

        img.setSrc(thumbnailSrc);
    }

});