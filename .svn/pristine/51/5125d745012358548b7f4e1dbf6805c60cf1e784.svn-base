/* global Ext  */

Ext.define('Dashboard.view.historic.access.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.accessMain',
    
    require:[],
    
    className: 'historic.access.MainController',
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'HISTO_ACCESS', 0, false, true, true),
    
    selection: null,
    
    init: function() {
         this.control({
            'accessMain viewListGrid': {itemclick: this.onSelectItem}
        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('['+this.className+'.onRenderMain] configuration null or empty !');
        } 
    },
            
    onSelectItem: function(sender){
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        //this.loadDetail(id);
    },
    
    onRefresh: function(sender){
        this.refresh();
    },
    
    onToggle: function(sender){
        this.toggleActivation(sender);
    },
    
    onExportToExel: function (){
        this.exportToExel();
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
    
    
    loadDetail: function(){
        
        if(!this.getSelection()){
            return;
        }
        
        var id = this.getSelection().data.id;
        var model = this.getView().store.getById(id);
        this.displayDetail(model);

    },
        
    
    displayDetail: function(record){
        //Ext.ComponentQuery.query('accessDetail')[0].setData(record.data);
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
    },
    
    
    refresh: function (selection){
        
        var store = Ext.ComponentQuery.query('accessMain')[0].store;

        store.on({
            load: {fn: 'accessDetail', scope: this, args: [selection]}
        });
        
        store.load();
    },
    
    
    cleanDetail: function (record){
        //Ext.ComponentQuery.query('accessDetail')[0].clean();
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').clean();
    },
    
    
    updateDetail: function(selection){
        
        var id = selection.data.id;
        var main = Ext.ComponentQuery.query('accessMain')[0];
        var model = main.store.getById(id);
        
        var grid = Ext.ComponentQuery.query('viewList > grid')[0];
        grid.setSelection(model);

        this.displayDetail(model);

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
            link= '/loginrecords/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/loginrecords/export';
        }
        //var link = '/loginrecords/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },
    
    getMain: function (){
        return  Ext.ComponentQuery.query('accessMain')[0];
    }

});