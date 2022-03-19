Ext.define('Dashboard.view.cartography.AddLocation', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyAddLocation',
    
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
    iconCls: 'fa fa-map-marker',
    
    locationsStore: null,
    record: null,
    
    initComponent: function(){

        this.title = getText('Add location');
        
        var lengthInRealLife = 0;
        var widthInRealLife = 0;
        var data = this.mainController.currentMap.data;
        
        try{
            lengthInRealLife = data.geoLocArea.sizeInRealLife.width;
            widthInRealLife = data.geoLocArea.sizeInRealLife.height;
        }catch(ex){}
        
        this.locationsStore = Ext.create('Dashboard.store.administration.Locations', {
            autoLoad: true
        });

        var characteristicsPanel = {
            xtype: 'panel',
            title: getText('Add location'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'autocompleteComboBox',
                    name: 'location',
                    reference: 'location',
                    fieldLabel: getText('Location'),
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false,
                    matchFieldWidth: false,
                    store: this.locationsStore,
                    listeners: {
                        scope: this,
                        select: 'onLocationSelected'
                    }
                }
            ]
        };
        
        var looksPanel = {
            xtype: 'panel',
            title: getText('Looks'),
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
                    xtype: 'radiogroup',
                    fieldLabel: getText('Appearance'),
                    items: [
                        { 
                            boxLabel: getText('Pin'), 
                            name: 'appearance',
                            inputValue: 'pin',
                            checked: true
                        },{ 
                            boxLabel: getText('Zone'),
                            name: 'appearance',
                            inputValue: 'zone'
                        }                       
                    ],
                    listeners:{
                        change: function( me , newValue , oldValue , eOpts ){
                        
                            if(newValue.appearance === 'zone'){
                                me.up('form').down('panel[reference=color]').setVisible(true);
                                me.up('form').down('numberfield[name=width]').setVisible(true);      
                                me.up('form').down('numberfield[name=height]').setVisible(true); 
//                                
                            }else{
                                me.up('form').down('panel[reference=color]').setVisible(false);
                                me.up('form').down('numberfield[name=width]').setVisible(false);
                                me.up('form').down('numberfield[name=height]').setVisible(false); 
                            }
                        }
                    }
                },{
                    xtype: 'panel',
                    layout: 'hbox',
                    reference: 'color',
                    hidden: true,
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
                            maxValue: lengthInRealLife - 1,
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
                            maxValue: widthInRealLife - 1,
                            step: 1,
                            decimalSeparator: ',',
                            allowDecimals: true,
                            decimalPrecision: 4,
                            allowBlank: true,
                            labelStyle: 'word-wrap: break-word;',
                            margin: '0 0 0 20'
                        }
                    ]
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    reference: 'size',
                    defaults:{
                        flex:1,
                        hidden: true
                    },
                    items:[
                        {
                            xtype: 'numberfield',
                            name: 'width',
                            fieldLabel: getText('Length'),
                            minValue: 0,
                            step: 1,
                            decimalSeparator: ',',
                            allowDecimals: true,
                            decimalPrecision: 4,
                            allowBlank: true,
                            labelStyle: 'word-wrap: break-word;'
                        },{
                            xtype: 'numberfield',
                            name: 'height',
                            fieldLabel: getText('Width'),
                            minValue: 0,
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
                    looksPanel,
                    place
                ]
            }];

        this.buttons = [{
                text: getText('Save'),
                listeners:{
                    scope: this,
                    click: function(me){
                        this.mainController.onSaveMapLocation(me);
                    }
                }
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);
    },
    
    
    onLocationSelected: function(sender){
                        
        if(this.exists()){
            Ext.Msg.show({
                title: getText('Errors'),
                message: getText('This location has already been located') + getText('!'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            this.down('combo[name=location]').setValue(null);
            return;
        }

    },
    
    
    exists: function(){
        
        var locationId = this.down('combo[name=location]').value;
        try{
            var mapLocations = this.mainController.currentMap.data.locationsLayer.mapLocations;
            for(var i=0; i<mapLocations.length; i++){
                if(mapLocations[i].location.id === locationId){
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
        
        if (!values.posX) {
            values.posX = 0;
        }

        if (!values.posY) {
            values.posY = 0;
        }
        
        var locationName = this.down('autocompleteComboBox[name=location]').getSelectedRecord().data.name;
        values.name = locationName + '_' + Date.now().toString();
        
        if(values.appearance === 'pin'){
            values.width = 0;
            values.height = 0;
            
        }else{
            if (!values.width) {
                values.width = 1;
            }
            if (!values.height) {
                values.height = 1;
            }
        }
       
        return values;
    }

});
