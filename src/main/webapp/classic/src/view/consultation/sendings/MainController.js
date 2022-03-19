Ext.define('Dashboard.view.consultation.sendings.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.consultationSendingsMain',
    
    require:[],
    
    className: 'MainController',
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'CUR_SEND_INVENTORY', 0, false, true, true),  

    windowEdit: null,
    windowCreate: null,
    referencesSelectWindow: null,
    
    selection: null,
    
    init: function() {
        
        this.className = Ext.getClass(this).getName();
        
         this.control({
             
             // Selected item in dataGrid
            'consultationSendingsMain viewListGrid': {itemclick: this.onSelectItem}
                  
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
            Dashboard.model.administration.Sending.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'] error: loading failure');
                },
                success: function(record, operation) {
                    
                    console.log('sendings: ' + record.get('material.name'));
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.operation.Sending', response.data);
                    this.displayDetail(model);
                    
                },
                callback: function(record, operation, success) {
                    //do
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('['+this.className+'] error: ' + err)
        }
    },
    
    
    displayDetail: function(record){
        //Ext.ComponentQuery.query('sendingsDetail')[0].setData(record.data);
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
            link= '/inventories/sendings/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/inventories/sendings/export';
        }
        //var link = '/inventories/sendings/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function(){
        return  Ext.ComponentQuery.query('consultationSendingsMain')[0];
    }
});