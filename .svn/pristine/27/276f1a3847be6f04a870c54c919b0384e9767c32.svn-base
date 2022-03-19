/*  global Ext  */

Ext.define('Dashboard.view.cartography.EditLocation', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyEditLocation',
    
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
    currentMap: null,
    
    initComponent: function(){

        this.title = getText('Edit location');
        
        this.locationsStore = Ext.create('Dashboard.store.administration.Locations', {
            autoLoad: true
        });
        
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
                            inputValue: 'pin'
                        },{ 
                            boxLabel: getText('Zone'),
                            name: 'appearance',
                            inputValue: 'zone'
                        }                       
                    ],
                    listeners:{
                        change: function( me , newValue , oldValue , eOpts ){
                        
                            if(newValue.appearance === 'zone'){
                                me.up('form').down('panel[reference=place]').setVisible(true);
                                me.up('form').down('panel[reference=color]').setVisible(true);
//                                me.up('form').down('numberfield[name=width]').setVisible(true);      
//                                me.up('form').down('numberfield[name=height]').setVisible(true); 
//                                
                            }else{
                                me.up('form').down('panel[reference=place]').setVisible(false);
                                me.up('form').down('panel[reference=color]').setVisible(false);
//                                me.up('form').down('numberfield[name=width]').setVisible(false);
//                                me.up('form').down('numberfield[name=height]').setVisible(false); 
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
            title: getText('Size'),
            bodyPadding: 20,
            ui: 'form-panel',
            reference: 'place',
            hidden: true,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: getText('Unit'),
                    value: getText('Meter')
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    reference: 'size',
                    defaults:{
                        flex:1//,
                        //hidden: true
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
                    looksPanel,
                    place
                ]
            }];

        this.buttons = [{
                text: getText('Save'),
                listeners:{
                    scope: this,
                    click: function(me){
                        this.mainController.onEditMapLocation(me);
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
                
        if(!data.width && !data.height){
            data.appearance = 'pin';
        }

        if(data.color){
            this.down('field[name=color]').setValue(data.color);
            this.down('panel[reference=colorRec]').setBodyStyle({
                background: data.color
            });
        }
        
        if(data.appearance !== 'pin'){
            
            this.down('radio[inputValue=zone]').setValue(true);
            
            this.down('panel[reference=place]').setVisible(true);
            this.down('panel[reference=color]').setVisible(true);
            
            var widthInMeter = data.width * this.currentMap.data.geoLocArea.sizeInRealLife.width;
            var heightInMeter = data.height * this.currentMap.data.geoLocArea.sizeInRealLife.height;
            
            this.down('numberfield[name=width]').setValue(widthInMeter);
            this.down('numberfield[name=height]').setValue(heightInMeter);
        }else{
            this.down('radio[inputValue=pin]').setValue(true);
        }

    },
    
            
    getData: function(){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues(false, false, false, true);

        
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
            this.record.data.color = values.color ;
        }
        
        this.record.data.appearance = values.appearance ;
        this.record.data.width = values.width ;
        this.record.data.height = values.height ;
       
        return this.record.data;
    }

});
