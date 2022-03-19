/* global Ext */

Ext.define('Dashboard.view.cartography.AddLabel', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyAddLabel',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Ux.Panel'
    ],
    
    tag: 'winMap',
    mainController: null,
    
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    iconCls: 'fa fa-font',
    
    record: null,
    
    initComponent: function(){

        this.title = getText('Add label');
        
        this.lengthInRealLife = 0;
        this.widthInRealLife = 0;
        var data = this.mainController.currentMap.data;
        
        try{
            this.lengthInRealLife = data.geoLocArea.sizeInRealLife.width;
            this.widthInRealLife = data.geoLocArea.sizeInRealLife.height;
        }catch(ex){}
        
        var fontStore = Ext.create('Dashboard.store.cartography.FontTypes');
        
        var fontCombo = Ext.create('Ext.form.ComboBox', {
            store: fontStore,
            name: 'font',
            displayField: 'name',
            valueField: 'name',
            queryMode: 'local',
            fieldLabel: getText('Font'),
            maxLength: 100,
            allowBlank: true,
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '<div class="x-boundlist-item" style="font-family: \'{name}\'">{name}</div>',
                '</tpl>'
            )
        });
        

        var characteristicsPanel = {
            xtype: 'panel',
            title: getText('Add label'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'textfield',
                    name: 'label',
                    fieldLabel: getText('Label'),
                    maxLength: 100,
                    allowBlank: false
                }, {
                    xtype: 'numberfield',
                    fieldLabel: getText('Size'),
                    reference: 'size',
                    width: null,
                    name: 'size',
                    value: 24,
                    maxValue: 128,
                    minValue: 8
                }, 
                fontCombo, 
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    reference: 'color',
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel: getText('Color'),
                            margin: '0 6 0 0',
                            submitValue: false,
                            labelWidth: 112,
                            width: 112
                        },{
                            xtype: 'ux-panel',
                            reference: 'colorRec',
                            border: true,
                            width: 32, 
                            height: 32,
                            bodyStyle:{
                                background: "#F3F3F3"
                            },
                            listeners:{
                                scope:this,
                                click: function(me){
                                    this.mainController.onColorPicker(me);
                                }
                            },
                            margin: 0
                        },{
                            xtype: 'hiddenfield',
                            name: 'color',
                            value: '#000'
                        }
                    ]
                }
            ]
        };
        
        
        var place = {
            xtype: 'panel',
            title: getText('Coordinates'),
            bodyPadding: 20,
            ui: 'form-panel',

            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: getText('Unit'),
                    value: getText('Meter')
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    defaults:{
                        flex:1
                    },
                    items:[
                        {
                            xtype: 'numberfield',
                            name: 'posX',
                            fieldLabel: getText('Position X'),
                            minValue: 0,
                            maxValue: this.lengthInRealLife - 1,
                            step: 1,
                            decimalSeparator: ',',
                            allowDecimals: true,
                            decimalPrecision: 4,
                            allowBlank: true,
                            labelStyle: 'word-wrap: break-word;'
                        },{
                            xtype: 'numberfield',
                            name: 'posY',
                            fieldLabel: getText('Position Y'),
                            minValue: 0,
                            maxValue: this.widthInRealLife - 1,
                            step: 1,
                            decimalSeparator: ',',
                            allowDecimals: true,
                            decimalPrecision: 4,
                            allowBlank: true,
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
                //height: 650,
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
                    place
                ]
            }];

        this.buttons = [{
                text: getText('Save'),
                listeners:{
                    scope: this,
                    click: function(me){
                        this.mainController.onSaveLabel(me);
                    }
                }
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
    
    
    setOptions: function(options){
        
        if(!options){
            return;
        }
        
        this.down('field[name=color]').setValue(options.defaultColor);
        this.down('panel[reference=colorRec]').setBodyStyle({
            background: options.defaultColor
        });
    },
    
            
    getData: function(){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues(false, false, false, true);
                
        if (!values.posX) {
            values.posX = this.lengthInRealLife/2;
        }

        if (!values.posY) {
            values.posY = this.widthInRealLife/2;
        }
        
        values.name = 'label_' + Date.now().toString();
        
        return values;
    }


});
