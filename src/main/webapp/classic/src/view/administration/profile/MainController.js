/* global Ext  */

Ext.define('Dashboard.view.administration.profile.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.profileMain',
    
    require:[],
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'PROFILE_ADMIN', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
         this.control({
             
             // Selected item in dataGrid
            'profileMain viewListGrid': {itemclick: this.onSelectItem},
            
            // Create window
            'profileCreate button[action=save]': {click: this.onSave},
            
            // Edit window
            'profileEdit button[action=save]': {click: this.onUpdate}
                  
        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[profile.MainController.onRenderMain] configuration null or empty !');
        } 
    },
            
    onSelectItem: function(sender){
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        this.loadDetail(id);
    },
    
    onCreate: function(sender){
        this.create();
    },
    
    onEdit: function(sender){
        if(this.getSelection()){
            var id = this.getSelection().data.id;
            Dashboard.manager.administration.ProfilesManager.getOne(id, this, 'edit');
        }
    },
    
    onDestroy: function(sender){
        this.doDelete();
    },
    
    onRefresh: function(sender){
        this.refresh();
    },
    
    onSave: function(sender){
        var win = sender.up('window');
        this.save(win);
    },
    
    onUpdate: function(sender){
        var win = sender.up('window');
        this.update(win);
    }, 
    
    onExportToExel: function (){
        this.exportToExel();
    },
            
            
    //==========================================================================
    //   Methods 
    //==========================================================================
    
    
    getSelection: function(){

        var selection = null;
        var viewList = this.getView().down('viewList');
        
        if(viewList){
            selection = viewList.getSelection();
        }

        if(!selection){
            return null;
        }
        
        return selection;
    },
    
    
    loadDetail: function(id){
        
        try{
            Dashboard.model.administration.Profile.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[profile.MainController] error: loading failure');
                },
                success: function(record, operation) {
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.administration.Profile', response.data);
                    this.displayDetail(model);
                },
                callback: function(record, operation, success) {
                    //do
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[profile.MainController] error: ' + err);
        }
    },
    
    
    displayDetail: function(record){
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('profileDetail').setData(record.data);
    },
    
    
    enableButtons: function(){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },
    
    
    create: function(){

        this.windowCreate = Ext.create('Dashboard.view.administration.profile.Create');
        this.windowCreate.show();
        
        if(this.getSelection()){
            var node = this.getSelection();
            this.windowCreate.setData(node.data);
        }
    },
    
    
    edit: function(model){
        this.windowEdit = Ext.create('Dashboard.view.administration.profile.Edit', {record:model.data});
        this.windowEdit.show();
        
        //this.windowEdit.setData(model.data);
    },
    
    
    doDelete: function(){
        
        var selection = this.getSelection();
        
        if (selection) {
            this.confirmDelete(selection);
        }else{
            Ext.Msg.alert(getText('Warning'), getText('No element selected'));
        }
    },
    
    
    confirmDelete: function (selection){
        
        var selectionId = selection.data.id;
        
        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete ') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    Dashboard.manager.administration.ProfilesManager.deleteOne(selectionId, this, 'refresh');  
                    
                    try{
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'profileDetail'
                        });
                    }catch(ex){}
                }
            }
        }); 
    },
    
    
    refresh: function (){

        var store = Ext.ComponentQuery.query('profileMain')[0].store;
        store.load();
        
    },
    
    
    save: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.administration.Profile', data);

        Dashboard.manager.administration.ProfilesManager.save(model, this, 'doPostSaveAction');
    },
    
    
    update: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.administration.Profile', data);

        Dashboard.manager.administration.ProfilesManager.update(model, this, 'doPostEditAction');
        
    },
    
    
    doPostSaveAction: function(model){
        
        var win = Ext.ComponentQuery.query('profileCreate')[0];
        win.close();
        this.refresh();
        this.loadDetail(model.data.id);
    },
    
    
    doPostEditAction: function(model){
        
        var win = Ext.ComponentQuery.query('profileEdit')[0];
        win.close();
        this.refresh();
        this.loadDetail(model.data.id);
    },
    
    getFilterValues: function (){
         
        var store = this.getView().down('viewList').getStore();
        var filters = store.getProxy().extraParams.filter;
        return filters || [];
    },

    exportToExel: function (){
        var filter = this.getFilterValues();
        var main = this.getMain();
        var sort = main.store.getSorters();
        var contextSelected = Dashboard.config.Config.contexts.selected;
        var link;
        if (contextSelected) {
            link= '/profiles/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/profiles/export';
        }
        //var link = '/profiles/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function (){
        return  Ext.ComponentQuery.query('profileMain')[0];
    }
    

});