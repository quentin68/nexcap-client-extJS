/*global Ext  */

Ext.define('Dashboard.view.system.context.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contextMain',
    require: [],

    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'MULTI_SITES_ADMIN', 0, false, true, true),

    windowEdit: null,
    windowCreate: null,
    selection: null,
    
    addedMaterialsList: null,
    removedMaterialsList: null,
    addedUsersList: null,
    removedUsersList: null,
    addedDevicesList: null,
    removedDevicesList: null,
    addedPropertiesList: null,
    removedPropertiesList: null,

    init: function (){
        
        this.addedMaterialsList = [];
        this.removedMaterialsList = [];
        this.addedUsersList = [];
        this.removedUsersList = [];
        this.addedDevicesList = [];
        this.removedDevicesList = [];
        this.addedPropertiesList = [];
        this.removedPropertiesList = [];
        
        this.control({
            // Selected item in dataGrid
            'contextMain viewListGrid': {
                itemclick: this.onSelectItem
            },

            // Create window
            'contextCreate button[action=save]': {
                click: this.onSave
            },

            // Edit window
            'contextEdit button[action=save]': {
                click: this.onUpdate
            }
        });
    },

    //==========================================================================
    //   Event handlers
    //==========================================================================

    onRenderMain: function (sender){
        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[profile.MainController.onRenderMain] configuration null or empty !');
        }
    },

    onSelectItem: function (sender){
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        this.loadDetail(id);
    },

    onCreate: function (sender){
        this.create();
    },

    onEdit: function (sender){
        if (this.getSelection()) {
            var id = this.getSelection().data.id;
            Dashboard.manager.system.ContextManager.getOne(id, this, 'edit');
        }
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

    onSaveRestriction: function (sender){
        var win = sender.up('window');
        this.saveRestriction(win);
    },

    onUpdate: function (sender){
        var win = sender.up('window');
        this.update(win);
    },

    onAddUser: function (sender){
        this.addUser();
    },

    onRemoveUser: function (sender){
        var win = sender.up('window');
        var selectedContext = win.getConfig().data.id;
        this.removeUser(selectedContext);
    },
    onSelectUsersToDelete: function (sender){
        this.selectUserDelete(sender);
    },

    onSelectUsers: function (sender){
        this.selectUser(sender);
    },

    onAddDevice: function (sender){
        this.addDevice(sender);
    },

    onRemoveDevice: function (sender){
        var win = sender.up('window');
        var selectedContext = win.getConfig().data.id;
        this.removeDevice(selectedContext);
    },
    onSelectDevicesToDelete: function (sender) {
        this.selectDevicesToDelete(sender);
    },

    onSelectDevices: function (sender){
        this.selectDevice(sender);
    },

    onAddProperty: function (sender){
        this.addProperty();
    },

    onSelectProperties: function (sender){
        this.selectProperties(sender);
    },
    onSelectPropertiesToDelete: function (sender){
        this.selectPropertiesToDelete(sender);
    },

    onRemoveProperty: function (sender){
        var win = sender.up('window');
        var selectedContext = win.getConfig().data.id;
        this.removeProperty(selectedContext);
    },

    onAddMaterial: function (sender){
        this.addMaterial();
    },

    onSelectMaterial: function (sender){
        this.selectMaterial(sender);
    },
    onSelectMaterialToDelete: function (sender){
        this.selectMaterialToDelete(sender);
    },

    onRemoveMaterial: function (sender){
        var win = sender.up('window');
        var selectedContext = win.getConfig().data.id;
        this.removeMaterial(selectedContext);
    },

    //==========================================================================
    //   Methods 
    //==========================================================================

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
        Dashboard.manager.system.ContextManager.getOne(id, this, 'displayDetail');
    },

    displayDetail: function (record){
        //Ext.ComponentQuery.query('contextDetail')[0].setData(record.data);
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
    },

    enableButtons: function (){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },

    create: function (){
        this.windowCreate = Ext.create('Dashboard.view.system.context.Create');
        this.windowCreate.show();
    },

    edit: function (model){
        this.windowEdit = Ext.create('Dashboard.view.system.context.Edit', {
            record: model.data
        });
        console.log('edit : ' + model.data.id);

        this.cleanUpLists();

        this.windowEdit.show();
        this.windowEdit.setData(model.data);
    },

    doDelete: function (){
        var selection = this.getSelection();
        if (selection) {
            this.confirmDelete(selection);
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
            fn: function (btn){
                if (btn === 'yes') {
                    Dashboard.manager.system.ContextManager.deleteOne(selectionId, this, 'refresh');
                }
            }
        });
    },

    refresh: function (){
        var store = Ext.ComponentQuery.query('contextMain')[0].store;
        store.reload();
    },

    save: function (win){
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

        var model = Ext.create('Dashboard.model.system.ContextCreate', data);
        Dashboard.manager.system.ContextManager.save(model, this, 'doPostSaveAction');
    },

    saveRestriction: function (win){
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

        var model = Ext.create('Dashboard.model.system.ContextCreate', data);
        Dashboard.manager.system.ContextManager.save(model, this, 'doPostRestriction');
    },

    update: function (win){
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

        data.addedMaterialsList = this.addedMaterialsList;
        data.removedMaterialsList = this.removedMaterialsList;
        data.addedUsersList = this.addedUsersList;
        data.removedUsersList = this.removedUsersList;
        data.addedDevicesList = this.addedDevicesList;
        data.removedDevicesList = this.removedDevicesList;
        data.addedPropertiesList = this.addedPropertiesList;
        data.removedPropertiesList = this.removedPropertiesList;

        var model = Ext.create('Dashboard.model.system.ContextCreate', data);

        Dashboard.manager.system.ContextManager.update(model, this, 'doPostEditAction');

        this.cleanUpLists();

    },

    cleanUpLists: function (){

        this.addedMaterialsList = [];
        this.addedUsersList = [];
        this.addedPropertiesList = [];
        this.addedDevicesList = [];
        this.removedMaterialsList = [];
        this.removedUsersList = [];
        this.removedDevicesList = [];
        this.removedPropertiesList = [];
    },

    doPostSaveAction: function (model){
        var win = Ext.ComponentQuery.query('contextCreate')[0];
        win.close();
        this.refresh();
    },

    doPostSaveRestriction: function (model){
        this.refresh();
    },

    doPostEditAction: function (model){
        var win = Ext.ComponentQuery.query('contextEdit')[0];
        win.close();
        this.refresh();
    },

    // User 
    addUser: function (){
        this.usersSelectWindow = Ext.create('Dashboard.view.administration.user.Selector', {
            autoShow: true,
            parentController: this
        });
    },

    removeUser: function (selectedContext){
        // console.log("check selectedContext", selectedContext);
        this.usersSelectWindow = Ext.create('Dashboard.view.administration.user.SelectorToDelete', {
            autoShow: true,
            conID: selectedContext,
            parentController: this
        });
    },

    selectUserDelete: function(sender){
        var win = sender.up('window');
        var dataGrid = win.down('userGridPanel');
        var selectedRows = dataGrid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var createWindow = Ext.ComponentQuery.query('contextCreate');
        var editWindow = Ext.ComponentQuery.query('contextEdit');
        var grid = null;

        if (createWindow.length > 0) {
            grid = createWindow[0].down('grid[name=usersGrid]');
        } else if (editWindow.length > 0) {
            grid = editWindow[0].down('grid[name=usersGrid]');
        }
        if (grid !== null) {
            var store = grid.store;
            Ext.each(selectedRows, function (row){
                //not sure about the if condition, putting this to be on the safe side.
                if(Ext.Array.contains(this.addedUsersList, row.data.id)){
                    Ext.each(this.addedUsersList, function (id){
                        if (row.data.id === id) {
                            var index = this.addedUsersList.indexOf(id);
                            this.addedUsersList.splice(index, 1);
                        }
                    }, this);
                }
                else{
                    for (var i = 0; i < store.data.items.length; i++) {
                        if (store.data.items[i].data.id === row.data.id) {
                            this.removedUsersList.push(row.data.id);
                            store.remove(row);
                        }
                    }
                }
            }, this);

            grid.updateLayout();
        }
        win.close();
    },

    selectUser: function (sender){
        var win = sender.up('window');
        var grid = win.down('userGridPanel');
        var selectedRows = grid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var createWindow = Ext.ComponentQuery.query('contextCreate');
        var editWindow = Ext.ComponentQuery.query('contextEdit');
        var grid = null;

        if (createWindow.length > 0) {
            grid = createWindow[0].down('grid[name=usersGrid]');
        } else if (editWindow.length > 0) {
            grid = editWindow[0].down('grid[name=usersGrid]');
        }

        if (grid !== null) {
            var store = grid.store;
            Ext.each(selectedRows, function (row){
                var found = false;
                for (var i = 0; i < store.data.items.length; i++) {
                    if (store.data.items[i].data.id === row.data.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.addedUsersList.push(row.data.id);
                    store.add(row);
                }
                
                Ext.each(this.removedUsersList, function(id){
                    if(row.data.id === id){
                        var index = this.removedUsersList.indexOf(id);
                        this.removedUsersList.splice(index, 1);
                    }
                }, this);
                
            }, this);

            grid.updateLayout();
        }
        win.close();
    },

    // Device
    addDevice: function (sender){
        var win = sender.up('window');

        var winForm = win.down('form').getForm();
        var values = winForm.getValues();

        if (!values.assignedPositionId) {

            Ext.Msg.show({
                title: getText('Warning'),
                msg: getText('Select a location'),
                buttons: Ext.MessageBox.YES,
                icon: Ext.MessageBox.WARNING
            });

        } else {
            this.usersSelectWindow = Ext.create('Dashboard.view.system.device.Selector', {
                autoShow: true,
                parentController: this,
                rootPosition: values.assignedPositionId
            });
        }
    },

    removeDevice: function (selectedContext){
        // console.log("check selectedContext", selectedContext);
        this.usersSelectWindow = Ext.create('Dashboard.view.system.device.SelectorToDelete', {
            autoShow: true,
            conID: selectedContext,
            parentController: this
        });
    },

    selectDevicesToDelete: function (sender) {
        var win = sender.up('window');
        var dataGrid = win.down('deviceGridPanel');
        var selectedRows = dataGrid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var createWindow = Ext.ComponentQuery.query('contextCreate');
        var editWindow = Ext.ComponentQuery.query('contextEdit');
        var grid = null;

        if (createWindow.length > 0) {
            grid = createWindow[0].down('grid[name=devicesGrid]');
        } else if (editWindow.length > 0) {
            grid = editWindow[0].down('grid[name=devicesGrid]');
        }
        if (grid !== null) {
            var store = grid.store;
            Ext.each(selectedRows, function (row){
                //not sure about the if condition, putting this to be on the safe side.
                if(Ext.Array.contains(this.addedDevicesList, row.data.id)){
                    Ext.each(this.addedDevicesList, function (id){
                        if (row.data.id === id) {
                            var index = this.addedDevicesList.indexOf(id);
                            this.addedDevicesList.splice(index, 1);
                        }
                    }, this);
                }
                else{
                    for (var i = 0; i < store.data.items.length; i++) {
                        if (store.data.items[i].data.id === row.data.id) {
                            this.removedDevicesList.push(row.data.id);
                            store.remove(row);
                        }
                    }
                }
            }, this);

            grid.updateLayout();
        }
        win.close();
    },

    selectDevice: function (sender){
        var win = sender.up('window');
        var grid = win.down('deviceGridPanel');
        var selectedRows = grid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var createWindow = Ext.ComponentQuery.query('contextCreate');
        var editWindow = Ext.ComponentQuery.query('contextEdit');
        var grid = null;

        if (createWindow.length > 0) {
            grid = createWindow[0].down('grid[name=devicesGrid]');
        } else if (editWindow.length > 0) {
            grid = editWindow[0].down('grid[name=devicesGrid]');
        }

        if (grid !== null) {
            var store = grid.store;
            Ext.each(selectedRows, function (row){
                var found = false;
                for (var i = 0; i < store.data.items.length; i++) {
                    if (store.data.items[i].data.id === row.data.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.addedDevicesList.push(row.data.id);
                    store.add(row);
                }
                
                Ext.each(this.removedDevicesList, function(id){
                    if(row.data.id === id){
                        var index = this.removedDevicesList.indexOf(id);
                        this.removedDevicesList.splice(index, 1);
                    }
                }, this);
                
            }, this);

            grid.updateLayout();
        }
        win.close();
    },

    // Dynamic property
    addProperty: function (){
        var win = Ext.create('Dashboard.view.shared.property.Selector', {
            parentController: this,
            type: null,
            typeOfValidation: 'ALL' //  PRODUCT_REFERENCE | MATERIAL | ALL
        });

        win.show();
    }, 

    selectProperties: function (sender){
        var win = sender.up('window');
        var grid = win.down('propertyGridPanel');
        var selectedRows = grid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var createWindow = Ext.ComponentQuery.query('contextCreate');
        var editWindow = Ext.ComponentQuery.query('contextEdit');
        var grid = null;

        if (createWindow.length > 0) {
            grid = createWindow[0].down('grid[name=propertiesGrid]');
        } else if (editWindow.length > 0) {
            grid = editWindow[0].down('grid[name=propertiesGrid]');
        }

        if (grid !== null) {
            var store = grid.store;
            Ext.each(selectedRows, function (row){
                var found = false;
                for (var i = 0; i < store.data.items.length; i++) {
                    if (store.data.items[i].data.id === row.data.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.addedPropertiesList.push(row.data.id);
                    store.add(row);
                }
                
                Ext.each(this.removedPropertiesList, function(id){
                    if(row.data.id === id){
                        var index = this.removedPropertiesList.indexOf(id);
                        this.removedPropertiesList.splice(index, 1);
                    }
                }, this);
                
            }, this);

            grid.updateLayout();
        }
        win.close();
    },

    selectPropertiesToDelete: function (sender) {
        var win = sender.up('window');
        var dataGrid = win.down('propertyGridPanel');
        var selectedRows = dataGrid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var createWindow = Ext.ComponentQuery.query('contextCreate');
        var editWindow = Ext.ComponentQuery.query('contextEdit');
        var grid = null;

        if (createWindow.length > 0) {
            grid = createWindow[0].down('grid[name=propertiesGrid]');
        } else if (editWindow.length > 0) {
            grid = editWindow[0].down('grid[name=propertiesGrid]');
        }
        if (grid !== null) {
            var store = grid.store;
            Ext.each(selectedRows, function (row){
                //not sure about the if condition, putting this to be on the safe side.
                if(Ext.Array.contains(this.addedPropertiesList, row.data.id)){
                    Ext.each(this.addedPropertiesList, function (id){
                        if (row.data.id === id) {
                            var index = this.addedPropertiesList.indexOf(id);
                            this.addedPropertiesList.splice(index, 1);
                        }
                    }, this);
                }
                else{
                    for (var i = 0; i < store.data.items.length; i++) {
                        if (store.data.items[i].data.id === row.data.id) {
                            this.removedPropertiesList.push(row.data.id);
                            store.remove(row);
                        }
                    }
                }
            }, this);

            grid.updateLayout();
        }
        win.close();
    },

    removeProperty: function (selectedContext){
        // console.log("check selectedContext", selectedContext);
        var win = Ext.create('Dashboard.view.shared.property.SelectorToDelete', {
            parentController: this,
            conID: selectedContext,
            type: null,
            typeOfValidation: 'ALL' //  PRODUCT_REFERENCE | MATERIAL | ALL
        });

        win.show();
    },


    // Material
    addMaterial: function (){
        var win = Ext.create('Dashboard.view.administration.material.Selector', {
            parentController: this
        });

        win.show();
    },
    onSelectMaterialToDelete: function (sender) {
        var win = sender.up('window');
        var dataGrid = win.down('materialGridPanel');
        var selectedRows = dataGrid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var createWindow = Ext.ComponentQuery.query('contextCreate');
        var editWindow = Ext.ComponentQuery.query('contextEdit');
        var grid = null;

        if (createWindow.length > 0) {
            grid = createWindow[0].down('grid[name=materialsGrid]');
        } else if (editWindow.length > 0) {
            grid = editWindow[0].down('grid[name=materialsGrid]');
        }
        if (grid !== null) {
            var store = grid.store;
            Ext.each(selectedRows, function (row){
                //not sure about the if condition, putting this to be on the safe side.
                if(Ext.Array.contains(this.addedMaterialsList, row.data.id)){
                    Ext.each(this.addedMaterialsList, function (id){
                        if (row.data.id === id) {
                            var index = this.addedMaterialsList.indexOf(id);
                            this.addedMaterialsList.splice(index, 1);
                        }
                    }, this);
                }
                else{
                    for (var i = 0; i < store.data.items.length; i++) {
                        if (store.data.items[i].data.id === row.data.id) {
                            this.removedMaterialsList.push(row.data.id);
                            store.remove(row);
                        }
                    }
                }
            }, this);

            grid.updateLayout();
        }
        win.close();
    },
    selectMaterial: function (sender){
        var win = sender.up('window');
        var grid = win.down('materialGridPanel');
        var selectedRows = grid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var createWindow = Ext.ComponentQuery.query('contextCreate');
        var editWindow = Ext.ComponentQuery.query('contextEdit');
        var grid = null;

        if (createWindow.length > 0) {
            grid = createWindow[0].down('grid[name=materialsGrid]');
        } else if (editWindow.length > 0) {
            grid = editWindow[0].down('grid[name=materialsGrid]');
        }

        if (grid !== null) {
            var store = grid.store;
            
            Ext.each(selectedRows, function (row){
                var found = false;
                for (var i = 0; i < store.data.items.length; i++) {
                    if (store.data.items[i].data.id === row.data.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.addedMaterialsList.push(row.data.id);
                    store.add(row);
                }
                
                Ext.each(this.removedMaterialsList, function(id){
                    if(row.data.id === id){
                        var index = this.removedMaterialsList.indexOf(id);
                        this.removedMaterialsList.splice(index, 1);
                    }
                }, this);
                
            }, this);

            grid.updateLayout();
        }
        win.close();
    },

    removeMaterial: function (selectedContext){
        var win = Ext.create('Dashboard.view.administration.material.SelectorToDelete', {
            parentController: this,
            conID: selectedContext,
        });

        win.show();
    }

});