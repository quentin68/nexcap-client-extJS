Ext.define('Dashboard.view.settings.serverConfig.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'ServerConfigMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',  
        'Dashboard.view.settings.serverConfig.serverConfigGridPanel',
        'Dashboard.view.settings.serverConfig.MainController'
    ],
  
    controller: 'serverConfigMain',
    feature: null,
    
    iconCls : 'fa fa-wrench', 
    border: false,
    heigth: '100%',
    layout: 'fit',

    listeners:{
        render: 'onRenderMain'
    },   
    
    defaults:{
        heigth: '100%'
    },
    
    initComponent: function() {   
        
        this.title = getText('Server configuration');
    
        this.items = [

            {   
              xtype: 'serverConfigGridPanel'

            }
        ];

    this.callParent(arguments);
    }
    
    
});