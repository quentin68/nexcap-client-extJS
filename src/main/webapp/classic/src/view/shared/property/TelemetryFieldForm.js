/*  global Ext */

Ext.define('Dashboard.view.shared.property.TelemetryFieldForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'telemetryFieldForm',

    require: [
        'Ux.TextField',
        'Dashboard.view.system.sensor.Detail'
    ],

    tag: 'field',
    referenceHolder: true,
    width: '100%',
    layout: 'anchor',
    isFloatingPointEditable: true,

    listeners: {
        render: 'onFormRender'
    },

    initComponent: function (){

        this.defaults = {
            submitValue: false,
            allowBlank: true,
            labelSeparator: getText(':'),
            listeners: {
                change: 'onFormChange'
            }
        },
                this.items = [
                    {
                        xtype: 'textfield',
                        fieldLabel: getText('Label'),
                        reference: 'fieldLabel',
                        name: 'fieldLabel',
                        allowBlank: false,
                        anchor: '100%',
                        maxLength: 255
                    }, {
                        xtype: 'textarea',
                        fieldLabel: getText('Description'),
                        reference: 'description',
                        name: 'description',
                        anchor: '100%',
                        maxLength: 1024
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: getText('Width'),
                        reference: 'width',
                        name: 'width',
                        maxValue: 600,
                        minValue: 30
                    }
                ];

        this.callParent(arguments);

    },

    buildField: function (data, control){

        var field = this.buildFormField(data, control);

        field.items[0].xtype = 'ux-textfield';
        field.items[0].fieldLabel = data.label ? data.label : 'Label';

        return field;
    },

    buildFormField: function (data, control, value, model){
                        
        var configuration = control.field;

        if (configuration.width === 0) {
            configuration.width = '100%';
        }

        var field = {
            xtype: 'container',
            reference: 'fieldContainer',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        submitValue: false,
                        labelSeparator: getText(':'),
                        labelWidth: 112,
                        margin: '0 6 0 0'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            tag: 'property',
                            sensor: null,
                            property: data,
                            model: model,
                            name: data.name,
                            fieldLabel: data.label ? data.label : data.name,
                            width: configuration.width,
                            allowBlank: true,
                            editable: false,
                            readOnly: true,
                            labelStyle: 'word-wrap: break-word;',
                            value: value,
                            listeners: {
                                scope: this,
                                render: function (cmp){
                                    cmp.getEl().on('click', function (){
                                        this.onSelectSensor();
                                    }, this);
                                }
                            }
                        }, {
                            xtype: 'container',
                            layout: 'center',
                            height: '100%',
                            items: [
                                {
                                    xtype: 'button',
                                    name: 'infoButton',
                                    scale: 'small',
                                    border: false,
                                    enableToggle: false,
                                    iconCls: 'fa fa-info',
                                    scope: this,
                                    flex: 0,
                                    tooltip: getText('Sensor information'),
                                    listeners: {
                                        scope: this,
                                        click: function (button, event, eOpts){
                                            this.onDisplaySensorInfo(button);
                                        }
                                    }
                                }
                            ]
                        }, {
                            xtype: 'container',
                            layout: 'center',
                            height: '100%',
                            items: [
                                {
                                    xtype: 'button',
                                    name: 'editButton',
                                    scale: 'small',
                                    border: false,
                                    enableToggle: false,
                                    iconCls: 'fa fa-dot-circle-o',//'fa fa-pencil',
                                    scope: this,
                                    flex: 0,
                                    listeners: {
                                        scope: this,
                                        click: function (button, event, eOpts){
                                            this.onSelectSensor(button);
                                        },
                                        render: function (button, event, eOpts){
                                            button.setTooltip(getText('Select new sensor'));
                                        }
                                    }
                                }
                            ]
                        }, {
                            xtype: 'container',
                            layout: 'center',
                            height: '100%',
                            items: [
                                {
                                    xtype: 'button',
                                    name: 'deleteButton',
                                    scale: 'small',
                                    border: false,
                                    enableToggle: false,
                                    iconCls: 'fa fa-minus-circle',
                                    scope: this,
                                    handler: this.deleteProperty,
                                    flex: 0,
                                    tooltip: getText('Dissociate sensor'),
                                    listeners: {
                                        scope: this,
                                        click: function (button, event, eOpts){
                                            this.confirmRemoveSensor(button);
                                        }, 
                                        render: function (button, event, eOpts){
                                            var fieldContainer = button.up('container[reference=fieldContainer]');
                                            var property = fieldContainer.down('textfield[tag=property]').property;
                                            if(property.options && property.options.sensortype){
                                                button.setVisible(true);
                                            }else{
                                                button.setVisible(false);
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }]
        };

        if (configuration.description) {
            
            var desc = {
                xtype: 'label',
                text: configuration.description,
                maxWidth: '100%',
                margin: '4 0 0 0',
                style: {
                    color: '#6A6D7E',
                    'font-weight': 'normal',
                    'font-size': '12px',
                    'font-style': 'italic'
                }
            };

            field.items.push(desc);
        }

        return field;
    },

    onSelectSensor: function (button){
        this.selectSensor(button);
    },

    selectSensor: function (button){
        
        var fieldContainer = button.up('container[reference=fieldContainer]');
        var propertyData = fieldContainer.down('textfield[tag=property]').property;
                        
        var root = button.up('window');
        var objectid = 0;
        if(root.record){
            objectid = root.record.id;
        }
        
        var sensorType = propertyData.options.sensortype;

        if(sensorType){
            
        var propertyConfigurationType = propertyData.propertyConfigurationType;
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/sensors/availablesensor/' + sensorType +'/' + propertyConfigurationType + '/' + objectid;
        
        this.sensorSelector = Ext.create('Dashboard.view.system.sensor.Selector', {
            sensorType: sensorType,
            sensorsStoreUrl: url
        });
                
        this.sensorSelector.down('button[action=select]').on('click', function (me){
            this.addNewSensor(me, button);
        }, this);

        this.sensorSelector.show();
        } else {
            
            Ext.Msg.alert(getText('Warning'), getText('This property is wrong.'));  //Cette propriété est erronée.
        }
        
    },

    addNewSensor: function (sender, button){

        // Validate form
        var win = sender.up('window');
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        // if Data
        var sensor = win.getData();
        if (!sensor) {
            win.close();
            return;
        }
        
        // Fill field
        var fieldContainer = button.up('container[reference=fieldContainer]');
        fieldContainer.down('textfield[tag=property]').sensor = sensor;
        
        var value = '';
        if(sensor.data.value){
            value = sensor.data.value.toString();
        }

        if (value === 'true') {
            value = getText('Yes');
        } else if (value === 'false') {
            value = getText('No');
        }

        var targetField = fieldContainer.down('field[tag=property]');
        targetField.setValue(value);
        
        // Display delete button
        var deleteButton = fieldContainer.down('button[name=deleteButton]');
        deleteButton.setVisible(true);

        // Update info button
        var toolTipText = getText('Sensor') + getText(':') + ' ' + sensor.data.name;
        var infoButton = fieldContainer.down('button[name=infoButton]');
        infoButton.setTooltip(toolTipText);

        // Save
        this.updateProperty(button);
        win.close();

    },

    confirmRemoveSensor: function (button){

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to dissociate this sensor ?'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn){
                if (btn === 'yes') {
                    this.deleteSensor(button);
                }
            }
        });
    },

    deleteSensor: function (button){
                
        var fieldContainer = button.up('container[reference=fieldContainer]');

        //fill field
        var targetField = fieldContainer.down('field[tag=property]');
        targetField.setValue('');
        
        // Save property
        this.updateProperty(button);
        this.sensor = null;
        
        //Update info button
        var toolTipText = getText('Undefined');
        var infoButton = fieldContainer.down('button[name=infoButton]');
        infoButton.setTooltip(toolTipText);
        
         //hide delete button
        button.setVisible(false);
        
    },

    updateProperty: function (button){
        
        var fieldContainer = button.up('container[reference=fieldContainer]');
        var sensor = fieldContainer.down('field[tag=property]').sensor;
        var targetField = fieldContainer.down('field[tag=property]');
        var infoButton = fieldContainer.down('button[name=infoButton]');
        
        if(sensor){
            //targetField.property.options.processor = sensor.data.name;
            targetField.property.options.sensortype = sensor.data.sensorType;
            targetField.property.sensorId = sensor.data.id;
            
            infoButton.setTooltip(sensor.data.name);
            
        }else{
            delete targetField.property.options.sensortype;
            delete targetField.property.sensorId;
        }

    },

    onDisplaySensorInfo: function (button){
                
        var fieldContainer = button.up('container[reference=fieldContainer]');
        
        var sensor = fieldContainer.down('field[tag=property]').sensor;
        var property = fieldContainer.down('field[tag=property]').property;
        var sensorId = null;
        
        if(sensor){
            sensorId = sensor.data.id;
        }else if(property){
            sensorId = property.sensorId;//propety.options.sensorId;
        }
        
        if (!sensorId || sensorId === 'undefined') {
            Ext.Msg.show({
                title: getText('Info'),
                message: getText('No associated sensor'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
            return;
        }
        
        Dashboard.manager.system.SensorsManager.getOne(sensorId, this, 'displayInfoWindow');

    },
    
    
    displayInfoWindow: function(sensor){
        
        var infoWindow = Ext.create('Ext.window.Window', {
            title: getText('Sensor'),
            iconCls: 'fa fa-dot-circle-o',
            autoShow: false,
            modal: true,
            width: 700,
            height: 500,
            layout: 'fit',
            items: {
                xtype: 'panel',
                layout: 'fit',
                items: {
                    xtype: 'sensorDetail',
                    dockedItems: null,
                    configDetail: function (){},
                    configViews: function (){},
                    listeners: {
                        scope: this,
                        render: function (me){
                            me.setData(sensor.data);
                        }
                    }
                }
            },
            buttons: [
                {
                    text: getText('Close'),
                    handler: function (me){
                        me.up('window').close();
                    }
                }
            ]
        });

        infoWindow.show();
        
    },
    

    getData: function (){

        var vtype = null;

        var field = {
            fieldType: 'numberfield',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            width: this.lookupReference('width').value,
            minValue: this.lookupReference('minValue').value,
            maxValue: this.lookupReference('maxValue').value,
            step: this.lookupReference('step').value,
            allowDecimals: this.lookupReference('allowDecimals').checked,
            decimalPrecision: this.lookupReference('decimalPrecision').value,
            dataType: 'FLOAT',
            sensorId: this.lookupReference('fieldContainer').property.sensorId,
            vtype: vtype
        };

        return field;
    },

    setData: function (field){
        this.up('form').getForm().setValues(field);
    }

});