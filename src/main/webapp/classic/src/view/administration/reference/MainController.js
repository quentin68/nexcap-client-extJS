/* global Ext, moment */

Ext.define('Dashboard.view.administration.reference.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.referenceMain',
    
    require: [
        'Dashboard.view.administration.reference.Create', 
        'Dashboard.manager.administration.ReferencesManager', 
        'Dashboard.view.shared.imagesViewer.ThumbnailEdit',
        'Dashboard.view.shared.imagesViewer.Zoom', 
        'Dashboard.view.shared.property.Create', 
        'Dashboard.view.shared.property.Edit', 
        'Dashboard.view.administration.reference.EditMultiple'
    ],
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'REF_MAT_ADMIN', 0, false, true, true),
    view: 'referenceMain',
    
    config: {
        manager: Dashboard.manager.administration.ReferencesManager
    },
    
    windowEdit: null,
    windowCreate: null,
    locationsSelectWindow: null,
    selection: null,
    
    init: function () {
        this.control({
            // Selected item in dataGrid
            'referenceMain viewListGrid': {
                itemclick: this.onSelectItem
            },
            'referenceMain viewListAlbum > dataview': {
                itemclick: this.onSelectItem
            },
            'referenceMain viewListList': {
                itemclick: this.onSelectItem
            },
            // 'referenceMain viewList[action=onAdd]': {click: this.onSelectItem},

            // Create window
            'referenceCreate button[action=save]': {
                click: this.onSave
            },
            'referenceCreate button[action=selectThumbnail]': {
                click: this.openThumbnailEditor
            },
            'referenceCreate button[action=deleteThumbnail]': {
                click: this.deleteThumbnail
            },
            'referenceCreate button[action=close]': {
                click: this.closeThumbnailEditor
            },
            //            
            // // Edit window
            'referenceEdit button[action=save]': {
                click: this.onUpdate
            },
            'referenceEdit button[action=selectThumbnail]': {
                click: this.openThumbnailEditor
            },
            'referenceEdit button[action=deleteThumbnail]': {
                click: this.deleteThumbnail
            },
            'referenceEdit button[action=close]': {
                click: this.closeThumbnailEditor
            },
            // Edit multiple
            'referenceEditMultiple button[action=save]': {
                click: this.onUpdateMultiple
            }
        });

        //propertyInEdition = null;
    },
    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onRenderMain: function (sender) {
        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[reference.MainController.onRenderMain] configuration null or empty !');
        }
    },

    onSelectItem: function (sender) {
        try {
            this.selection = sender.selection;
            var id = sender.selection.data.id;
            this.loadDetail(id);
        } catch (ex) {
            // 
        }   
    },

    onCreate: function (sender) {
        this.create();
    },

    onEdit: function (sender) {
        var viewList = this.getView().down('viewList');
        var grid = viewList.down('viewListGrid');
        
        if (grid === null) {
            if (this.getSelection()) {
                var id = this.getSelection().data.id;
                this.getManager().getReference(id, this, 'onEditGetLocations');
            }
            return;
        }

        var selectedRows = grid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        } else if (selectedRows.length === 1) {
            var id = selectedRows[0].data.id;
            this.getManager().getReference(id, this, 'onEditGetLocations');
        } else {
            var id = selectedRows[0].data.id;
            this.getManager().getReference(id, this, 'onEditGetLocations');
            
            /* Edit multiple disabled according to product team request 
                var ids = selectedRows.map(function (selection) {
                    return selection.data.id;
                });
                console.log(ids);
                this.editMultiple(ids);
            */
        }
    },

    onEditGetLocations: function(model){       
        var filterLocations = [];

        if(model.data.assignedLocForPositions.length >0){
            model.data.assignedLocForPositions.forEach(function(location){
                filterLocations.push(location.locationId);
            });
        }

        var locationStore = Ext.create('Dashboard.store.administration.Locations', {
            autoLoad: false
        });
        /*
         locationStore.filterModels = {
         'property': 'id',
         'type': 'LIST',
         'comparison': 'IN',
         'value': filterLocations
         };
         */
        var me = this;
        locationStore.on('load', function (store, records, successful, eOpts) {
            if (successful) {
                records.forEach(function (record) {
                    for (var i = 0; i < model.data.assignedLocForPositions.length; i++) {
                        if (model.data.assignedLocForPositions[i].locationId === record.id) {
                            model.data.assignedLocForPositions[i].location = record.data;
                        }
                    }
                });

            } else {
                Dashboard.tool.Utilities.error('[reference.MainController.onEditGetLocations] loading error');
            }
            me.edit(model);
        });

        locationStore.load(); // async
    },

    onDestroy: function (sender) {
        this.doDelete();
    },

    onRefresh: function (sender) {
        this.refresh();
    },

    onSave: function (sender) {
        var win = sender.up('window');
        this.save(win);
    },

    onUpdate: function (sender) {
        var win = sender.up('window');
        this.update(win);
    },

    onCreateMaterialProperty: function (sender) {
        this.createProperty('MATERIAL');
    },
    
    onAssignMaterialProperty: function (sender) {
        this.assignProperty('MATERIAL');
    },

    onCreateReferenceProperty: function (sender) {
        this.createProperty('PRODUCTREFERENCE');
    },
    
    onAssignReferenceProperty: function (sender) {
        this.assignProperty('PRODUCTREFERENCE');
    },

    onEditProperty: function (sender, property) {
        this.editProperty(property);
    },

    onDeleteProperty: function (sender, property) {
        this.doDeleteProperty(property);
    },

    onCategorySelected: function (sender) {
        if (sender.getSelection()) {
            var id = sender.getSelection().data.id;
            Dashboard.manager.administration.CategoriesManager.getCategory(id, this, 'buildFields');
        }
    },

    onAddLocation: function (sender) {
        var win = sender.up('window');
        this.addLocation();
    },

    onDeleteLocation: function (sender) {
        var win = sender.up('window');
        var grid = win.down('grid[name=locationsGrid]');
        this.deleteLocation(grid);
    },

    onDeleteFile: function (sender) { //WTF Raed !!
        var win = sender.up('window');
        var dataGrid = win.down('grid[name=attachmentGrid]');

        var selectedRaws = dataGrid.getSelection();

        if (selectedRaws.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        if (selectedRaws['0'].data.isSaved === false) {
            // Remove file locally
            try {
                var records = win.attachmentFilesStore.getData();
                records.items.forEach(function (record) {
                    if (record.data.refId === selectedRaws['0'].data.id) {
                        win.attachmentFilesStore.remove(record); // remove unSynced elements

                        // remove from Selector window
                        var attachmentForm = Ext.getCmp(record.data.id);
                        var attachmentFormPanel = attachmentForm.ownerCt;
                        attachmentFormPanel.ownerCt.remove(attachmentFormPanel);
                    }
                });
            } catch (ex) {
                Dashboard.tool.Utilities.error('[material.MainController.onDeleteFile] Failed remove local file : ' + ex);
            }
            return;
        }

        var id = selectedRaws['0'].data.refId;
        var file = selectedRaws['0'].data.file;

        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/PRODUCT_REFERENCE/' + id + '/' + file;

        // Delete File AJAX
        Ext.Ajax.request({
            url: url,
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'DELETE',
            success: function (response, opts) {
                dataGrid.store.remove(selectedRaws['0']);
                dataGrid.updateLayout();
                Dashboard.engine.ResponseManager.showSuccess(getText('File deleted successfully'));
            },
            failure: function (response, opts) {
                Dashboard.engine.ResponseManager.showFailure(getText('Failed deleting file'));
            }
        });
    },

    onDuplicate: function () {
        this.doDuplicate();
    },
    
    onSelectProperties :function (sender){
        this.associateProperties(sender);
    },

    onExportToExel: function () {
        this.exportToExel();
    },
    
    onAddCode: function(){
        this.addCode();
    },
    
    onDeleteCode: function(){
        this.deleteCode();
    },
    
    onUpFilter: function(button, item){
        this.goUp(item);
    },
    
    onDownFilter: function(button, item){
        this.goDown(item);
    },

    // ==========================================================================
    // Methods
    // ==========================================================================
    
    associateProperties: function (sender){
        var win = sender.up('window');
        var grid = win.down('propertyGridPanel');
        var selectedRows = grid.getSelection();
                
        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var winTarget = Ext.ComponentQuery.query('referenceCreate')[0];

        if (winTarget === undefined) {
            winTarget = Ext.ComponentQuery.query('referenceEdit')[0];
        }
        
        selectedRows.forEach(function (property) {
            winTarget.addProperty(property);
        });
       
        win.close(); 
    },
    
    getFilters: function(){
        
        var filtersList = Dashboard.manager.FiltersManager.getFiltersListByFeature(this.feature);
        return filtersList;
    },

    getSelection: function () {

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

    loadDetail: function () {

        if (!this.getSelection()) {
            return;
        }

        var id = this.getSelection().data.id;
        Dashboard.manager.administration.ReferencesManager.getReference(id, this, 'displayDetail');
    },

    displayDetail: function (record) {

        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
        
        try {
            detailContainer.removeAll();
            detailContainer.add(
                {
                    xtype: 'referenceDetail'
                }
            );
            detailContainer.down('referenceDetail').setData(record.data);
        } catch (ex) {
            Dashboard.tool.Utilities.error('[reference.MainController.displayDetail] error : ' + ex);
        }
    },
    
    
    cleanDetail: function (record){
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('referenceDetail').clean();
    },
    
    
    addCode: function(){
        this.windowAddCode = Ext.create('Dashboard.view.shared.component.AddCodeWindow');
        
        this.windowAddCode.down('button[action=addCode]').on('click', function (me) {
            this.addNewCode(me);
        }, this);
        
        this.windowAddCode.show();
    },
    
    
    addNewCode: function(sender){
        
        var win = sender.up('window');
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var data = win.getData();
        var dataGrid = this.getView().down('grid[name=codesGrid]');
        var store = dataGrid.getStore();
        
        var found = false;
        for(var i = 0; i < store.data.items.length; i++) {
            if (store.data.items[i].data.code === data.code) {
                found = true;
                break;
            }
        }
        if(!found){
            store.add(data);
            win.close();
        }else{
            Ext.Msg.show(
                {
                    title: getText('Error'), 
                    msg: getText('This code already exists'),
                    buttons: Ext.Msg.OK, 
                    icon: Ext.Msg.ERROR
                }
            );
        }
        
    },
    
    
    deleteCode: function(){
        var dataGrid = this.getView().down('grid[name=codesGrid]');
        var selectedRows = dataGrid.getSelection();
        
        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        } 
        
        dataGrid.store.remove(selectedRows);
        dataGrid.updateLayout();
    },
    

    enableButtons: function () {
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },

    create: function () {

        this.windowCreate = Ext.create('Dashboard.view.administration.reference.Create');
        this.windowCreate.show();
    },
    
    editMultiple: function (ids) {
        this.windowEditMultiple = Ext.create('Dashboard.view.administration.reference.EditMultiple', {
            autoShow: false,
            ids: ids
        });
        this.windowEditMultiple.show();
    },

    edit: function (model) {
        this.windowEdit = Ext.create('Dashboard.view.administration.reference.Edit', {
            autoShow: false,
            record: model.data
        });
        this.windowEdit.show();

        this.windowEdit.setData(model.data);
    },

    doDelete: function () {
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
    
    confirmDeleteMultiple: function (selectionMultiple) {
        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete these items')  +' ?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    try {
                        var idsArray = [];
                        selectionMultiple.forEach(function (selection) {
                            var selectionId = selection.data.id;
                            idsArray.push(selectionId);
                        });
                        Dashboard.manager.administration.ReferencesManager.deleteMultiple(idsArray, this, 'refresh');
                    } catch (ex) {
                        Ext.Msg.alert(getText('Warning'), getText('Error with multiple action'));
                    }
                    try {
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'referenceDetail'
                        });
                    } catch (ex) {
                    }
                }
            }
        });
    },

    confirmDelete: function (selection) {

        var selectionId = selection.data.id;

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete ') + " \"" + selection.data.referenceCode + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.getManager().deleteReference(selectionId, this, 'refresh');

                    try {
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'referenceDetail'
                        });
                    } catch (ex) {
                    }
                }
            }
        });
    },
    
    doDuplicate: function () {
        var viewList = this.getView().down('viewList');
        var grid = viewList.down('viewListGrid');

        if (grid === null) {
            var selection = this.getSelection();
            if (selection) {
                this.confirmDuplicate(selection);
            } else {
                Ext.Msg.alert(getText('Warning'), getText('No element selected'));
            }
            return;
        }

        var selectedRows = grid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        } else {
            this.confirmDuplicate(selectedRows[0]);
        }
    },
    
    confirmDuplicate: function (selection) {
        var selectionId = selection.data.id;

        Ext.Msg.show({
            title: getText('Duplicate'),
            msg: getText('Do you really want to duplicate ') + " \"" + selection.data.designation + "\" ? <br>"
                    + getText('Dynamic properies configuration are not be duplicated'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.getManager().getReference(selectionId, this, 'onDuplicateRefrence');
                }
            }
        });
    },

    onDuplicateRefrence: function (model) {
        var filterLocations = [];

        if (model.data.assignedLocForPositions.length > 0) {
            model.data.assignedLocForPositions.forEach(function (location) {
                filterLocations.push(location.locationId);
            });
        }

        var locationStore = Ext.create('Dashboard.store.administration.Locations', {
            autoLoad: false
        });

        var me = this;
        locationStore.on('load', function (store, records, successful, eOpts) {
            if (successful) {
                records.forEach(function (record) {
                    for (var i = 0; i < model.data.assignedLocForPositions.length; i++) {
                        if (model.data.assignedLocForPositions[i].locationId === record.id) {
                            model.data.assignedLocForPositions[i].location = record.data;
                        }
                    }
                });

            } else {
                Dashboard.tool.Utilities.error('[reference.MainController.onDuplicateRefrence] loading error');
            }
            me.duplicate(model);
        });

        locationStore.load(); // async
    },

    duplicate: function (model) {
        // Remove ref. defined prop config
        model.data.productReferencePropertyConfigurationList = [];
        
        this.windowCreate = Ext.create('Dashboard.view.administration.reference.Create', {
            autoShow: false,
            record: model.data
        });

        this.windowCreate.setData(model.data);
        this.windowCreate.show();
    },

    refresh: function () {
        var store = Ext.ComponentQuery.query('referenceMain')[0].store;
        store.load();
        this.cleanDetail();
    },
    
    onUpdateMultiple: function (sender) {
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
        console.log(data);

    },

    save: function (win) {

        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        var data = win.getData();
        var model = Ext.create('Dashboard.model.ReferenceCreate', data);
        
        this.getManager().save(model, this, 'doPostSaveAction');
    },

    update: function (win) {

        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        var data = win.getData();
        var model = Ext.create('Dashboard.model.ReferenceCreate', data);

        this.getManager().update(model, this, 'doPostEditAction');

    },

//    onSelectLocation: function (positionId, locationId) {
//        this.shopPositionId = positionId;
//        this.getLocation(locationId);
//    },

    onSelectLocation: function(win){

        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var data = win.getData();
        win.close();

        var currentWinForm  = null;
        
        if(Ext.ComponentQuery.query('referenceCreate').length > 0){
            currentWinForm = Ext.ComponentQuery.query('referenceCreate')[0];
            
        }else if(Ext.ComponentQuery.query('referenceEdit').length > 0){
            currentWinForm = Ext.ComponentQuery.query('referenceEdit')[0];
            
        }else if(Ext.ComponentQuery.query('referenceEditMultiple').length > 0){
            currentWinForm = Ext.ComponentQuery.query('referenceEditMultiple')[0];
        }
        if(!currentWinForm){
            Dashboard.tool.Utilities.error('[reference.MainController.addLocationToList] Failed getting window');
            return;
        }

        var grid = currentWinForm.down('grid[name=locationsGrid]');

        if (grid !== null && grid !== undefined) {
            var store = grid.store;
            var found = false;
            for (var i = 0; i < store.data.items.length; i++) {
                if (store.data.items[i].data.id === data.location.id) {
                    found = true;
                    break;
                }
            }
            // If not already in list
            if (!found) {
                store.add({
                    id: data.location.id,
                    address: data.location.data.address,
                    parentPosition: data.position.data
                });
            }
        }
    },

    doPostSaveAction: function (model, message) {
                
        var win = Ext.ComponentQuery.query('referenceCreate')[0];
                
        var result = this.saveFoldersAndFiles(model, message);
        
        if(result === null){
            Dashboard.engine.ResponseManager.showSuccess(message);
            win.close();
            this.refresh();
            Dashboard.manager.administration.ReferencesManager.getOne(model.data.id, this, 'displayDetail');
            return;
        }

    },

    doPostEditAction: function (model, message) {
        
        var win = Ext.ComponentQuery.query('referenceEdit')[0];
                
        var result = this.saveFoldersAndFiles(model, message);
        
        if(result === null){
            Dashboard.engine.ResponseManager.showSuccess(message);
            win.close();
            this.refresh();
            Dashboard.manager.administration.ReferencesManager.getOne(model.data.id, this, 'displayDetail');
            return;
        }
        
    },

    
    saveFoldersAndFiles: function(model, message){
                
        var attachedFilesSelection = Ext.ComponentQuery.query('attachedFilesSelection')[0];
        
        if(attachedFilesSelection === undefined || !attachedFilesSelection){
            return null;
        }
        
        var forms = attachedFilesSelection.getFormsList();
        var formsNumber = forms.length;
        
        this.saveFiles(model, message, forms, formsNumber);
            
    },
    
    
    saveFiles : function(model, message, forms, formsNumber){
                
        var attachedFilesSelection = Ext.ComponentQuery.query('attachedFilesSelection')[0];
                
        if(!forms || forms.length < 1 ){
            Dashboard.engine.ResponseManager.showSuccess(message);
            
            var win = Ext.ComponentQuery.query('referenceEdit')[0];
                        
            if(!win){
                win = Ext.ComponentQuery.query('referenceCreate')[0];
            }
            
            if(!win){
                return;
            }
            
            win.close();
            
            if(attachedFilesSelection){
                attachedFilesSelection.destroy();
            }
            
            this.refresh();
            Dashboard.manager.administration.ReferencesManager.getReference(model.data.id, this, 'displayDetail');
            return;
        }

        var formPanel = forms[0];
        //var folderName = formPanel.down('combobox[reference=folderName]').getValue();
            
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/PRODUCT_REFERENCE/multiple/' + model.data.id;
                
//        if(folderName && folderName !== '' && folderName !== getText('Mixed')){
//            url += '/' + folderName;
//        }
                        
        //var token = Dashboard.manager.administration.UsersManager.getToken();
        //var token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken(callback, this);
        
        var file = formPanel.down('filefield').fileInputEl.dom.files[0];
        var data = new FormData();
        data.append('file', file);
        
        var box = Ext.MessageBox.wait(getText('Uploading'));
        
        Ext.Ajax.request({
           url: url,
           rawData: data,
           headers: {
               'Content-Type':'multipart/form-data'//,
               //Authorization: 'Bearer ' + token
           },
           scope: this,
           success: function(response, result){ 
               
                box.hide();

                var index = this.getFormIndexByFormId(forms, formPanel.formId);
                if (index > -1) {
                  forms.splice(index, 1);
                }
                
                //prevents infinite loops
                formsNumber -= 1;
                if(formsNumber > -1){
                    this.saveFiles(model, message, forms, formsNumber);
                }

           },
           failure: function(response, result){ 
               
                box.hide();
                
                //CORS patch
                var response = result.response.responseText;
                if(response.indexOf('Blocked a frame with origin') !== -1){
                    
                    var index = this.getFormIndexByFormId(forms, formPanel.formId);
                    if (index > -1) {
                      forms.splice(index, 1);
                    }
                    
                    ////prevents infinite loops
                    formsNumber -= 1;
                    if(formsNumber > -1){
                        this.saveFiles(model, message, forms, formsNumber);
                    }

                }else{
                    Ext.Msg.alert('Failed', result.result ? result.result.message : getText('No response'));
                }
           }
        });
        
//        formPanel.submit({
//
//            url: url,
//            scope: this,
//            waitMsg: getText('Uploading'),
//
//            success: function (form, action){
//                
//                var index = this.getFormIndexByFormId(forms, formPanel.formId);
//                if (index > -1) {
//                  forms.splice(index, 1);
//                }
//                
//                //prevents infinite loops
//                formsNumber -= 1;
//                if(formsNumber > -1){
//                    this.saveFiles(model, message, forms, formsNumber);
//                }
//            },
//
//            failure: function (form, action){
//                                                
//                //CORS patch
//                var response = action.response.responseText;
//                if(response.indexOf('Blocked a frame with origin') !== -1){
//                    
//                    var index = this.getFormIndexByFormId(forms, formPanel.formId);
//                    if (index > -1) {
//                      forms.splice(index, 1);
//                    }
//                    
//                    ////prevents infinite loops
//                    formsNumber -= 1;
//                    if(formsNumber > -1){
//                        this.saveFiles(model, message, forms, formsNumber);
//                    }
//
//                }else{
//                    Ext.Msg.alert('Failed', action.result ? action.result.message : getText('No response'));
//                }
//            }
//        });
    },
    
    
    getFormIndexByFormId: function(forms, formId){
                
        for(var i = 0; i< forms.length; i++){
            if(forms[i].formId === formId){
                return i;
            }
        }
        
        return -1;
    },
    

    addLocation: function (selection) {
        this.locationsSelectWindow = Ext.create('Dashboard.view.administration.reference.AssignedLocationSelector', {
            autoShow: true,
            parentController: this
        });
    },

    deleteLocation: function (dataGrid) {
        var selectedRaws = dataGrid.getSelection();

        if (selectedRaws.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        dataGrid.store.remove(selectedRaws);
        dataGrid.updateLayout();

    },
    
    goUp: function(item){
        this.moveSelectedRow(item, -1);
    },
            
    
    goDown: function(item){
        this.moveSelectedRow(item, 1);
    },
            
            
    moveSelectedRow: function(item, direction) {
        
        if (!item) {
            return;
        }
        
        var panel = item.up('panel');

        var index = panel.items.indexOf(item);
        if (direction < 0) {
            index--;
            if (index < 0) {
                index = panel.items.getCount();
            }
        } else {
            index++;
            if (index >= panel.items.getCount()) {
                index = 0;
            }
        }
        
        panel.insert(index, item);
    },
    
    // ==================================================
    // THUMBNAILS
    // ==================================================

    openThumbnailEditor: function (event) {
        Dashboard.manager.administration.FilesManager.openThumbnailEditor(this);
    },
            
    closeThumbnailEditor: function () {
        Dashboard.manager.administration.FilesManager.closeThumbnailEditor();
    },
            
    deleteThumbnail: function (event) {

        var win = event.up('window');
        win.setThumbnail(null);

        win.record.picture = {
            thumbnailName: '',
            pictureName: ''
        };
    },
    
    // ==================================================
    // ATTACHED FILES
    // ==================================================
    
    onAddFiles: function (event){
        
        var winSelector = event.up('window');
        if(!winSelector){
            // Error message
            return;
        }
        
        var data = winSelector.getData();
        winSelector.hide();
        
        if(!data){
            return;
        }
        
        // Find attachment panel
        var winCreate = Ext.ComponentQuery.query('referenceCreate')[0];
        if (winCreate === undefined) {
            var winEdit = Ext.ComponentQuery.query('referenceEdit')[0];
        }
        
        
//        var filesForm = attachedFilesSelectionWindow.items.items['0'];
//        var fileInputPanels = filesForm.items.items['0'].items.items;
        
        if (winCreate) {
            winCreate.attachmentFilesStore.removeAll(); // clean grid
            
        } else if (winEdit) {
            var records = winEdit.attachmentFilesStore.getData();
            records.items.forEach(function (record) {
                if (record.data.isSaved === false) {
                    winEdit.attachmentFilesStore.remove(record); // remove unSynced elements
                }
            });
        }
        
        var win = winCreate || winEdit;

        data.forEach(function (file) {
            
            if (file.name !== '') {
                
                if(!file.folderName){
                    file.folderName = getText('Mixed');
            }
                
                win.attachmentFilesStore.add(file);
            }
            
//            var fullFilePath = panel.items.items['0'].value;
//            var id = panel.items.items['0'].id;
//            var filename = fullFilePath.replace(/^.*[\\\/]/, '');
//            filename = filename.trim();
//            if (filename !== '') {
//                win.attachmentFilesStore.add({
//                    name: filename,
//                    id: id,
//                    refId: id,
//                    isSaved: false
//                });
//            } else {
//                panel.ownerCt.remove(panel);
//            }
        });
    },
            
    // =========================================
    // DYNAMIC PROPERTIES
    // =========================================

    createProperty: function (type) {
                
        // V1 : ONLY MATERIAL
        
        var win = Ext.create('Dashboard.view.shared.property.Create', {
            mainController: this,
            typeOfValidation: type, //  PRODUCTREFERENCE | MATERIAL | ALL
            owner: 'PRODUCT_REFERENCE'
        });
        // win.down('combo[reference=valorisation]').hidden = true;
        win.show();
    },
    
    assignProperty: function (type) {
        var win = Ext.create('Dashboard.view.shared.property.Selector', {
            parentController: this,
            type: type,  
            typeOfValidation: type //  PRODUCTREFERENCE | MATERIAL | ALL
        });

        win.show();
    },
    
    editProperty: function (property) {
        var win = Ext.create('Dashboard.view.shared.property.Edit', {
            mainController: this,
            record: property.data
        });
        win.show();
        win.setData(property);
    },
            
    doDeleteProperty: function (model) {

        var id = model.data.id;
        Dashboard.manager.system.DynamicPropertiesManager.deleteProperty(id);

    },
            
    closePropertyCreateWindow: function () {
        var win = Ext.ComponentQuery.query('propertyCreate')[0];
        if (win !== undefined) {
            win.close();
        }
    },
            
    closePropertyEditWindow: function () {
        var win = Ext.ComponentQuery.query('propertyEdit')[0];
        if (win !== undefined) {
            win.close();
        }
    },
            
    doPostActionSaveProperty: function (property) {

        var win = Ext.ComponentQuery.query('referenceCreate')[0];

        if (win === undefined) {
            win = Ext.ComponentQuery.query('referenceEdit')[0];
        }

        win.addProperty(property);
        this.closePropertyCreateWindow();
    },
            
    doPostActionEditProperty: function (property) {

        var win = Ext.ComponentQuery.query('referenceCreate')[0];

        if (win === undefined) {
            win = Ext.ComponentQuery.query('referenceEdit')[0];
        }

        win.updateProperty(property);
        this.closePropertyEditWindow();
    },
    
    generateFieldInput: function (control, propertyConfiguration) {
        
        if (control !== undefined && control.field && control.field.fieldType) {
            
            var type = control.field.fieldType;
            var fieldType = Dashboard.store.properties.FieldTypes[type];
            var controller = Ext.create('Dashboard.view.shared.property.' + fieldType.className);
            
            var field = controller.buildFormField(propertyConfiguration, control);
            //set allowBlank = true to save
            if (field.items[0].fieldType === 'datetimefield') {
                field.items[0].items[0].allowBlank = true;
                field.items[0].items[1].allowBlank = true;

            } else if (field.items[0].allowBlank === undefined || field.items[0].allowBlank === null) {
                field.items[0].allowBlank = true;
            }

            return field;
        }
        return null;
    },
    
    /**
     * Add inherited properties into form create or edit reference
     * 
     * @param {type} reference
     * @returns {undefined}
     */
    buildFields: function (reference) {
        
        var win = Ext.ComponentQuery.query('referenceCreate')[0];
        
        if (win === undefined) {
            win = Ext.ComponentQuery.query('referenceEdit')[0];
        }
        if (win === undefined) {
            win = Ext.ComponentQuery.query('referenceEditMultiple')[0];
        }
        
        win.removeAllFields();
        
        var propertyConfigurationList = reference.data.productReferencePropertyConfigurationList;
        var inheritedPropertyConfigurationList = reference.data.inheritedProductReferencePropertyConfigurationList;
        var allPropertyConfigurationList = propertyConfigurationList.concat(inheritedPropertyConfigurationList);

        for (var i = 0; i < allPropertyConfigurationList.length; i++) {
            
            var property = Ext.create('Dashboard.model.PropertyConfiguration', allPropertyConfigurationList[i]);

            var control = Dashboard.model.PropertyConfiguration.getControl(property);
            
            var field = this.generateFieldInput(control, property.data);
            
            if (field !== null) {
                win.addField(field);
            } else {
                Dashboard.tool.Utilities.error('[reference.MainController.buildFields] unable to add field');
            }
        }
        
        try {
            win.setRefrenceFields();
        } catch (ex) {
            Dashboard.tool.Utilities.error('[reference.MainController.buildFields] error: ' + ex);
        }
        
        this.fillFields();
    },
            
    fillFields: function () {
        var data = this.getView().record;

        if (!data) {
            return;
        }

        var properties = data.properties;
        
        Ext.each(properties, function (property) {
            
            var field = this.getView().query('field[name=' + property.name + ']')[0];
                        
            //simple field
            if (field !== undefined) {
                
                field.setValue(property.value);
                
            } else {
                // complex fileds
                if (property.configuration.type === 'DATETIME') {
                    
                    var container = this.getView().query('container[name=' + property.name + ']')[0];
                    
                    if (container && moment(property.value).isValid()) {
                        var dateTime = moment(property.value).toDate(); // IE is crap
                        container.items.items.forEach(function (field) {
                            field.setValue(dateTime);
                        });
                    }
                }
            }
        }, this);
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
            link= '/productreference/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/productreference/export';
        }
        //var link = '/productreference/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function () {
        return  Ext.ComponentQuery.query('referenceMain')[0];
    }

});
