/* global Ext*/

Ext.define('Dashboard.view.administration.reference.AssignedLocationSelector', {
    extend: 'Ext.window.Window',
    xtype: 'widget.assignedLocationSelector',
    requires: [
        'Dashboard.tool.Utilities'
    ],

    //iconCls: 'iconLocation',
    layout: 'fit',
    modal: true,
    closable: true,
    resizable: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    record: [], // selectedRaw.data
    bodyPadding: 16,
    selectedLocation: null,
    selectedPosition: null,
    parentController: null,

    locationUrl: null,

    getStorePositions: function (){

        var store = Ext.create('Dashboard.store.administration.Positions', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts){
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/positions/fp/counters/fc/IS_COLLECTION_NOT_EMPTY/ft/LIST';
                    store.getProxy().setActionMethods({
                        read: 'GET'
                    });
                },
                load: function (store, operation, eOpts){
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/positions/search';
                    store.getProxy().setActionMethods({
                        read: 'POST'
                    });
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        return store;
    },

    initComponent: function (){
        this.title = getText('Location selection');

        this.loadStore = this.getStorePositions();

        this.items = [
            {
                xtype: 'form',
                width: 650,
                height: 480,
                border: false,
                fieldDefaults: {
                    labelWidth: 112,
                    anchor: '100%',
                    labelSeparator: getText(':')
                },
                items: [
                    {
                        xtype: 'combo',
                        name: 'position',
                        fieldLabel: getText('Warehouse'),
                        displayField: 'path',
                        valueField: 'id',
                        allowBlank: false,
                        // template for the content inside text field
                        displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{path}/{name}',
                                '</tpl>'
                                ),
                        store: this.loadStore,
                        listeners: {
                            scope: this,
                            'select': function (ctrl, evt){
                                this.updateComboBox(ctrl);
                            }
                        },
                        listConfig: {
                            getInnerTpl: function (){
                                return '{path}/{name}';
                            },
                            loadingText: getText('Search in progress...'),
                            emptyText: getText('No result!')
                        }
                    },
                    {
                        xtype: 'combo',
                        name: 'location',
                        disabled: true,
                        allowBlank: false,
                        fieldLabel: getText('Recommended location'),
                        displayField: 'address',
                        valueField: 'id',
                        store: Ext.create('Dashboard.store.administration.Locations', {
                            autoLoad: false,
                            listeners: {
                                scope: this,
                                beforeLoad: function (store){
                                    if (this.locationUrl) {
                                        store.getProxy().url = this.locationUrl;
                                        store.getProxy().setActionMethods({
                                            read: 'GET'
                                        });
                                    }
                                },
                                load: function (store, operation, eOpts){
                                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/locations/search';
                                    store.getProxy().setActionMethods({
                                        read: 'POST'
                                    });
                                    if (store.getProxy().extraParams.filter) {
                                        store.getProxy().extraParams.filter = [];
                                    }
                                }
                            }
                        }),
                        listeners: {
                            scope: this,
                            'select': function (ctrl, evt){
                                this.updateLocation(ctrl);
                            }/*,
                             'change': function (ctrl, evt) {
                             this.filterLocation(ctrl);
                             }*/
                        }
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Save'),
                action: 'save',
                listeners: {
                    scope: this,
                    click: function (me, e, eOpts){

                        this.parentController.onSelectLocation(this);

//                        if (this.selectedLocation && this.selectedPosition) {
//                                                        
//                            this.parentController.onSelectLocation(this.selectedPosition, this.selectedLocation);
//                            this.close();
//                            
//                        } else {
//                            Dashboard.tool.Utilities.error('[AssignedLocationSelector.save] Position or Location not selected');
//                        }
                    }
                }
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },

    /**
     * Method used by the controller to get values
     * @return (object) data NOT encoded to jSon
     */
    getData: function (){

        // Get form values
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        var positionCombo = this.down('combobox[name=position]');
        var locationCombo = this.down('combobox[name=location]');

//        values.positionAddress = positionCombo.getRawValue();
//        values.locationAddress = locationCombo.getRawValue();

        values.position = positionCombo.getSelection();
        values.location = locationCombo.getSelection();

        //Add id to values
        //values.id = this.record.id;

        return values;
    },

    updateLocation: function (ctrl){

        var positionComboId = ctrl.bodyEl.component.id;
        var positionCombo = Ext.get(positionComboId);
        var selectedLocationId = positionCombo.component.getValue();

        this.selectedLocation = selectedLocationId;
    },

    filterLocation: function (ctrl){
        var selectedPositionId = this.selectedPosition;

        var textValue = '';
        if (ctrl.value && ctrl.value.length > 2) {
            textValue = '?pathfilter=' + ctrl.value;
        }
        try {
            if (selectedPositionId === undefined) {
                throw 'Error selecting value Selected';
            }

            var locationCombo = this.down('combobox[name=location]');
            var locationStore = locationCombo.getStore();

            this.locationUrl = Dashboard.config.Config.SERVER_HOST_NAME +
                    '/positions/getChildrenLocations/' + selectedPositionId + textValue;

            // @Todo add auto complete using param '?pathfilter=XYZ';
            locationStore.getProxy().url = this.locationUrl;
            locationStore.getProxy().setActionMethods({
                read: 'GET'
            });

            locationStore.load({
                callback: function (records, operation, success){
                    if (success) {
                        if (records.length === 0) {
                            return;
                        }
                        // @Todo filter server values using param '?pathfilter=XYZ';
                        console.log(records);
                    } else {
                        Dashboard.tool.Utilities.error('[AssignedLocationSelector.updateComboBox] Error: getting getChildrenLocations');
                    }
                },
                scope: this
            });
        } catch (ex) {
            Dashboard.tool.Utilities.error('[AssignedLocationSelector.updateComboBox] Error: getting location ComboBox');
        }
        ////

    },

    updateComboBox: function (ctrl){

        try {
            var positionComboId = ctrl.bodyEl.component.id;
            var positionCombo = Ext.get(positionComboId);
            var selectedPositionId = positionCombo.component.getValue();

            try {
                if (selectedPositionId === undefined) {
                    throw 'Error selecting value Selected';
                }

                var locationCombo = this.down('combobox[name=location]');
                var locationStore = locationCombo.getStore();

                this.locationUrl = Dashboard.config.Config.SERVER_HOST_NAME +
                        '/positions/getChildrenLocations/' + selectedPositionId;

                locationStore.getProxy().url = this.locationUrl;
                locationStore.getProxy().setActionMethods({
                    read: 'GET'
                });

                locationStore.load({
                    callback: function (records, operation, success){
                        if (success) {
                            if (records.length === 0) {
                                return;
                            }
                            this.selectedPosition = selectedPositionId;
                            locationCombo.enable();
                            locationCombo.reset();
                        } else {
                            Dashboard.tool.Utilities.error('[AssignedLocationSelector.updateComboBox] Error: getting getChildrenLocations');
                        }
                    },
                    scope: this
                });
            } catch (ex) {
                Dashboard.tool.Utilities.error('[AssignedLocationSelector.updateComboBox] Error: getting location ComboBox');
            }
        } catch (ex) {
            Dashboard.tool.Utilities.error('[AssignedLocationSelector.updateComboBox] Error: getting position ComboBox');
        }
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
            var text = '';
            if (invalidFields[i].fieldLabel !== undefined) {
                text += invalidFields[i].fieldLabel + " > ";
            }
            messages.push(text + invalidFields[i].activeErrors[0]);
        }

        Ext.Msg.show({
            title: getText('Errors'),
            message: messages.join('<br>'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });

        return invalidFields;
    }
});   