/* global Ext  */

Ext.define('Dashboard.view.settings.userSettings.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.userSettings',
    
    require:[],
    
    view: 'userSettings',
        
    init: function() {
        
         this.control({

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================

    
    onCheckPersonalFilters: function(sender){
        this.updateUserSettings(sender);
    },
            
    onCheckPersonalColumns: function(sender){
        this.updateUserSettings(sender);
    },
    
    onCheckPersonalDetail: function(sender){
        this.updateUserSettings(sender);
    },
    
    
    onRenderMain: function(sender){
        
    },
    

            
            
    //==========================================================================
    //   Methods
    //==========================================================================
    
    
    updateUserSettings: function(sender){
                
        if (!this.getView().down('form').isValid()) {
            this.getView().getInvalidFields();
            return;
        }
        
        var userSettings = this.getView().getData();
                
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        currentUser.data.userSettings = userSettings;
        
        Dashboard.manager.settings.UserSettingsManager.saveCurrentUserSettings();
    },
    
    
    doPostEditAction: function (user){
        
    }
    
});