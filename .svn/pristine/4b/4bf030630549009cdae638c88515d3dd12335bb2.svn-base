Ext.define('Dashboard.view.administration.location.Selector', {
    extend: 'Ext.window.Window',
    xtype: 'locationSelector',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.location.GridPanel'
    ],
    
    iconCls: 'fa fa-map-marker',
    layout: 'fit',
    closable : false,
    closeAction : 'destroy',
    resizable : true,
    modal : true,
    constrain: true,
    bodyPadding: 16,
    
    record : [],
    parentController: null,
    withDevices: false,
    filtersLocationStore: null,

    initComponent: function () {
        
        this.title = getText('Locations selection');
                
        this.filtersLocationStore = Ext.create('Dashboard.store.administration.Locations', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    if (this.withDevices) {
                        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/locations/withdevices';
                    } else {
                        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/locations/search';
                    }
                    store.getProxy().setUrl(url);
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/locations/search';
                    store.getProxy().setUrl(url);
                }
            }
        });

        this.filtersLocationStore.getProxy().extraParams.filter = [];
        
        var gridPanel = Ext.create('Dashboard.view.administration.location.GridPanel',{
            region: 'center',
            margin : '16 0 0 0',
            anchor: '100% 100%',
            withDevices: this.withDevices
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
            border: false,
            layout: 'vbox',
            items: [
                {
                    xtype: 'combo',
                    id: 'locationGridAddressFilter',
                    fieldLabel: getText('Address'),
                    width: '100%',
                    store: this.filtersLocationStore,
                    displayField: 'address',
                    valueField: 'address'
                }, {
                    xtype: 'textfield',
                    fieldLabel: getText('Name'),
                    id: 'locationGridNameFilter',
                    width: '100%'
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
                action: 'selectLocations',
                listeners:{ 
                    scope: this,
                    click: function( me , e , eOpts ){
                        this.parentController.onSelectLocations(me);
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
        var locationGridAddressFilter = Ext.getCmp('locationGridAddressFilter');
        var locationGridNameFilter = Ext.getCmp('locationGridNameFilter');

        if (locationGridAddressFilter) {
            locationGridAddressFilter.setValue(null);
        }
        if (locationGridNameFilter) {
            locationGridNameFilter.setValue(null);
        }
    },
    
    updateDataStore: function (sender) {
        var filterList = [];

        var locationGridAddressFilter = Ext.getCmp('locationGridAddressFilter');
        var locationGridNameFilter = Ext.getCmp('locationGridNameFilter');

        if (locationGridAddressFilter && locationGridAddressFilter.value) {

            var addressString = locationGridAddressFilter.value.trim();
            if (addressString.length > 0) {
                filterList.push({
                    property: 'address',
                    value: addressString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }

        if (locationGridNameFilter && locationGridNameFilter.value.trim() !== '') {
            filterList.push({
                property: 'name',
                value: locationGridNameFilter.value.trim(),
                type: 'STRING',
                comparison: 'CONTAINS'
            });
        }
        
        var win = sender.up('window');
        var grid = win.down('locationGridPanel');
        
        grid.setFilters(filterList);
    }
});   