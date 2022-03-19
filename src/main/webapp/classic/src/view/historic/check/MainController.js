/* global Ext */

Ext.define('Dashboard.view.historic.check.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.checkMain',
    
    require:[],
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'HISTO_SPECIFIC_CHECK_LIST', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
         this.control({
                  
            // Selected item in dataGrid
            'checkMain viewListGrid': {itemclick: this.onSelectItem}//,
//            'checkMain viewListAlbum': {itemclick: this.onSelectItem},
//            'checkMain viewListList': {itemclick: this.onSelectItem}

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[check.MainController.onRenderMain] configuration null or empty !');
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
       if(!this.getSelection()){
            return;
        }
        var id = this.getSelection().data.specificCheckReportId;
        Dashboard.manager.historic.ChecksManager.getReport(id, this, 'displayDetail');  
    },
    
    
    displayDetail: function(record){
        //Ext.ComponentQuery.query('checkDetail')[0].setData(record.data);
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

        var store = this.getMain().store;
        store.load();
        
    },
    
    getFilterValues: function () {
         
        var store = this.getView().down('viewList').getStore();
        var filters = store.getProxy().extraParams.filter;
        return filters || [];
    },

    exportToExel: function () {
        var filter = this.getFilterValues();
        var main = this.getMain();
        var sort = main.store.getSorters();
        var contextSelected = Dashboard.config.Config.contexts.selected;
        var link;
        if (contextSelected) {
            link= '/specificCheck/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/specificCheck/export';
        }
        //var link = '/specificCheck/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function(){
        return    Ext.ComponentQuery.query('checkMain')[0];
    }
});