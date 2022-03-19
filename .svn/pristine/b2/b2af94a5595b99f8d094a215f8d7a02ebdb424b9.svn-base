Ext.define('Dashboard.view.cartography.AddLinkToMap', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyAddLinkToMap',
    
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
    iconCls: 'fa fa-link',
    
    mapsStore: null,
    record: null,
    
    initComponent: function(){

        this.title = getText('Add link to map');
        
        this.mapsStore = Ext.create('Dashboard.store.cartography.Maps', {
            autoLoad: true
        });

        var characteristicsPanel = {
            xtype: 'panel',
            title: getText('Add link'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'autocompleteComboBox',
                    name: 'linkedMapId',
                    reference: 'linkedMapId',
                    fieldLabel: getText('Map'),
                    displayField: 'title',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false,
                    matchFieldWidth: false,
                    store: this.mapsStore,
                    listeners: {
                        scope: this,
                        select: 'onMapIdSelected'
                    }
                },{
                    xtype: 'textfield',
                    fieldLabel: getText('Label'),
                    name: 'label',
                    allowBlank: false
                },
//                {
//                    xtype: 'numberfield',
//                    fieldLabel: getText('Label size'),
//                    reference: 'labelSize',
//                    width: null,
//                    name: 'labelSize',
//                    value: 12,
//                    maxValue: 32,
//                    minValue: 6
//                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel: getText('Link Color'),
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
                width: 500,
                height: 350,
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
                        this.mainController.onSaveLinkToMap(me);
                    }
                }
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);
    },
    
    
    onMapIdSelected: function(sender){
                        
        if(this.isTheSameMap()){
            Ext.Msg.show({
                title: getText('Errors'),
                message: getText('A map must not be linked to itself') + getText('!'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            this.down('combo[name=linkedMapId]').setValue(null);
            this.down('textfield[name=label]').setValue(null);
            return;
        }
        
        this.down('textfield[name=label]').setValue(sender.rawValue);
    },
    
    
    isTheSameMap: function(){
        
        var linkedId = this.down('combo[name=linkedMapId]').value;
        
        if(this.mainController.currentMap.id === linkedId){
            return true;
        }
        return false;
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
        
        values.name = values.label + '_' + Date.now().toString();
        
        if (!values.posX) {
            values.posX = 0;
        }

        if (!values.posY) {
            values.posY = 0;
        }
        
        if(!values.color){
            values.color = '#00b53c';
        }
        
        if (!values.width) {
            values.width = 1;
        }

        if (!values.height) {
            values.height = 1;
        }

        return values;
    }

});
