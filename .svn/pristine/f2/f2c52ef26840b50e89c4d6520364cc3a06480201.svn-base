Ext.define('Dashboard.view.settings.serverConfig.serverConfigGridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'serverConfigGridPanel',
    requires: [
        'Dashboard.tool.Utilities'
    ],
    cls: 'view-list',
    config:{
        serverConfigStore: Ext.create('Dashboard.store.settings.ServerConfig',{
            autoLoad: false
        }),
        localServerConfig: Ext.create('Dashboard.store.settings.LocalServerConfig')
    },
    
    initComponent: function() {
        
       this.getServerConfigStore().on('load', this.onServerConfigLoaded, this);
       this.getServerConfigStore().load();

        var me = this;        
        Ext.apply( me, {
            
            store: this.getLocalServerConfig(),
            border: true,
            
            dockedItems: [                
                {
                    xtype: 'toolbar',
                    defaults:{
                        xtype: 'button',
                        scale: 'small',
                        ui: 'view-list',
                        border: false,
                        hidden: false
                    },
                    items: [
              {
                            reference: 'edit',
                            iconCls: 'fa fa-pencil',
                            tooltip: getText('Edit'),
                            handler: 'onEdit'
                        }
                    ]
                    
                }
            ],
            
            features: [{
            id: 'group',
            ftype: 'groupingsummary', //grouping
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true
          }],
            
            columns: {
                items: [                   
                    {
                        text: getText('Domain'), 
                        dataIndex: 'domain', 
                        flex: 1
                    },{
                        text: getText('Key'), 
                        dataIndex: 'key',
                        flex: 1
                        
                    },{
                        text: getText('Value'), 
                        dataIndex: 'value',
                        flex: 2,
                        renderer : function(val, metaData, record) {
                           
                            if (record.get('typeData') === 'featuresConfig') {
                                var newVal = '';
                                Ext.Object.each(val, function(key, value, myself) {
                                        newVal += key + ": " + value + "</br>";
                                    });
                                    return newVal;
                            } 
                            return val;
                        }
                    }
                ]
            }
            

        } );

        this.callParent(arguments);
    },
    
    onServerConfigLoaded: function(){
       
        this.getLocalServerConfig().clearData();
        var records = this.getServerConfigStore().getRange();

        if(records.length > 0){
            if(records.length > 0){
                for(var j=0; j<records.length; j++ ){
                   this.getLocalServerConfig().add(this.getData(records[j]));
                }
            }
        }
        
    },
    
    getData: function(record){
        var list = [];
        
         Ext.Object.each(record.data, function(domain, properties, myself) {
             if(domain !== 'id' && domain !== 'specificCheck'){
                  Ext.Object.each(properties, function(key, value, myself) {
                        var typeData = null;
                        switch (key){ 
                            case 'features':
                                            typeData= 'featuresConfig';
                                            break;
                            case 'pdaSessionTimeout':  
                                            typeData = 'integer';
                                            break;
                            case 'webSessionTimeout': 
                                             typeData = 'integer';
                                             break;
                            case 'intervalForExpirationAlert' : 
                                             typeData = 'integer';
                                             break;
                            case 'passwordHistorySize' : 
                                             typeData = 'integer';
                                             break;
                            case 'loginAttempsBeforeDesactivation' : 
                                             typeData = 'integer';
                                             break;  
                            case 'passwordValidityDuration' : 
                                             typeData = 'integer';
                                             break;
                            case 'managedMaterialFields':
                                            value = JSON.stringify(value);
                                            typeData = 'string';
                                            break;
                            case 'managedProductReferenceFields':
                                            value = JSON.stringify(value);
                                            typeData = 'string';
                                            break;
                            default:
                                 typeData = 'string';                                 
                        };
                        list.push({domain: domain, key: key, value:value, typeData: typeData });            
                });
             }
         });
         
        return list;
    }

});   