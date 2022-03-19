/*  global Ext  */

Ext.define('Dashboard.view.operation.receivings.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.operationReceivingsMain',
    
    require:[],
    
    className: 'MainController',
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'OP_RECEIVE', 0, false, true, true),  

    windowEdit: null,
    windowCreate: null,
    referencesSelectWindow: null,
    
    selection: null,
    
    init: function() {
        
        this.className = Ext.getClass(this).getName();
        
         this.control({
             
             // Selected item in dataGrid
            'operationReceivingsMain viewListGrid': {itemclick: this.onSelectItem},
            
            // Create window
            'receivingsCreate button[action=save]': {click: this.onSave}
                  
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
            
    onCreate: function(sender){
        this.create();
    },
            
    onSave: function(sender){
        var win = sender.up('window');
        this.save(win);
    },
    
    onExportToExel: function(){
        this.exportToExel();
    },
            
    //==========================================================================
    //   Methods 
    //==========================================================================
    
    create: function(){
        
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();

        this.windowCreate = Ext.create('Dashboard.view.operation.receivings.Create',{currentUser: currentUser});
        this.windowCreate.show();

    },
    
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
    
    
    loadDetail: function(id){
        
        try{
            Dashboard.model.operation.Receiving.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'] error: loading failure');
                },
                success: function(record, operation) {
                    
                    console.log('receiving: ' + record.get('material.name'));
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.operation.Receiving', response.data);
                    this.displayDetail(model);
                    
                },
                callback: function(record, operation, success) {
                    //do
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('['+this.className+'] error: ' + err);
        }
    },
    
    
    displayDetail: function(record){
        //Ext.ComponentQuery.query('receivingsDetail')[0].setData(record.data);
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
    },
    
    
    refresh: function (){
        var store = this.getMain().store;
        store.load();
    },
            
            
    save: function(win){

        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var data = win.getData();
        
        var identified = win.down('radio[name=identifiedItem]').checked;
        
        if(identified){
            Dashboard.manager.operation.ReceivingsManager.saveMaterialsList(data, this, 'doPostSaveAction');
        }else{
            Dashboard.manager.operation.ReceivingsManager.saveMaterialsSetsList(data, this, 'doPostSaveAction');
        }

    },
    
    
    doPostSaveAction: function(model){
        
        var win = Ext.ComponentQuery.query('receivingsCreate')[0];
        win.close();
        this.refresh();
    },
    
    getFilterValues: function () {
         
        var store = this.getView().down('viewList').getStore();
        var filters = store.getProxy().extraParams.filter;
        return filters || [];
    },

    exportToExel: function () {
        var filter = this.getFilterValues();
        filter.push({
            'property': 'operationType',
            'value': ['RECEIVE'],
            'type': 'LIST',
            'comparison': 'IN'
        });
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
        return  Ext.ComponentQuery.query('operationReceivingsMain')[0];
    }
    
});