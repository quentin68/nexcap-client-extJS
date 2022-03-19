/* global Ext  */

Ext.define('Dashboard.view.administration.user.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'userEdit',
    
    requires: [
        'Dashboard.tool.Utilities', 
        'Dashboard.view.administration.location.Selector',
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
    
    initComponent: function(){
        this.title = getText('Edit an user');

        this.locationsStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'address', 'name']
        });

        var securityConfiguration = this.securityConfiguration;

        var characteristicsPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            title: getText('User'),
            reference: 'userPanel',
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            },
            items: [{
                    xtype: Ext.widget('thumbnailEditor', {
                        record: this.record,
                        thumbnailSourceType: 'USER'
                    })
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
            alphanumeric: function(v){
                return this.alphanumericVal.test(v);
            },
            alphanumericVal: /^[A-Za-z0-9]+$/i,
            alphanumericMask: /[A-Za-z0-9]/,
            alphanumericText: getText('This field can only contain alphanumeric characters.')
        });

        var rightsFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Sign in'),
            items: [{
                    xtype: 'textfield',
                    name: 'login',
                    //hidden: Dashboard.manager.ConfigurationManager.autoLoginMode,
                    //disabled: Dashboard.manager.ConfigurationManager.autoLoginMode,
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
                    fieldLabel: getText('New password'),
                    inputType: 'password',
                    allowBlank: true,
                    invalidText: securityConfiguration.passwordRegexDescription,
                    validator: function (value) {
                        if (value === null || value === '') {
                            return true;
                        }
                        var pwdRegEx = new RegExp(securityConfiguration.passwordRegex, 'gi');
                        return pwdRegEx.test(value) ? true : securityConfiguration.passwordRegexDescription;
                    }
                }, {
                    xtype: 'checkbox',
                    name: 'activated',
                    fieldLabel: getText('Activated account')
                }]
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
                    vtype: 'alphanumeric',
                    listeners: {
                        afterrender: function(field){
                            field.focus(false, 100);
                        }
                    }
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

        this.setData(this.record);
        this.loadProfiles(this.record.profiles);
        this.loadRequirements(this.record.requirementsNameList);
        
        this.onTechnichalUserToggle(this.record.technical);
    },
    
    listeners: {
        scope: this,
        afterrender: function (me, layout, eOpts) {
            me.controller.buildFields({data: me.propertiesConfiguration});
            me.onfeaturechange();
        }
    },
    onfeaturechange: function () {
        var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var len = user.data.profiles.length;
        var user_feature_activated=[];
        var featureName;
        for (i=0;i<len;i++) {
            for (j=0;j<user.data.profiles[i].features.length;j++) {
                if (user.data.profiles[i].features[j].name === "USER_ADMIN") {
                    featureName = "USER_ADMIN";
                }
                else if (user.data.profiles[i].features[j].name === "USER_PROFILE_ADMIN"){
                    user_feature_activated.push("USER_PROFILE_ADMIN");
                }
                else if (user.data.profiles[i].features[j].name === "USER_DEVICE_ADMIN"){
                    user_feature_activated.push("USER_DEVICE_ADMIN");
                }
            }
        }
        if (!featureName) {
            if (user_feature_activated.length>1){
                featureName = "USER_BOTH_PROFILE_DEVICE_ADMIN";
            }
            else {
                featureName = user_feature_activated[0];
            }
        }
        switch (featureName) {
            case "USER_PROFILE_ADMIN":
                this.down('button[itemId=btEdit]').setHidden(true);
                this.down('button[itemId=btAdd]').setHidden(true);
                this.down('button[handler=onAddLocation]').setHidden(true);
                this.down('button[handler=onDeleteLocation]').setHidden(true);
                this.down('panel[reference=requirements]').disable(true);
                this.down('textfield[name=firstName]').setReadOnly(true);
                this.down('textfield[name=lastName]').setReadOnly(true);
                this.down('textfield[name=badgeNumber]').setReadOnly(true);
                this.down('textfield[name=pin]').setReadOnly(true);
                this.down('textfield[name=login]').setReadOnly(true);
                this.down('textfield[name=password]').setHidden(true);
                this.down('checkbox[name=activated]').setReadOnly(true);
                this.down('panel[reference=propertiesPanel]').disable(true);
                this.down('textfield[name=email]').setReadOnly(true);
                this.down('textfield[name=sticker]').setReadOnly(true);
                break;
            case "USER_DEVICE_ADMIN":
                this.down('button[itemId=btEdit]').setHidden(true);
                this.down('button[itemId=btAdd]').setHidden(true);
                this.down('panel[reference=requirements]').disable(true);
                this.down('textfield[name=firstName]').setReadOnly(true);
                this.down('textfield[name=lastName]').setReadOnly(true);
                this.down('textfield[name=badgeNumber]').setReadOnly(true);
                this.down('textfield[name=pin]').setReadOnly(true);
                this.down('textfield[name=login]').setHidden(true);
                this.down('textfield[name=password]').setHidden(true);
                this.down('checkbox[name=activated]').setReadOnly(true);
                this.down('panel[reference=propertiesPanel]').disable(true);
                this.down('textfield[name=email]').setReadOnly(true);
                this.down('textfield[name=sticker]').setReadOnly(true);
                this.down('panel[name=profilesSelector]').disable(true);

                break;
            case "USER_BOTH_PROFILE_DEVICE_ADMIN":
                this.down('button[itemId=btEdit]').setHidden(true);
                this.down('button[itemId=btAdd]').setHidden(true);
                this.down('panel[reference=requirements]').disable(true);
                this.down('textfield[name=firstName]').setReadOnly(true);
                this.down('textfield[name=lastName]').setReadOnly(true);
                this.down('textfield[name=badgeNumber]').setReadOnly(true);
                this.down('textfield[name=pin]').setReadOnly(true);
                this.down('textfield[name=login]').setReadOnly(true);
                this.down('textfield[name=password]').setHidden(true);
                this.down('checkbox[name=activated]').setReadOnly(true);
                this.down('panel[reference=propertiesPanel]').disable(true);
                this.down('textfield[name=email]').setReadOnly(true);
                this.down('textfield[name=sticker]').setReadOnly(true);

                break;

            default:
               // console.log("no case of rights! You can do it all!");
        }
    },
    onTechnichalUserToggle: function (enabled) {
        this.down('textfield[name=firstName]').setHidden(enabled);
        this.down('textfield[name=lastName]').setHidden(enabled);
        this.down('panel[reference=badgeNumberPanel]').setHidden(enabled);
        this.down('thumbnailEditor[name=thumbnailEditor]').setHidden(enabled);
        this.down('panel[reference=requirements]').setHidden(enabled);
        this.down('panel[reference=locationsPanel]').setHidden(enabled);

        var userPanel = this.down('panel[reference=userPanel]');
        if (enabled) {
            userPanel.setTitle('<i class="fa fa-cog" aria-hidden="true"></i> ' + getText('Technical user'));
        } else {
            userPanel.setTitle(getText('User'));
        }
    },

    addField: function (field) {
        this.down('panel[reference=propertiesPanel]').add(field);
    },
    
    cleanFields: function () {
        this.down('panel[reference=propertiesPanel]').removeAll();
    },
            
    getProperties: function(){

        var list = this.query('component[tag=property]');
        var propertiesList = [];
        var sensorId = null;

        for (var i = 0; i < list.length; i++) {

            var include = true;
            var value = list[i].value;

            if (list[i].config.editable === false) {
                include = false;
            }

            if (list[i].xtype === 'radio') {
                if (list[i].value === true) {
                    value = list[i].inputValue;
                } else {
                    include = false;
                }
            }

            if (list[i].xtype === 'datefield') {
                if (list[i].rawValue.trim() !== '') {
                    value = Ext.Date.format(list[i].value, 'Y-m-d'); // yyyy-MM-dd HH:mm
                } else {
                    value = null;
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
            
            
    loadProfiles: function(userProfiles){

        this.profilesStore = Ext.create('Dashboard.store.administration.Profiles', {
            autoLoad: true,
            listeners: {
                scope: this,
                load: function(){
                    this.setProfilesSelector(this.profilesStore.data.items, userProfiles);
                }
            }
        });

    },
    
    
    loadRequirements: function(userRequirements){

        this.requirementsStore = Ext.create('Dashboard.store.administration.Requirements', {
            autoLoad: true,
            listeners: {
                scope: this,
                load: function(){
                    this.setRequirementsSelector(this.requirementsStore.data.items, userRequirements);
                }
            }
        });

    },
    
    
    /**
     * 
     * @param {type} profilesList
     * @param {type} userProfiles
     * @returns {Boolean}
     */
    setProfilesSelector: function(profilesList, userProfiles){

        var profilesSelector = Ext.ComponentQuery.query('panel[name="profilesSelector"]')[0];
        profilesSelector.removeAll();

        if (!profilesList) {
            return false;
        }

        var userProfilesNames = [];
        for (var i = 0; i < userProfiles.length; i++) {
            userProfilesNames.push(userProfiles[i].name);
        }

        for (var i = 0; i < profilesList.length; i++) {

            var checked = false;
            if (Ext.Array.contains(userProfilesNames, profilesList[i].data.name)) {
                checked = true;
            }
            this.addProfile(i, profilesList[i].data.name, parseInt(profilesList[i].data.id), profilesSelector, checked);
        }
    },
            
    /**
     * Clean and fill the requirements panel
     * @param {type} requirementsList
     * @param {type} userRequirements
     * @returns {Boolean}
     */
    setRequirementsSelector: function(requirementsList, userRequirements){

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
            if (Ext.Array.contains(userRequirements, requirementsList[i].data.name)) {
                checked = true;
            }

            this.addRequirement(requirementsList[i].data[localisedLabel], requirementsList[i].data.name, requirementsSelector, checked);
        }
    },
            
            
    onExpandAllClick: function(){
        var me = this.down('treepanel');
        var toolbar = me.down('toolbar');

        me.getEl().mask('Expanding tree...');
        toolbar.disable();

        me.expandAll(function() {
            me.getEl().unmask();
            toolbar.enable();
        });
    },
            
            
    /**
     * add checkBox
     * 
     * @argument {int} index description
     * @argument {string} name
     * @argument {int} id
     * @argument {panel} profilesSelector Target panel
     * @argument {boolean} checkBoxValue
     */
    addProfile: function(index, name, id, profilesSelector, checkBoxValue){

        profilesSelector.add({
            xtype: 'checkbox',
            checked: checkBoxValue,
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
     * @param {type} label
     * @param {type} name
     * @param {type} profilesSelector
     * @param {type} checkBoxValue
     * @returns {undefined}
     */
    addRequirement: function(label, name, profilesSelector, checkBoxValue){

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
            
    scrollIntoView: function(el, cmp){
        var dy = cmp.scroller.offset.y + el.getY() - cmp.body.getY();
        cmp.scroller.setOffset({
            x: 0,
            y: -dy
        },
        true);
    },
            
    getAllowedLocations: function(){

        var list = [];
        var locations = this.down('grid').store.data.items;

        if (locations) {
            Ext.each(locations, function(row){
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
    getData: function(){
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        values.id = this.record.id;

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
        Ext.each(profilesRecords, function(rec){
            if (rec.inputValue) {
                // values.profiles.push({ "id": rec.inputValue });
                values.profileIdList.push(rec.inputValue);
            }
        });

        var requirementsRecords = this.query('checkbox[name=requirements][checked=true]');
        Ext.each(requirementsRecords, function(rec){
            if (rec.inputValue) {
                values.requirementsNameList.push(rec.inputValue);
            }
        });

        if (!values.profileIdList || values.profileIdList.length < 1) {
            Ext.Msg.alert(getText('Error'), getText('Please, select a profile.'));
            return;
        }
        
        values.properties = this.getProperties();
        
        if (this.record.picture !== undefined && this.record.picture.pictureSourceType === null) {
            delete this.record.picture;
        }

        if (this.record.picture !== undefined && this.record.picture.thumbnailName === '') {
            values.picture = {
                thumbnailName: '',
                pictureName: ''
            };
        }
        
        delete values.requirements;
        delete values.profiles;
        return values;
    },
            
    setData: function(data){
        this.record = data;
        this.down('form').getForm().setValues(data);
        
        this.locationsStore.clearData();
        if (data.authorizedLocations) {
            for (var i = 0; i < data.authorizedLocations.length; i++) {
                this.locationsStore.add(data.authorizedLocations[i]);
            }
        }
    },
            
    setThumbnail: function(tumb){

        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var img = Ext.ComponentQuery.query('userEdit image[name=thumbnailToEdit]')[0];

        if (tumb !== null) {
            thumbnailSrc = tumb;
        }

        img.setSrc(thumbnailSrc);
    }

});