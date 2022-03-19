/* global Ext  */

Ext.define('Dashboard.view.cartography.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cartographyMain',

    require: ['Dashboard.view.cartography.MapStage'],

    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'MAPS_CONSULTATION', 0, false, true, true),

    selection: null,
    windowCreate : null,
    currentMap: null,

    init: function () {
        
        var selectThumbWindowsList = Ext.ComponentQuery.query('thumbnailEdit');
        if(selectThumbWindowsList.length > 0){
            selectThumbWindowsList[0].close();
        }
        
        Dashboard.manager.cartography.CartographyManager.navigationHistory = [];
        this.currentMap = null;
        
        this.control({
            // Selected item in dataGrid
            'cartographyMain viewListAlbum > dataview': {
                itemclick: this.onSelectItem, 
                itemdblclick: this.onDisplayItem
            },
            
            'cartographyCreate button[action=selectThumbnail]': {
                click: this.openThumbnailEditor
            },
            'cartographyCreate button[action=deleteThumbnail]': {
                click: this.deleteThumbnail
            },
            'cartographyCreate button[action=close]': {
                click: this.closeThumbnailEditor
            }
            // ,

        });
    },
    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onRenderMainCarto: function (sender) {

        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[cartography.MainController.onRenderMain] configuration null or empty !');
        }
        
        if (Dashboard.manager.FeaturesManager.isEnabled('MAPS_ADMIN') === false) {
            this.getView().down('button[reference=destroy]').hidden = true;
            this.getView().down('button[reference=create]').hidden = true;
        } else {
            this.getView().down('button[reference=destroy]').hidden = false;
            this.getView().down('button[reference=create]').hidden = false;
        }
        
    },
            
    onGeoLocSystemSelected: function(sender){
        alert('geoloc system selected');
    },

    onSelectItem: function (sender) {
        this.selection = sender.selection;
    },
            
    onDisplayItem: function (sender) {
        
        /**
         * //please do not delete this code
         * /
        this.selection = sender.selection;
        var map = sender.selection;
        var id = map.data.id;
                
        var filters = [];
        
        // add filters into feature configuration.
        try{
            var manager = Dashboard.manager.cartography.CartographyManager;
            map = manager.decodeOptions(map);
            map = manager.fillDisplayedFields(map);
            map = manager.applyDisplayingRules(map);
            
            //Different filters by map
            filters = this.getMaterialsFilters(map);
            
            if(!this.feature.data.configuration){
                this.feature.data.configuration = Ext.create('Dashboard.model.FeatureConfiguration');
            }

            this.feature.data.configuration.data.filtersConfiguration = filters;

        }catch(ex){
            Dashboard.tool.Utilities.error('[cartography.MainController.onDisplayItem] configuration error: '+ex);
        };
        **/
        
        this.getAndDisplayMap();
    },

    onCreate: function (sender) {
        this.create();
    },
            
    onRead: function (sender) {
        this.getAndDisplayMap();
    },

    onEdit: function (sender) {
        if (this.getSelection()) {
            var id = this.getSelection().data.id;
            Dashboard.manager.cartography.CartographyManager.getOne(id, this, 'edit');
        }
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


    // ==========================================================================
    // Methods
    // ==========================================================================
    
    

    getMaterialsFilters: function (map) {
        
        if (!map.data.materialsLayer.options || !map.data.materialsLayer.options.filters) {
            Dashboard.tool.Utilities.info('[cartography.MainController.getMaterialsFilters] filters untraceable');
            return [];
        }
        
        return map.data.materialsLayer.options.filters;
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
            
            
    getAndDisplayMap: function(){
        
        if (!this.getSelection()) {
            return;
        }
        
        var mapId = this.getSelection().data.id;
        var filters = Dashboard.manager.cartography.CartographyManager.getUserMaterialsFilters(mapId);
                
        Dashboard.manager.cartography.CartographyManager.getOne(mapId, this, 'displayMap', filters); 
    },
            
            
    displayMap: function(map){
        
        this.currentMap = map;
        var stage = {
            xtype: 'cartographyMapStage',
            store: Dashboard.manager.cartography.CartographyManager.store,
            currentMap: map,
            configuration: {
                enabledTools: {}
            },
            feature: this.feature
        };

        var mainController = Dashboard.app.getMainView().getController();
        mainController.displayInMain(stage);

    },


    loadDetail: function () {

        if (!this.getSelection()) {
            return;
        }

        var id = this.getSelection().data.id;
        Dashboard.manager.cartography.CartographyManager.getOne(id, this, 'displayDetail');
    },
    

    displayDetail: function (record) {
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
        //this.getView().updateLayout();
    },
    

    enableButtons: function () {
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },
    
    
    create: function () {
        this.windowCreate = Ext.create('Dashboard.view.cartography.Create');
        this.windowCreate.show();
    },
    

    edit: function (model) {

        alert('edit');
//        this.windowEdit = Ext.create('Dashboard.view.administration.material.Edit', {
//            autoShow: false,
//            record: model.data
//        });
//        this.windowEdit.show();
//
//        this.windowEdit.setData(model.data);
    },

    doDelete: function () {

        var selection = this.getSelection();

        if (selection) {
            this.confirmDelete(selection);
        } else {
            Ext.Msg.alert(getText('Warning'), getText('No element selected'));
        }
    },

    confirmDelete: function (selection) {

        var selectionId = selection.data.id;

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete ') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    Dashboard.manager.cartography.CartographyManager.deleteOne(selectionId, this, 'refresh');
                }
            }
        });
    },
    

    refresh: function () {

        var store = Ext.ComponentQuery.query('cartographyMain')[0].store;
        store.load();
    },
    
    /**
     * Create new map, layers and elements. And may be geoLocSystem
     * @param {window} win : form
     * @return {undefined}
     */
    save: function (win) {

        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var selectThumbWindowsList = Ext.ComponentQuery.query('thumbnailEdit');
        if(selectThumbWindowsList.length < 1){
            Ext.Msg.show({
                title: getText('Errors'),
                message: getText('The map is missing'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return;
        }

        var data = win.getData();
        this.currentMap = Ext.create('Dashboard.model.cartography.Map', data);

                
        if(data.geoLocSystem && !data.geoLocSystem.id){
            var geoLocSystem = Ext.create('Dashboard.model.cartography.GeoLocSystem', data.geoLocSystem);
            Dashboard.manager.cartography.CartographyManager.saveGeoLocSystem(geoLocSystem, this, 'doPostSaveGeoLocSystem');
        }else{
            Dashboard.manager.cartography.CartographyManager.save(this.currentMap, this, 'doPostSaveAction');
        }
    },
    
    
    doPostSaveGeoLocSystem: function(modelSaved){
        
        this.currentMap.data.geoLocSystem = modelSaved.data;
        Dashboard.manager.cartography.CartographyManager.save(this.currentMap, this, 'doPostSaveAction');
    },
    
    
            
    doPostSaveAction: function (model, message) {

        var win = Ext.ComponentQuery.query('cartographyCreate')[0];
        win.close();
        this.refresh();
    },
            
    doAfterThumbnailSaved: function(){
        this.displayMap(this.currentMap);
    },

    update: function (win) {

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
        var model = Ext.create('Dashboard.model.cartography.Map', data);
        Dashboard.manager.cartography.CartographyManager.update(model, this, 'doPostEditAction');

    },

    doPostEditAction: function (model, message) {
       
    },
    
    getFilterValues: function () {
         
        var store = this.getView().down('viewList').getStore();
        var filters = store.getProxy().extraParams.filter;
        return filters || [];
    },


    getMain: function () {
        return  Ext.ComponentQuery.query('cartographyMain')[0];
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

    }

});