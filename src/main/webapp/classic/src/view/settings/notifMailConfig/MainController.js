/* global Ext  */

Ext.define('Dashboard.view.settings.notifMailConfig.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.notifMailConfigMain',
    
    require:[],
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'EMAIL_SENDERS_ADMIN', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
        
         this.control({
             
             // Selected item in dataGrid
            'notifMailConfigMain viewListGrid': {itemclick: this.onSelectItem},
            
            // Create window
            'notifMailConfigCreate button[action=save]': {click: this.onSave},
            
            // Send mail window
            'notifMailConfigCreate button[action=send]': {click: this.onSend},
            
            // Edit window
            'notifMailConfigEdit button[action=save]': {click: this.onUpdate},
            
            // Send mail window
            'notifMailConfigEdit button[action=send]': {click: this.onSend}
                  
        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onAddNewColumn: function(){
        this.showCreateColumnWindow();
    },
    
    onAddNewColumnEntry: function (sender) {
        
        var form = sender.up('window').down('form').getForm();

        if (!form.isValid()) {
            Ext.Msg.show({
                title: getText('Warning'),
                message: getText('Form not valid!'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }

        var data = this.getView().getData();
        this.addNewColumnEntry(data);
    },

    addNewColumnEntry: function (data) {
                
        data.column = {
            label: data.configuration.field.label,
            field: data.configuration.field.model + '.' + data.name
        };
        
        if (data.isDynamicProperty) {
            data.column.field = data.configuration.field.model + '.propertyValues.' + data.name;
        }
        
        //modelise
        var column = Ext.create('Dashboard.model.Filter', data);
        
        var item = this.buildColumnRaw(column);
        
        var win = Ext.ComponentQuery.query('notifMailConfigCreate')[0];
        if (win === undefined) {
            win = Ext.ComponentQuery.query('notifMailConfigEdit')[0];
        }
        
        win.down('panel[reference=columnsPanel]').add(item);
        
        var winColumnCreate = Ext.ComponentQuery.query('columnCreate')[0];
        winColumnCreate.close();
    },
    
    buildColumnRaw: function(rowData){  
        
        var property = Ext.create('Ext.panel.Panel',{
            layout: 'hbox',
            margin: '0 0 12 0',
            name: 'column',
            
            column: rowData.data.column,
            rowData: rowData,

            defaults:{
                submitValue: false,
                flex:1
            },

            items:[
                {
                    xtype: 'hiddenfield',
                    name: 'name',
                    value: rowData.data.name
                }, {
                    xtype: 'displayfield',
                    fieldLabel: rowData.data.configuration.field.fieldLabel,
                    name: 'label',
                    value: rowData.data.label,
                    border: 1,
                    labelWidth: 150
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    name: 'upArrow',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa-arrow-circle-o-up',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').getController().onUpColumn(button, button.up('panel'));
                        }
                    }
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    name: 'downArrow',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa-arrow-circle-o-down',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').getController().onDownColumn(button, button.up('panel'));
                        }
                    }
                }, {
                    xtype: 'button',
                    ui: 'indicator-font-icon-button-minus',
                    name: 'minusButton',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa fa-minus-circle',
                    scope: this,
                    flex: 0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').removeColumn(button.up('panel[name=column]'));
                        }
                    }
                }
            ]
        });
        
        return property;
    },
    
        
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[profile.MainController.onRenderMain] configuration null or empty !');
        } 
    },
            
    onSelectItem: function(sender){
        this.selection = sender.selection;
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
        
    onSend: function(sender){
        var win = sender.up('window');
        this.send(win);
    },
    
    onUpColumn: function (button, item) {
        this.goUp(item);
    },

    onDownColumn: function (button, item) {
        this.goDown(item);
    },

    goUp: function (item) {
        this.moveSelectedRow(item, -1);
    },

    goDown: function (item) {
        this.moveSelectedRow(item, 1);
    },
    
    moveSelectedRow: function (item, direction) {
        var columnsPanel = this.getView().down('panel[reference=columnsPanel]');
        if (!item) {
            return;
        }
        
        var index = columnsPanel.items.indexOf(item);
        if (direction < 0) {
            index--;
            if (index < 0) {
                index = columnsPanel.items.getCount();
            }
        } else {
            index++;
            if (index >= columnsPanel.items.getCount()) {
                index = 0;
            }
        }
        columnsPanel.insert(index, item);
    },
    
    removeColumn: function(item){
        this.getView().removeColumn(item);
    },
            
    //==========================================================================
    //   Methods 
    //==========================================================================

    showCreateColumnWindow: function (type) {
        var win = Ext.create('Dashboard.view.settings.notifMailConfig.CreateColumn', {
            mainController: this
        });

        win.show();
    },

    getModelPropertiesByName: function (name) {
        
        switch (name) {
            
            case 'material':
                return Dashboard.manager.administration.MaterialManager.getNotifEmailProperties();
                break;
                
            case 'productreference':
                return Dashboard.manager.administration.ReferencesManager.getNotifEmailProperties();
                break;
                
            case 'productcategory':
                return Dashboard.manager.administration.CategoriesManager.getNotifEmailProperties();
                break;
                
            case 'alert':
                var result = Dashboard.manager.settings.AlertsConfigManager.getNotifEmailProperties();
                
                for(var i=0; i < result.length; i++){
                    var item = result[i];
                    if(item.name === 'name'){
                        result[i] = {name:'controlName', label:result[i].label};
                    }else if(item.name === 'description'){
                        result[i] = {name:'controlDescription', label:result[i].label};
                    }else if(item.name === 'controlDefinition.description'){
                        delete result[i];
                    }else if(item.name === 'enabled'){
                        delete result[i];
                    }
                };
                
                return result;
                break;
                
            case 'opborrowing':
                return Dashboard.manager.operation.BorrowingsManager.getNotifEmailProperties();
                break;

            default:
                Dashboard.tool.Utilities.error('[profile.MainController.getModelPropertiesByName] unknown model : ' + name);
                return null;
                break;
        }
    },

    getLabelByModel: function (model) {
        switch (model) {
            case 'material':
                return getText('Items');
                break;
            case 'productreference':
                return getText('Product reference');
                break;
            case 'productcategory':
                return getText('Categories');
                break;
            case 'alert':
                return getText('Alert');
                break;
            case 'opborrowing':
                return getText('Borrowings');
                break;
            default:
                throw 'Model unknown : ' + model;
                break;
        }
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
    
    
    create: function(){
        this.windowCreate = Ext.create('Dashboard.view.settings.notifMailConfig.create');
        this.windowCreate.show();
    },
    
    
    edit: function(model){

        this.windowEdit = Ext.create('Dashboard.view.settings.notifMailConfig.edit', {
            record: model.data
        });
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
                    Dashboard.manager.settings.NotifMailConfigManager.deleteOne(selectionId, this, 'refresh');                
                }
            }
        }); 
    },
    
    
    refresh: function (){

        var store = Ext.ComponentQuery.query('notifMailConfigMain')[0].store;
        store.load();
        
    },
    
    
    save: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
                
        var data = win.getData();
        
        var model = Ext.create('Dashboard.model.settings.NotifMailConfig', data);        
        Dashboard.manager.settings.NotifMailConfigManager.save(model, this, 'doPostSaveAction');
        
    },
    
    
    update: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.settings.NotifMailConfig', data);
        Dashboard.manager.settings.NotifMailConfigManager.update(model, this, 'doPostEditAction');
        
    },
    
    send: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        delete data.id;
        var model = Ext.create('Dashboard.model.settings.NotifMailConfig', data);
        Dashboard.manager.settings.NotifMailConfigManager.send(model, this, 'doPostEditAction');
        
    },
    
    
    doPostSaveAction: function(model){
        
        var win = Ext.ComponentQuery.query('notifMailConfigCreate')[0];
        win.close();
        this.refresh();
    },
    
    
    doPostEditAction: function(model){
        
        var win = Ext.ComponentQuery.query('notifMailConfigEdit')[0];
        win.close();
        this.refresh();
    }
    

});