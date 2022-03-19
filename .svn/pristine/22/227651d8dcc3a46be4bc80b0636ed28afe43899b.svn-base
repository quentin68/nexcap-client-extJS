/* global Ext  */

Ext.define('Dashboard.view.cartography.Create', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyCreate',
    
    requires: ['Dashboard.tool.Utilities'],
    
    controller: 'cartographyMain',
    
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    iconCls: 'fa fa-archive',
    
    record: null,
    geoLocSystemsStore: null,
    
    
    initComponent: function(){

        this.title = getText('Create a new map');

        this.geoLocSystemsStore = Ext.create('Dashboard.store.cartography.GeoLocSystems', {
            autoLoad: true
        });

        this.positionsStore = Ext.create('Dashboard.store.administration.Positions', {
            autoLoad: true
        });

        var characteristicsPanel = {
            xtype: 'panel',
            title: getText('New Map'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: Ext.widget('thumbnailEditor')
                }, 
//                {
//                    xtype: 'textfield',
//                    name: 'name',
//                    fieldLabel: getText('Name'),
//                    allowBlank: false,
//                    maxLength: 255
//                }, 
                {
                    xtype: 'textfield',
                    name: 'title',
                    fieldLabel: getText('Title'),
                    allowBlank: false,
                    maxLength: 255
                }, //new field ROOTPOSITION
                {
                    xtype: 'autocompleteComboBox',
                    name: 'rootPosition',
                    reference: 'rootPosition',
                    fieldLabel: getText('Linked position'),
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank: true,
                    queryParam : false,
                    matchFieldWidth: false,
                    store: this.positionsStore,
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                        '{path}/{name}',
                        '</tpl>'
                    ),
                    listConfig: {
                        getInnerTpl: function () {
                            return '{path}/{name}';
                        }
                    }


                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'geoLocSystem',
                    reference: 'geoLocSystem',
                    fieldLabel: getText('GeoLoc referential'),
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank: true,
                    queryParam: false, // to remove param "query"
                    matchFieldWidth: true,
                    forceSelection: true,
                    store: this.geoLocSystemsStore,
                    listeners: {
                        scope: this,
                        select: 'onGeoLocSystemSelected',
                        change: 'onGeoLocSystemChanged'
                    }
                }, {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 1024
                }
            ]
        };
        
        
        var geoLocSystem = {
            xtype: 'panel',
            title: getText('Size of the real reference area'),//getText('Reference source'),
            name: 'geoLocSystemPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            flex:1,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: getText('Unit'),
                    value: getText('Meter')
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    //width: '100%',
                    flex:1,
                    border: 2,
                    
                    defaults:{
                        flex:1
                    },
                    items:[
                        {
                            xtype: 'numberfield',
                            name: 'length',
                            fieldLabel: getText('Length', 'CARTO_MESURE'),
                            minValue: 1,
                            step: 1,
                            decimalSeparator: ',',
                            allowDecimals: true,
                            decimalPrecision: 4,
                            allowBlank: false,
                            labelStyle: 'word-wrap: break-word;'
                        },{
                            xtype: 'numberfield',
                            name: 'width',
                            fieldLabel: getText('Width', 'CARTO_MESURE'),
                            minValue: 1,
                            step: 1,
                            decimalSeparator: ',',
                            allowDecimals: true,
                            decimalPrecision: 4,
                            allowBlank: false,
                            labelStyle: 'word-wrap: break-word;',
                            margin: '0 0 0 20'
                        }
                    ]
                }
            ]
        };


        this.items = [
            {
                xtype: 'form',
                referenceHolder: true,
                border: false,
                width: 700,
                height: 650,
                scrollable: 'y',
                defaults: {
                    xtype: 'panel',
                    ui: 'form-panel',
                    bodyPadding: 20,
                    border: false,
                    width: '100%'
                },
                fieldDefaults: {
                    labelWidth: 112,
                    width: '100%',
                    labelSeparator: getText(':'),
                    margin: '0 0 12 0'
                },
                items: [
                    characteristicsPanel,
                    geoLocSystem
                ]
            }];

        this.buttons = [{
                text: getText('Save'),
                handler: 'onSave'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);
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
    
    
    onGeoLocSystemSelected: function(){
        
        this.down('panel[name=geoLocSystemPanel]').setVisible(false);
        this.down('field[name=length]').setDisabled(true);
        this.down('field[name=width]').setDisabled(true);
    },
    
    onGeoLocSystemChanged: function(sender){
        
        if(!sender.value){
            this.down('panel[name=geoLocSystemPanel]').setVisible(true);
            this.down('field[name=length]').setDisabled(false);
            this.down('field[name=width]').setDisabled(false);
        }
        
    },
    
            
    getData: function(){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues(false, false, false, true);
        
        values.name = values.title;
        
        if (!values.geoLocSystem){
            if(values.width && values.length){
                values.geoLocArea = {
                    sizeInRealLife: {
                        width: values.length,
                        height: values.width,
                        unit: "METER"
                    },
                    sizeInMap: {
                        "widthRatio": 1,
                        "heightRatio": 1
                    },
                    posX: 0,
                    posY: 0
                };
            }
        }else{
            var data = this.down('combo[reference=geoLocSystem]').selection.data;
            values.geoLocSystem = data;
        }
                
        
        if (!values.geoLocArea){
            values.geoLocArea = {
                sizeInRealLife: {
                    width: 8,
                    height: 6,
                    unit: "METER"
                },
                sizeInMap: {
                    "widthRatio": 1,
                    "heightRatio": 1
                },
                posX: 0,
                poxY: 0
            };
        }
        
        values.locationsLayer = {options: {
            defaultColor: '#3AA7DA'
        }};
    
        values.materialsLayer = {
            displayedFields: [],
            options: {
                defaultColor: '#08a51f',
                displayingRules: []
            }
        };
        
        values.devicesLayer = {options: {
            defaultColor: '#095899'
        }};
    
        values.linkingZonesLayer = {options: {
            defaultColor: '#ffd400'
        }};
    
        values.labelsLayer = {options: {
            defaultColor: '#43475b'
        }};

        return values;
    }

});
