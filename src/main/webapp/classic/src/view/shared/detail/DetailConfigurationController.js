Ext.define('Dashboard.view.shared.detail.DetailConfigurationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.detailConfiguration',
    
    require:[],
    
    selection: null,
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================

    
    onSaveConfiguration: function(event){

        var data = this.getView().getData();
        this.saveConfiguration(data);
        this.getView().close();
    },
    
    
    //==========================================================================
    //   Methods
    //==========================================================================
    
    
//    showCreateColumnWindow : function(type){
//        var win = Ext.create('Dashboard.view.shared.viewList.CreateColumn',{
//            mainController: this,
//            modelProperties: this.getView().modelProperties
//        });
//        
//        win.show();
//    },
            
             

    saveConfiguration: function(_data){

        // save To Server
        var feature = this.getView().mainView.feature;
        
        this.refreshDetail(_data);

        Dashboard.manager.FeaturesManager.saveDetailConfiguration(feature, _data);
    },
            
            
    refreshDetail: function(configuration){

        try{
            this.getView().mainView.getController().loadDetail();
        }catch(ex){
            Dashboard.tool.Utilities.error('[DetailConfigurationController.refreshDetail] error : ' + ex);
        }
    }

});