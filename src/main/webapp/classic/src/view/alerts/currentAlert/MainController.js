/* global Ext */

Ext.define('Dashboard.view.alerts.currentAlert.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.currentAlertMain',

    require: [],

    feature: null, //Ext.create('Dashboard.store.Features').findRecord('name', 'CUR_ALERTS_ITEMS', 0, false, true, true),
    windowEdit: null,
    windowCreate: null,
    selection: null,

    init: function (){
        
        var viewList = this.getView().down('viewList');
        if (viewList) {
            var btnAck = viewList.down('button[handler=onAcknowledged]');
            if (Dashboard.manager.FeaturesManager.isEnabled('ALERT_ACKNOWLEDGMENT') === false && btnAck) {
                btnAck.hidden = true;
            }
        }
        
        this.control({
            'currentAlertMain viewListGrid': {
                itemclick: this.onSelectItem
            }
        });
    },
    //==========================================================================
    //   Event handlers
    //==========================================================================

    onRenderMain: function (sender){

        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[currentAlert.MainController.onRenderMain] configuration null or empty !');
        }
    },
    onSelectItem: function (sender){
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        this.loadDetail(id);
    },
    onRefresh: function (sender){
        this.refresh();
    },
    
    onAcknowledged: function(sender){
        //this.acknowledge();
        this.displayAcknowledgmentWindow();
    },

    onExportToExel: function (){
        this.exportToExel();
    },

    //==========================================================================
    //   Methods 
    //==========================================================================
    
    
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
            link= '/alerts/items/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/alerts/items/export';
        }

       // var link = '/alerts/items/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function (){
        return  Ext.ComponentQuery.query('currentAlertMain')[0];
    },

    getFilters: function (){
        var filtersList = Dashboard.manager.FiltersManager.getFiltersListByFeature(this.feature);
        return filtersList;
    },
    
    getSelection: function (){

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
    
    loadDetail: function (){

        if (!this.getSelection()) {
            return;
        }

        var id = this.getSelection().data.id;
       // console.log("selection",this.getSelection().data);
        if (this.getSelection().data.alertConfiguration.alertType ==='LOCATION') {
            Dashboard.manager.alerts.LocationsAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertConfiguration.alertType ==='MATERIAL') {
            Dashboard.manager.alerts.CurItemsAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertConfiguration.alertType ==='USER') {
            Dashboard.manager.alerts.UsersAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertConfiguration.alertType ==='DEVICE') {
            Dashboard.manager.alerts.DevicesAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertConfiguration.alertType ==='INVENTORY') {
            Dashboard.manager.alerts.InventoriesAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertConfiguration.alertType ==='OPERATION') {
            Dashboard.manager.alerts.OperationsAlertsManager.getOne(id, this, 'displayDetail');
        }
        else if (this.getSelection().data.alertConfiguration.alertType ==='STOCK') {
            Dashboard.manager.alerts.StocksAlertsManager.getOne(id, this, 'displayDetail');
        }
    },
    
    displayDetail: function (record){
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

        var store = Ext.ComponentQuery.query('currentAlertMain')[0].store;
        store.load();

    },
    
    
    displayAcknowledgmentWindow: function(){
        
        var selectedRaw = this.getSelection();
        if (selectedRaw.data.isAcknowledged) {
            this.showAlertAlreadyAcknowledged();
            return;
        }
        
        this.acknowledgmentWindowExt = Ext.create('Dashboard.view.alerts.AcknowledgmentWindow',{
            record: selectedRaw.data
        });
        
        this.acknowledgmentWindowExt.down('button[action=save]').on('click', function (me) {
            this.acknowledge(me);
        }, this);
        
        this.acknowledgmentWindowExt.show();
       
    },
            
            
    acknowledge: function(sender){
        
        var win = sender.up('window');
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
                
        var data = win.getData();

        if (data.alertConfiguration.alertType ==='LOCATION') {
            var model = Ext.create('Dashboard.model.alerts.LocationAlert', data);
            Dashboard.manager.alerts.LocationsAlertsManager.acknowledgeAlert(model,this,'refresh');
        }
        else if (data.alertConfiguration.alertType ==='MATERIAL') {
            var model = Ext.create('Dashboard.model.alerts.ItemAlert', data);
            Dashboard.manager.alerts.CurItemsAlertsManager.acknowledgeAlert(model,this,'refresh');
        }
        else if (data.alertConfiguration.alertType ==='USER') {
            var model = Ext.create('Dashboard.model.alerts.UserAlert', data);
            Dashboard.manager.alerts.UsersAlertsManager.acknowledgeAlert(model,this,'refresh');
        }
        else if (data.alertConfiguration.alertType ==='DEVICE') {
            var model = Ext.create('Dashboard.model.alerts.DeviceAlert', data);
            Dashboard.manager.alerts.DevicesAlertsManager.acknowledgeAlert(model,this,'refresh');
        }
        else if (data.alertConfiguration.alertType ==='INVENTORY') {
            var model = Ext.create('Dashboard.model.alerts.InventoryAlert', data);
            Dashboard.manager.alerts.InventoriesAlertsManager.acknowledgeAlert(model,this,'refresh');
        }
        // else if (data.alertConfiguration.alertType ==='OPERATION') {
        //     var model = Ext.create('Dashboard.model.alerts.OperationAlert', data);
        //     Dashboard.manager.alerts.IventoriesAlertsManager.acknowledgeAlert(model,this,'refresh');
        // }
        else if (data.alertConfiguration.alertType ==='STOCK') {
            var model = Ext.create('Dashboard.model.alerts.StockAlert', data);
            Dashboard.manager.alerts.StocksAlertsManager.acknowledgeAlert(model,this,'refresh');
        }

       // var ack_model = this.getView();
      //  Dashboard.manager.alerts.LocationsAlertsManager.acknowledgeAlert(model,this,'refresh');

        win.close();
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
            msg: getText('Alert already acknowledged!'),
            icon: Ext.Msg.WARNING
       });         
   }

});