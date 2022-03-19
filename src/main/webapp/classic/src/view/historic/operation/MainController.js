/* global Ext */

Ext.define('Dashboard.view.historic.operation.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.operationMain',
    
    require:[],
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'HISTO_ALL_LIST', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
        
         this.control({
                  
            // Selected item in dataGrid
            'operationMain viewListGrid': {itemclick: this.onSelectItem}

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[operation.MainController.onRenderMain] configuration null or empty !');
        } 
    },
    
    onSelectItem: function(sender){
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        //TODO enable butons
    },
    
    onRefresh: function(sender){
        this.refresh();
    },
    
    onExportToExel: function(){
        this.exportToExel();
    },
    
    //==========================================================================
    //   Methods 
    //==========================================================================
    
    
    getFilters: function(){
        var filtersList = Dashboard.manager.FiltersManager.getFiltersListByFeature(this.feature);
        return filtersList;
    },
            
    
    getFilterModels: function(){
        
        var list = [];
        
        var operationsList = this.getView().down('form[reference=filterModels]').query('checkboxfield');
        
        for(var i=0; i<operationsList.length; i++){
            if(operationsList[i].checked && !operationsList[i].hidden){
                list.push(operationsList[i].name);
            }
        }
        
        if(list.length < 1){
            return [];
        }
        
        var filter = this.buildConcatFilter('operationType', list);

        return filter;
    },
            
            
    buildConcatFilter: function(name, value){
        return {
            'property': name,
            'value': value,
            'type': 'LIST',
            'comparison': 'IN'
        };
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
            
            
    /**
     * Load filtered data from server, refresh grid and display page 1.
     */
    updateDataStore: function(action){
                        
        var store = this.getView().store;
        var filterModels = [];
        
        if(action !== 'deselectAll'){
            filterModels = this.getFilterModels();
        }
                
        if(!filterModels){
            return;
        }
        
        if(filterModels.length < 1){
            store.filterModels.value = [""] ;
        }else{
            store.filterModels = filterModels;
        }        
        
        
        // Refresh grid and display page 1
        store.loadPage(1, {           
            callback: function(records, operation, success) {
                // do something after the load finishes... Maybe !
            },
            scope: this
        });        
    },
    
    
    refresh: function (){

        var store = this.getMain().store;
        store.load();
        
    } , 
    
  
    getFilterValues: function () {
         
        var store = this.getView().down('viewList').getStore();
        var filters = store.getProxy().extraParams.filter;
        return filters || [];
    },
    
    
    getAllFilters: function () {
        var filters = this.getFilterValues();
        var operationsFilter = this.getFilterModels();
        if(operationsFilter){
            filters.push(operationsFilter);
        }
        return filters;
    },
    

    exportToExel: function () {
        
        var filter = this.getAllFilters();
        var main = this.getMain();
        var sort = main.store.getSorters();
        var contextSelected = Dashboard.config.Config.contexts.selected;
        var link;
        if (contextSelected) {
            link= '/history/operations/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/history/operations/export';
        }
        //var link = '/history/operations/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
        
    },
    
    getMain: function(){
        return   Ext.ComponentQuery.query('operationMain')[0];
    }

});