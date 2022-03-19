/* global Ext */

Ext.define('Dashboard.view.historic.consumption.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.consumptionMain',
    
    require:[],
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'HISTO_CONSUME_LIST', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
        
         this.control({
                  
            // Selected item in dataGrid
            'consumptionMain viewListGrid': {itemclick: this.onSelectItem}//,
//            'consumptionMain viewListAlbum': {itemclick: this.onSelectItem},
//            'consumptionMain viewListList': {itemclick: this.onSelectItem}

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[consumption.MainController.onRenderMain] configuration null or empty !');
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
            Dashboard.model.historic.Consumption.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[consumption.MainController] error: loading failure');
                },
                success: function(record, operation) {
                    
                    console.log('consumption: ' + record.get('name'));
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.Consumption', response.data);
                    this.displayDetail(model);
                    
                },
                callback: function(record, operation, success) {
                    //do
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[consumption.MainController] error: ' + err)
        }
    },
    
    
    displayDetail: function(record){
        //Ext.ComponentQuery.query('consumptionDetail')[0].setData(record.data);
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
    },
    
    
    refresh: function (){

        var store = Ext.ComponentQuery.query('consumptionMain')[0].store;
        store.load();
        
    }  

});