/* global Ext, moment  */

Ext.define('Dashboard.view.administration.user.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userMain',
    
    require: [],
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'USER_ADMIN', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    selection: null,
    selectionMultiple: null,

    telemetryDataSelectionWindow: null,

    init: function(){
        this.control({
            // Selected item in dataGrid
            'userMain viewListGrid': {
                itemclick: this.onSelectItem
            },
            'userMain viewListAlbum > dataview': {
                itemclick: this.onSelectItem
            },
            'userMain viewListList': {
                itemclick: this.onSelectItem
            },
            // 'userMain viewList[action=onAdd]': {click: this.onSelectItem},

            // Create window
            'userCreate button[action=save]': {
                click: this.onSave
            },
            'userCreate button[action=selectThumbnail]': {
                click: this.openThumbnailEditor
            },
            'userCreate button[action=deleteThumbnail]': {
                click: this.deleteThumbnail
            },
            'userCreate button[action=close]': {
                click: this.closeThumbnailEditor
            },
            // Edit window
            'userEdit button[action=save]': {
                click: this.onUpdate
            },
            'userEdit button[action=selectThumbnail]': {
                click: this.openThumbnailEditor
            },
            'userEdit button[action=deleteThumbnail]': {
                click: this.deleteThumbnail
            },
            'userEdit button[action=close]': {
                click: this.closeThumbnailEditor
            },
            // Edit multiple
            'userEditMultiple button[action=save]': {
                click: this.onUpdateMultiple
            }

        });
    },
    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onRenderMain: function(sender){
        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[user.MainController.onRenderMain] configuration null or empty !');
        }
    },
            
    onSelectItem: function(sender){
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        this.loadDetail(id);
    },
            
    onCreate: function(sender){
        this.getSecurityConfiguration('onUserCreatePropertiesLoad');
    },

    onEdit: function (sender) {
        var viewList = this.getView().down('viewList');
        var grid = viewList.down('viewListGrid');
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var highProfilecurrentUser = currentUser.data.highProfileLevel;
        if (grid === null) {
            if (this.getSelection()) {
                var id = this.getSelection().data.id;
                Dashboard.manager.administration.UsersManager.getOne(id, this, 'edit');
            }
            return;
        }

        var selectedRows = grid.getSelection();
        var show = false;
        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        for (var i = 0; i < selectedRows.length ; i++) {
            if (highProfilecurrentUser === "LOW" && selectedRows[i].data.highProfileLevel === "LOW") {
                show = true;
            }
            else if (highProfilecurrentUser === "MEDIUM") {
                if(selectedRows[i].data.highProfileLevel === "LOW"|| selectedRows[i].data.highProfileLevel === "MEDIUM") {
                    show = true;
                }
            }
            else if (highProfilecurrentUser === "HIGH") {
                if(selectedRows[i].data.highProfileLevel === "LOW"|| selectedRows[i].data.highProfileLevel === "MEDIUM" || selectedRows[i].data.highProfileLevel === "HIGH") {
                    show = true;
                }
            }
            else if (highProfilecurrentUser === "MAX") {
                if(selectedRows[i].data.highProfileLevel === "LOW"|| selectedRows[i].data.highProfileLevel === "MEDIUM" || selectedRows[i].data.highProfileLevel === "HIGH" || selectedRows[i].data.highProfileLevel === "MAX") {
                    show = true;
                }
            }
            else {
                show = false;
            }
            //break if any is false
            if(show === false) {
                break;
            }
        }
        if (show && selectedRows.length === 1){
            var id = selectedRows[0].data.id;
            Dashboard.manager.administration.UsersManager.getOne(id, this, 'edit');
        } else if (show && selectedRows.length > 1) {
            var ids = selectedRows.map(function (selection) {
                return selection.data.id;
            });
            this.editMultiple(ids);
        } else {
            //show error
            Dashboard.tool.Utilities.privilegeMessage();
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
            
    onAddLocation : function(sender) {
        var win = sender.up('window');
        this.addLocation();
    },
            
    onDeleteLocation: function(sender){
        var win = sender.up('window');
        var grid = win.down('grid[name=locationsGrid]');
        this.deleteLocation(grid);
    }, 
            
    onSelectLocations: function(sender){
       this.selectLocations(sender);
    },
   
    onExportToExel: function (){
        this.exportToExel();
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

            
    // ==========================================================================
    // Methods
    // ==========================================================================

    getFilters: function(){
        
        var filtersList = Dashboard.manager.FiltersManager.getFiltersListByFeature(this.feature);
        return filtersList;
    },
    
            
    getSelection: function(){

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
            
    loadDetail: function(){
        if (!this.getSelection()) {
            return;
        }

        var id = this.getSelection().data.id;
        Dashboard.manager.administration.UsersManager.getOne(id, this, 'displayDetail');
    },
            
    displayDetail: function(record){

        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
        detailContainer.removeAll();
        detailContainer.add( 
            { 
                xtype: 'userDetail' 
            } 
        );
        
        try {
            detailContainer.down('userDetail').setData(record.data);
        } catch (ex) {
            Dashboard.tool.Utilities.error('[user.MainController.displayDetail] error : ' + ex);
        }
    },
    
    cleanDetail: function (record){
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('userDetail').clean();
    },
            
    enableButtons: function(){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },
    
    getSecurityConfiguration: function (callback, model) {
        var parentScope = this;
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/configuration/security',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'GET',
            success: function (response, opts) {
                var responseObj = JSON.parse(response.responseText);
                if (responseObj.success) {                    
                    Dashboard.manager.system.DynamicPropertiesManager.getByConfigurationType(
                            {
                                propertyConfigurationType: 'USER',
                                securityConfiguration: responseObj.data,
                                model: model
                            }, 
                            parentScope, callback);
                } else {
                    throw '[Dashboard.view.administration.user.MainController.getPasswordRegEx] ERROR ' + (responseObj.error || 'null');
                }
            }, failure: function (response, opts) {
                Dashboard.engine.ResponseManager.showFailure(getText('Failed loading security configuration'));
            }
        });
    },
            
    create: function(propertiesConfiguration, securityConfiguration){
        this.windowCreate = Ext.create('Dashboard.view.administration.user.Create', {
            securityConfiguration: securityConfiguration,
            propertiesConfiguration: propertiesConfiguration
        });
         this.windowCreate.show();
    },
    
    onUserCreatePropertiesLoad: function (propertiesConfiguration, securityConfiguration) {
        this.create(propertiesConfiguration, securityConfiguration);
    },
    
    onUserEditPropertiesLoad: function (model, propertiesConfiguration, securityConfiguration) {
        this.windowEdit = Ext.create('Dashboard.view.administration.user.Edit', {
            record: model.data,
            securityConfiguration: securityConfiguration,
            propertiesConfiguration: propertiesConfiguration
        });
        this.windowEdit.show();
    },

    editMultiple: function (ids) {
        this.windowEditMultiple = Ext.create('Dashboard.view.administration.user.EditMultiple', {
            ids: ids
        });
        this.windowEditMultiple.show();
    },
            
    edit: function(model){
        this.getSecurityConfiguration('onUserEditPropertiesLoad', model);
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
            msg: getText('Do you really want to delete these users') + ' ?',
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
                        Dashboard.manager.administration.UsersManager.deleteMultiple(idsArray, this, 'refresh');
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
            
    confirmDelete: function(selection){
        var selectionId = selection.data.id;

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete ') + " \"" + selection.data.sticker + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn){
                if (btn === 'yes') {
                    Dashboard.manager.administration.UsersManager.deleteOne(selectionId, this, 'refresh');
                }

                try {
                    var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                    detailContainer.removeAll();
                    detailContainer.add({
                        xtype: 'userDetail'
                    });
                } catch (ex) {
                }
            }
        });
    },
    
    refresh: function(){

        var store = Ext.ComponentQuery.query('userMain')[0].store;
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
        
        try {
            var data = win.getData();
            if (data !== null) {
                Dashboard.manager.administration.UsersManager.updateMultiple(data, this, 'refresh');
                win.close();
            }
        } catch (ex) {
            console.log('onUpdateMultiple');
            console.log(ex);
        }
    },
            
    save: function(win){
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        var data = win.getData();
        if (data === undefined) {
            return;
        }
        var user = Ext.create('Dashboard.model.UserCreate', data);

        Dashboard.manager.administration.UsersManager.save(user, this, 'doPostSaveAction');
    },
            
    update: function(win){
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        var data = win.getData();
        var user = Ext.create('Dashboard.model.UserCreate', data);

        if (!user.data.password || user.data.password === "") {
            // needed here because Ext.create copy a null string in data to ""
            user.data.password = null;
        }

        Dashboard.manager.administration.UsersManager.update(user, this, 'doPostEditAction');

    },
            
    doPostSaveAction: function(model){

        var win = Ext.ComponentQuery.query('userCreate')[0];
        win.close();
        this.refresh();
        Dashboard.manager.administration.UsersManager.getOne(model.data.id, this, 'displayDetail');
    },
            
    doPostEditAction: function(model){

        var win = Ext.ComponentQuery.query('userEdit')[0];
        win.close();
        this.refresh();
        Dashboard.manager.administration.UsersManager.getOne(model.data.id, this, 'displayDetail');
    },
            
    addLocation: function(selection){
        this.locationsSelectWindow = Ext.create('Dashboard.view.administration.location.Selector', {
            autoShow: true,
            parentController: this,
            withDevices: true
        });
    },
            
    deleteLocation: function(dataGrid){
        var selectedRaws = dataGrid.getSelection();

        if (selectedRaws.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        dataGrid.store.remove(selectedRaws);
        dataGrid.updateLayout();

    },
            
    selectLocations: function(sender){

        var win = sender.up('window');
        var grid = win.down('locationGridPanel');
        var selectedRows = grid.getSelection();
        
        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        
        var createWindow = Ext.ComponentQuery.query('userCreate');
        var editWindow = Ext.ComponentQuery.query('userEdit');
        var editMultipleWindow = Ext.ComponentQuery.query('userEditMultiple');
        var grid = null;

        if(createWindow.length > 0){
            grid = createWindow[0].down('grid[name=locationsGrid]');
        }else if(editWindow.length > 0){
            grid = editWindow[0].down('grid[name=locationsGrid]');
        } else if (editMultipleWindow.length > 0) {
            grid = editMultipleWindow[0].down('grid[name=locationsGrid]');
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
            link= '/users/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/users/export';
        }
        //var link = '/users/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },
    
    getMain: function (){
        return  Ext.ComponentQuery.query('userMain')[0];
    },
            
    // ==================================================
    // THUMBNAILS
    // ==================================================

    openThumbnailEditor: function(event){
        Dashboard.manager.administration.FilesManager.openThumbnailEditor(this);
    },
            
    closeThumbnailEditor: function(){
        Dashboard.manager.administration.FilesManager.closeThumbnailEditor();
    },
            
    deleteThumbnail: function(event){

        var win = event.up('window');
        win.setThumbnail(null);

        win.record.picture = {
            thumbnailName: '',
            pictureName: ''
        };

    },

    // =========================================
    // DYNAMIC PROPERTIES
    // =========================================

    buildFields: function (model) {
        
        var win = Ext.ComponentQuery.query('userCreate')[0];
        
        if (win === undefined) {
            win = Ext.ComponentQuery.query('userEdit')[0];
        }
        
        win.cleanFields();
        
        var propertyConfigurationList = model.data;

        if (!propertyConfigurationList || propertyConfigurationList === undefined) {
            return;
        }

        for (var i = 0; i < propertyConfigurationList.length; i++) {
            
            try {
                
                var property = Ext.create('Dashboard.model.PropertyConfiguration', propertyConfigurationList[i].data);

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
                    
                    var field = controller.buildFormField(property.data, control, null, model);
                    
                    win.addField(field);
                }
                
            } catch (ex) {
                Dashboard.tool.Utilities.error('[material.MainController.buildFields] control.field.fieldType undefined !');
            }
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
            
            if (field !== undefined) {
                //field.setValue(property.value);
                
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
                                    Dashboard.tool.Utilities.error('[user.MainController.buildFields] datetimefield unable to parse date');
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
