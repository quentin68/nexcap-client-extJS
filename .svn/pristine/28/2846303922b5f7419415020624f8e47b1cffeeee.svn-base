/*  global Ext */

Ext.define('Dashboard.view.historic.alert.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.historicAlertMain',
    
    require:[],
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'HISTO_ALERTS', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    selection: null,
    
    init: function() {
        
         this.control({
                  
            // Selected item in dataGrid
            'historicAlertMain viewListGrid': {itemclick: this.onSelectItem}

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[alert.MainController.onRenderMain] configuration null or empty !');
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

        if (viewList) {
            selection = viewList.getSelection();
        }

        if (!selection) {
            return null;
        }

        return selection;
    },
    
    
    loadDetail: function(id){
        
        if (!this.getSelection()) {
            return;
        }
        
        var id = this.getSelection().data.id;

        if (this.getSelection().data.alertType ==='LOCATION') {
            Dashboard.manager.historic.alert.LocationsAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertType ==='MATERIAL') {
            Dashboard.manager.historic.alert.ItemsAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertType ==='USER') {
            Dashboard.manager.historic.alert.UsersAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertType ==='DEVICE') {
            Dashboard.manager.historic.alert.DevicesAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertType ==='INVENTORY') {
            Dashboard.manager.historic.alert.InventoriesAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertType ==='OPERATION') {
            Dashboard.manager.historic.alert.OperationsAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertType ==='STOCK') {
            Dashboard.manager.historic.alert.StocksAlertsManager.getOne(id, this, 'displayDetail');
        }
    
        
//        try{
//            Dashboard.model.historic.Alerts.load(id, {
//                scope: this,
//                failure: function(record, operation) {
//                    Dashboard.tool.Utilities.info('[alert.MainController] error: loading failure');
//                },
//                success: function(record, operation) {
//                    
//                    console.log('alert: ' + record.get('controlName'));
//                    var response = Ext.decode(operation._response.responseText);
//                    var model = Ext.create('Dashboard.model.alerts.Alert', response.data);
//                    
//                    this.displayDetail(model);
//                    
//                },
//                callback: function(record, operation, success) {
//                    //do
//                }
//            });
//            
//        }catch(err){
//            Dashboard.tool.Utilities.error('[alert.MainController] error: ' + err);
//        }
    },
    
    
    displayDetail: function(record){
        //Ext.ComponentQuery.query('historicAlertDetail')[0].setData(record.data);
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
        var alertURL;
        switch (main.title) {
            case "Items alerts":
                alertURL = '/history/alerts/materials/' ;
            break;
            case "Alertes sur les articles":
                alertURL = '/history/alerts/materials/' ;
                break;
            case "Locations alerts":
                alertURL = '/history/alerts/locations/' ;
            break;
            case "Alertes sur les emplacements":
                alertURL = '/history/alerts/locations/' ;
                break;
            case "Devices alerts":
                alertURL = '/history/alerts/devices/' ;
            break;
            case "Alertes sur les périphériques":
                alertURL = '/history/alerts/devices/' ;
                break;
            case "Users alerts":
                alertURL = '/history/alerts/users/' ;
            break;
            case "Alertes sur les utilisateurs":
                alertURL = '/history/alerts/users/' ;
                break;
            case "Stocks alerts":
                alertURL = '/history/alerts/stocklevel/' ;
                break;
            case "Alertes sur les stocks":
                alertURL = '/history/alerts/stocklevel/' ;
                break;
            case "Inventories alerts":
                alertURL = '/history/alerts/inventories/' ;
                break;
            case "Alertes sur les inventaires":
                alertURL = '/history/alerts/inventories/' ;
                break;

        }
        if (contextSelected) {
            link= alertURL +'export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = alertURL + 'export';
        }
        //var link = '/history/alerts/operations/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function(){
        return    Ext.ComponentQuery.query('historicAlertMain')[0];
    }

});