Ext.define('Dashboard.view.administration.user.EditMultiple', {
    extend: 'Ext.window.Window',
    xtype: 'userEditMultiple',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.location.Selector'
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

    ids: null,
    profilesList: [],
    requirementsList: [],
    profilesStore: null,
    requirementsStore: null,
    locationsStore: null,

    initComponent: function () {

        this.title = getText('Edit users');

        this.locationsStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'address', 'name']
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
                    profilesFieldSet,
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
            me.onfeaturechangeEditmultiple();
        }
    },
    onfeaturechangeEditmultiple: function () {
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
                this.down('button[handler=onAddLocation]').setHidden(true);
                this.down('button[handler=onDeleteLocation]').setHidden(true);
                this.down('panel[reference=requirements]').setHidden(true);
                break;
            case "USER_DEVICE_ADMIN":
                this.down('panel[reference=requirements]').setHidden(true);
                this.down('panel[name=profilesSelector]').setHidden(true);
                break;
            case "USER_BOTH_PROFILE_DEVICE_ADMIN":
                this.down('panel[reference=requirements]').setHidden(true);
                break;

            default:
                console.log("no case of rights! You can do it all!");
        }
    },

    addField: function (field) {
        this.down('panel[reference=propertiesPanel]').add(field);
    },

    getProperties: function () {
        var list = this.query('component[tag=property]');
        var propertiesList = [];

        for (var i = 0; i < list.length; i++) {

            var include = true;
            var value = list[i].value;

            if (list[i].xtype === 'datefield') {
                // value = Ext.Date.format(list[i].value, 'c');
                value = Ext.Date.format(list[i].value, 'Y-m-d'); // yyyy-MM-dd HH:mm
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

            if (include) {
                propertiesList.push({
                    name: list[i].name,
                    value: value
                });
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

    /**
     * Clean and fill the profiles panel
     */
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

    onExpandAllClick: function () {
        var me = this.down('treepanel');
        var toolbar = me.down('toolbar');

        me.getEl().mask('Expanding tree...');
        toolbar.disable();

        me.expandAll(function () {
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
    addProfile: function (index, name, id, profilesSelector, checkBoxValue) {

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

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function () {
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        values.ids = this.ids;

        values.authorizedLocationIdList = [];
        values.requirementsNameList = [];
        values.profileIdList = [];

        values.authorizedLocationIdList = this.getAllowedLocations();

        var profilesRecords = this.query('checkbox[name=profiles][checked=true]');

        Ext.each(profilesRecords, function (rec) {
            if (rec.inputValue) {
                // values.profiles.push({ "id": rec.inputValue });
                values.profileIdList.push(rec.inputValue);
            }
        });

        var requirementsRecords = this.query('checkbox[name=requirements][checked=true]');
        Ext.each(requirementsRecords, function (rec) {
            if (rec.inputValue) {
                values.requirementsNameList.push(rec.inputValue);
            }
        });

        if (!values.profileIdList || values.profileIdList.length < 1) {
            Ext.Msg.alert(getText('Error'), getText('Select at least one profile'));
            return null;
        }

        delete values.requirements;
        delete values.profiles;
        return values;
    },

    setData: function (data) {
        this.down('form').getForm().setValues(data);

        this.locationsStore.clearData();
        if (data.authorizedLocations) {
            for (var i = 0; i < data.authorizedLocations.length; i++) {
                this.locationsStore.add(data.authorizedLocations[i]);
            }
        }
    }
});