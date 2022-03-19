/* global Ext */

Ext.define('Dashboard.view.system.sensor.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.sensorMain',
    
    require:[],
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
        
         this.control({
             
             // Selected item in dataGrid
            'sensorMain viewListGrid': {itemclick: this.onSelectItem},
            
            // Create window
            'sensorCreate button[action=save]': {click: this.onSave},
            
            // Edit window
            'sensorEdit button[action=save]': {click: this.onUpdate}
                  
        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[sensor.MainController.onRenderMain] configuration null or empty !');
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
    },
    
    onCreate: function(sender){
        this.create();
    },
    
    onEdit: function(sender){
        var model = this.getSelection();
        if(model){
           this.edit(model);
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
    
    onExportToExel: function (){
        this.exportToExel();
    },
    
    onToggle: function(sender){
        this.toggleActivation(sender);
    },
            
            
    //==========================================================================
    //   Methods 
    //==========================================================================
    
    setFilterValues: function (){
        try {
            var main = this.getMain();
            var store = main.store;
            var filters = store.proxy.extraParams.filter; // [comparison:"EQ" / property:"name" / value:"Pince"]

            if (filters.length > 0) {
                Ext.getCmp('filtersBar').setFiltersValue(filters);
            }
        } catch (e) {
            Dashboard.tool.Utilities.error('[sensor.MainController.setFilterValues] Failed to load filters');
        }
    },
    
    
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
    

    
    enableButtons: function(){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },
    
    
    loadDetail: function (){
        
        if (!this.getSelection()) {
            return;
        }
        
        var id = this.getSelection().data.id;
        var sensor = this.getView().store.getById(id);
        //this.displayDetail(sensor);

        var state = sensor.data.enabled;
        this.toggleToggleButton(state);

        Dashboard.manager.system.SensorsManager.getOne(id, this, 'displayDetail');
    },

    displayDetail: function (record){
        
        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
        detailContainer.removeAll();
        detailContainer.add(
            {
                xtype: 'sensorDetail'
            }
        );
        
        try {
            //Ext.ComponentQuery.query('sensorDetail')[0].setData(record.data);
            Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
        } catch (ex) {
            Dashboard.tool.Utilities.error('[sensor.MainController.displayDetail] error : ' + ex);
        }
    },
   

    cleanDetail: function (record){
        //Ext.ComponentQuery.query('sensorDetail')[0].clean();
        this.getView().query('sensorDetail')[0].clean();
    },
    
    
    create: function(){

        this.windowCreate = Ext.create('Dashboard.view.system.sensor.Create');
        this.windowCreate.show();

    },
    
    
    edit: function(model){
        this.windowEdit = Ext.create('Dashboard.view.system.sensor.Edit', {record:model.data});
        this.windowEdit.show();
        
    },
    
    
    doDelete: function(){
        
        var selection = this.getSelection();
        if (selection) {
            this.confirmDelete(selection);
        }else {
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
            fn: function(btn) {
                if(btn === 'yes'){
                   Dashboard.manager.system.SensorsManager.deleteOne(selectionId, this, 'refresh');                
                }
            }
        }); 
    },
    
    
    toggleActivation: function(sender){
        
        var selection = this.getSelection();
        var enabled = selection.data.enabled;
        
        if(enabled === true){
            this.disableSensor(selection);
        }else{
            this.enableSensor(selection);
        }
        
    },
    
    
    enableSensor: function(selection){
        this.toggleToggleButton(true);
        Dashboard.manager.system.SensorsManager.enable(selection, this, 'afterEnableChange');
        
    },
    
    disableSensor: function(selection){
        this.toggleToggleButton(false);
        Dashboard.manager.system.SensorsManager.disable(selection, this, 'afterEnableChange');
    },
    
    afterEnableChange: function(selection){
        this.refresh(selection);
        
//        Ext.Msg.show({
//            title: getText('Info'),
//            msg: getText('Please, reload server to apply modifications.'),
//            icon: Ext.MessageBox.INFO,
//            buttons: Ext.MessageBox.OK
//        });
    },
    
    
    refresh: function (selection){
        
        var store = Ext.ComponentQuery.query('sensorMain')[0].store;

        if(selection){
            store.on({
                load: {fn: 'updateDetail', scope: this, args: [selection]}
            });
        }
        
        store.load();
        
    },
    
    
    updateDetail: function(selection){
                
        var id = selection.data.id;
        var main = Ext.ComponentQuery.query('sensorMain')[0];
        var sensor = main.store.getById(id);
        
        var grid = Ext.ComponentQuery.query('viewList > grid')[0];
        grid.setSelection(sensor);
        
        this.toggleToggleButton(sensor.data.enabled);
        this.displayDetail(sensor);

    },
    
    
    /**
     * toggle ToggleButton
     * @param {boolean} state
     * @returns {undefined}
     */
    toggleToggleButton: function(state){
        
        var main = Ext.ComponentQuery.query('sensorMain')[0];
        var toogleButton = main.down('button[reference=toggle]');
        if(toogleButton){
            if(state === true){
                toogleButton.setIconCls('fa fa-toggle-on');
            }else{
                toogleButton.setIconCls('fa fa-toggle-off');
            }
        }
    },
    
    
    save: function(win){
                
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.system.Sensor', data);
        Dashboard.manager.system.SensorsManager.save(model, this, 'doPostSaveAction');
    },
    
    
    update: function(win){
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.system.Sensor', data);
        Dashboard.manager.system.SensorsManager.update(model, this, 'doPostEditAction');
    },
    
    
    doPostSaveAction: function(model){
        
        var win = Ext.ComponentQuery.query('sensorCreate')[0];
        win.close();
        this.refresh();
        this.displayDetail(model);
    },
    
    
    doPostEditAction: function(model){
        
        var win = Ext.ComponentQuery.query('sensorEdit')[0];
        win.close();
        this.refresh();
        this.displayDetail(model);
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
            link= '/sensors/export?context='+ encodeURIComponent(contextSelected);
        }
        else {
            link = '/sensors/export';
        }
        var data = Dashboard.engine.ExportToFile.getExportParams(main);
        Dashboard.engine.ExportToFile.doRequest(link, data, sort, filter);
    },

    getMain: function (){
        return  Ext.ComponentQuery.query('sensorMain')[0];
    }
    

});