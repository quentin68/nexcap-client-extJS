Ext.define('Dashboard.view.settings.serverConfig.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.serverConfigMain',
    
    require:[
        'Dashboard.manager.settings.ServerConfigManager',
        'Dashboard.view.shared.imagesViewer.ThumbnailEdit',
        'Dashboard.view.shared.imagesViewer.Zoom'
    ],
    
    
    view: 'ServerConfigMain',
    
    windowEdit: null,
    windowCreate: null,
    usersSelectWindow: null,
    
    selection: null,
    
    init: function() {
        
         this.control({
                  
            // Selected item in dataGrid
            'ServerConfigMain panel': {itemclick: this.onSelectItem},
//            // Edit position window
            'serverConfigEdit button[action=save]' : {click: this.onUpdate}
          

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
    },

    onSelectItem: function(sender){
        this.selection = sender.selection;
    },  
    
    onEdit: function(sender){
       
        var raw = this.selection;
        if(!raw){
            return;
        }
         var model = Ext.create('Dashboard.model.settings.LocalServerConfig', raw.data);
         this.edit(model);
    },
    
    onUpdate: function(sender){
        var win = sender.up('window');
        this.update(win);
    },      
    
    refresh: function () {
        
	var panel = Ext.ComponentQuery.query('ServerConfigMain')[0];
        console.log(panel.items.items[0]);
	panel.items.items[0].serverConfigStore.load();
	panel.items.items[0].localServerConfig.load();
    },
    
    edit: function(model){
        var windowEdit = Ext.create('Dashboard.view.setting.serverConfig.Edit',{record:model.data});
        windowEdit.show();
    },
    
    update: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.settings.LocalServerConfig', data);
        var win = Ext.ComponentQuery.query('serverConfigEdit')[0];
        Dashboard.manager.settings.ServerConfigManager.update(model, win);        
        
    },    
  
    
    doPostEditAction: function(model){    
        var win = Ext.ComponentQuery.query('serverConfigEdit')[0];        
        win.close();        
        this.refresh();
    }
    
});