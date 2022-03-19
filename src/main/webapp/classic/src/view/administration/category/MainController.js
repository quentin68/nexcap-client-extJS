/*  global Ext  */

Ext.define('Dashboard.view.administration.category.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.categoryMain',
    
    require: ['Dashboard.view.administration.category.Create', 'Dashboard.manager.administration.CategoriesManager', 'Dashboard.view.shared.imagesViewer.ThumbnailEdit',
        'Dashboard.view.shared.imagesViewer.Zoom', 'Dashboard.view.shared.property.Create', 'Dashboard.view.shared.property.Edit'],
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'CAT_MAT_ADMIN', 0, false, true, true),
    view: 'categoryMain',
    
    selection: null,
    
    init: function(){
        this.control({
            // Selected item in dataGrid
            'categoryMain treepanel': {
                itemclick: this.onSelectItem
            },
            // Create window
            'categoryCreate button[action=save]': {
                click: this.onSave
            },
            'categoryCreate button[action=selectThumbnail]': {
                click: this.openThumbnailEditor
            },
            'categoryCreate button[action=deleteThumbnail]': {
                click: this.deleteThumbnail
            },
            'categoryCreate button[action=close]': {
                click: this.closeThumbnailEditor
            },
            //            
            // // Edit window
            'categoryEdit button[action=save]': {
                click: this.onUpdate
            },
            'categoryEdit button[action=selectThumbnail]': {
                click: this.openThumbnailEditor
            },
            'categoryEdit button[action=deleteThumbnail]': {
                click: this.deleteThumbnail
            },
            'categoryEdit button[action=close]': {
                click: this.closeThumbnailEditor
            }
            // ,

        });
    },
            
    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onRenderMain: function(sender){
        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[category.MainController.onRenderMain] configuration null or empty !');
        }
    },
            
    onSelectItem: function(sender){
        this.selection = sender.selection;
        this.enableButtons();
        this.loadDetail();
    },
            
    onCreate: function(sender){
        this.create();
    },
            
    onEdit: function(sender){
        if (this.getSelection()) {
            var id = this.getSelection().data.id;
            Dashboard.manager.administration.CategoriesManager.getCategory(id, this, 'edit');
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
        this.saveCategory(win);
    },
            
    onUpdate: function(sender){
        var win = sender.up('window');
        this.updateCategory(win, 'doPostEditAction');
    },
            
    onCreateMaterialProperty: function(sender){
        this.createProperty('MATERIAL');
    },
            
    onAssignMaterialProperty: function(sender){
        this.assignProperty('MATERIAL');
    },
            
    onAssignReferenceProperty: function(){
        this.assignProperty('PRODUCTREFERENCE');
    },
            
    onCreateReferenceProperty: function(sender){
        this.createProperty('PRODUCTREFERENCE');
    },
            
    onEditProperty: function(sender, property){
        this.editProperty(property);
    },
            
    onDeleteProperty: function(sender, property){
        this.doDeleteProperty(property);
    },
            
    onSelectProperties: function(sender){
        this.associateProperties(sender);
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

    associateProperties: function(sender){
        var win = sender.up('window');
        var grid = win.down('propertyGridPanel');
        var selectedRows = grid.getSelection();

        if (selectedRows.length < 1) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }

        var winTarget = Ext.ComponentQuery.query('categoryCreate')[0];

        if (winTarget === undefined) {
            winTarget = Ext.ComponentQuery.query('categoryEdit')[0];
        }

        selectedRows.forEach(function(property){
            winTarget.addProperty(property);
        });

        win.close();
    },
            
    getSelection: function(){

        var treePanel = this.getView().lookupReference('treePanel');
        var selection = treePanel.selection;

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

        Dashboard.manager.administration.CategoriesManager.getCategory(id, this, 'displayDetail');

    },
            
    displayDetail: function(record){

        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
        
        try {
            detailContainer.removeAll();
            detailContainer.add(
                {
                    xtype: 'categoryDetail'
                }
            );
            detailContainer.down('categoryDetail').setData(record.data);
        } catch (ex) {
            Dashboard.tool.Utilities.error('[category.MainController.displayDetail] error : ' + ex);
        }
    },
    
    
    cleanDetail: function (record){
        
        var detail = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('categoryDetail');
        if(detail){
            detail.clean();
        }
    },
    
            
    enableButtons: function(){

        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },
            
    create: function(){

        var window = Ext.create('Dashboard.view.administration.category.Create');
        window.show();

        if (this.getSelection()) {
            var node = this.getSelection();
            window.setData(node.data);
        }
    },
            
    edit: function(model){
        var window = Ext.create('Dashboard.view.administration.category.Edit', {
            autoShow: false,
            record: model.data
        });
        window.show();

        window.setData(model.data);
    },
            
    doDelete: function(){

        var selection = this.getSelection();

        if (selection) {
            this.confirmDelete(selection);
        } else {
            Ext.Msg.alert(getText('Warning'), getText('No element selected'));
        }
    },
            
    confirmDelete: function(selection){

        var selectionId = selection.data.id;

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete category') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn){
                if (btn === 'yes') {
                    Dashboard.manager.administration.CategoriesManager.deleteCategory(selectionId, this, 'refresh');
                    try {
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'categoryDetail'
                        });
                    } catch (ex) {
                    }
                }
            }
        });
    },
    
    refresh: function(){
        var store = Ext.ComponentQuery.query('categoryTree treepanel')[0].getStore();
        store.load();
        this.cleanDetail();
    },
            
    saveCategory: function(win){

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
        var category = Ext.create('Dashboard.model.CategoryCreate', data);

        Dashboard.manager.administration.CategoriesManager.save(category, this, 'doPostSaveAction');
    },
            
    updateCategory: function(win, postAction){

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
        var category = Ext.create('Dashboard.model.CategoryCreate', data);

        if (postAction === 'doPostEditAction') {
            Dashboard.manager.administration.CategoriesManager.update(category, this, 'doPostEditAction');
        } else {
            Dashboard.manager.administration.CategoriesManager.update(category);
        }
    },
            
    doPostSaveAction: function(model){

        var win = Ext.ComponentQuery.query('categoryCreate')[0];
        win.close();
        this.refresh();
        Dashboard.manager.administration.CategoriesManager.getCategory(model.data.id, this, 'displayDetail');
    },
            
    doPostEditAction: function(model){

        var win = Ext.ComponentQuery.query('categoryEdit')[0];
        win.close();
        this.refresh();
        Dashboard.manager.administration.CategoriesManager.getCategory(model.data.id, this, 'displayDetail');
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

        // if(win.record.picture.thumbnailName !== undefined){
        // win.record.picture.thumbnailName = null;
        // }
    },
            
    // =========================================
    // DYNAMIC PROPERTIES
    // =========================================

    assignProperty: function(type){
        var win = Ext.create('Dashboard.view.shared.property.Selector', {
            parentController: this,
            type: type,
            typeOfValidation: type,//  PRODUCT_REFERENCE | MATERIAL | ALL
            owner: 'PRODUCT_CATEGORY'
        });

        win.show();
    },
            
    createProperty: function(type){

        var win = Ext.create('Dashboard.view.shared.property.Create', {
            mainController: this,
            typeOfValidation: type //  PRODUCT_REFERENCE | MATERIAL | ALL
        });

        win.show();
    },
            
    editProperty: function(property){
                
        var win = Ext.create('Dashboard.view.shared.property.Edit', {
            mainController: this,
            record: property.data
        });
        
        win.show();
        win.setData(property);
    },
            
    doDeleteProperty: function(model){

        var id = model.data.id;
        Dashboard.manager.system.DynamicPropertiesManager.deleteProperty(id);

    },
            
    // confirmDeleteProperty: function (property){
    //        
    // var selectionId = property.data.id;
    //        
    // Ext.Msg.show({
    // title: getText('Delete'),
    // msg: getText('Do you really want to delete property ') + " \"" + property.data.label + "\" ?",
    // buttons: Ext.MessageBox.YESNO,
    // icon: Ext.MessageBox.QUESTION,
    // scope: this,
    // fn: function(btn) {
    // if(btn === 'yes'){
    // Dashboard.manager.PropertiesManager.deleteProperty(selectionId, this, 'refresh');
    // }
    // }
    // });
    // },

    closePropertyCreateWindow: function(){
        var win = Ext.ComponentQuery.query('propertyCreate')[0];
        if (win !== undefined) {
            win.close();
        }
    },
            
    closePropertyEditWindow: function(){
        var win = Ext.ComponentQuery.query('propertyEdit')[0];
        if (win !== undefined) {
            win.close();
        }
    },
            
    doPostActionSaveProperty: function(model){

        var win = Ext.ComponentQuery.query('categoryCreate')[0];

        if (win === undefined) {
            win = Ext.ComponentQuery.query('categoryEdit')[0];
        }

        win.addProperty(model);
        this.closePropertyCreateWindow();
    },
            
    doPostActionEditProperty: function(property){

        var win = Ext.ComponentQuery.query('categoryCreate')[0];

        if (win === undefined) {
            win = Ext.ComponentQuery.query('categoryEdit')[0];
        }

        win.updateProperty(property);
        this.closePropertyEditWindow();
    }
});
