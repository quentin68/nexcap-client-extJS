/* global Ext  */

Ext.define('Dashboard.view.system.updatePackage.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.updatePackageMain',
    
    require:[
        'Dashboard.view.system.updatePackage.SelectPackage',
        'Dashboard.view.system.updatePackage.SelectDevices'
    ],
    
    className: 'MainController',
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'MANAGE_DEVICE_UPDATES', 0, false, true, true),
    
    selection: null,
    selectPackageWindow: null,
    selectDevicesWindow: null,
    
    init: function() {
        
         this.control({
             
             // Selected item in dataGrid
            'updatePackageMain viewListGrid': {itemclick: this.onSelectItem}
                  
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
//        var id = sender.selection.data.id;
//        this.loadDetail(id);
    },
    
    onDestroy: function(sender){
        this.doDelete();
    },
    
    onRefresh: function(sender){
        this.refresh();
    }, 
            
    onAdd: function(sender){
        this.selectPackage();
    },
            
    onAffect: function(sender){
        this.affect();
    },
            
    onSavePackage: function(sender){
        this.savePackage(sender);
    },   
            
    onSelectTargetDevices: function(sender){
        this.selectTargetDevices(sender);
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
            
//    loadDetail: function(){
//        
//        if(!this.getSelection()){
//            return;
//        }
//        
//        var id = this.getSelection().data.id;
//        Dashboard.manager.system.PackagesManager.getOne(id, this, 'displayDetail');                
//    },
    
    
//    displayDetail: function(record){
//       // Ext.ComponentQuery.query('packageDetail')[0].setData(record.data);
//       Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
//    },
    
    
//    enableButtons: function(){
//        this.getView().lookupReference('editButton').setDisabled(false);
//        this.getView().lookupReference('deleteButton').setDisabled(false);
//    },


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
                    Dashboard.manager.system.PackagesManager.deleteOne(selectionId, this, 'refresh');                
                }
            }
        }); 
    },
    
    
    refresh: function (){

        var store = Ext.ComponentQuery.query('updatePackageMain')[0].store;
        store.load();
        
    },
            
            
    selectPackage: function(){

        this.selectPackageWindow = Ext.create('Dashboard.view.system.updatePackage.SelectPackage');
        this.selectPackageWindow.show();

    },
            
            
    affect: function(){

        this.selectDevicesWindow = Ext.create('Dashboard.view.system.updatePackage.SelectDevices',{
            autoShow: true,
            record: this.getSelection().data
        });
    },

    
    doPostEditAction: function(model){
        var win = Ext.ComponentQuery.query('selectDevices')[0];
        win.close();
        this.refresh();
    },
    
    savePackage: function(button) {
        Dashboard.tool.Utilities.trace('Event handler : savePackage');
        
        var win = button.up('window');
        var link = '/packages/';

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
            enctype : 'multipart/form-data',
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
            failure: function (response, result) {
                                
                myMask.hide();

                var data = JSON.parse(response.responseText);
                Dashboard.engine.ResponseManager.showErrorMessage(data);
                win.close();

                this.refresh();
                
                //CORS patch
               /* var response = result.response.statusText;
                
                if(response.indexOf('Blocked a frame with origin') !== -1){
                    win.close();
                    this.refresh();
                    
                }else{
                    var error = Ext.decode(result.response.responseText);
                    Ext.Msg.show({ title:getText('Error'), msg: error.error.message, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR });
                    Dashboard.tool.Utilities.error('savePackage : error: ' + error.error.message);
                } */
            }
        });


    },
            
    
    selectTargetDevices: function(sender){

        var token;
        if (Dashboard.manager.administration.UsersManager.getToken()) {
            token = Dashboard.manager.administration.UsersManager.getToken();
        }
        else {
            token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
        }
        
         // Get winForm
        var win = sender.up('window');
        var data = win.getData();
        
        if(data.deviceIdList.length <= 0){
            Ext.Msg.alert(getText('Warning'), getText('No element selected'));
            return;
        }
        
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/packages/authorize/'+data.id,
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            params : Ext.JSON.encode(data.deviceIdList),
            scope: this,
            success: function(response) {
               Dashboard.engine.ResponseManager.showSuccess(response);                
                this.doPostEditAction();
            },
            failure: function(response) {
                var data = JSON.parse(response.responseText);
                Dashboard.engine.ResponseManager.showErrorMessage(data);
            }
        });     
        
    }
    

});