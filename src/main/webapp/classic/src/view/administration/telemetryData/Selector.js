Ext.define('Dashboard.view.administration.telemetryData.Selector', {
    extend: 'Ext.window.Window',
    xtype: 'telemetryDataSelector',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.telemetryData.GridPanel'
    ],
    
    iconCls: 'fa fa-signal',
    layout: 'fit',
    closable : false,
    closeAction : 'destroy',
    resizable : true,
    modal : true,
    constrain: true,
    bodyPadding: 16,
    
    record : [],
    parentController: null,
    filtersTelemetryDataStore: null,

    initComponent: function () {
        
        this.title = getText('Telemetry data selection');
                
        this.filtersTelemetryDataStore = Ext.create('Dashboard.store.administration.TelemetryData', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {

                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/sensors/search';
                    store.getProxy().setUrl(url);
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/sensors/search';
                    store.getProxy().setUrl(url);
                }
            }
        });

        this.filtersTelemetryDataStore.getProxy().extraParams.filter = [];
        
        var gridPanel = Ext.create('Dashboard.view.administration.telemetryData.GridPanel',{
            region: 'center',
            margin : '16 0 0 0',
            anchor: '100% 100%'
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
        
        this.telemetryDataTypesStore = Ext.create('Dashboard.store.enums.TelemetryDataType', {
            autoLoad: true
        });
        
        
        var filterFieldsPanel = {
            xtype: 'panel',
            region: 'north', 
            border: false,
            layout: 'vbox',
            items: [
                {
                    xtype: 'combo',
                    reference: 'gridNameFilter',
                    fieldLabel: getText('Name'),
                    width: '100%',
                    store: this.filtersTelemetryDataStore,
                    displayField: 'name',
                    valueField: 'name'
                }, {
                    xtype: 'combo',
                    reference: 'gridTypeFilter',
                    fieldLabel: getText('Type'),
                    width: '100%',
                    store: this.telemetryDataTypesStore,
                    displayField: 'label',
                    valueField: 'name'
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
                action: 'selectTelemetryData',
                listeners:{ 
                    scope: this,
                    click: function(me, e, eOpts ){
                        this.parentController.onSelectTelemetryData(me);
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
        var nameFilter = Ext.ComponentQuery.query('grid[reference=gridNameFilter]')[0];
        var typeFilter = Ext.ComponentQuery.query('grid[reference=gridTypeFilter]')[0];

        if (nameFilter) {
            nameFilter.setValue(null);
        }
        if (typeFilter) {
            typeFilter.setValue(null);
        }
    },
    
    updateDataStore: function (sender) {
        var filterList = [];

        var nameFilter = Ext.ComponentQuery.query('grid[reference=gridNameFilter]')[0];
        var typeFilter = Ext.ComponentQuery.query('grid[reference=gridTypeFilter]')[0];

        if (nameFilter && nameFilter.value) {

            var name = nameFilter.value.trim();
            if (name.length > 0) {
                filterList.push({
                    property: 'name',
                    value: name,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }

//        if (typeFilter && typeFilter.value.trim() !== '') {
//            filterList.push({
//                property: 'sensorType',
//                value: typeFilter.value.trim(),
//                type: 'STRING',
//                comparison: 'CONTAINS'
//            });
//        }
        
        var win = sender.up('window');
        var grid = win.down('telemetryDataGridPanel');
        
        grid.setFilters(filterList);
    }
});   