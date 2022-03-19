
Ext.define('Dashboard.view.setting.webClient.GlobalConfiguration', {
    extend: 'Ext.window.Window',
    xtype: 'webClientGlobalConfiguration',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Ux.ComboBox'
    ],
    
    controller: 'webClientMain',
    

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    closeAction : 'destroy',
    height: 450,
    iconCls: 'fa fa-wrench',
    plain : true,
    autoScroll: true,
    scrollable:'y',
    
    record: null,

    initComponent: function() {
        
        this.title = getText('Client web global configuration');
        
        var userProperties = Dashboard.manager.administration.UsersManager.getConfigurableProperties(); 
        
        this.localPropertiesStore = Ext.create('Dashboard.store.properties.LocalProperties',{
            autoLoad: false
        });
        
        Ext.each(userProperties, function(property){
            this.localPropertiesStore.add(property);
        }, this);
        
        this.dynamicPropertiesStore = Ext.create('Dashboard.store.properties.Properties', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    var myFilter = {
                        property: 'propertyConfigurationType',
                        value: 'USER',
                        type: 'ENUM',
                        comparison: 'EQ'
                    };

                    store.getProxy().extraParams.filter.push(myFilter);
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                                        
                    this.updateUserProperties(store.getData());
                }
            }
        });
        
        this.propertiesStore = Ext.create(Ext.data.Store, {
            fields : [ 'name', 'label', 'type']
        });
        
        var characteristicsPanel = Ext.create('Ext.panel.Panel',{
            border: false,
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'combobox',
                    name: 'userProperty',
                    reference: 'userProperty',
                    fieldLabel: getText('Displayed user property'),
                    displayField: 'label',
                    valueField: 'name',
                    allowBlank: false,
                    queryParam: false, //to remove param "query"
                    matchFieldWidth: false,
                    store: this.localPropertiesStore
                }            
            ]
        });


        this.items = [ 
            {  
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width : 450,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable:'y',
                
                defaults:{
                    bodyPadding: 20,
                    ui: 'form-panel'
                },
                
                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },
                
                items : [
                    characteristicsPanel
                ]
            }
        ];
        
        
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
        
        this.setData(this.record);

    },
    
    
    updateUserProperties: function(data){
        
        Ext.each(data.items, function(property){
            
            if(property.data.type === 'STRING'){
                this.localPropertiesStore.add(property);
            }
            
        }, this);
        
    },
    
    
    setData: function(data){
        
        var userProperty = this.down('combobox[reference=userProperty]');
        userProperty.setValue(data.userProperty);
        
    },


    getData: function(){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues(); 
        
        return values;
    }
});   