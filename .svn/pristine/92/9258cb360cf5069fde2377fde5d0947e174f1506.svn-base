/* global Ext */
Ext.define('Dashboard.view.system.importData.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.importMain',

    require: [],

    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'MANAGE_IMPORTS', 0, false, true, true),

    windowEdit: null,
    windowCreate: null,
    selection: null,

    init: function (){
        this.control({

            // Selected item in dataGrid
            'importMain viewListGrid': {
                itemclick: this.onSelectItem
            },
            'importMain viewListList': {
                itemclick: this.onSelectItem
            },
           
            // Create window
            'importCreate button[action=import]': {
                click: this.onSave
            },
            
            // Edit window
            'importEdit button[action=import]': {
                click: this.onUpdate
            },
            
            // Edit multiple
            'importEditMultiple button[action=import]': {
                click: this.onUpdateMultiple
            }
        });

    },
    
    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onRenderMain: function (sender){

        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[import.MainController.onRenderMain] configuration null or empty !');
        }
    },

    onSelectItem: function (sender){
        try {
            this.selection = sender.selection;
            var id = sender.selection.data.id;
            this.loadDetail(id);
        } catch (ex) {
            // Nothing
        }
    },

    onCreate: function (sender){
        this.create();
    },

    onDestroy: function (sender){
        this.doDelete();
    },

    onRefresh: function (sender){
        this.refresh();
    },

    onSave: function (sender){
        var win = sender.up('window');
        this.save(win);
    },

    // ==========================================================================
    // Methods
    // ==========================================================================

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
        Dashboard.manager.system.ImportManager.getOne(id, this, 'displayDetail');
    },

    displayDetail: function (record){
        try {
            //Ext.ComponentQuery.query('importDetail')[0].setData(record.data);
            Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
        } catch (ex) {
            //
        }
    },

    cleanDetail: function (record){
        //Ext.ComponentQuery.query('importDetail')[0].clean();
        this.getView().query('importDetail')[0].clean();
    },

    enableButtons: function (){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },

    create: function (){

        this.windowCreate = Ext.create('Dashboard.view.system.importData.Create');
        this.windowCreate.show();
    },

    doDelete: function (){
        var viewList = this.getView().down('viewList');
        var grid = viewList.down('viewListGrid');

        if (grid === null) {
            var selection = this.getSelection();
            if (selection) {
                this.confirmDelete(selection);
            } else {
                Ext.Msg.alert(getText('Warning'), getText('No element selected'));
            }
            return;
        }

        var selectedRows = grid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        } else if (selectedRows.length === 1) {
            this.confirmDelete(selectedRows[0]);
        } else {
            this.confirmDeleteMultiple(selectedRows);
        }
    },

    confirmDeleteMultiple: function (selectionMultiple){
        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete these items') + ' ?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn){
                if (btn === 'yes') {
                    try {
                        var idsArray = [];
                        selectionMultiple.forEach(function (selection){
                            var selectionId = selection.data.id;
                            idsArray.push(selectionId);
                        });
                        Dashboard.manager.system.ImportManager.deleteMultiple(idsArray, this, 'refresh');
                    } catch (ex) {
                        Ext.Msg.alert(getText('Warning'), getText('Error with multiple action'));
                    }
                    try {
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'importDetail'
                        });
                    } catch (ex) {
                    }
                }
            }
        });
    },

    confirmDelete: function (selection){
        var selectionId = selection.data.id;

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete ') + " \"" + selection.data.filename + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn){
                if (btn === 'yes') {
                    Dashboard.manager.system.ImportManager.deleteImport(selectionId, this, 'refresh');

                    try {
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'importDetail'
                        });
                    } catch (ex) {
                    }
                }
            }
        });
    },

    refresh: function (){

        var store = Ext.ComponentQuery.query('importMain')[0].store;
        store.reload();
        this.cleanDetail();
    },

    onUpdateMultiple: function (sender){
        var win = sender.up('window');
        if (!win.down('form').isValid()) {
            Ext.Msg.show({
                title: getText('Error'),
                msg: getText('Form not valid!'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return;
        }

        var data = win.getData();
        console.log('data');
        console.log(data);
    },

    importFile: function (sender){
        
        var win = sender.up('window');
        var form = win.down('form');
        
        if (!win.down('form').isValid()) {
            Ext.Msg.show({
                title: getText('Error'),
                msg: getText('Form not valid!'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return;
        }
        
        var imports = Ext.create('Dashboard.model.ImportCreate');
        Dashboard.manager.system.ImportManager.importFile(imports, this, 'doPostSaveAction', form);
          
    },
    
    doPostSaveAction: function (model, message) {
                
        try {           
            var form = Ext.getCmp('attachmentPanelForm');
            var hasFiles = false;
            var items = form.items;
            
            items.items.forEach(function (item) {
                if (item.items.items["0"].value !== null && item.items.items["0"].value !== '') {
                    hasFiles = true;
                }
            });
            
            if (!hasFiles) {
                Dashboard.engine.ResponseManager.showSuccess(message);
                var win = Ext.ComponentQuery.query('importCreate')[0];
                win.close();
                this.refresh();
                Dashboard.manager.system.ImportManager.getImport(model.data.id, this, 'displayDetail');
            } else {
                
                form.submit({
                    url: Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/IMPORT/multiple/' + model.data.id,
                    scope: this,
                    waitMsg: getText('Uploading'),
                    success: function (form, action) {
                        Dashboard.engine.ResponseManager.showSuccess(message);
                        var win = Ext.ComponentQuery.query('importCreate')[0];
                        win.close();
                        form.destroy();                        
                        this.refresh();
                        Dashboard.manager.system.ImportManager.getImport(model.data.id, this, 'displayDetail');
                    },
                    failure: function (form, action) {
                        
                        //CORS patch
                        var response = action.response.responseText;
                        
                        if(response.indexOf('Blocked a frame with origin') !== -1){
                            Dashboard.engine.ResponseManager.showSuccess(message);
                            var win = Ext.ComponentQuery.query('importCreate')[0];
                            win.close();
                            form.destroy();
                            this.refresh();
                            Dashboard.manager.system.ImportManager.getImport(model.data.id, this, 'displayDetail');
                        }else{
                            Ext.Msg.alert('Failed', action.result ? action.result.message : getText('No response'));
                            form.destroy();
                        } 
                    }
                });
            }
        } catch (e) {
            Dashboard.tool.Utilities.error('[import.MainController.doPostSaveAction] Failed submitting files');
        }
    },

    getMain: function (){
        return  Ext.ComponentQuery.query('importMain')[0];
    }

});