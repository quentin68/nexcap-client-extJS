/* global Ext */

Ext.define('Dashboard.view.settings.alertsConfig.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.alertsConfigMain',
    
    require:['Dashboard.view.system.alertsConfiguration.CreateAlert'],
    
    feature: null,// Ext.create('Dashboard.store.Features').findRecord('name', 'ALERT_CONFIG_ADMIN', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
         this.control({
             // Selected item in dataGrid
            'alertsConfigMain viewListGrid': {itemclick: this.onSelectItem},
            
            // Create window
            'createAlert button[action=save]': {click: this.onSave},
            // old: 'alertsConfigCreate button[action=save]': {click: this.onSave},
            
            // Edit window
            'editAlert button[action=save]': {click: this.onUpdate}
        });
    },
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){ 
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[profile.MainController.onRenderMain] configuration null or empty !');
        } 
    },
            
    onSelectItem: function(sender){
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        this.loadDetail(id);
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
    
    onToggle: function (sender){
        this.doToggle();
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
            
    //==========================================================================
    //   Methods 
    //==========================================================================
    
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
    
    loadDetail: function (){

        if (!this.getSelection()) {
            return;
        }

        var id = this.getSelection().data.id;
       // Dashboard.manager.alerts.ItemsAlertsManager.getOne(id, this, 'displayDetail');
        this.getView().manager.getOne(id, this, 'displayDetail');
    },
    
    displayDetail: function (record){
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
    },
    
    enableButtons: function(){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },
    
    create: function(){
        // old: alertsConfig.Create
//        var featureName = this.feature.data.name;
//        
//        switch(featureName){
//            case 'SYSTEM_ALERTS_ITEMS':
          this.windowCreate = Ext.create(Dashboard.view.system.alertsConfiguration.CreateAlert);
//                break;
//            case 'SYSTEM_ALERTS_INVENTORIES':
//                this.windowCreate = Ext.create(Dashboard.view.system.alert.CreateItemAlert);
//                break;
//            case 'SYSTEM_ALERTS_STOCKS':
//                this.windowCreate = Ext.create(Dashboard.view.system.alert.CreateItemAlert);
//                break;
//            case 'SYSTEM_ALERTS_USERS':
//                this.windowCreate = Ext.create(Dashboard.view.system.alert.CreateItemAlert);
//                break;
//            case 'SYSTEM_ALERTS_LOCATIONS':
//                this.windowCreate = Ext.create(Dashboard.view.system.alert.CreateItemAlert);
//                break;
//            case 'SYSTEM_ALERTS_DEVICES':
//                this.windowCreate = Ext.create(Dashboard.view.system.alert.CreateItemAlert);
//                break;
//        }
        
        this.windowCreate.show();
        
    },
    
    edit: function(model){
        this.windowEdit = Ext.create('Dashboard.view.system.alertsConfiguration.EditAlert', {record:model.data});
        this.windowEdit.show();
        this.windowEdit.setData(model.data);
    },
    
    doToggle: function () {
        var selection = this.getSelection();
        if (selection) {
            var isActiveString = selection.data.enabled ? getText('deactivate')  : getText('activate');
            Ext.Msg.show({
                title: getText('Delete'),
                msg: getText('Do you really want to') + ' ' + isActiveString + ' "' + selection.data.name + '" ?',
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                scope: this,
                fn: function (btn) {
                    if (btn === 'yes') {
                        selection.data.enabled = !selection.data.enabled;
                        var model = Ext.create('Dashboard.model.alerts.AlertsConfiguration', selection.data); // old: Ext.create('Dashboard.model.settings.AlertsConfig', selection.data);
                        Dashboard.manager.settings.AlertsConfigManager.update(model, this, 'doPostEditAction');
                    }
                }
            });
        } else {
            Ext.Msg.alert(getText('Warning'), getText('No element selected'));
        }
    },
    
    doDelete: function () {
        var selection = this.getSelection();
        if (selection) {
            if (selection.data.number !== null && selection.data.number > 0) {
                Ext.Msg.show({
                    title: getText('Warning'),
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK,
                    msg: getText('This alert should not be deleted') + " \"" + selection.data.name + "\""
                });
            } else {
                this.confirmDelete(selection);
            }
        } else {
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
                    Dashboard.manager.settings.AlertsConfigManager.deleteOne(selectionId, this, 'refresh');                
                }
            }
        }); 
    },
    
    refresh: function (){
        var store = Ext.ComponentQuery.query('alertsConfigMain')[0].store;
        store.proxy.url = Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfiguration';
        store.load();
    },
    
    save: function(win){
        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.alerts.AlertsConfiguration', data); // old: Ext.create('Dashboard.model.settings.AlertsConfig', data);
        Dashboard.manager.settings.AlertsConfigManager.save(model, this, 'doPostSaveAction');
    },
    
    update: function(win){
        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.alerts.AlertsConfiguration', data); // old: Ext.create('Dashboard.model.settings.AlertsConfig', data);
        Dashboard.manager.settings.AlertsConfigManager.update(model, this, 'doPostEditAction');  
    },
    
    doPostSaveAction: function(model){
        var win = Ext.ComponentQuery.query('createAlert')[0];
       // old: var win = Ext.ComponentQuery.query('alertsConfigCreate')[0];
        win.close();
        this.refresh();
    },
    
    doPostEditAction: function(model){
        var win = Ext.ComponentQuery.query('editAlert')[0];
        if(win){
            win.close();
        }
        this.refresh();
    }
});