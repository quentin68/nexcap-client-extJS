Ext.define('Dashboard.view.consultation.calibrations.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.consultationCalibrationsMain',
    
    require:[],
    
    className: 'MainController',
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'CUR_CALIBRATION_INVENTORY', 0, false, true, true),  

    windowEdit: null,
    windowCreate: null,
    referencesSelectWindow: null,
    
    selection: null,
    
    init: function() {
        
        this.className = Ext.getClass(this).getName();
        
         this.control({
             
             // Selected item in dataGrid
            'consultationCalibrationsMain viewListGrid': {itemclick: this.onSelectItem}
                  
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
        //this.loadDetail(id, sender.selection.data.modelType);
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
            Dashboard.model.operation.Calibration.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'] error: loading failure');
                },
                success: function(record, operation) {
                    
                    console.log('calibrations: ' + record.get('material.name'));
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.operation.Calibration', response.data);
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
        //Ext.ComponentQuery.query('calibrationsDetail')[0].setData(record.data);
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
    },
    
    
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
            link= '/inventories/calibrations/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/inventories/calibrations/export';
        }
        //var link = '/inventories/calibrations/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function(){
        return   Ext.ComponentQuery.query('consultationCalibrationsMain')[0];
    }
});