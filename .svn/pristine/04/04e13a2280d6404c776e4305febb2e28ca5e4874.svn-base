/* global Ext */

Ext.define('Dashboard.view.system.sensor.Selector', {
    extend: 'Ext.window.Window',
    xtype: 'sensorSelector',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.system.sensor.GridPanel'
    ],
    
    iconCls: 'fa fa-dot-circle-o',
    layout: 'fit',
    closable : false,
    closeAction : 'destroy',
    resizable : true,
    modal : true,
    constrain: true,
    bodyPadding: 16,
    
    record : [],
    parentController: null,
    filtersSensorsStore: null,
    sensorType: null,
    sensorsStoreUrl: null,

    initComponent: function () {
        
        this.title = getText('Sensor selection');
                
        this.filtersSensorsStore = Ext.create('Dashboard.store.system.Sensors', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    
                    
                    if(!store.getProxy().extraParams.filter){
                        store.getProxy().extraParams.filter = [];
                    }
                    
//                    if(!this.sensorType){
//                        this.sensorType = '';
//                    }
//                    
//                    var myFilter = {
//                        property: 'sensorType',
//                        value: this.sensorType,
//                        type: 'STRING',
//                        comparison: 'CONTAINS'
//                    };
//                    
//                    if(!store.getProxy().extraParams.filter){
//                        store.getProxy().extraParams.filter = [];
//                    }
//                    store.getProxy().extraParams.filter.push(myFilter);

                    if(this.sensorsStoreUrl){
                        store.getProxy().setUrl(this.sensorsStoreUrl);
                    }
//                    store.getProxy().setActionMethods({read: 'GET'});
                    
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/sensors/search';
                    store.getProxy().setUrl(url);
                    store.getProxy().setActionMethods({read: 'POST'});
                }
            }
        });

        //this.filtersSensorsStore.getProxy().extraParams.filter = [];
        
        var gridPanel = Ext.create('Dashboard.view.system.sensor.GridPanel',{
            region: 'center',
            margin : '16 0 0 0',
            anchor: '100% 100%',
            sensorType: this.sensorType,
            sensorsStoreUrl: this.sensorsStoreUrl
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
        
        this.sensorTypesStore = Ext.create('Dashboard.store.system.SensorTypeDescriptions', {
        });
        
        
        var filterFieldsPanel = {
            xtype: 'panel',
            region: 'north', 
            border: false,
            layout: 'vbox',
            items: [
                {
                    xtype: 'autocompleteComboBox',
                    reference: 'gridNameFilter',
                    fieldLabel: getText('Name'),
                    width: '100%',
                    store: this.filtersSensorsStore,
                    displayField: 'name',
                    valueField: 'name'
                }, 
//                {
//                    xtype: 'autocompleteComboBox',
//                    reference: 'gridTypeFilter',
//                    fieldLabel: getText('Type'),
//                    width: '100%',
//                    store: this.sensorTypesStore,
//                    displayField: 'label',
//                    valueField: 'name'
//                },
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
                action: 'select'//,
//                listeners:{ 
//                    scope: this,
//                    click: function(me, e, eOpts ){
//                        this.parentController.onSelectSensor(me);
//                    }
//                }
                
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
              
        var sensor = this.down('sensorGridPanel').getSelection();
        
        if(!sensor[0]){
            sensor = null;
        }else{
            sensor = sensor[0];
        }
        
        return sensor; 
    },
    
    resetForm: function () {
        var nameFilter = Ext.ComponentQuery.query('combo[reference=gridNameFilter]')[0];
        //var typeFilter = Ext.ComponentQuery.query('combo[reference=gridTypeFilter]')[0];

        if (nameFilter) {
            nameFilter.setValue(null);
        }
//        if (typeFilter) {
//            typeFilter.setValue(null);
//        }
    },
    
    updateDataStore: function (sender) {
                
        var filterList = [];

        var nameFilter = Ext.ComponentQuery.query('combo[reference=gridNameFilter]')[0];
        //var typeFilter = Ext.ComponentQuery.query('combo[reference=gridTypeFilter]')[0];

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
        var grid = win.down('sensorGridPanel');
        
        grid.setFilters(filterList);
    }
});   