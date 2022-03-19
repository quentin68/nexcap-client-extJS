/* global Ext  */

Ext.define('Dashboard.view.system.serverLogs.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.serverLogsMain',
    
    require:[
        'Dashboard.manager.system.ServerLogsManager'
    ],
    
    feature:  Ext.create('Dashboard.store.Features').findRecord('name', 'LOG_SERVER', 0, false, true, true), 
    
    view: 'serverLogsMain',
    
    selection: null,
    
    init: function() {
         this.control({
                  
            // Selected item in tree
            'serverLogsMain treepanel': {itemclick: this.onSelectItem, itemdblclick: this.downLoadFile  }

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[position.MainController.onRenderMain] configuration null or empty !');
        } 
    },

    onSelectItem: function(sender){
        this.selection = sender.selection;
    },
    
    
    onRefresh: function(sender){
        this.refresh();
    },
    
    onLoad: function(){
        //Dashboard.manager.administration.FilesManager.loadFile(url, fileName, filePath);
    },
    
    onLoadLast: function(){
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/logging/current';
        Dashboard.manager.administration.FilesManager.loadFile(url);
        
    },
    
    onLoadAll: function(){
        
        Ext.Msg.show({
            title: getText('Warning'),
            msg: getText('Be careful, this action can take a while!'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            scope: this,
            fn: function (btn){
                if (btn === 'yes') {
                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/logging/archive'; 
                    Dashboard.manager.administration.FilesManager.loadFile(url);
                }
            }
        });
                
    },
    
    //==========================================================================
    //   Methods 
    //==========================================================================
     
    getSelection: function(){
        
        var treePanel = this.getView().lookupReference('treePanel');
        var selection = treePanel.selection;
        
        if(!selection){
            return null;
        }
        
        return selection;
    },
    
    
    downLoadFile: function( me, record, item, index, e, eOpts){
                
        if(record.data.file !== true){
            return;
        }
        
        var fileName = record.data.name;
        var url = record.data.url;        
        
        Dashboard.manager.administration.FilesManager.loadFile(url, fileName, this.getView());
        
    },
        

    refresh: function (){
        var store = Ext.ComponentQuery.query('positionTree treepanel')[0].getStore();
        store.load();
    }
    
});