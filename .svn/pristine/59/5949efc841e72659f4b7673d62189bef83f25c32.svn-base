/* global Ext  */

Ext.define('Dashboard.view.system.dynamicProperties.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dynamicPropertiesMain',

    require: [],

    className: 'MainController',

    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'DYNAMIC_PROPERTIES_ADMIN', 0, false, true, true),

    selection: null,
    windowEdit: null,
    windowCreate: null,

    init: function () {
        this.control({
            // Selected item in dataGrid
            'dynamicPropertiesMain viewListGrid': {itemclick: this.onSelectItem}

        });
    },

    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onRenderMain: function (sender) {

        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[' + this.className + '.onRenderMain] configuration null or empty !');
        }
    },

    onSelectItem: function (sender) {
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        this.loadDetail(id);
    },

    onDestroy: function (sender) {
        this.doDelete();
    },

    onRefresh: function (sender) {
        this.refresh();
    },

    onCreate: function (sender) {
        //this.create();
        this.selectOrigin();
    },
    
    onEdit: function (sender) {
        var selection = this.getSelection();
        
        if (!selection) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        
        // Can't edit system property
        if (selection.data.isSystem) {
            Ext.Msg.alert(getText('Error'), getText('Impossible to edit a System property')+ getText('!'));
            return;
        }

        Ext.Msg.show({
            title: getText('Edit'),
            msg: getText('Attention, all elements with an old value of this property will have to be valued with the new values.'), 
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    Dashboard.manager.system.DynamicPropertiesManager.getOne(selection.data.id, this, 'edit');
                }
            }
        });

    },

    // ==========================================================================
    // Methods
    // ==========================================================================

    loadDetail: function () {
        if (!this.getSelection()) {
            return;
        }

        var id = this.getSelection().data.id;
        Dashboard.manager.system.DynamicPropertiesManager.getOne(id, this, 'displayDetail');
    },
    
    displayDetail: function (record) {
        //Ext.ComponentQuery.query('dynamicPropertiesDetail')[0].setData(record.data);
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
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

    doDelete: function () {

        var selection = this.getSelection();

        if (selection) {
            this.confirmDelete(selection);
        } else {
            Ext.Msg.show({
                title: getText('Warning'),
                msg: getText('No element selected!'),
                icon: Ext.MessageBox.WARNING
            });
        }
    },

    confirmDelete: function (selection) {

        var selectionId = selection.data.id;

        // Can't delete system property
        if (selection.data.isSystem) {
            Ext.Msg.alert(getText('Error'), getText('Impossible to delete a System property!'));
            return;
        }

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Warning: All data in the field will be permanently overwritten, are you sure you want to delete ') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    Dashboard.manager.system.DynamicPropertiesManager.deleteOne(selectionId, this, 'refresh');
                }
            }
        });
    },

    refresh: function () {
        var store = Ext.ComponentQuery.query('dynamicPropertiesMain')[0].store;
        store.load();
    },

    create: function (origin) {
                
        switch(origin){
            case 'TELEMETRY':
                this.windowCreate = Ext.create('Dashboard.view.system.dynamicProperties.TelemetryCreate');
                break;
            case 'COMPUTED':
                this.windowCreate = Ext.create('Dashboard.view.system.dynamicProperties.ComputedCreate');
                break;
            default:
                this.windowCreate = Ext.create('Dashboard.view.shared.property.Create');
        }
        
        this.windowCreate.parentController = this;
        this.windowCreate.typeOfValidation = 'ALL';

        this.windowCreate.show();
    },
    
    
    selectOrigin: function () {
                
        this.windowSelectOrigin = Ext.create('Dashboard.view.system.dynamicProperties.SelectOrigin', {
            autoShow: false
        });
        
        this.windowSelectOrigin.down('combo[name=origin]').on('select', 'getOriginAndCreate', this);

        this.windowSelectOrigin.show();
    },
    
    
    getOriginAndCreate: function(sender){
        
        var window = sender.up('window');
        var data = window.getData();
                
        window.close();
        this.create(data.origin);
    },
    
    
    edit: function (model) {
        var parentScope = this;
        
//        if (!model.data.isEditable) {
//            Ext.Msg.alert({
//                title: getText('Warning'),
//                msg: getText('This dynamic proprety is not editable'),
//                icon: Ext.Msg.WARNING,
//                buttons: Ext.Msg.OK
//            });
//            return;
//        }
        
        this.windowEdit = Ext.create('Dashboard.view.shared.property.Edit', {
            autoShow: false,
            record: model.data,
            parentController: parentScope
        });
        
        this.windowEdit.show();
        model.data.parentController = this;
        this.windowEdit.setData(model);
    },
    
    doPostActionSaveProperty: function () {
        var win = Ext.ComponentQuery.query('window[tag=createProperty]')[0];
        win.close();
        this.refresh();
    }, 
    
    doPostActionEditProperty: function () {
        var win = Ext.ComponentQuery.query('propertyEdit')[0];
        win.close();
        this.refresh();
    }
    //
    //
    //
    //// ,
//
//    
// doPostEditAction: function(model){
//        
// this.refresh();
// //this.displayDetail(model);
// }

});