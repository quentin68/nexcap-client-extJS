/* global Ext  */

Ext.define('Dashboard.view.system.plugin.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.pluginMain',
    
    require:[],
    
    className: 'system.plugin.MainController',
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'PLUGINS_MAINTENANCE', 0, false, true, true),
    
    selection: null,
    positionSelectWindow: null,
    authorizeWindow: null,
    selectFileWindow: null,
    
    init: function() {
         this.control({
            'pluginMain viewListGrid': {itemclick: this.onSelectItem},
            'pluginEdit button[action=save]': { click: this.onUpdate }
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
        this.selection = sender.selection;
        var id = sender.selection.data.id;
        this.loadDetail(id);
    },
    
    onDestroy: function(sender){
        this.doDelete();
    },
    
    onRefresh: function(sender){
        this.refresh();
    },
    
    onCreate: function(sender){
        this.selectPlugin();
    },
    
    onToggle: function(sender){
        this.toggleActivation(sender);
    },
    
    onEdit: function (sender){
        var record = this.getSelection();
        if (!record) {
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        this.edit(record);
    },
    
    onUpdate: function (sender){
        var win = sender.up('window');
        this.update(win);
    },
            
            
    //==========================================================================
    //   Methods 
    //==========================================================================
    
    
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
    
    
    loadDetail: function(){
        
        if(!this.getSelection()){
            return;
        }
        
        var id = this.getSelection().data.id;
        var plugin = this.getView().store.getById(id);
        this.displayDetail(plugin);

        var state = plugin.data.enabled;
        this.toggleToggleButton(state);
    },
        
    
    displayDetail: function(record){
        //Ext.ComponentQuery.query('pluginDetail')[0].setData(record.data);
        Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
    },
    
    
    enableButtons: function(){
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(false);
    },


    doDelete: function(){
        
        var selection = this.getSelection();
        
        if (selection) {
            this.confirmDelete(selection);
        }else{
           Ext.Msg.show({
                title: getText('Warning'),
                msg: getText('No element selected!'),
                icon: Ext.MessageBox.WARNING
            }); 
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
                    Dashboard.manager.system.PluginsManager.deleteOne(selectionId, this, 'refresh'); 
                    
                    try{
                        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
                        detailContainer.removeAll();
                        detailContainer.add({
                            xtype: 'pluginDetail'
                        });
                    }catch(ex){}
                }
            }
        }); 
    },
    
    
    edit: function (model){
        this.windowEdit = Ext.create('Dashboard.view.system.plugin.Edit', {
            autoShow: false,
            record: model.data
        });
        this.windowEdit.show();
        this.windowEdit.setData(model.data);
    },
    
    
    update: function (win){
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        var data = win.getData();
        var plugin = Ext.create('Dashboard.model.system.Plugin', data);

        Dashboard.manager.system.PluginsManager.update(plugin, this, 'doPostEditAction');

    },
    
    
    refresh: function (selection){
        
        var store = Ext.ComponentQuery.query('pluginMain')[0].store;

        store.on({
            load: {fn: 'updateDetail', scope: this, args: [selection]}
        });
        
        store.load();

    },
    
    
    cleanDetail: function (record){
        //Ext.ComponentQuery.query('pluginDetail')[0].clean();
        this.getView().query('pluginDetail')[0].clean();
    },
    
    
    toggleActivation: function(sender){
        
        var selection = this.getSelection();
        var enabled = selection.data.enabled;
        
        if(enabled === true){
            this.disablePlugin(selection);
        }else{
            this.enablePlugin(selection);
        }
        
    },
    
    
    enablePlugin: function(selection){
        this.toggleToggleButton(true);
        Dashboard.manager.system.PluginsManager.enable(selection, this, 'afterEnableChange');
        
    },
    
    disablePlugin: function(selection){
        this.toggleToggleButton(false);
        Dashboard.manager.system.PluginsManager.disable(selection, this, 'afterEnableChange');
    },
    
    
    afterEnableChange: function(selection){
        this.refresh(selection);
        
        Ext.Msg.show({
            title: getText('Info'),
            msg: getText('Please, reload server to apply modifications.'),
            icon: Ext.MessageBox.INFO,
            buttons: Ext.MessageBox.OK
        });
    },
    
    
    updateDetail: function(selection){
        
        var id = selection.data.id;
        var main = Ext.ComponentQuery.query('pluginMain')[0];
        var plugin = main.store.getById(id);
        
        var grid = Ext.ComponentQuery.query('viewList > grid')[0];
        grid.setSelection(plugin);
        
        this.toggleToggleButton(plugin.data.enabled);
        this.displayDetail(plugin);

    },
    
    
    /**
     * toggle ToggleButton
     * @param {boolean} state
     * @returns {undefined}
     */
    toggleToggleButton: function(state){
        
        var main = Ext.ComponentQuery.query('pluginMain')[0];
        var toogleButton = main.down('button[reference=toggle]');
        if(toogleButton){
            if(state === true){
                toogleButton.setIconCls('fa fa-toggle-on');
            }else{
                toogleButton.setIconCls('fa fa-toggle-off');
            }
        }
    },
            
    
    doPostEditAction: function(model){
        
        var win = Ext.ComponentQuery.query('pluginEdit')[0];
        win.close();
        
        this.refresh(model);
        this.displayDetail(model);
    },
    
    
    selectPlugin: function(){
        
        this.selectFileWindow = Ext.create('Dashboard.view.shared.component.SelectFile',{
            title: getText('Add plug-in'),
            iconCls: 'fa fa-puzzle-piece',//'fa fa-download',
            vtype: 'zipFile'
        });
        
        //event handler
        this.selectFileWindow.down('button[action=importFile]').on('click', this.onUploadPlugin, this);
        
        //display
        this.selectFileWindow.show();
        
    },
    
    
    onUploadPlugin: function(button) {
        Dashboard.tool.Utilities.trace('Event handler : onUploadPlugin');
        
        var win = button.up('window');
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        //var form = win.down('form').getForm();
        var link = '/plugins/install';
        var token;
        if (Dashboard.manager.administration.UsersManager.getToken()) {
            token = Dashboard.manager.administration.UsersManager.getToken();
        }
        else {
            token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
        }


        var file = win.down('fileuploadfield').fileInputEl.dom.files[0];
        var data = new FormData();
        data.append('file', file);
        
        var myMask = new Ext.LoadMask({
            msg    : getText('Uploading') + '...',
            target : win
        });

        myMask.show();
        
        //upload
        Ext.Ajax.request({
            url : Dashboard.config.Config.SERVER_HOST_NAME + link,
            rawData: data,
            headers: {
                'Content-Type':'multipart/form-data',
                Authorization: 'Bearer ' + token
            },
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            scope: this,
            success: function (response, result) {
                
                myMask.hide();
                Dashboard.engine.ResponseManager.showSuccess(response);
                win.close();
                
                this.refresh();
            },
            failure: function (response, result, obj) {
                
                myMask.hide();
                
                //CORS patch
                var response = result.response.responseText;

                if(response.indexOf('Blocked a frame with origin') !== -1){
                    Dashboard.engine.ResponseManager.showSuccess(result);
                    win.close();
                    this.refresh();
                    
                }else{
                    var error = Ext.decode(result.response.responseText);
                    Ext.Msg.show({ title:getText('Error'), msg: error.error.message, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR });
                    Dashboard.tool.Utilities.error('onUploadPlugin : error: ' + error.error.message);
                }                
            }
        });
    },
            
            
    authorize: function() {

        var selectedRow = this.getSelection();
      
        if (!selectedRow) {         
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        
        // Test if plugin already authorized
        if (selectedRow.data.authorized) {
            Dashboard.tool.Utilities.showAlreadyAuthorized();
            return;
        }
        
        var deviceType = selectedRow.data.deviceType;
        
        this.authorizeWindow = Ext.create('Dashboard.view.system.device.Authorize', {
            autoShow: false,
            parentController: this
        });
        
        switch (deviceType){
            case 'CABINET_XL':
            case 'CABINET_XS':
            case 'X_DRAWERS':
            case 'CABINET_XD':
            case 'CABINET_XDS':
            case 'CABINET_XLW':
            case 'NEXPORT':
            case 'READING_STATION':
                this.authorizeWindow.query('textfield[name=locationName]')[0].hidden=false;
                this.authorizeWindow.query('textfield[name=locationName]')[0].allowBlank=false;
            case 'COUNTER':                    
                this.authorizeWindow.show();
                Dashboard.tool.Utilities.trace('Event handler : display authorizeWindow');
                break;
            case 'TABLET':
            case 'EXTERNAL_SYSTEM':
            case 'IOT_GATEWAY':
                this.submitAuthorize(null);
                break;
            default:
                this.submitAuthorize(null);
        }   
    },
    

    submitAuthorize: function(event) {
        
        var selectedRow = this.getSelection();
        var selectedId = selectedRow.data.id;
        var deviceType = selectedRow.data.deviceType;

        var win = Ext.ComponentQuery.query('deviceAuthorize')[0];
        var data = win.getData();
        
        var authorizeModel = Ext.create('Dashboard.model.system.Authorize',data);
        authorizeModel.data.id = selectedId;
        authorizeModel.data.deviceType = deviceType;
        
        Dashboard.manager.system.DevicesManager.authorize(authorizeModel, this, 'doPostSaveAction');
        
    },
    
    
    banPlugin: function(){
        
        var selectedRow = this.getSelection();
        var selectedId = selectedRow.data.id;
        
        this.confirmBan(selectedRow);
    },
    
    
    confirmBan: function (selection){
        
        var selectionId = selection.data.id;
        
        Ext.Msg.show({
            title: getText('Ban a device'),
            msg: getText('Do you really want to ban ') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    Dashboard.manager.system.PluginsManager.banDevice(selectionId, this, 'afterBanned');
                }
            }
        }); 
    },
    
    
    afterBanned: function(id){
        
        var main = Ext.ComponentQuery.query('pluginMain')[0];
        main.getController().refresh();
        
        var store = main.store;
        var record = store.getById(id);
        Dashboard.manager.system.PluginsManager.getOne(id, main.getController(), 'displayDetail');
        
    },
            
    
    doPostSaveAction: function(model){

        var win = Ext.ComponentQuery.query('pluginAuthorize')[0];
        win.close();
        this.refresh();
        
        var store = this.getView().store;
        var record = store.getById(model.data.id);
        Dashboard.manager.system.PluginsManager.getOne(record.data.id, this, 'displayDetail');

    }

});