/*  global Ext */

Ext.define('Dashboard.view.administration.interventionOrder.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.interventionOrderMain',
    
    require: ['Dashboard.view.administration.reference.Selector'],
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'INTERVENTION_ORDER_ADMIN', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    referencesSelectWindow: null,
    selection: null,
    
    init: function() {
        this.control({
            // Selected item in dataGrid
            'interventionOrderMain viewListGrid': {
                itemclick: this.onSelectItem
            },
            // Create window
            'interventionOrderCreate button[action=save]': {
                click: this.onSave
            },
            // Edit window
            'interventionOrderEdit button[action=save]': {
                click: this.onUpdate
            }

        });
    },
    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onRenderMain: function(sender) {

        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[interventionOrder.MainController.onRenderMain] configuration null or empty !');
        }
    },
    onSelectItem: function(sender) {
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        this.loadDetail(id);
    },
    onCreate: function(sender) {
        this.create();
    },
    onEdit: function(sender) {
        if (this.getSelection()) {
            var id = this.getSelection().data.id;
            Dashboard.manager.administration.InterventionOrdersManager.getOne(id, this, 'edit');
        }
    },
    onDestroy: function(sender) {
        this.doDelete();
    },
    onRefresh: function(sender) {
        this.refresh();
    },
    onSave: function(sender) {
        var win = sender.up('window');
        this.save(win);
    },
    onUpdate: function(sender) {
        var win = sender.up('window');
        this.update(win);
    },
    onAssociate: function(sender) {
        var win = sender.up('window');
        this.associate();
    },
    onDissociate: function(sender) {
        var win = sender.up('window');
        var grid = win.down('grid[name=referencesGrid]');
        this.dissociate(grid);
    },
    onSelectReferences: function(sender) {
        this.selectReferences(sender);
    },
    
    onExportToExel: function(){
        this.exportToExel();
    },
    
    // ==========================================================================
    // Methods
    // ==========================================================================

    getFilters: function(){
        
        var filtersList = Dashboard.manager.FiltersManager.getFiltersListByFeature(this.feature);
        return filtersList;
    },

            
    getSelection: function() {

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
            
    loadDetail: function(id) {

        try {
            Dashboard.model.administration.InterventionOrder.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[interventionOrder.MainController] error: loading failure');
                },
                success: function(record, operation) {

                    console.log('interventionOrder: ' + record.get('number'));
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.administration.InterventionOrder', response.data);
                    this.displayDetail(model);

                },
                callback: function(record, operation, success) {
                    // do
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[interventionOrder.MainController] error: ' + err);
        }
    },
    
    displayDetail: function(record) {
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('interventionOrderDetail').setData(record.data);
    },
            
    enableButtons: function() {
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },
            
    create: function() {
        this.windowCreate = Ext.create('Dashboard.view.administration.interventionOrder.Create');
        this.windowCreate.show();
    },
            
    edit: function(model) {
        this.windowEdit = Ext.create('Dashboard.view.administration.interventionOrder.Edit', {
            record: model.data
        });
        this.windowEdit.show();

        // this.windowEdit.setData(model.data);
    },
            
    doDelete: function() {

        var selection = this.getSelection();

        if (selection) {
            this.confirmDelete(selection);
        } else {
            Ext.Msg.alert(getText('Warning'), getText('No element selected'));
        }
    },
            
    confirmDelete: function(selection) {

        var selectionId = selection.data.id;
        
        var msg = getText('Do you really want to delete ') + " \"" + selection.data.number + "\" ?";
        
        if(selection.data.opBorrowingIds && selection.data.opBorrowingIds.length > 0){
            var alertMsg = getText('Attention, this intervention order is related to an operation.');
            msg = alertMsg + '<br><br>' + msg;
        }

        Ext.Msg.show({
            title: getText('Delete'),
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if (btn === 'yes') {
                    Dashboard.manager.administration.InterventionOrdersManager.deleteOne(selectionId, this, 'refresh');
                    
                    try{
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'interventionOrderDetail'
                        });
                    }catch(ex){}
                }
            }
        });
    },
    
    refresh: function() {

        var store = this.getMain().store;
        store.load();

    },
            
    save: function(win) {

        if (!win.down('form').isValid()) {
            Ext.Msg.show({title: getText('Error'), msg: getText('Form not valid!'), buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
            return;
        }

        var data = win.getData();
        var model = Ext.create('Dashboard.model.administration.InterventionOrderCreate', data);
        Dashboard.manager.administration.InterventionOrdersManager.save(model, this, 'doPostSaveAction');
    },
            
    update: function(win) {
        if (!win.down('form').isValid()) {
            Ext.Msg.show({title: getText('Error'), msg: getText('Form not valid!'), buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
            return;
        }

        var data = win.getData();
        var model = Ext.create('Dashboard.model.administration.InterventionOrderCreate', data);

        Dashboard.manager.administration.InterventionOrdersManager.update(model, this, 'doPostEditAction');

    },
            
    doPostSaveAction: function(model) {

        var win = Ext.ComponentQuery.query('interventionOrderCreate')[0];
        win.close();
        this.refresh();
        this.loadDetail(model.data.id);
    },
            
    doPostEditAction: function(model) {

        var win = Ext.ComponentQuery.query('interventionOrderEdit')[0];
        win.close();
        this.refresh();
        this.loadDetail(model.data.id);
    },
            
    associate: function(selection) {
        this.referencesSelectWindow = Ext.create('Dashboard.view.reference.Selector', {
            autoShow: true,
            parentController: this
        });
    },
            
    dissociate: function(dataGrid) {
        var selectedRaws = dataGrid.getSelection();

        if (selectedRaws.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        dataGrid.store.remove(selectedRaws);
        dataGrid.updateLayout();
    },
            
    selectReferences: function(button) {

        // Get winForm
        var win = button.up('window');
        var dataGrid = win.down('grid');

        // Get selected line from dataGrid
        var selectedRows = dataGrid.getSelectionModel().getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var createWindow = Ext.ComponentQuery.query('interventionOrderCreate');
        var editWindow = Ext.ComponentQuery.query('interventionOrderEdit');
        var grid = null;

        if (createWindow.length > 0) {
            grid = createWindow[0].down('grid');
        } else if (editWindow.length > 0) {
            grid = editWindow[0].down('grid');
        }

        if (grid !== null) {
            var store = grid.store;
            Ext.each(selectedRows, function(row) {
                var found = false;
                for (var i = 0; i < store.data.items.length; i++) {
                    if (store.data.items[i].data.id === row.data.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    store.add(row);
                }
            });

            grid.updateLayout();
        }
        win.close();
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
            link= '/interventionorders/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/interventionorders/export';
        }
        //var link = '/interventionorders/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function(){
        return  Ext.ComponentQuery.query('interventionOrderMain')[0];
    }

});