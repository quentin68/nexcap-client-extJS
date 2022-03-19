/* global Ext  */

Ext.define('Dashboard.view.cartography.AddMaterial', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyAddMaterial',
    
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
    height: 500,
    iconCls: 'x-fa fa-tag',
    
    materialsStore: null,
    record: null,
    
    initComponent: function(){

        this.title = getText('Add item');
        
        this.lengthInRealLife = 0;  //width in map
        this.widthInRealLife = 0;  //height in map
        var data = this.mainController.currentMap.data;
        
        try{
            this.lengthInRealLife = data.geoLocArea.sizeInRealLife.width;
            this.widthInRealLife = data.geoLocArea.sizeInRealLife.height;
        }catch(ex){}
                
        this.materialsStore = Ext.create('Dashboard.store.Materials', {
            autoLoad: true
        });

        var characteristicsPanel = {
            xtype: 'panel',
            title: getText('Add item'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'autocompleteComboBox',
                    name: 'material',
                    reference: 'material',
                    fieldLabel: getText('Item'),
                    displayField: 'name',
                    valueField: 'id',
                    //width: '100%',
                    allowBlank: false,
                    queryParam: false,
                    matchFieldWidth: false,
                    store: this.materialsStore,
                    listeners: {
                        scope: this,
                        select: 'onMaterialSelected'
                    }
                },{
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
                            border: true,
                            reference: 'colorRec',
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
                    place
                ]
            }];

        this.buttons = [{
                text: getText('Save'),
                listeners:{
                    scope: this,
                    click: function(me){
                        this.mainController.onSaveMapMaterial(me);
                    }
                }
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);

    },
    
    
    onMaterialSelected: function(sender){
                        
        if(this.exists()){
            Ext.Msg.show({
                title: getText('Errors'),
                message: getText('This item has already been located') + getText('!'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            this.down('combo[name=material]').setValue(null);
        }
    },
    
    
    exists: function(){
        
        var linkedId = this.down('combo[name=material]').value;
        try{
            var mapMaterials = this.mainController.currentMap.data.materialsLayer.mapMaterials;
            for(var i=0; i<mapMaterials.length; i++){
                if(mapMaterials[i].material.id === linkedId){
                    return true;
                }
            }
        }catch(ex){
            //
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
        
        var materialName = this.down('autocompleteComboBox[name=material]').getSelectedRecord().data.name;
        values.name = materialName + '_' + Date.now().toString();
                
        if (!values.posX) {
            values.posX = this.lengthInRealLife/2;
        }

        if (!values.posY) {
            values.posY = this.widthInRealLife/2;
        }

        if(!values.color){
            values.color = '#00b53c';
        }
        
        values.name = values.color; //defaulyColor
        
        return values;
    }

});
