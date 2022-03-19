/* global Ext, moment  */

Ext.define('Dashboard.view.administration.material.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.materialMain',

    require: [],

    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'MAT_ADMIN', 0, false, true, true),

    windowEdit: null,
    windowCreate: null,
    windowEditMultiple: null,
    selection: null,
    
    telemetryDataSelectionWindow: null,

    init: function (){
                
        this.control({

            // Selected item in dataGrid
            'materialMain viewListGrid': {
                itemclick: this.onSelectItem
            },
            'materialMain viewListAlbum > dataview': {
                itemclick: this.onSelectItem
            },
            'materialMain viewListList': {
                itemclick: this.onSelectItem
            },
            
            
            // 'materialMain viewList[action=onAdd]': {click: this.onSelectItem},

            // Create window
            'materialCreate button[action=save]': {
                click: this.onSave
            },
            'materialCreate button[action=selectThumbnail]': {
                click: this.openThumbnailEditor
            },
            'materialCreate button[action=deleteThumbnail]': {
                click: this.deleteThumbnail
            },
            'materialCreate button[action=close]': {
                click: this.closeThumbnailEditor
            },
            
                      
            // // Edit window
            'materialEdit button[action=save]': {
                click: this.onUpdate
            },
            'materialEdit button[action=selectThumbnail]': {
                click: this.openThumbnailEditor
            },
            'materialEdit button[action=deleteThumbnail]': {
                click: this.deleteThumbnail
            },
            'materialEdit button[action=close]': {
                click: this.closeThumbnailEditor
            }
        });

        // Set filter values 
        // this.setFilterValues();
    },
    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onRenderMain: function (sender){

        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[material.MainController.onRenderMain] configuration null or empty !');
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

    onEdit: function (sender){
                
        var viewList = this.getView().down('viewList');
        var grid = viewList.down('viewListGrid');

        if (grid === null) {
            if (this.getSelection()) {
                var id = this.getSelection().data.id;
                Dashboard.manager.administration.MaterialManager.getOne(id, this, 'edit');
            }
            return;
        }

        var selectedRows = grid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
            
        } else if (selectedRows.length === 1) {
            var id = selectedRows[0].data.id;
            Dashboard.manager.administration.MaterialManager.getOne(id, this, 'edit');
            
        } else {
             this.editMultiple(selectedRows);
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

    onUpdate: function (sender){
        var win = sender.up('window');
        this.update(win);
    },
    
    onUpdateMultiple: function (sender){
        var win = sender.up('window');
        this.updateMultiple(win);
    },

    onReferenceSelected: function (sender){
        if (sender.getSelection()) {
            var id = sender.getSelection().data.id;
            Dashboard.manager.administration.ReferencesManager.getReference(id, this, 'buildFields');
        }
    },
    
    onAddTelemetryData : function(sender) {
        this.addTelemetryData();
    },
    
    onDeleteTelemetryData: function(sender){
        var win = sender.up('window');
        var grid = win.down('grid[name=telemetryDataGrid]');
        this.deleteTelemetryData(grid);
    },
    
    onSelectTelemetryData: function (sender){
        this.selectTelemetryData(sender);
    },

    onFilter: function (){

        alert('open filters');

    },

    onExportToExel: function (){
        this.exportToExel();
    },
    
    onAddCode: function(){
        this.addCode();
    },
    
    onDeleteCode: function(){
        this.deleteCode();
    },

    onDeleteFile: function (sender){
        
        var win = sender.up('window');
        var dataGrid = win.down('grid[name=attachmentGrid]');

        var selectedRaws = dataGrid.getSelection();

        if (selectedRaws.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        // if file not saved only remove from list
        if (selectedRaws['0'].data.isSaved === false) {
            // Remove file locally
            try {
                
                var records = win.attachmentFilesStore.getData();
                
                records.items.forEach(function (record){
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

        // Else file saved into server
        
        var id = selectedRaws['0'].data.refId;
        var file = selectedRaws['0'].data.file;
        var folderName = selectedRaws['0'].data.folderName;

        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/MATERIAL/' + id + '/' + file;

        var defaultFolder = getText('Mixed');

        if(folderName && folderName !== '' && folderName !== defaultFolder){
            url += '/' + folderName;
        }

        // Delete File AJAX
        Ext.Ajax.request({
            url: url,
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'DELETE',
            success: function (response, opts){
                dataGrid.store.remove(selectedRaws['0']);
                dataGrid.updateLayout();
                Dashboard.engine.ResponseManager.showSuccess(getText('File deleted successfully'));
            },
            failure: function (response, opts){
                Dashboard.engine.ResponseManager.showFailure(getText('Failed deleting file'));
            }
        });
    },

    onDuplicate: function (){
        this.doDuplicate();
    },

    // ==========================================================================
    // Methods
    // ==========================================================================

    setFilterValues: function (){
        try {
            var main = this.getMain();
            var store = main.store;
            var filters = store.proxy.extraParams.filter; // [comparison:"EQ" / property:"name" / value:"Pince"]

            if (filters.length > 0) {
                Ext.getCmp('filtersBar').setFiltersValue(filters);
            }
        } catch (e) {
            Dashboard.tool.Utilities.error('[material.MainController.setFilterValues] Failed to load filters');
        }
    },
    
    getFilters: function(){
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
        Dashboard.manager.administration.MaterialManager.getOne(id, this, 'displayDetail');
    },

    displayDetail: function (record){
                
        try {
            var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
            detailContainer.removeAll();
            detailContainer.add(
                {
                    xtype: 'materialDetail'
                }
            );
        
            detailContainer.down('materialDetail').setData(record.data);
            
        } catch (ex) {
            Dashboard.tool.Utilities.error('[material.MainController.displayDetail] error : ' + ex);
        }
    },
   

    cleanDetail: function (record){
        Ext.ComponentQuery.query('materialMain')[0].down('materialDetail').clean();
    },

    enableButtons: function (){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },

    create: function (){

        this.windowCreate = Ext.create('Dashboard.view.administration.material.Create');
        this.windowCreate.show();
    },

    editMultiple: function (selectedRows){
                
        var canEditProperties = true;
        var referenceId = selectedRows[0].data.productReference.id;
        
        var ids = selectedRows.map(function (selection) {
            var id = selection.data.id;
            
            if(canEditProperties === true && selection.data.productReference.id !== referenceId){
                canEditProperties = false;
            }
            return id;
         });
        
        this.windowEditMultiple = Ext.create('Dashboard.view.administration.material.EditMultiple', {
            autoShow: false,
            ids: ids,
            canEditProperties: canEditProperties
        });
        
        this.windowEditMultiple.down('button[action=save]').on('click', 'onUpdateMultiple');
        
        Dashboard.manager.administration.ReferencesManager.getReference(referenceId, this, 'buildFields');
        
        this.windowEditMultiple.show();
    },
    

    edit: function (model){
        this.windowEdit = Ext.create('Dashboard.view.administration.material.Edit', {
            autoShow: false,
            record: model.data
        });
        this.windowEdit.show();

        this.windowEdit.setData(model.data);
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
                        Dashboard.manager.administration.MaterialManager.deleteMultiple(idsArray, this, 'refresh');
                    } catch (ex) {
                        Ext.Msg.alert(getText('Warning'), getText('Error with multiple action'));
                    }
                    try {
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'materialDetail'
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
            msg: getText('Do you really want to delete ') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn){
                if (btn === 'yes') {
                    Dashboard.manager.administration.MaterialManager.deleteMaterial(selectionId, this, 'refresh');

                    try {
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'materialDetail'
                        });
                    } catch (ex) {
                    }
                }
            }
        });
    },

    doDuplicate: function (){
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

    confirmDuplicate: function (selection){
        var selectionId = selection.data.id;

        Ext.Msg.show({
            title: getText('Duplicate'),
            msg: getText('Do you really want to duplicate ') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn){
                if (btn === 'yes') {
                    Dashboard.manager.administration.MaterialManager.getOne(selectionId, this, 'onDuplicateMaterial');
                }
            }
        });
    },

    onDuplicateMaterial: function (model){
        
        model.data.code = null; // RFID code is unique
        this.windowCreate = Ext.create('Dashboard.view.administration.material.Create', {
            autoShow: false,
            record: model.data
        });
        
        this.windowCreate.show();

        this.windowCreate.setData(model.data);
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
            
            if(!this.usedCodeType(data)){
                store.add(data);
            }else{
                Ext.Msg.show(
                    {
                        title: getText('Warning'), 
                        msg: getText('This code type already exists. Would you like to replace it?'),
                        buttons: Ext.Msg.YESNO, 
                        icon: Ext.Msg.QUESTION,
                        fn: function(btn) {
                            if (btn === 'yes') {
                                var codesGrid = Ext.ComponentQuery.query('grid[name=codesGrid]')[0];
                                var store = codesGrid.getStore();
                                var code = store.findRecord('codeType', data.codeType);
                                
                                store.remove(code);
                                store.add(data);
                                
                            } else if (btn === 'no') {
                                //do nothing
                            }
                        }
                    }
                );
            }
            
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
    
    
    usedCodeType: function(code){
        
        var codeTypes = [];
        var codesGrid = this.getView().down('grid[name=codesGrid]').store.data.items;
        if (codesGrid && codesGrid.length > 0) {
            
            Ext.each(codesGrid, function(raw){
                if(raw.data.codeType){
                    codeTypes.push(raw.data.codeType);
                }
            });
        }
        
        if(Ext.Array.contains(codeTypes, code.codeType)){
            return true;
        }
        
        return false;
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
    

    refresh: function (){
        var store = Ext.ComponentQuery.query('materialMain')[0].store;
        store.reload();
        //this.loadDetail();
        this.cleanDetail();
    },
        

    save: function (win){

        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
                
        var data = win.getData();
        var material = Ext.create('Dashboard.model.MaterialCreate', data);
        Dashboard.manager.administration.MaterialManager.save(material, this, 'doPostSaveAction');
    },
    

    update: function (win){

        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var data = win.getData();
        var material = Ext.create('Dashboard.model.MaterialCreate', data);
        Dashboard.manager.administration.MaterialManager.update(material, this, 'doPostEditAction');
    },
    
    
    updateMultiple: function(win){
        
        var list = win.getData();
        Dashboard.manager.administration.MaterialManager.updateMultiple(list, this, 'doPostEditMultiple');
        
    },
    
    doPostEditMultiple: function (message){

        Dashboard.engine.ResponseManager.showSuccess(message);
        var win = Ext.ComponentQuery.query('materialEditMultiple')[0];
        win.close();
        this.refresh();
    },
    

    doPostSaveAction: function (model, message){
                
        var win = Ext.ComponentQuery.query('materialCreate')[0];
                
        var result = this.saveFoldersAndFiles(model, message);
        
        if(result === null){
            Dashboard.engine.ResponseManager.showSuccess(message);
            win.close();
            this.refresh();
            Dashboard.manager.administration.MaterialManager.getOne(model.data.id, this, 'displayDetail');
            return;
        }
    },


    doPostEditAction: function (model, message){
        
        var win = Ext.ComponentQuery.query('materialEdit')[0];
                        
        var result = this.saveFoldersAndFiles(model, message);
        
        if(result === null){
            Dashboard.engine.ResponseManager.showSuccess(message);
            win.close();
            this.refresh();
            Dashboard.manager.administration.MaterialManager.getOne(model.data.id, this, 'displayDetail');
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
            
            var win = Ext.ComponentQuery.query('materialEdit')[0];
                        
            if(!win){
                win = Ext.ComponentQuery.query('materialCreate')[0];
            }
            
            if(!win){
                return;
            }
            
            win.close();
            
            if(attachedFilesSelection){
                attachedFilesSelection.destroy();
                attachedFilesSelection = null;
            }
            
            this.refresh();
            Dashboard.manager.administration.MaterialManager.getOne(model.data.id, this, 'displayDetail');
            return;
        }

        var formPanel = forms[0];
        var folderName = formPanel.down('combobox[reference=folderName]').getValue();
            
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/MATERIAL/multiple/' + model.data.id;
                
        if(folderName && folderName !== '' && folderName !== getText('Mixed')){
            url += '/' + folderName;
        }

        var token;
        if (Dashboard.manager.administration.UsersManager.getToken()) {
            token = Dashboard.manager.administration.UsersManager.getToken();
        }
        else {
            token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
        }

        var file = formPanel.down('filefield').fileInputEl.dom.files[0];
        var data = new FormData();
        data.append('file', file);
        
        var box = Ext.MessageBox.wait(getText('Uploading'));
        
        Ext.Ajax.request({
           url: url,
           rawData: data,
           headers: {
               'Content-Type':'multipart/form-data',
               Authorization: 'Bearer ' + token
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
    

    // Check TAG for Mantis : 0006797 
    formatRFIDTag: function (rfidTag){
        // Check if tag starts with (3000) 
        var regExStartsWith3000 = new RegExp('^3000');
        if (regExStartsWith3000.test(rfidTag)) {
            Dashboard.tool.Utilities.info('RFID TAG starts with 3000');
            return rfidTag.substr(4); // Remove first 4 bytes
        }
        return rfidTag;
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
            link= '/materials/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/materials/export';
        }
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);  
    },

    getMain: function (){
        return  Ext.ComponentQuery.query('materialMain')[0];
    },

    // ==================================================
    // THUMBNAILS
    // ==================================================

    openThumbnailEditor: function (event){
        Dashboard.manager.administration.FilesManager.openThumbnailEditor(this);
    },

    closeThumbnailEditor: function (){
        Dashboard.manager.administration.FilesManager.closeThumbnailEditor();
    },

    deleteThumbnail: function (event){

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

    /**
     * Add files from window to create/edit files list
     * @param {type} event
     * @returns {undefined}
     */
    onAddFiles: function (event){
        
         var winSelector = event.up('window');
        
        if (!winSelector.down('form').isValid()) {
            winSelector.getInvalidFields();
            return;
        }

        var data = winSelector.getData();
        winSelector.hide();
        
        if(!data){
            return;
        }
        
        // Find attachment panel
        var winCreate = Ext.ComponentQuery.query('materialCreate')[0];
        if (winCreate === undefined) {
            var winEdit = Ext.ComponentQuery.query('materialEdit')[0];
        }

        if (winCreate) {
            winCreate.attachmentFilesStore.removeAll(); // clean grid
            
        } else if (winEdit) {
            var records = winEdit.attachmentFilesStore.getData();
            records.items.forEach(function (record){
                if (record.data.isSaved === false) {
                    winEdit.attachmentFilesStore.remove(record); // remove unSynced elements
                }
            });
        }

        var win = winCreate || winEdit;
        
        data.forEach(function (file){

            if (file.name !== '') {
                
                if(!file.folderName){
                    file.folderName = getText('Mixed');
                }
                
                win.attachmentFilesStore.add(file);
            }
        });
        

//        var filesForm = attachedFilesSelectionWindow.items.items['0'];
//        var fileInputPanels = filesForm.items.items['0'].items.items;
//
//        if (winCreate) {
//            winCreate.attachmentFilesStore.removeAll(); // clean grid
//        } else if (winEdit) {
//            var records = winEdit.attachmentFilesStore.getData();
//            records.items.forEach(function (record){
//                if (record.data.isSaved === false) {
//                    winEdit.attachmentFilesStore.remove(record); // remove unSynced elements
//                }
//            });
//        }
//
//        var win = winCreate || winEdit;
//
//        fileInputPanels.forEach(function (panel){
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
//        });
    },

    // =========================================
    // DYNAMIC PROPERTIES
    // =========================================

    /**
     * Add inherited properties into form create or edit material
     * 
     * @param {type} model
     * @returns {undefined}
     */
    buildFields: function (model){
        
        var win = Ext.ComponentQuery.query('materialCreate')[0];
                        
        if (win === undefined) {
            win = Ext.ComponentQuery.query('materialEdit')[0];
        }
        
        if (win === undefined) {
            win = Ext.ComponentQuery.query('materialEditMultiple')[0];
        }

        var propertyConfigurationList = [];
        
        if (model.data.inheritedMaterialPropertyConfigurationList !== undefined) {
            propertyConfigurationList.push.apply(propertyConfigurationList, model.data.inheritedMaterialPropertyConfigurationList);
        }
        
        if (model.data.materialPropertyConfigurationList !== undefined) {
            propertyConfigurationList.push.apply(propertyConfigurationList, model.data.materialPropertyConfigurationList);
        }
        
        win.cleanFields();

        if (!propertyConfigurationList || propertyConfigurationList === undefined) {
            return;
        }

        for (var i = 0; i < propertyConfigurationList.length; i++) {
            
            //try {
               
                var property = Ext.create('Dashboard.model.PropertyConfiguration', propertyConfigurationList[i]);
                
                var control = Dashboard.model.PropertyConfiguration.getControl(property);
                
                if (control !== undefined) {
                    var type = control.field.fieldType;
                    var fieldType = Dashboard.store.properties.FieldTypes[type];
                    
                    var link = fieldType.className;
                    if(property.data.origin && property.data.origin === 'TELEMETRY'){
                        link = 'TelemetryFieldForm';
                    }
                    
                    var controller = Ext.create('Dashboard.view.shared.property.' + link, {
                        property: property
                    });
                                        
                    var field = controller.buildFormField(property.data, control, null, model); //, property.data.value
                    
                    win.addField(field);
                }

//            } catch (ex) {
//                Dashboard.tool.Utilities.error('[material.MainController.buildFields] control.field.fieldType undefined !' + ex);
//            }
        }

        this.fillFields();
    },

    fillFields: function (){
        var data = this.getView().record;

        if (!data) {
            return;
        }

        var properties = data.properties;

        Ext.each(properties, function (property){
                        
            var field = this.getView().query('component[tag=property][name=' + property.name + ']')[0];
            
            if (field !== undefined) {
                
                this.updateTelemetryData(field, property);
                
                var val = property.value;
                if ((val !== null && val !== undefined) && val !== '') {
                    if (field.xtype === 'datefield') {
                        val = new Date(val);
                        field.setValue(val);
                    } else if (field.fieldType === 'datetimefield') {
                        try {
                            if (moment(val).isValid()) {
                                var datetime = moment(val).toDate(); // THROWS UGLY WARNING if not ISO
                                if (datetime) {
                                    field.down('field[xtype=datefield]').setValue(datetime);
                                    field.down('field[xtype=timefield]').setValue(datetime);
                                } else {
                                    Dashboard.tool.Utilities.error('[material.MainController.buildFields] datetimefield unable to parse date');
                                }
                            }
                        } catch (ex) {
                            // Nothing
                        }
                    } else {
                        field.setValue(val);
                    }
                }
            }

        }, this);
    },
    
    
    updateTelemetryData: function(field, materialProperty){
        
        var fieldContainer = field.up('container[reference=fieldContainer]');
        if(!fieldContainer){
            return;
        }
        
        var property = fieldContainer.down('textfield[tag=property]').property;
        
        if(materialProperty.sensorId && property){
            property.sensorId = materialProperty.sensorId;
        }
        
        var sensorType = getText('Undefined');
                                            
        if(materialProperty.sensorId && materialProperty.configuration.options && materialProperty.configuration.options.sensortype){
            sensorType = materialProperty.configuration.options.sensortype;
        }

        var toolTipText = getText('Sensor') + getText(':') + ' ' + sensorType;
        var infoButton = fieldContainer.down('button[name=infoButton]');
        infoButton.setTooltip(toolTipText);
                
//        var deleteButton = fieldContainer.down('button[name=deleteButton]');        
//        if(property.options && property.options.sensortype){
//            deleteButton.setVisible(true);
//        }else{
//            deleteButton.setVisible(false);
//        }
        
    },
    
    
    doPostActionSaveProperty: function(model){
        alert('post Save property');
    },
    
    
    // ==================================================
    // Telemetry Data
    // ==================================================
    
    selectTelemetryData: function(sender){

        var win = sender.up('window');
        var gridSelector = win.down('telemetryDataGridPanel');
        var selectedRows = gridSelector.getSelection();
        
        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
                
        var createWindow = Ext.ComponentQuery.query('materialCreate');
        var editWindow = Ext.ComponentQuery.query('materialEdit');
        var editMultipleWindow = Ext.ComponentQuery.query('materialEditMultiple');
        var grid = null;

        if(createWindow.length > 0){
            grid = createWindow[0].down('grid[name=telemetryDataGrid]');
        }else if(editWindow.length > 0){
            grid = editWindow[0].down('grid[name=telemetryDataGrid]');
        } else if (editMultipleWindow.length > 0) {
            grid = editMultipleWindow[0].down('grid[name=telemetryDataGrid]');
        }
        
        if(grid !== null){
            var store = grid.store;
            Ext.each(selectedRows, function(row) {
                var found = false;
                for(var i = 0; i < store.data.items.length; i++) {
                    if (store.data.items[i].data.id === row.data.id) {
                        found = true;
                        break;
                    }
                }
                if(!found){
                    store.add(row);
                }
            });

            grid.updateLayout();
        }
        win.close();
    },
    
    
    addTelemetryData: function(selection){
        this.telemetryDataSelectionWindow = Ext.create('Dashboard.view.administration.telemetryData.Selector', {
            autoShow: true,
            parentController: this
        });
    },
    
    deleteTelemetryData: function(dataGrid){
        var selectedRaws = dataGrid.getSelection();

        if (selectedRaws.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        dataGrid.store.remove(selectedRaws);
        dataGrid.updateLayout();

    }

});