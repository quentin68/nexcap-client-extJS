/* global Ext */

Ext.define('Dashboard.view.historic.movement.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.movementMain',
    
    require:[],
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'HISTO_ALL_LIST', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
        
         this.control({
                  
            // Selected item in dataGrid
            'movementMain viewListGrid': {itemclick: this.onSelectItem}//,
//            'movementMain viewListAlbum': {itemclick: this.onSelectItem},
//            'movementMain viewListList': {itemclick: this.onSelectItem}

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[movement.MainController.onRenderMain] configuration null or empty !');
        } 
    },
    
    onSelectItem: function(sender){
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        this.loadDetail(id);
    },
    
    onRefresh: function(sender){
        this.refresh();
    },
    
    
    //==========================================================================
    //   Methods 
    //==========================================================================
    
    
    getFilters: function(){
        var filtersList = Dashboard.manager.FiltersManager.getFiltersListByFeature(this.feature);
        return filtersList;
    },
    
    
    getSelection: function(){
        
        var list = this.getView().lookupReference('mainListContainer').down('panel');
        var selection = null;
        
        if(list){
            selection = list.selection;
        }else{
            selection = this.selection; //TODO use real selection and delete global
        }
        
        if(!selection){
            return null;
        }
        
        return selection;
    },
    
    
    loadDetail: function(id){
        
        try{
            Dashboard.model.historic.Movement.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[movement.MainController] error: loading failure');
                },
                success: function(record, operation) {
                    
                    console.log('movement: ' + record.get('name'));
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.Movement', response.data);
                    this.displayDetail(model);
                    
                },
                callback: function(record, operation, success) {
                    //do
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[movement.MainController] error: ' + err)
        }
    },
    
    
    displayDetail: function(record){
        //Ext.ComponentQuery.query('movementDetail')[0].setData(record.data);
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
    },
    
    
//    enableButtons: function(){
//        this.getView().lookupReference('createButton').setDisabled(true);
//        this.getView().lookupReference('editButton').setDisabled(true);
//        this.getView().lookupReference('deleteButton').setDisabled(true);
//        
//        this.getView().lookupReference('createButton').setVisible(false);
//        this.getView().lookupReference('editButton').setVisible(false);
//        this.getView().lookupReference('deleteButton').setVisible(false);
//    },

    
    refresh: function (){

        var store = Ext.ComponentQuery.query('movementMain')[0].store;
        store.load();
        
    }  

});