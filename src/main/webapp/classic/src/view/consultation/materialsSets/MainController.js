Ext.define('Dashboard.view.consultation.materialsSets.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.consultationMaterialsSetsMain',
    
    require:[],
    
    className: 'MainController',
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'MATERIALS_SETS_INVENTORY', 0, false, true, true),  

    windowEdit: null,
    windowCreate: null,
    referencesSelectWindow: null,
    
    selection: null,
    
    init: function() {
        
        this.className = Ext.getClass(this).getName();
        
         this.control({
             
            // Selected item in dataGrid
            'consultationMaterialsSetsMain viewListGrid': {itemclick: this.onSelectItem},
            'consultationMaterialsSetsMain viewListAlbum > dataview': {itemclick: this.onSelectItem},
            'consultationMaterialsSetsMain viewListList': {itemclick: this.onSelectItem}
                  
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
                
         if (!this.getSelection()) {
            return;
        }

        var id = this.getSelection().data.id;
        Dashboard.manager.consultation.MaterialsSetsManager.getOne(id, this, 'displayDetail');
    
    },
    
    
    displayDetail: function(record){
        
        //Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('panel[reference=detail]').setData(model.data);
        var detailContainer = this.getView().down('panel[reference=detailContainer]');
        detailContainer.removeAll();
        detailContainer.add(
            {
                xtype: 'materialsSetsDetail'
            }
        );
        
        try {
            //Ext.ComponentQuery.query('materialDetail')[0].setData(record.data);
            detailContainer.down('materialsSetsDetail').setData(record.data);
        } catch (ex) {
            Dashboard.tool.Utilities.error('[materialsSets.MainController.displayDetail] error : ' + ex);
        }
    
    },
    
    cleanDetail: function (record){
        //Ext.ComponentQuery.query('materialsSetsDetail')[0].clean();
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').clean();
    },
    
    
    refresh: function (){
        var store = this.getMain().store;
        store.load();
        this.cleanDetail();
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
            link= '/materialsets/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/materialsets/export';
        }
        //var link = '/materialsets/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function(){
        return   Ext.ComponentQuery.query('consultationMaterialsSetsMain')[0];
    }
});