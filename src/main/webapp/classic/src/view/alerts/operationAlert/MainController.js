/* global Ext */

Ext.define('Dashboard.view.alerts.operationAlert.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.operationAlertMain',
    
    require:[],
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'CUR_ALERTS_OPERATIONS', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
        
        var viewList = this.getView().down('viewList');
        if (viewList) {
            var btnAck = viewList.down('button[handler=onAcknowledged]');
            if (Dashboard.manager.FeaturesManager.isEnabled('ALERT_ACKNOWLEDGMENT') === false && btnAck) {
                btnAck.hidden = true;
            }
        }
        
        this.control({
                  
            // Selected item in dataGrid
            'operationAlertMain viewListGrid': {itemclick: this.onSelectItem}

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[operationAlert.MainController.onRenderMain] configuration null or empty !');
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
            
    onAcknowledged: function(sender){
        this.acknowledge();
    },
    
    onExportToExel: function () {
        this.exportToExel();
    },

    //==========================================================================
    //   Methods 
    //==========================================================================
    getFilterValues: function () {
         
        var store = this.getView().down('viewList').getStore();
        var filters = store.getProxy().extraParams.filter;
        return filters || [];
    },

    exportToExel: function () {
        var filter = this.getFilterValues();
        var main = this.getMain();
        var sort = main.store.getSorters();
        var link = '/alerts/operations/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function () {
        return  Ext.ComponentQuery.query('operationAlertMain')[0];
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
            
    
    loadDetail: function(){
        
        if(!this.getSelection()){
            return;
        }
        
        var id = this.getSelection().data.id;
        Dashboard.manager.alerts.OperationsAlertsManager.getOne(id, this, 'displayDetail');                
    },
    
    
    displayDetail: function(record){
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('operationAlertDetail').setData(record.data);
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

        var store = Ext.ComponentQuery.query('operationAlertMain')[0].store;
        store.load();
        
    },
            
            
    acknowledge: function(){

        var selectedRaw = this.getSelection();
        
        if (selectedRaw.data.acknowledged) {  
            this.showAlertAlreadyAcknowledged();
            return;
        }
        
        var model = Ext.create('Dashboard.model.alerts.OperationAlert', selectedRaw.data);
        
        Dashboard.manager.alerts.OperationsAlertsManager.acknowledgeAlert(model, this, 'refresh');
    },
            
            
    /**
    * If a user try to acknowledged a resolevd alert
    */
   showAlertResolved: function(){         
       Ext.Msg.alert({
            title:getText('Warning'),
            msg: getText('Alert already resolved!'),
            icon: Ext.Msg.WARNING
       });         
   },

   /**
    * If a user try to acknowledged an already acknowledged alert
    */
   showAlertAlreadyAcknowledged: function(){         
       Ext.Msg.alert({
            title:getText('Warning'),
            msg: getText('Alert already akcnowledged!'),
            icon: Ext.Msg.WARNING
       });         
   }

});