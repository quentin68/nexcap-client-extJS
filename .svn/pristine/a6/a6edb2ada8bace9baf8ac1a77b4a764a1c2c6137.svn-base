/* global Ext */

Ext.define('Dashboard.view.administration.telemetryData.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.telemetryDataMain',
    
    require:[],
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
        
         this.control({
             
             // Selected item in dataGrid
            'telemetryDataMain viewListGrid': {itemclick: this.onSelectItem},
            
            // Create window
            'telemetryDataCreate button[action=save]': {click: this.onSave},
            
            // Edit window
            'telemetryDataEdit button[action=save]': {click: this.onUpdate}
                  
        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[telemetryData.MainController.onRenderMain] configuration null or empty !');
        } 
    },
            
    onSelectItem: function(sender){
        try {
            this.selection = sender.selection;
            var id = sender.selection.data.id;
            this.loadDetail(id);
        } catch (ex) {
            // Nothing
        }
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
    
    onExportToExel: function (){
        this.exportToExel();
    },
            
            
    //==========================================================================
    //   Methods 
    //==========================================================================
    
    setFilterValues: function (){
        try {
            var main = this.getMain();
            var store = main.store;
            var filters = store.proxy.extraParams.filter; // [comparison:"EQ" / property:"name" / value:"Pince"]

            if (filters.length > 0) {
                Ext.getCmp('filtersBar').setFiltersValue(filters);
            }
        } catch (e) {
            Dashboard.tool.Utilities.error('[telemetryData.MainController.setFilterValues] Failed to load filters');
        }
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
    

    
    enableButtons: function(){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },
    
    
    loadDetail: function (){
        
        if (!this.getSelection()) {
            return;
        }

        var id = this.getSelection().data.id;
        Dashboard.manager.administration.TelemetryDataManager.getOne(id, this, 'displayDetail');
    },

    displayDetail: function (record){
        
        var detailContainer = this.getView().down('panel[reference=detailContainer]');
        detailContainer.removeAll();
        detailContainer.add(
            {
                xtype: 'telemetryDataDetail'
            }
        );
        
        try {
            //Ext.ComponentQuery.query('telemetryDataDetail')[0].setData(record.data);
            detailContainer.down('telemetryDataDetail').setData(record.data);
        } catch (ex) {
            Dashboard.tool.Utilities.error('[telemetryData.MainController.displayDetail] error : ' + ex);
        }
    },
   

    cleanDetail: function (record){
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('telemetryDataDetail').clean();
    },
    
    
    create: function(){

        this.windowCreate = Ext.create('Dashboard.view.administration.telemetryData.Create');
        this.windowCreate.show();

    },
    
    
    edit: function(model){
        this.windowEdit = Ext.create('Dashboard.view.administration.telemetryData.Edit', {record:model.data});
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
            msg: getText('Do you really want to delete ') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                   Dashboard.manager.administration.TelemetryDataManager.deleteOne(selectionId, this, 'refresh');                
                }
            }
        }); 
    },
    
    
    refresh: function (){

        var store = Ext.ComponentQuery.query('telemetryDataMain')[0].store;
        store.load();
        
    },
    
    
    save: function(win){
        
        
        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        
        var model = Ext.create('Dashboard.model.administration.TelemetryData', data);
        Dashboard.manager.administration.TelemetryDataManager.save(model, this, 'doPostSaveAction');
    },
    
    
    update: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        
        var model = Ext.create('Dashboard.model.administration.TelemetryData', data);
        Dashboard.manager.administration.TelemetryDataManager.update(model, this, 'doPostEditAction');
        
    },
    
    
    doPostSaveAction: function(model){
        
        var win = Ext.ComponentQuery.query('telemetryDataCreate')[0];
        win.close();
        this.refresh();
    },
    
    
    doPostEditAction: function(model){
        
        var win = Ext.ComponentQuery.query('telemetryDataEdit')[0];
        win.close();
        this.refresh();
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
            link= '/sensors/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/sensors/export';
        }
        //var link = '/sensors/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function (){
        return  Ext.ComponentQuery.query('telemetryDataMain')[0];
    }
    

});