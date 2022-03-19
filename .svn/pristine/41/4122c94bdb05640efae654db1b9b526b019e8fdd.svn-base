/* global Ext  */

Ext.define('Dashboard.manager.system.AboutManager', {
    extend: 'Ext.app.Controller',
    alias: 'aboutManager',
    singleton: true,
    
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    
    feature:  Ext.create('Dashboard.store.Features').findRecord('name', 'ABOUT', 0, false, true, true),
    
    config:{

    },
    
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[AboutManager.displayInMain] show web client about');
        
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        mainController.displayInMain(
            { 
                xtype: 'aboutMain',
                store: null,
                configuration: null,
                feature: feature
            }
        );
    },
    
            
      getProperties: function(){
        
        return [];
    } ,
    
    
    getInformations: function(){
        
        var config = Dashboard.manager.ConfigurationManager.currentConfiguration;
        
        this.loadAboutData();
        
        //default data
        var infos = {
            //USER_GUIDE_URL: Dashboard.config.Config.USER_GUIDE_URL,
            SUPPORT_MAIL: Dashboard.config.Config.SUPPORT_MAIL,
            SUPPORT_PHONE: Dashboard.config.Config.SUPPORT_PHONE,
            SWITCHBOARD_PHONE: Dashboard.config.Config.SWITCHBOARD_PHONE,
            SWITCHBOARD_MAIL: Dashboard.config.Config.SWITCHBOARD_MAIL,
            SERVER_VERSION: Dashboard.config.Config.SERVER_VERSION,
            WEB_CLIENT_VERSION: Dashboard.config.Config.CLIENT_WEB_VERSION,
            SUPPORT_HOURS_FR: Dashboard.config.Config.SUPPORT_HOURS_FR,
            SUPPORT_HOURS_EN: Dashboard.config.Config.SUPPORT_HOURS_EN,
            ABOUT_RESUME_FR : Dashboard.config.Config.ABOUT_RESUME_FR,
            ABOUT_RESUME_EN : Dashboard.config.Config.ABOUT_RESUME_EN
        };
        
        if(Dashboard.config.Config.LOCALE === 'fr_FR'){
            infos.USER_GUIDE_URL = Dashboard.config.Config.USER_GUIDE_URL_FR;
        }else{
            infos.USER_GUIDE_URL = Dashboard.config.Config.USER_GUIDE_URL_EN ;
        }
        
        return infos;
    },
    
    
    loadAboutData: function(plugin, controller, action){
        
        this.getOne();

    },
    
    
    getOne: function(id, controller, action){
        
        var about = Ext.create(Dashboard.model.system.About);
        
        try{
            about.load({
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'.getOne] error: loading failure');
                },
                success: function(record, operation) {

                },
                callback: function(record, operation, success) {
                    record.data.webClientVersion = Dashboard.config.Config.CLIENT_WEB_VERSION;
                    var main = Ext.ComponentQuery.query('aboutMain')[0];
                    if(main){
                        main.setData(record);
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('['+this.className+'.getOne] error: ' + err);
        }
    }
    
    
});