/* global ext */

Ext.define('Dashboard.view.administration.stocks.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.stocksMain',
    
    require:[],
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
        
         this.control({
             
             // Selected item in dataGrid
            'stocksMain viewListGrid': {itemclick: this.onSelectItem},
            
            // Create window
            'stocksCreate button[action=save]': {click: this.onSave},
            
            // Edit window
            'stocksEdit button[action=save]': {click: this.onUpdate}
                  
        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[stocks.MainController.onRenderMain] configuration null or empty !');
        } 
    },
            
    onSelectItem: function(sender){
        this.selection = sender.selection;
    },
    
    onCreate: function(sender){
        this.create();
    },
    
    onEdit: function(sender){
        var model = this.getSelection();
        if(model){
           this.edit(model);
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
            
            
    //==========================================================================
    //   Methods 
    //==========================================================================
    
    
    getFilters: function(){
        
        var filtersList = Dashboard.manager.FiltersManager.getFiltersListByFeature(this.feature);
        return filtersList;
    },
    
    
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
    

    
    
    enableButtons: function(){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },
    
    
    create: function(){

        this.windowCreate = Ext.create('Dashboard.view.administration.stocks.Create');
        this.windowCreate.show();

    },
    
    
    edit: function(model){
        this.windowEdit = Ext.create('Dashboard.view.administration.stocks.Edit', {record:model.data});
        this.windowEdit.show();
        
    },
    
    
    doDelete: function(){
        
        var selection = this.getSelection();
        if (selection) {
            this.confirmDelete(selection);
        }else {
            Ext.Msg.alert(getText('Warning'), getText('No element selected'));
        }
    },
    
    
    confirmDelete: function (selection){
        
        var selectionId = selection.data.id;
        
        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete ') + " \"" + selection.data.productCategoryName +" _ " + selection.data.productReferenceCode + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                   Dashboard.manager.administration.StocksManager.deleteOne(selectionId, this, 'refresh');                
                }
            }
        }); 
    },
    
    
    refresh: function (){

        var store = Ext.ComponentQuery.query('stocksMain')[0].store;
        store.load();
        
    },
    
    
    save: function(win){
        
        
        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        // Test if levels are conform        
        if (!this.areLevelsValuesConform(data)) {          
            Ext.Msg.alert(getText('Warning'), getText('The lower threshold must be less than or equal to the upper threshold.'));
            return;
        }
        
        var model = Ext.create('Dashboard.model.administration.StocksCreate', data);
        Dashboard.manager.administration.StocksManager.save(model, this, 'doPostSaveAction');
    },
    
    
    update: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        // Test if levels are conform        
        if (!this.areLevelsValuesConform(data)) {          
            Ext.Msg.alert(getText('Warning'), getText('The lower threshold must be less than or equal to the upper threshold.'));
            return;
        }
        
        var model = Ext.create('Dashboard.model.administration.StocksCreate', data);
        Dashboard.manager.administration.StocksManager.update(model, this, 'doPostEditAction');
        
    },
    
    
    /**
     * Check if levels values are conform
     * @param data
     */
    areLevelsValuesConform: function(data){         
        
        if (parseInt(data.minLevel) > parseInt(data.maxLevel)){ 
            return false; 
        } else {
            return true;
        }     
    },
    
    doPostSaveAction: function(model){
        
        var win = Ext.ComponentQuery.query('stocksCreate')[0];
        win.close();
        this.refresh();
    },
    
    
    doPostEditAction: function(model){
        
        var win = Ext.ComponentQuery.query('stocksEdit')[0];
        win.close();
        this.refresh();
    }
    

});