/*  global Ext  */

Ext.define('Dashboard.view.administration.user.Selector', {
    extend: 'Ext.window.Window',
    xtype: 'userSelector',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.user.GridPanel'
    ],

    iconCls: 'fa fa-user',
    layout: 'fit',
    closable : false,
    closeAction : 'destroy',
    resizable : true,
    modal : true,
    constrain: true,
    bodyPadding: 16,
    
    record : [],
    parentController: null,
    profilesStore: null,

    initComponent: function() {

        this.title = getText('Select users to add');

        this.profilesStore = Ext.create('Dashboard.store.administration.Profiles', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().extraParams.filter = [];
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });
        
        var technicalStore = Ext.create('Ext.data.Store', {
            fields: ['val', 'label'],
            data: [
                {'val': 'true', 'label': getText('Yes')},
                {'val': 'false', 'label': getText('No')}
            ]
        });
        
        var gridPanel = Ext.create('Dashboard.view.administration.user.GridPanel',{
            region: 'center',
            margin : '16 0 0 0'
        });
        
        var filterButtonsPanel = {
            width: '100%',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            defaults: {
                xtype: 'button',
                width: 80,
                margin: '10 8 10 0'
            },
            items: [
                {
                    text: getText('Reset'),
                    listeners: {
                        scope: this,
                        "click": function (ctrl, evt) {
                            this.resetForm();
                            this.updateDataStore(ctrl);
                        }
                    }
                }, {
                    text: getText('Filter'),
                    listeners: {
                        scope: this,
                        "click": function (ctrl, evt) {
                            this.updateDataStore(ctrl);
                        }
                    }
                }
            ]
        };
        
        var filterFieldsPanel = {
            xtype: 'panel',
            region: 'north', 
            defaults:{
                xtype: 'panel',
                flex: 1,
                margin: '0 0 12 0',
                layout: {
                    type: 'hbox',
                    pack: 'stretch',
                    flex:1
                }
            },
            items: [
                {
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: getText('First name'),
                            id: 'firstNameUserGridNameFilter',
                            margin: '0 16 0 0',
                            flex: 1
                        }, {
                            xtype: 'textfield',
                            fieldLabel: getText('Last name'),
                            id: 'lastNameUserGridNameFilter',
                            flex: 1
                        }
                    ]
                }, {
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: getText('Identifier'),
                            id: 'identifierUserGridNameFilter',
                            flex: 1,
                            margin: '0 16 0 0'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: getText('Badge number'),
                            id: 'badgeUserGridNameFilter',
                            flex: 1
                        }
                    ]
                }, {
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: getText('Profile'),
                            id: 'profileUserGridNameFilter',
                            flex: 1,
                            margin: '0 16 0 0',
                            store: this.profilesStore,
                            displayField: 'name',
                            valueField: 'id'
                        },{
                            xtype: 'combo',
                            id: 'technicalGridFilter',
                            fieldLabel: getText('Technical user'),
                            flex: 1,
                            store: technicalStore,
                            displayField: 'label',
                            valueField: 'val'
                        }
                    ]
                }, 
                filterButtonsPanel
            ]
        };
        
        this.items = [
            {
                xtype: 'form',
                width: 640,
                height: 480,
                border: false,
                layout: 'border',
                bodyStyle: 'background-color:#ffffff;',
                fieldDefaults: {
                    labelWidth: 112,
                    anchor: '100%',
                    labelSeparator: getText(':')
                }, 
                items: [
                    filterFieldsPanel,
                    gridPanel
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Select'),
                action: 'selectUsers',
                listeners:{ 
                    scope: this,
                    click: function( me , e , eOpts ){
                        this.parentController.onSelectUsers(me);
                    }
                }
                
            },{
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
    getData: function(){
              
        // Get form values
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        return values; 
    },
    
    resetForm: function () {
        var firstNameUserGridNameFilter = Ext.getCmp('firstNameUserGridNameFilter');
        var lastNameUserGridNameFilter = Ext.getCmp('lastNameUserGridNameFilter');
        var identifierUserGridNameFilter = Ext.getCmp('identifierUserGridNameFilter');
        var badgeUserGridNameFilter = Ext.getCmp('badgeUserGridNameFilter');
        var profileUserGridNameFilter = Ext.getCmp('profileUserGridNameFilter');
        var technicalGridFilter = Ext.getCmp('technicalGridFilter');

        if (firstNameUserGridNameFilter) {
            firstNameUserGridNameFilter.setValue(null);
        }
        if (lastNameUserGridNameFilter) {
            lastNameUserGridNameFilter.setValue(null);
        }
        if (identifierUserGridNameFilter) {
            identifierUserGridNameFilter.setValue(null);
        }
        if (badgeUserGridNameFilter) {
            badgeUserGridNameFilter.setValue(null);
        }
        if (profileUserGridNameFilter) {
            profileUserGridNameFilter.setValue(null);
        }
        if (technicalGridFilter) {
            profileUserGridNameFilter.setValue(null);
        }
    },
    
    updateDataStore: function (sender) {
        var filterList = [];

        var firstNameUserGridNameFilter = Ext.getCmp('firstNameUserGridNameFilter');
        var lastNameUserGridNameFilter = Ext.getCmp('lastNameUserGridNameFilter');
        var identifierUserGridNameFilter = Ext.getCmp('identifierUserGridNameFilter');
        var badgeUserGridNameFilter = Ext.getCmp('badgeUserGridNameFilter');
        var profileUserGridNameFilter = Ext.getCmp('profileUserGridNameFilter');
        var technicalGridFilter = Ext.getCmp('technicalGridFilter');


        if (firstNameUserGridNameFilter && firstNameUserGridNameFilter.value) {
            var valueString = firstNameUserGridNameFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'firstName',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }
        
        if (lastNameUserGridNameFilter && lastNameUserGridNameFilter.value) {
            var valueString = lastNameUserGridNameFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'lastName',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }
        
        if (identifierUserGridNameFilter && identifierUserGridNameFilter.value) {
            var valueString = identifierUserGridNameFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'sticker',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }
        
        if (badgeUserGridNameFilter && badgeUserGridNameFilter.value) {
            var valueString = badgeUserGridNameFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'badgeNumber',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }
        
        if (profileUserGridNameFilter && profileUserGridNameFilter.value) {
            if (profileUserGridNameFilter.value) {
                filterList.push({
                    property: 'profiles.id',
                    value: parseInt(profileUserGridNameFilter.value),
                    type: 'LONG',
                    comparison: 'EQ'
                });
            }
        }
        
        if (technicalGridFilter && technicalGridFilter.value) {
            var valueString = technicalGridFilter.value.trim();
            var valueBool = valueString === 'true' ? true : false;
            if (valueString.length > 0) {
                filterList.push({
                    property: 'technical',
                    value: valueBool,
                    type: 'BOOLEAN',
                    comparison: 'EQ'
                });
            }
        }

        var win = sender.up('window');
        var grid = win.down('userGridPanel');
        
        grid.setFilters(filterList);
    }
});   