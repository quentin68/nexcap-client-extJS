/*  global Ext  */

Ext.define('Dashboard.view.cartography.AddDevice', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyAddDevice',
    
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
    iconCls: 'fa fa-laptop',//'fa fa-columns',
    
    devicesStore: null,
    record: null,
    
    initComponent: function(){

        this.title = getText('Add device');
        
        this.lengthInRealLife = 0;
        this.widthInRealLife = 0;
        var data = this.mainController.currentMap.data;
        
        try{
            this.lengthInRealLife = data.geoLocArea.sizeInRealLife.width;
            this.widthInRealLife = data.geoLocArea.sizeInRealLife.height;
        }catch(ex){}
        
        this.devicesStore = Ext.create('Dashboard.store.system.Devices', {
            autoLoad: true
        });
        
        this.devicesTypesStore = Ext.create('Dashboard.store.system.DevicesTypes', {
            autoLoad: true
        });

        var characteristicsPanel = {
            xtype: 'panel',
            title: getText('Add device'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: Ext.widget('thumbnailPanel')
                },{
                    xtype: 'autocompleteComboBox',
                    name: 'device',
                    reference: 'device',
                    fieldLabel: getText('Device'),
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false,
                    matchFieldWidth: false,
                    store: this.devicesStore,
                    listeners: {
                        scope: this,
                        select: 'onDeviceSelected'
                    }
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

        this.buttons = [
            {
                text: getText('Save'),
                listeners:{
                    scope: this,
                    click: function(me){
                        this.mainController.onSaveMapDevice(me);
                    }
                }
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },
    
    
     onDeviceSelected: function(sender){
                        
        if(this.exists()){
            Ext.Msg.show({
                title: getText('Errors'),
                message: getText('This device has already been located') + getText('!'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            this.down('combo[name=device]').setValue(null);
            return;
        }
                
        var deviceTypeName = sender.getSelectedRecord().data.deviceType;
        
        var deviceType = this.devicesTypesStore.findRecord('type', deviceTypeName);
        var iconSrc = deviceType.data.iconSrc;
        
        if(iconSrc){
            this.setThumbnail(iconSrc); //'resources/images/devices/128/cabinet_xl_2d.png'
        }

    },
    
    
    setThumbnail: function(tumb){

        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var img = Ext.ComponentQuery.query('thumbnailPanel image[name=thumbnail]')[0];

        if (tumb !== null) {
            thumbnailSrc = tumb;
        }

        img.setSrc(thumbnailSrc);
    },
    
    
    exists: function(){
        
        var deviceId = this.down('combo[name=device]').value;
        try{
            var mapDevices = this.mainController.currentMap.data.devicesLayer.mapDevices;
            for(var i=0; i<mapDevices.length; i++){
                if(mapDevices[i].device.id === deviceId){
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
        
        var device = this.down('combo[name=device]').getSelectedRecord();
        var deviceTypeName = device.data.deviceType;
        var deviceType = this.devicesTypesStore.findRecord('type', deviceTypeName);
        var iconSrc = deviceType.data.iconSrc;
        
        if(iconSrc){
            values.iconSrc = iconSrc; //'resources/images/devices/128/cabinet_xl_2d.png'
        }
        
        values.name = device.data.name + '_' + Date.now().toString();

        return values;
    }

});
