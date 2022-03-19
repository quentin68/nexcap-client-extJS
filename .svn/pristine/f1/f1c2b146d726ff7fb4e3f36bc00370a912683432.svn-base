/* global Ext  */

Ext.define('Dashboard.view.system.device.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.deviceMain',
    
    require:[],
    
    className: 'MainController',
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'DEVICE_MAINTENANCE', 0, false, true, true),
    
    windowEdit: null,
    selection: null,
    positionSelectWindow: null,
    authorizeWindow: null,
    
    init: function() {
         this.control({
            'deviceMain viewListGrid': {itemclick: this.onSelectItem},
            'deviceEdit button[action=save]': { click: this.onUpdate }
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
    
    onDestroy: function(sender){
        this.doDelete();
    },
    
    onRefresh: function(sender){
        this.refresh();
    },
    
    onAuthorize: function(sender){
        this.authorize(sender);
    },
            
    onSubmitAuthorize: function(sender){
        this.submitAuthorize(sender);
    },
    
    onManage: function(sender){        
        this.getAndDisplayDevice();
    },
    
    onBan: function(sender){
        this.banDevice();
    },
    
    onEdit: function (sender){
        var record = this.getSelection();
        if (!record) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        this.edit(record);
    },
    
    onUpdate: function (sender){
        var win = sender.up('window');
        this.update(win);
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
        Dashboard.manager.system.DevicesManager.getOne(id, this, 'displayDetail');                
    },
        
    
    displayDetail: function(record){
        //Ext.ComponentQuery.query('deviceDetail')[0].setData(record.data);
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
    },
    
    
    enableButtons: function(){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },


    doDelete: function(){
        
        var selection = this.getSelection();
        
        if (selection) {
            this.confirmDelete(selection);
        }else{
           Ext.Msg.show({
                title: getText('Warning'),
                msg: getText('No element selected!'),
                icon: Ext.MessageBox.WARNING
            }); 
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
                    Dashboard.manager.system.DevicesManager.deleteOne(selectionId, this, 'refresh'); 
                    
                    try{
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'deviceDetail'
                        });
                    }catch(ex){}
                }
            }
        }); 
    },
    
    
    refresh: function (){

        var store = Ext.ComponentQuery.query('deviceMain')[0].store;
        store.load();
        
    },
    
    
    edit: function (model){
        this.windowEdit = Ext.create('Dashboard.view.system.device.Edit', {
            autoShow: false,
            record: model.data
        });
        this.windowEdit.show();
        this.windowEdit.setData(model.data);
    },
    
    
    update: function (win){

        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        var data = win.getData();
        var device = Ext.create('Dashboard.model.system.Device', data);

        Dashboard.manager.system.DevicesManager.update(device, this, 'doPostEditAction');

    },
            
    
    doPostEditAction: function(model){
        
        var win = Ext.ComponentQuery.query('deviceEdit')[0];
        win.close();
        this.refresh();
        
        var main = Ext.ComponentQuery.query('deviceMain')[0];
        var store = main.store;
        
        var record = store.getById(model.data.id);
        Dashboard.manager.system.DevicesManager.getOne(record.data.id, this, 'displayDetail');

    },
            
            
    authorize: function() {

        var selectedRow = this.getSelection();
      
        if (!selectedRow) {         
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        
        // Test if device already authorized
        if (selectedRow.data.authorized) {
            Dashboard.tool.Utilities.showAlreadyAuthorized();
            return;
        }
        
        var deviceType = selectedRow.data.deviceType;
        
        this.authorizeWindow = Ext.create('Dashboard.view.system.device.Authorize', {
            autoShow: false,
            parentController: this
        });
        
        switch (deviceType){
            case 'CABINET_XL':
            case 'CABINET_XS':
            case 'X_DRAWERS':
            case 'CABINET_XD':
            case 'CABINET_XDS':
            case 'CABINET_XLW':
            case 'NEXPORT':
            case 'READING_STATION':
                this.authorizeWindow.query('textfield[name=locationName]')[0].hidden=false;
                this.authorizeWindow.query('textfield[name=locationName]')[0].allowBlank=false;
            case 'COUNTER':                    
                this.authorizeWindow.show();
                Dashboard.tool.Utilities.trace('Event handler : display authorizeWindow');
                break;
            case 'TABLET':
            case 'EXTERNAL_SYSTEM':
            case 'IOT_GATEWAY':
                this.submitAuthorize(null);
                break;
            default:
                this.submitAuthorize(null);
        }   
    },
    

    submitAuthorize: function(event) {
        
        var selectedRow = this.getSelection();
        var selectedId = selectedRow.data.id;
        var deviceType = selectedRow.data.deviceType;
        var data = null;
        var win = Ext.ComponentQuery.query('deviceAuthorize')[0];
        
        var authorizeModel = Ext.create('Dashboard.model.system.Authorize',data);
        authorizeModel.data.id = selectedId;
        authorizeModel.data.deviceType = deviceType;
        
        if(event !== null && win){

            if (!win.down('form').isValid()) {
                win.getInvalidFields();
                return;
            }

            data = win.getData();
            
            authorizeModel = Ext.create('Dashboard.model.system.Authorize',data);
            authorizeModel.data.id = selectedId;
            authorizeModel.data.deviceType = deviceType;
        }
                
        Dashboard.manager.system.DevicesManager.authorize(authorizeModel, this, 'doPostSaveAction');
        
    },
    
    
    banDevice: function(){
        
        var selectedRow = this.getSelection();
        var selectedId = selectedRow.data.id;
        
        this.confirmBan(selectedRow);
    },
    
    
    confirmBan: function (selection){
        
        var selectionId = selection.data.id;
        
        Ext.Msg.show({
            title: getText('Ban a device'),
            msg: getText('Do you really want to ban ') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    Dashboard.manager.system.DevicesManager.banDevice(selectionId, this, 'afterBanned');
                }
            }
        }); 
    },
    
    
    afterBanned: function(id){
        
        var main = Ext.ComponentQuery.query('deviceMain')[0];
        main.getController().refresh();
        
        var store = main.store;
        var record = store.getById(id);
        Dashboard.manager.system.DevicesManager.getOne(id, main.getController(), 'displayDetail');
        
    },
            
    
    doPostSaveAction: function(model){

        var win = Ext.ComponentQuery.query('deviceAuthorize')[0];
        win.close();
        this.refresh();
        
        var store = this.getView().store;
        var record = store.getById(model.data.id);
        Dashboard.manager.system.DevicesManager.getOne(record.data.id, this, 'displayDetail');

    },
    
    
    getAndDisplayDevice: function(){
        

        if (!this.getSelection()) {
            Ext.Msg.alert(getText('Warning'), getText('No element selected'));
            return;
        }
        
        var deviceId = this.getSelection().data.id;
        Dashboard.manager.system.DevicesManager.getOne(deviceId, this, 'manageDevice'); 
    },
    
    manageDevice: function(device){
        
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        this.currentDevice = device;

        mainController.displayInMain({
            xtype: 'deviceManage',
            //store: Dashboard.manager.cartography.CartographyManager.store,
            currentDevice: device,

            configuration: {
                enabledTools: {}
            },
            feature: this.feature
        });
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
            link= '/devices/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/devices/export';
        }
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },
    
    getMain: function (){
        return  Ext.ComponentQuery.query('deviceMain')[0];
    }
    

});