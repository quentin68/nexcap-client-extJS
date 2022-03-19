/* global Ext, moment */

Ext.define('Dashboard.view.administration.position.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.positionMain',
    
    require:[
        'Dashboard.view.administration.position.Create',
        'Dashboard.manager.administration.PositionsManager',
        'Dashboard.view.shared.imagesViewer.ThumbnailEdit',
        'Dashboard.view.shared.imagesViewer.Zoom'
    ],
    
    feature:  Ext.create('Dashboard.store.Features').findRecord('name', 'POSITION_ADMIN', 0, false, true, true), 
    
    view: 'positionMain',
    
    windowEdit: null,
    windowCreate: null,
    usersSelectWindow: null,
    
    selection: null,
    
    telemetryDataSelectionWindow: null,
    
    init: function() {
         this.control({
                  
            // Selected item in dataGrid
            'positionMain treepanel': {itemclick: this.onSelectItem},
            
            // Create position window
            'positionCreate button[action=save]': {click: this.onSavePosition},
            'positionCreate button[action=selectThumbnail]': {click: this.openThumbnailEditor},
            'positionCreate button[action=deleteThumbnail]': {click: this.deleteThumbnail},
            'positionCreate button[action=close]': {click: this.closeThumbnailEditor},
//            
//            // Edit position window
            'positionEdit button[action=save]': {click: this.onUpdatePosition},
            'positionEdit button[action=selectThumbnail]': {click: this.openThumbnailEditor},
            'positionEdit button[action=deleteThumbnail]': {click: this.deleteThumbnail},
            'positionEdit button[action=close]': {click: this.closeThumbnailEditor},
            
            // Create location window
            'locationCreate button[action=save]': {click: this.onSaveLocation},
            'locationCreate button[action=selectThumbnail]': {click: this.openThumbnailEditor},
            'locationCreate button[action=deleteThumbnail]': {click: this.deleteThumbnail},
            'locationCreate button[action=close]': {click: this.closeThumbnailEditor},
            
            // Edit position window
            'locationEdit button[action=save]': {click: this.onUpdateLocation},
            'locationEdit button[action=selectThumbnail]': {click: this.openThumbnailEditor},
            'locationEdit button[action=deleteThumbnail]': {click: this.deleteThumbnail},
            'locationEdit button[action=close]': {click: this.closeThumbnailEditor}

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[position.MainController.onRenderMain] configuration null or empty !');
        } 
    },

    onSelectItem: function(sender){
        this.selection = sender.selection;
        this.enableButtons();
        this.loadDetail();
    },
    
    onCreate: function(sender){
        //this.create();
    },
            
    onCreatePosition: function(sender){
        this.createPosition();
    },
            
    onCreateLocation: function(sender){
        Dashboard.manager.system.DynamicPropertiesManager.getByConfigurationType(
                {
                    propertyConfigurationType: 'LOCATION'
                },
                this, 'onLocationCreatePropertiesLoad');
    },
    
    onEdit: function(sender){
        
        var raw = this.getSelection();

        if(!raw){
            return;
        }

        if(raw.data.type === 'position'){
            var positionId = raw.data.positionId;
            Dashboard.manager.administration.PositionsManager.getOne(positionId, this, 'edit');
        }else{
            var locationId = raw.data.locationId;
            Dashboard.manager.administration.LocationsManager.getOne(locationId, this, 'edit');
        }
    },
    
    onDestroy: function(sender){
        this.doDelete();
    },
    
    onRefresh: function(sender){
        this.refresh();
    },
    
    onSavePosition: function(sender){
        var win = sender.up('window');
        this.savePosition(win);
    },
            
    onSaveLocation: function(sender){
        var win = sender.up('window');
        this.saveLocation(win);
    },
    
    onUpdatePosition: function(sender){
        var win = sender.up('window');
        this.updatePosition(win, 'doPostEditAction');
    },
            
    onUpdateLocation: function(sender){
        var win = sender.up('window');
        this.updateLocation(win, 'doPostEditAction');
    },
            
    onAddUser: function(sender){
        this.addUser();
    },
            
    onRemoveUser: function(sender){
        var win = sender.up('window');
        var grid = win.down('grid[name=usersGrid]');
        this.removeUser(grid);
    },
            
    onSelectUsers: function(sender){
        this.selectUser(sender);
    },
   
    onExportLocations: function (){
        this.exportLocationsToExel();
    },
    
    onExportPositions: function (){
        this.exportPositionsToExel();
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
    
    //==========================================================================
    //   Methods 
    //==========================================================================
     
    getSelection: function(){
        
        var treePanel = this.getView().lookupReference('treePanel');
        var selection = treePanel.selection;
        
        if(!selection){
            return null;
        }
        
        return selection;
    },
    
    loadDetail: function(){
        
        if(!this.getSelection()){
            return;
        }
        
        var row = this.getSelection();
        
        if(row.data.type === 'position'){
            Dashboard.manager.administration.PositionsManager.getOne(row.data.id, this, 'displayDetail');
        }else{
            Dashboard.manager.administration.LocationsManager.getOne(row.data.id - 1000000000, this, 'displayDetail');
        }
             
    },
    
    displayDetail: function(model){
                                
        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
        
        var view = detailContainer.up('positionMain');

        if(view){
            if(model.$className === "Dashboard.model.administration.Location" || model.$className === "Dashboard.model.administration.LocationCreate"){
            //if(model.data.parentPositionId !== undefined){
                view.showDetail('location');
                detailContainer.query('locationDetail')[0].setData(model.data);
            }else{
                view.showDetail('position');
                detailContainer.query('positionDetail')[0].setData(model.data);
            }
        }
        
    },
    
    cleanDetail: function (record){
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').clean();
    },
    
    enableButtons: function(){
        
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },
    
    createPosition: function(){

        this.windowCreate = Ext.create('Dashboard.view.administration.position.Create');
        this.windowCreate.show();
        
        //Potential parent
        if(this.getSelection()){
            var node = this.getSelection();
            this.windowCreate.setData(node.data);
        }
    },
    
    onLocationCreatePropertiesLoad: function (propertiesConfiguration) {
        this.createLocation(propertiesConfiguration);
    },
    
    onLocationEditPropertiesLoad: function (model, propertiesConfiguration) {
        this.windowEdit =Ext.create('Dashboard.view.administration.location.Edit', {
            record: model.data,
            propertiesConfiguration: propertiesConfiguration
        });
        this.windowEdit.show();
    },
                
    createLocation: function(propertiesConfiguration){
        this.windowCreate = Ext.create('Dashboard.view.administration.location.Create', {
            propertiesConfiguration: propertiesConfiguration
        });
        this.windowCreate.show();
        
        //Potential parent
        if(this.getSelection()){
            var node = this.getSelection();
            this.windowCreate.setData(node.data);
        }

    },
    
    edit: function (model) {
        this.windowEdit = null;

        if (model.data.locations === undefined) {
            Dashboard.manager.system.DynamicPropertiesManager.getByConfigurationType(
                    {
                        propertyConfigurationType: 'LOCATION',
                        model: model
                    },
                    this, 'onLocationEditPropertiesLoad');
        } else {
            this.windowEdit = Ext.create('Dashboard.view.administration.position.Edit', {autoShow: false, record: model.data});
            this.windowEdit.show();
        }
    },
            
            
    
    doDelete: function(){
        
        var selection = this.getSelection();
        
        if (selection) {
            this.confirmDelete(selection);
        }else{
            Ext.Msg.alert(getText('Warning'), getText('No element selected'));
        }
    },
    
    
    confirmDelete: function (selection){

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    
                    var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];

                    if(selection.data.locationId){
                        var locationId = selection.data.locationId;
                        Dashboard.manager.administration.LocationsManager.deleteOne(locationId, this, 'refresh');
                        
                        try{
                            detailContainer.removeAll();
                            detailContainer.add({
                                xtype: 'locationDetail'
                            });
                        }catch(ex){}
                        
                    }else{
                        var positionId = selection.data.positionId;
                        Dashboard.manager.administration.PositionsManager.deleteOne(positionId, this, 'refresh');
                        
                        try{
                            detailContainer.removeAll();
                            detailContainer.add({
                                xtype: 'positionDetail'
                            });
                        }catch(ex){}
                    }
                }
            }
        }); 
    },
    
    
    addUser: function(){
        this.usersSelectWindow = Ext.create('Dashboard.view.administration.user.Selector', {
            autoShow: true,
            parentController: this
        });
    },
            
            
    removeUser: function(dataGrid){
        var selectedRows = dataGrid.getSelection();

        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        } 
        
        dataGrid.store.remove(selectedRows); 
        dataGrid.updateLayout();
    
    },
            
            
    selectUser: function(sender){

        var win = sender.up('window');
        var grid = win.down('userGridPanel');
        var selectedRows = grid.getSelection();
        
        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        
        var createWindow = Ext.ComponentQuery.query('locationCreate');
        var editWindow = Ext.ComponentQuery.query('locationEdit');
        var grid = null;

        if(createWindow.length > 0){
            grid = createWindow[0].down('grid[name=usersGrid]');
        }else if(editWindow.length > 0){
            grid = editWindow[0].down('grid[name=usersGrid]');
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
    

    refresh: function (){
        var store = Ext.ComponentQuery.query('positionTree treepanel')[0].getStore();
        store.load();
        this.cleanDetail();
    },
    
    
    savePosition: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.administration.PositionCreate', data);

        Dashboard.manager.administration.PositionsManager.save(model, this, 'doPostSaveAction');
    },
            
            
    saveLocation: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.administration.LocationCreate', data);

        Dashboard.manager.administration.LocationsManager.save(model, this, 'doPostSaveAction');
    },
    
    
    updatePosition: function(win, postAction){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.administration.PositionCreate', data);

        if(postAction === 'doPostEditAction'){
            Dashboard.manager.administration.PositionsManager.update(model, this, 'doPostEditAction');
        }else{
            Dashboard.manager.administration.PositionsManager.update(model);
        }
    },
            
            
    updateLocation: function(win, postAction){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        //var model = Ext.create('Dashboard.model.administration.LocationCreate', data);
        var model = Ext.create('Dashboard.model.administration.Location', data);

        if(postAction === 'doPostEditAction'){
            Dashboard.manager.administration.LocationsManager.update(model, this, 'doPostEditAction');
        }else{
            Dashboard.manager.administration.LocationsManager.update(model);
        }
    },
    
    
    doPostSaveAction: function(model){
        
        var win = Ext.ComponentQuery.query('positionCreate')[0];
        if(!win){
            win = Ext.ComponentQuery.query('locationCreate')[0];
        }
        
        win.close();
        this.refresh();
        this.displayDetail(model);
    },
    
    
    doPostEditAction: function(model){
        
        var win = Ext.ComponentQuery.query('positionEdit')[0];
        if(!win){
            win = Ext.ComponentQuery.query('locationEdit')[0];
        }
        
        win.close();
        this.refresh();
        //this.displayDetail(model);
        if(model.$className === "Dashboard.model.administration.Location"){
            Dashboard.manager.administration.LocationsManager.getOne(model.data.id, this, 'displayDetail');
        }else{
            Dashboard.manager.administration.PositionsManager.getOne(model.data.id, this, 'displayDetail');
        }
    },
    
    
    getFilterValues: function (){
         
        var store = this.getView().down('viewList').getStore();
        var filters = store.getProxy().extraParams.filter;
        return filters || [];
    },
    
    
    
    

    exportLocationsToExel: function (){
        
        this.locationsSelectWindow = Ext.create('Dashboard.view.administration.location.Selector', {
            autoShow: true,
            parentController: this,
            withDevices: false
        });
        
    },
    
    exportPositionsToExel: function (){
        
        this.positionsSelectWindow = Ext.create('Dashboard.view.administration.position.Selector', {
            autoShow: true,
            parentController: this,
            withDevices: false
        });
    },
    
    onSelectLocations: function (sender){
        var filter = this.getFilterValues();
        var main = this.getMain();
        var sort = main.store.getSorters();
        var link = '/locations/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },
    
    onSelectPositions: function (sender){
        var filter = this.getFilterValues();
        var main = this.getMain();
        var sort = main.store.getSorters();
        var link = '/positions/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function (){
        return  Ext.ComponentQuery.query('positionMain')[0];
    },
    
    
    //==================================================
    //      THUMBNAILS
    //==================================================
    
    
    openThumbnailEditor: function(event){
        Dashboard.manager.administration.FilesManager.openThumbnailEditor(this);
    },
            
            
    closeThumbnailEditor : function(){
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
        
        var win = Ext.ComponentQuery.query('locationCreate')[0];
        
        if (win === undefined) {
            win = Ext.ComponentQuery.query('locationEdit')[0];
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
               // field.setValue(property.value);
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
                                    Dashboard.tool.Utilities.error('[location.MainController.buildFields] datetimefield unable to parse date');
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