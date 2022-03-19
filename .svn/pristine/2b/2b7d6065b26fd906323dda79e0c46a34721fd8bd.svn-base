/* global Ext, moment  */

Ext.define('Dashboard.view.administration.material.EditMultiple', {
    extend: 'Ext.window.Window',
    xtype: 'materialEditMultiple',

    requires: ['Dashboard.tool.Utilities', 'Ux.DisplayField'],

    controller: 'materialMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    iconCls: 'x-fa fa-tag',
    
    ids: null,
    canEditProperties: false,
    properties: null,
    
    initComponent: function () {
        this.title = getText('Edit many items');
                
        this.referencesStore = Ext.create('Dashboard.store.References', {
            autoLoad: true,
            listeners: {
                beforeload: function (store, operation, eOpts){
                    var myFilter = {
                        property: 'identified',
                        value: true,
                        type: 'BOOLEAN',
                        comparison: 'EQ'
                    };

                    store.getProxy().extraParams.filter.push(myFilter);
                },
                load: function (store, operation, eOpts){
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        var characteristicsPanel = {
            title: getText('Characteristic'),
            items: [
                {
                    xtype: 'autocompleteComboBox',
                    reference: 'productReference',
                    fieldLabel: getText('Reference code'),
                    displayField: 'referenceCode',
                    valueField: 'id',
                    allowBlank: true,
                    queryParam: false,
                    matchFieldWidth: false,
                    store: this.referencesStore,
                    listeners: {
                        scope: this,
                        select: function(combo, record, eOpts){
                            this.canEditProperties = true;
                            this.getController().onReferenceSelected(combo);
                            this.down('autocompleteComboBox[reference=productReferenceDesignation]').select(record);
                        }
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'productReferenceId',
                    reference: 'productReferenceDesignation',
                    fieldLabel: getText('Reference designation'),
                    displayField: 'designation',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false, //to remove param "query"
                    matchFieldWidth: false,
                    store: this.referencesStore,
                    listeners: {
                        scope: this,
                        select: function(combo, record, eOpts){
                            this.canEditProperties = true;
                            this.getController().onReferenceSelected(combo);
                            this.down('autocompleteComboBox[reference=productReference]').select(record);
                        }
                    }
                }, {
                    xtype: 'textareafield',
                    reference: 'description',
                    fieldLabel: getText('Description')
                }
            ]
        };
        
        
        var traceabilityInformationPanel = {

            name: 'traceabilityInformationPanel',
            title: getText('Traceability information'),
            collapsible: false,
            hidden: false,
            items: [
                {
                    xtype: 'container',
                    name: 'assignedLocationContainer',
                    hidden: false,
                    anchor: '100%',
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'autocompleteComboBox',
                            reference: 'assignedLocation',
                            anchor: '100%',
                            fieldLabel: getText('New assigned location'),
                            displayField: 'address',
                            valueField: 'id',
                            queryParam: false,
                            filter: [],
                            requires: ['Dashboard.store.administration.Locations'],
                            store: Ext.create('Dashboard.store.administration.Locations', {
                                autoLoad: true,
                                sorters: [
                                    {
                                        property: 'name',
                                        direction: 'ASC'
                                    }
                                ]
                            })
                        }
                    ]
                }
            ]
        };
        

        var propertiesPanel = {
            xtype: 'panel',
            title: getText('Properties'),
            reference: 'propertiesPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            hidden: this.canEditProperties ? false : true,
            defaults: {
                margin: '0 0 12 0',
                submitValue: false,
                labelWidth: 112,
                width: '100%',
                labelSeparator: getText(':')
            },
            items: []
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
                    traceabilityInformationPanel,
                    propertiesPanel
                ]
            }];

        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            fixed: true,
            items: [
                {
                    xtype: 'ux-displayfield',
                    labelSeparator: null,
                    fieldLabel : '&nbsp' ,
                    value: '&nbsp' + getText('Empty fields will not be modified') + getText('!'),
                    beforeLabelTextTpl: '<b class="x-fa fa-exclamation-circle"></b>',
                    flex: 1,
                    margin: '0 0 0 20'
                },
                {xtype: 'button', text: getText('Save'), formBind: true, action: 'save'}, 
                {xtype: 'button', text: getText('Cancel'), scope: this, handler: this.close}
            ]
        }];

        this.callParent(arguments);
    },

    cleanFields: function () {
        this.down('panel[reference=propertiesPanel]').removeAll();
    },

    //add properties
    addField: function (field) {
        
        if(this.canEditProperties){
            this.down('panel[reference=propertiesPanel]').add(field);
            this.down('panel[reference=propertiesPanel]').setVisible(true);
            return;
        }
        
//        var acceptableFields = ['curState', 'lastCalibrationDate', 'nextCalibrationDate', 'lastMaintenanceDate', 'nextMaintenanceDate', 'maxUseCount'];
//
//        if (acceptableFields.indexOf(field.items['0'].name) !== -1) {
//            this.down('panel[reference=propertiesPanel]').add(field);
//            this.down('panel[reference=propertiesPanel]').setVisible(true);
//        }
    },
    

    getProperties: function () {
        var list = this.query('component[tag=property]');
        var materialPropertiesList = [];
        var sensorId = null;

        for (var i = 0; i < list.length; i++) {

            var include = true;
            var value = list[i].value;
            
            if(value === '' || value === null){
                include = false;
            }

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
                var date = list[i].down('field[xtype=datefield]').getValue();
                var time = list[i].down('field[xtype=timefield]').getValue();
                if(date){
                    value = Ext.Date.format(date, 'Y-m-d') + ' ' + Ext.Date.format(time, 'H:i:s');
                }else{
                    value = null;
                }
            }

            var materialProperty = {
                    name: list[i].name,
                    value: value
            };
                        
            if(list[i].property){
                if(list[i].property.sensorId){
                    sensorId = list[i].property.sensorId;
                }else{
                    sensorId = null;
            }
                materialProperty.sensorId = sensorId;
        }

            if (include) {
                materialPropertiesList.push(materialProperty);
            }
        }

        return materialPropertiesList;
    },

    resetUseCount: function () {
        this.down('displayfield[name=useCountLabel]').setValue(0);
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
            if(invalidFields[i].fieldLabel !== undefined){
                text += invalidFields[i].fieldLabel + " > ";
            }

            messages.push( text + invalidFields[i].activeErrors[0]);
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
        
        var list =[];
        
        Ext.each(this.ids, function(id){
            var winForm = this.down('form').getForm();
            var values = winForm.getValues();
                        
            var model = {
                id: id,
                productReferenceId: null,
                description: null,
                assignedLocationId: null,
                properties: null
            };
        
            var newReference = this.down('combobox[reference=productReference]').getValue();
            if(newReference){
                model.productReferenceId = newReference;
            }
        
            var newAssignedLocation = this.down('combobox[reference=assignedLocation]').getValue();
            if(newAssignedLocation){
                model.assignedLocationId = newAssignedLocation;
            }
        
            var newDescription = this.down('field[reference=description]').getValue();
            if(newDescription){
                model.description = newDescription;
            }
            
            if(this.canEditProperties){
                model.properties = this.getProperties();
            }

            list.push(model);
            
        }, this);

        return list;
    }
});