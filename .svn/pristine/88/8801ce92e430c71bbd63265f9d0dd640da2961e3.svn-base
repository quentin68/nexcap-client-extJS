/* global Ext  */

Ext.define('Dashboard.view.settings.webClient.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.webClientMain',
    
    require:[
        'Dashboard.view.shared.imagesViewer.ThumbnailEdit'//,
        //'Dashboard.view.shared.imagesViewer.Zoom'
    ],
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'EXTERNAL_CONFIGURATION_ADMIN', 0, false, true, true),

    
    view: 'webClientMain',
    
    
    init: function() {
        
         this.control({

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================

    
    onEditBackground: function(){
        this.editBackground();
    },
            
    onEditColor: function(){
        this.editMaskColor();
    },
    
    onEditTitle: function(){
        this.editTitle();
    },
            
    onEditLogo: function(){
        this.editLogo();
    },
            
    onSaveTitle: function(sender){
        var win = sender.up('window');
        this.saveTitle(win);
    },
    
    onRenderMain: function(sender){
    },
    
    onUpdate: function(sender){
        var win = sender.up('window');
        this.update(win);
    },  
            
    onReset: function(sender){
        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Are you sure that want to reset page configuration') +" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.reset();
                }
            }
        });
    },
            
            
    //==========================================================================
    //   Methods
    //==========================================================================
    
    
    reset: function(){
        
        var defaultConf = Dashboard.manager.authentication.LoginScreenManager.getConfiguration().appearance;
                
        var maskTitle = defaultConf.title;
        var maskColor = defaultConf.color;
        var backgroundSrc = 'url(' + defaultConf.backgroundPicture + ')';
        var logoSrc = defaultConf.logoPicture;
        
        
        var mask = this.getView().down('container[reference=mask]');
        mask.setStyle('background', maskColor);
        
        var title = this.getView().down('label[reference=title]');
        title.setText(maskTitle);
        
        var logo = this.getView().up('webClientMain').down('image[reference=logo]');
        logo.setSrc(logoSrc);
        
        var menuLogo = Ext.getCmp('menuLogo');
        menuLogo.setSrc(logoSrc);
        
        var background = this.getView().down('container[reference=background]');
        background.setStyle('backgroundImage', backgroundSrc);
        
        //saving
        var logingScreenFeature = this.getLogingScreenFeature();
        var configuration = logingScreenFeature.data.configuration;
        configuration.data.appearance = defaultConf;
        
        Dashboard.manager.ConfigurationManager.saveFeatureConfiguration(logingScreenFeature, 'unsecured');
        
    },
    
    
    getLogingScreenFeature: function(){
        
        var logingScreenFeature = Dashboard.manager.FeaturesManager.getFeatureByName('LOGIN_SCREEN');
        return logingScreenFeature;
        
    },
            
    
    editTitle: function(){
        
        var win = Ext.create('Dashboard.view.setting.webClient.EditTitle');
        var title = this.getView().down('label[reference=title]').text;
        win.setData(title);
        
        win.show();
    },
            
            
    saveTitle: function(win){

        var value = win.getData().title;
        if (value.length > 50 || value.length < 4) { // If you edit this also edit EditTitle.js
            return;
        }
        
        var title = Ext.ComponentQuery.query('label[reference=title]')[0];
        title.setText(value);
        
        var logingScreenFeature = this.getLogingScreenFeature();
        var configuration = logingScreenFeature.data.configuration;
        configuration.data.appearance.title = value;
        
        Dashboard.manager.ConfigurationManager.saveFeatureConfiguration(logingScreenFeature, 'unsecured');

        win.close();

    },
            
    
    editMaskColor: function(){

       var colorPicker = Ext.create('Dashboard.view.shared.ColorPicker');
       var mask = this.getView().down('container[reference=mask]');
       
       colorPicker.down('form').lookupReference( 'selectedColor' ).on({
           scope: this,
           change: function(sender) {
               
                mask.setStyle('background', sender.value);
               
                var logingScreenFeature = this.getLogingScreenFeature();
                var configuration = logingScreenFeature.data.configuration;
                configuration.data.appearance.color = sender.value;
        
                Dashboard.manager.ConfigurationManager.saveFeatureConfiguration(logingScreenFeature, 'unsecured');

               Ext.Function.defer(function(){
                   sender.up('window').close();
               }, 100);

           }
       });

       colorPicker.show(); 

    },
    
    
     editBackground: function(){

       var background = this.getView().down('container[reference=background]');
       var hostName = Dashboard.config.Config.SERVER_HOST_NAME;
       
       var imageLoader = Ext.create('Dashboard.view.shared.imagesViewer.ThumbnailEdit');
       imageLoader.addThumbnail(hostName + this.getView().configuration.backgroundPicture);
       
       var selectButton = imageLoader.down('button[action=upload]' );
       selectButton.handler = null;
       
       selectButton.on({
           scope: this,
           click: function(sender){
               
               if (!sender.up('window').down('form').isValid()) {
                    sender.up('window').getInvalidFields();
                    return;
                }
               
                
                var imageSrc = imageLoader.getImageSrc();
                background.setStyle('backgroundImage', 'url(' + imageSrc + ')');
                background.imageUrl = imageSrc;
                
                Dashboard.manager.administration.FilesManager.saveThumbnail(
                        1, 'EXTERNAL', 'configLoginScreenBackground', this, 'unsecured');

           }
       });

       imageLoader.show(); 

    },
    
//    SERVER_URL_DOWNLOAD_THUMBNAIL : hostName + '/resources/thumbnail/',
//        SERVER_URL_DOWNLOAD_IMAGE: hostName + '/resources/image/',
    
    configLoginScreenBackground: function(url, fileName){
                
        //url = Dashboard.config.Config.SERVER_HOST_NAME + '/unsecured/resources/image/external/' + fileName;
        url = '/unsecured/resources/image/external/' + fileName;
                        
        var logingScreenFeature = this.getLogingScreenFeature();
        var configuration = logingScreenFeature.data.configuration;
        configuration.data.appearance.backgroundPicture = url;
        
        Dashboard.manager.ConfigurationManager.saveFeatureConfiguration(logingScreenFeature, 'unsecured');
    },
            
            
    editLogo: function(){

       var logo = this.getView().up('webClientMain').down('image[reference=logo]');
       var menuLogo = Ext.ComponentQuery.query('image[reference=menuLogo]')[0];
       var hostName = Dashboard.config.Config.SERVER_HOST_NAME;
       
       var imageLoader = Ext.create('Dashboard.view.shared.imagesViewer.ThumbnailEdit');
       imageLoader.addThumbnail( hostName + this.getView().configuration.logoPicture);
       
       var selectButton = imageLoader.down('button[action=upload]' );
       selectButton.handler = null;
       
       selectButton.on({
           scope: this,
           click: function(sender){
               
                var imageSrc = imageLoader.getImageSrc();
                logo.setSrc(imageSrc);
                menuLogo.setSrc(imageSrc);
                
                Dashboard.manager.administration.FilesManager.saveThumbnail(
                        2, 'EXTERNAL', 'configLoginScreenLogo', this, 'unsecured');

           }
       });

       imageLoader.show(); 

    },
    
    configLoginScreenLogo: function(url, fileName){
                
        //url = Dashboard.config.Config.SERVER_HOST_NAME + '/unsecured/resources/image/external/' + fileName;
        url = '/unsecured/resources/image/external/' + fileName;
                
        var logingScreenFeature = this.getLogingScreenFeature();
        var configuration = logingScreenFeature.data.configuration;
        configuration.data.appearance.logoPicture = url;
        
        Dashboard.manager.ConfigurationManager.saveFeatureConfiguration(logingScreenFeature, 'unsecured');
    },
    
    configGlobalConfiguration: function(sender){
        
        var globalConfiguration = Dashboard.manager.ConfigurationManager.globalConfiguration;

        this.win = Ext.create('Dashboard.view.setting.webClient.GlobalConfiguration', {
            record : globalConfiguration.data
        });
        
        var button = this.win.down('button[action=save]');
        button.on('click', this.changeUserProperty, sender);

        this.win.show();

    },
    
    changeUserProperty: function(sender){
        
        var property = sender.up('window').down('combobox[reference=userProperty]').getValue();
        
        Dashboard.view.main.MainController.changeUserProperty(property);
        
        sender.up('window').close();
        
    }
    
    
//    configGlobalConfiguration: function(value){
//        
//        var logingScreenFeature = this.getLogingScreenFeature();
//        var configuration = logingScreenFeature.data.configuration;
//        configuration.data.appearance.userProperty = value;
//                        
//        Dashboard.manager.ConfigurationManager.saveFeatureConfiguration(logingScreenFeature, 'unsecured');
//
//    }
    
});