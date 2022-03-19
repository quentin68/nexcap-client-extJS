/* global Ext */
Ext.define('Dashboard.view.system.sensor.Create', {
    extend: 'Ext.window.Window',
    xtype: 'sensorCreate',

    requires: [
        'Dashboard.tool.Utilities', 
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor',
        'Ux.TextField'
    ],

    controller: 'sensorMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 550,
    iconCls: 'fa fa-dot-circle-o',
    plain: true,
    autoScroll: true,
    scrollable: 'y',

    record: null,

    referencesStore: null,

    initComponent: function (){

        this.title = getText('Create a new sensor');
        
        this.sensorsTypesList = Ext.create(Dashboard.store.system.SensorTypeDescriptions, {
            autoLoad: true
        });
        
        this.sensorConnectionTypesStore = Ext.create(Dashboard.store.enums.SensorConnectionType);
        this.decodersList = Ext.create(Dashboard.store.system.SensorDecoderConfiguration);
        this.recordersList = Ext.create(Dashboard.store.system.SensorRecorderConfiguration);
        
        var topicContainer = {
            
            xtype: 'container',
            reference: 'topicContainer',
            hidden: true,
            disabled: true,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaults: {
                labelSeparator: getText(':')
            },
            items:[
                {
                    xtype: 'label',
                    text: getText('Topic') + getText('colon'),//':'
                    width: 112
                }, {
                   xtype: 'ux-textfield',
                   name: 'topicKey',
                   fieldLabel: getText('Key'),
                   flex: 1,
                   margin: '0 6 0 0'
               }, {
                   xtype: 'ux-textfield',
                   name: 'topicValue',
                   fieldLabel: getText('Value'),
                   flex: 1
               }
            ]
        };
        
        
        var codeContainer = {
            xtype: 'container',
            layout: 'hbox',
            items:[
               {
                   xtype: 'textfield',
                   name: 'code',
                   readOnly: true,
                   fieldLabel: getText('Code'),
                   flex: 1,
                   margin: '0 6 0 0',
                   listeners: {
                        scope: this,
                        render: function(cmp) {
                            cmp.getEl().on('click', function(){
                                cmp.up('window').onAddCode();
                            }); 
                        }
                    }
               }, {
                    xtype: 'button',
                    //ui: 'indicator-font-icon-button-plus',
                    name: 'editButton',
                    scale: 'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa fa-rss',
                    scope: this,
                    flex: 0,
                    margin: '0 6 0 0',
                    listeners: {
                        scope: this,
                        click: function(button, event, eOpts){
                            this.onAddCode();
                        }
                    }
                }, {
                    xtype: 'button',
                    //ui: 'indicator-font-icon-button-minus',
                    name: 'minusButton',
                    scale: 'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa fa-minus-circle',
                    scope: this,
                    handler: this.deleteProperty,
                    flex: 0,
                    listeners: {
                        scope: this,
                        click: function(button, event, eOpts){
                            this.confirmRemoveCode();
                        }
                    }
                }
            ],
            listeners: {
                'added': function(me){
                    if (Dashboard.manager.FeaturesManager.isEnabled('OP_ASSOCIATE_TAG')) {
                        me.hidden = false;
                    } else {
                        me.hidden = true;
                    }
                }
            }
        };


        var characteristicsPanel = {

            xtype: 'panel',
            bodyPadding: 20,
            ui: 'form-panel',

            defaults: {
                labelWidth: 112,
                width: '100%',
                labelSeparator: getText(':'),
                margin: '0 0 12 0'
            },
            items: [
                
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
                    maxLength: 255
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'sensorType',
                    reference: 'sensorType',
                    fieldLabel: getText('Sensor type'),
                    displayField: 'name',
                    valueField: 'name',
                    allowBlank: false,
                    queryParam: false, //to remove param "query"
                    matchFieldWidth: false,
                    store: this.sensorsTypesList,
                    listeners: {
                        scope: this,
                        select: function(combo, record, eOpts){
                            //Do if needed
                        },
                        afterrender: function (field){
                            field.focus(false, 100);
                        }
                    }
                }, {
                    xtype: 'combo',
                    name: 'sensorConnectionType',
                    reference: 'sensorConnectionType',
                    fieldLabel: getText('Connection type'),
                    store: this.sensorConnectionTypesStore,
                    queryMode: 'local',
                    displayField: 'localizedLabel',
                    valueField: 'name',
                    editable: true,
                    allowBlank: false,
                    listeners:{
                        select: function(combo, record, eOpts){
                            
                            var topicContainer = combo.up('form').down('container[reference=topicContainer]');
                            
                            if(record.data.name === 'MQTT'){
                                topicContainer.setVisible(true);
                                topicContainer.setDisabled(false);
                            }else{
                                topicContainer.setVisible(false);
                                topicContainer.setDisabled(true);
                            }
                        }
                    }
                }, {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 1024
                },
                topicContainer,  
                {
                    xtype: 'autocompleteComboBox',
                    name: 'sensorDecoderConfiguration',
                    reference: 'decoder',
                    fieldLabel: getText('Decoder'),
                    displayField: 'name',
                    valueField: 'id',
                    //allowBlank: false,
                    queryParam: false, //to remove param "query"
                    matchFieldWidth: false,
                    store: this.decodersList
                }, {
                    xtype: 'tagfield',
                    name: 'dataSensorRecorderConfiguration',
                    reference: 'recorder',
                    fieldLabel: getText('Recorder'),
                    store: this.recordersList,
                    displayField: 'name',
                    valueField: 'id',
                    filterPickList: true,
                    queryMode: 'remote'//,
                    //allowBlank: false
                },
                codeContainer
//                ,  {
//                    xtype: 'numberfield',
//                    name: 'value',
//                    fieldLabel: getText('Default value'),
//                    allowBlank: true,
//                    step: 1,
//                    decimalSeparator: ',',
//                    allowDecimals: true,
//                    decimalPrecision: 3,
//                    width: 300
//                }
            ]
        };

        this.items = [
            {
                xtype: 'form',
                border: false,
                width: 600,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
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
                items: [characteristicsPanel]
            }];

        this.buttons = [
            {
                text: getText('Save'),
                action: 'save'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },
    
    
    onAddCode: function(){
        this.addCode();
    },
    
    
    addCode: function(){
        this.windowAddCode = Ext.create('Dashboard.view.shared.component.AddCodeWindow');
        
        this.windowAddCode.down('button[action=addCode]').on('click', function (me) {
            this.addNewCode(me);
        }, this);
        
        this.windowAddCode.show();
    },
    
    
    addNewCode: function(sender){
        
        var win = sender.up('window');
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var data = win.getData();
        this.down('field[name=code]').setFieldLabel(data.codeTypeLabel);
        this.down('field[name=code]').setValue(data.code);
        this.down('field[name=code]').data = data;
                
        win.close();
        
    },
    
    
    confirmRemoveCode: function(code){

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to remove this code ?'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn){
                if (btn === 'yes') {
                    this.deleteCode();
                }
            }
        });
    },
    
    
    deleteCode: function(){
        this.down('field[name=code]').setFieldLabel(getText('code'));
        this.down('field[name=code]').setValue('');
        this.down('field[name=code]').data = {code : ''};
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
    getData: function (){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        
        var data = {};
        
        //var enabledCheckBox = this.down('checkboxfield[name=enabled]');
        
        var decoderCombo = this.down('combo[reference=decoder]');
        var recorderCombo = this.down('tagfield[reference=recorder]');
        
        var decoder = [];
        var recorders = [];
        
        if(decoderCombo.getSelection()){
            decoder = decoderCombo.getSelection().data;
        }
        
        if(recorderCombo.getSelection()){
            if(recorderCombo.getSelection().lenght > 0){
                Ext.each(recorderCombo.getSelection(), function(recorder){
                    recorders.push(recorder.data);
                });
            }else{
                recorders.push(recorderCombo.getSelection().data);
            }
        }
                
        data.name = (values.name).trim();
        data.description = values.description;
        data.sensorConnectionType = values.sensorConnectionType;
        data.sensorType = values.sensorType;
        data.value = null;
        data.enabled = true;
        data.sensorDecoderConfigurationDto = decoder;
        data.dataSensorRecorderConfigurationDto = recorders;
        
        if (values.code !== null && values.code !== undefined) {
            data.codes = [];
            if(this.down('field[name=code]').data){
                data.codes.push(this.down('field[name=code]').data);
            }
        } else {
            data.code = null;
        }
        
        data.properties = null;
        
        if(values.topicKey && values.topicValue){
            data.properties = {
                topic: values.topicKey + '/' + values.topicValue
            };
        }

        return data;
    }

});