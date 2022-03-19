Ext.define('Dashboard.view.cartography.LayersDisplaying', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyLayersDisplaying',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    mainController: null,
    
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 390,
    iconCls: 'fa fa-eye',
    plain: true,
    autoScroll: true,
    scrollable: 'y',
    
    record: null,
    
    listeners: {
       beforeclose: function(){
           this.mainController.onCloseLayersDisplaying(this);
       }
    },
    
    initComponent: function(){
        
        this.title = getText('Layers management');

        this.items = [{
                xtype: 'form',
                border: false,
                width: 280,
                frame: true,
                referenceHolder: true,
                autoScroll: false,
                bodyPadding: 30,
                defaults: {
                    xtype: 'checkboxfield',
                    listeners:{
                        scope:this,
                        change:function(me){
                            this.mainController.onChangeLayerVisibility(me);
                        }
                    }
                },

                items: [
                    {
                        boxLabel  : getText('Labels'),
                        name      : 'labels',
                        checked   : true
                    }, {
                        boxLabel  : getText('Items'),
                        name      : 'materials',
                        checked   : true
                    }, {
                        boxLabel  : getText('Devices'),
                        name      : 'devices',
                        checked   : true
                    }, {
                        boxLabel  : getText('Links'),
                        name      : 'links',
                        checked   : true
                    }, {
                        boxLabel  : getText('Locations'),
                        name      : 'locations',
                        checked   : true
//                    }, {
//                        boxLabel  : getText('Reference zone'),
//                        name      : 'referenceArea',
//                        checked   : true
                    }, {
                        boxLabel  : getText('Map'),
                        name      : 'map',
                        checked   : true
                    }
                ]
            }];

        this.buttons = [
            {
                text: getText('Ok'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);

    }, 
            
            
   setData: function(data){
              
        this.down('checkboxfield[name=map]').setValue(data.map);
        this.down('checkboxfield[name=materials]').setValue(data.materials);
        this.down('checkboxfield[name=locations]').setValue(data.locations);
        this.down('checkboxfield[name=devices]').setValue(data.devices);
        this.down('checkboxfield[name=links]').setValue(data.links);
        this.down('checkboxfield[name=labels]').setValue(data.labels);
   },
   
            
    getData: function(){

        var values = {
            map: this.down('checkboxfield[name=map]').getValue('checked'),
            materials: this.down('checkboxfield[name=materials]').getValue('checked'),
            locations: this.down('checkboxfield[name=locations]').getValue('checked'),
            devices: this.down('checkboxfield[name=devices]').getValue('checked'),
            links: this.down('checkboxfield[name=links]').getValue('checked'),
            labels: this.down('checkboxfield[name=labels]').getValue('checked')
        };

        return values;
    }

});