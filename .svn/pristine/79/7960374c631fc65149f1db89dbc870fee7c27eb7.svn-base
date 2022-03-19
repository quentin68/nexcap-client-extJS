Ext.define('Dashboard.view.cartography.EditLabel', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyEditLabel',
    
    requires: ['Dashboard.tool.Utilities'],
    
    tag: 'winMap',
    mainController: null,
    
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    //height: 500,
    iconCls: 'fa fa-font',
    
    mapsStore: null,
    record: null,
    currentMap: null,
    
    initComponent: function(){

        this.title = getText('Edit label');
        
        this.mapsStore = Ext.create('Dashboard.store.cartography.Maps', {
            autoLoad: true
        });
        
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
            title: getText('Edit label'),
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
                    value: 12,
                    maxValue: 48,
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
                                click: function(sender, e){
                                    this.mainController.onColorPicker(sender);
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


        this.items = [
            {
                xtype: 'form',
                referenceHolder: true,
                border: false,
                width: 700,
                //height: 350,
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
                    characteristicsPanel
                ]
            }];

        this.buttons = [{
                text: getText('Save'),
                listeners:{
                    scope: this,
                    click: function(me){
                        this.mainController.onEditMapLabel(me);
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
    
    
    setData: function(data){

        if(data.color){
            this.down('field[name=color]').setValue(data.color);
            this.down('panel[reference=colorRec]').setBodyStyle({
                background: data.color
            });
        }

        this.down('textfield[name=label]').setValue(data.label);
        this.down('numberfield[name=size]').setValue(data.fontSize);
        this.down('textfield[name=font]').setValue(data.font);

    },
    
            
    getData: function(){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues(false, false, false, true);

        this.record.data.color = values.color;
        this.record.data.label = values.label;
        this.record.data.fontSize = values.size;
        this.record.data.font = values.font;

        return this.record.data;
    }

});
