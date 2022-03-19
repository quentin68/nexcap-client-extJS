/* global Ext  */

Ext.define('Dashboard.view.geoloc.EditZone', {
    extend: 'Ext.window.Window',
    xtype: 'geolocEditZone',
    
    requires: ['Dashboard.tool.Utilities'],
    
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
    linkingZone: null,
    feature: null,
    
    currentMap: null,
    
    initComponent: function(){

        this.title = getText('Edit link to map');
        
        this.mapsStore = Ext.create('Dashboard.store.cartography.Maps', {
            autoLoad: false
        });

        var characteristicsPanel = {
            xtype: 'panel',
            title: getText('Edit link to map'),
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
                    hidden: false,
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
                                    this.onColorPicker(sender);
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
                        this.mainController.onSaveZone(me);
                    }
                }
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);
    },
    
    
    onColorPicker: function(target){

        var colorPicker = Ext.create('Dashboard.view.shared.ColorPicker',{
            target: target
        });
        
        colorPicker.down('form').lookupReference( 'selectedColor' ).on({
            change: function(sender) {
                var target = sender.up('window').target;
                target.body.setStyle('background', sender.value);
                target.up('panel').down('hiddenfield[name=color]').setValue(sender.value);
                
                Ext.Function.defer(function(){
                    sender.up('window').close();
                }, 100);

            }
        });
        
        colorPicker.show();
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
    
    
    setData: function(data){

        if(data.color){
            this.down('field[name=color]').setValue(data.color);
            this.down('panel[reference=colorRec]').setBodyStyle({
                background: data.color
            });
        }
                
        this.down('combo[name=linkedMapId]').setValue(data.map.id);
        this.down('textfield[name=label]').setValue(data.label);

    },
    
            
    getData: function(){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues(false, false, false, true);
        
        if(!values.color){
            values.color = '#00b53c';
        }
        
        if(!values.linkedMapId){
            values.linkedMapId = 1;
        }
        
        this.linkingZone.data.color = values.color;
        this.linkingZone.data.indoorMapId = values.linkedMapId;
        this.linkingZone.data.tooltip = values.label;

        return this.linkingZone;
    }

});
