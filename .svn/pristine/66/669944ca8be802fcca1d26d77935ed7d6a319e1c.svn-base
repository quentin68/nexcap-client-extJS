/* global Ext  */

Ext.define('Dashboard.view.consultation.items.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.consultationItemsMain',
    
    require:[],
    
    className: 'MainController',
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'MAT_INVENTORY', 0, false, true, true),  

    windowEdit: null,
    windowCreate: null,
    //referencesSelectWindow: null,
    selection: null,
    
    init: function() {
        
        this.className = Ext.getClass(this).getName();
        
         this.control({
             
            // Selected item in dataGrid
            'consultationItemsMain viewListGrid': {itemclick: this.onSelectItem},
            'consultationItemsMain viewListAlbum > dataview': {itemclick: this.onSelectItem},
            'consultationItemsMain viewListList': {itemclick: this.onSelectItem}
                  
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
        try {
            this.selection = sender.selection;
            var id = sender.selection.data.id;
            this.loadDetail(id);
        } catch (ex) {
            // Nothing
        }
//        this.selection = sender.selection;
//        var id = null;
//        var modelType = sender.selection.data.modelType;
//                
//        if(modelType === 'material'){
//            id = sender.selection.data.materialId;
//        }else{
//            id = sender.selection.data.productReferenceId;
//        }
//        
//        this.loadDetail(id, modelType);
    },

    onRefresh: function(sender){
        this.refresh();
    },
    
    onExportToExel: function(){
        this.exportToExel();
    },           
            
    //==========================================================================
    //   Methods 
    //==========================================================================
    
//    setFilterValues: function (){
//        debugger;
//        try {
//            
//            //var main = this.getView();
//            var store = this.getView().store;
//            var filters = store.proxy.extraParams.filter; // [comparison:"EQ" / property:"name" / value:"Pince"]
//
//            if (filters.length > 0) {
//                Ext.getCmp('filtersBar').setFiltersValue(filters);
//            }
//            
//        } catch (e) {
//            Dashboard.tool.Utilities.error('[material.MainController.setFilterValues] Failed to load filters');
//        }
//    },
    
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
    
    
    loadDetail: function(id, modelType){
        
        if (!this.getSelection()) {
            return;
        }

        var id = this.getSelection().data.id;
        Dashboard.manager.administration.MaterialManager.getOne(id, this, 'displayDetail');
  

//        var modelClass = Dashboard.model.Material;
//        var modelText = 'Dashboard.model.Material';
//
//        if(modelType === 'reference'){
//            modelClass = Dashboard.model.Reference;
//            modelText = 'Dashboard.model.Reference';
//        }
//        
//        try{
//            modelClass.load(id, {
//                scope: this,
//                failure: function(record, operation) {
//                    Dashboard.tool.Utilities.info('['+this.className+'] error: loading failure');
//                },
//                success: function(record, operation) {
//                    
//                    var response = Ext.decode(operation._response.responseText);
//                    var model = Ext.create(modelText, response.data);
//                    this.displayDetail(model);
//                },
//                callback: function(record, operation, success) {
//                    //do
//                }
//            });
//            
//        }catch(err){
//            Dashboard.tool.Utilities.error('['+this.className+'] error: ' + err)
//        }
    },
    
    
    displayDetail: function(record){
        
        var detailContainer = this.getView().down('panel[reference=detailContainer]');
        detailContainer.removeAll();
        detailContainer.add(
            {
                xtype: 'materialDetail'
            }
        );
        
       try {
            detailContainer.down('materialDetail').setData(record.data);
        } catch (ex) {
            Dashboard.tool.Utilities.error('[material.MainController.displayDetail] error : ' + ex);
        }
    },
    
    cleanDetail: function (record){
        //Ext.ComponentQuery.query('materialDetail')[0].clean();
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').clean();
    },
    
    refresh: function (){
        var store = Ext.ComponentQuery.query('materialMain')[0].store;
        store.reload();
        this.cleanDetail();
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
            link= '/materials/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/materials/export';
        }
        //var link = '/materials/export';
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function(){
        return   Ext.ComponentQuery.query('consultationItemsMain')[0];
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

    onAddFiles: function (event){
        var attachedFilesSelectionWindow = Ext.getCmp('attachedFilesSelectionWindow');
        if (!attachedFilesSelectionWindow) {
            // Error message
            return;
        }

        // Find attachment panel
        var winCreate = Ext.ComponentQuery.query('materialCreate')[0];
        if (winCreate === undefined) {
            var winEdit = Ext.ComponentQuery.query('materialEdit')[0];
        }

        var filesForm = attachedFilesSelectionWindow.items.items['0'];
        var fileInputPanels = filesForm.items.items['0'].items.items;

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

        fileInputPanels.forEach(function (panel){
            var fullFilePath = panel.items.items['0'].value;
            var id = panel.items.items['0'].id;
            var filename = fullFilePath.replace(/^.*[\\\/]/, '');
            filename = filename.trim();
            if (filename !== '') {
                win.attachmentFilesStore.add({
                    name: filename,
                    id: id,
                    refId: id,
                    isSaved: false
                });
            } else {
                panel.ownerCt.remove(panel);
            }
        });
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
            try {
                var control = Dashboard.model.PropertyConfiguration.getControl(propertyConfigurationList[i]);
                if (control !== undefined) {
                    var type = control.field.fieldType;
                    var fieldType = Dashboard.store.properties.FieldTypes[type];
                    var controller = Ext.create('Dashboard.view.shared.property.' + fieldType.className);

                    var field = controller.buildFormField(propertyConfigurationList[i], control);
                    win.addField(field);
                }

            } catch (ex) {
                Dashboard.tool.Utilities.error('[material.MainController.buildFields] control.field.fieldType undefined !');
            }
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
    }
});