
/**
 * This class is the controller for the main view for the application. It is specified as the "controller" of the Main view class.
 * 
 */

/* global Ext  */

Ext.define('Dashboard.view.main.MainController', {
    extend : 'Ext.app.ViewController',
    alias : 'controller.main',

    requires : [ 'Dashboard.manager.ConfigurationManager' ],

    onRenderMain : function(sender) {

	// Listen for all image 404 in app 
	window.addEventListener('error', function(e) {
            //var thumbnail404 = Dashboard.config.Config.DEFAULT_404_SRC;
            var thumbnail404 = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
            
            var target = e.srcElement || e.target;
            if (target && target.nodeName === 'IMG') {
                target.src = thumbnail404;
                e.stopPropagation();
                return false;
            }
        }, true);
        
        // Fixes EXT JS issue with touch screen FF 52 & other
        if (Ext.isIE || Ext.isEdge || (Ext.firefoxVersion >= 52) || Ext.os.is.ChromeOS || window.inUnitTest) {
            var eventMap = Ext.dom.Element.prototype.eventMap;
            eventMap.click = 'click';
            eventMap.dblclick = 'dblclick';
        }

        /**
         * IE is crap
         */

        // Fix IE trim issue
        if (!String.prototype.trim) {
            String.prototype.trim = function () {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            };
        }

        // startsWith polyfill
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (searchString, position) {
                return this.substr(position || 0, searchString.length) === searchString;
            };
        }
        
                
//        Ext.Ajax.on({
//            scope : this,
//            beforerequest: function( conn, request, eOpts ){
//                
//                //debugger;
//                                
//                if(!request.headers){
//                    request.headers = {};
//                }
//                                
//                //var token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
//                //Simulation
//                var token = Dashboard.manager.administration.UsersManager.getToken();
//                request.headers.Authorization = 'Bearer ' + token;
//                                
////                // Check if Token expired
//                if(Dashboard.manager.authentication.MyAtService.expired(Date.now()) || !token){
//                    //debugger;
//                    this.getNewToken(conn);
//                }
////                
////                //token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
////                //Simulation
//                token = Dashboard.manager.administration.UsersManager.getToken();
//                request.headers.Authorization = 'Bearer ' + token;
//                
//            },
//            requestexception: function(conn, response, options, eOpts) {
//                
//                //debugger;
//                                
//                if(response.status === 404 || response.status >= 500){
//                    return;
//                }
//                
//                // Invalid token :  Token expired
//                if(response.status === 203 || response.status === 401 || response.status === 440){ //Unauthorized
//                      //TODO  
//                      Dashboard.tool.Utilities.error("[MainController] Ext.Ajax.on requestexception status: " + response.status);
//                }
//            }
//        });
                
        
	Ext.data.Connection.override({
	    request : function(options) {
                
		if (Dashboard.config.Config.contexts.selected !== undefined) {
		    // add an extra parameter to the request if a specific context was chosen
		    var contextSelected = Dashboard.config.Config.contexts.selected;
		    Dashboard.tool.Utilities.info('Context selected: \'' + contextSelected + '\'');
		    if (!options.params) {
			options.params = {};
		    }
		    options.params.context = contextSelected;
		}
		return this.callOverridden(arguments);
	    }
	});

	Dashboard.manager.ConfigurationManager.configureWebClient();
    },

    
//    getNewToken: function(conn){
//                
//        if(Dashboard.manager.authentication.MyAtService.requestedToken === true){
//            return;
//        }
//                
//        Dashboard.tool.Utilities.error("MainController.getNewToken" + ' get new Token from server.');
//        
//        var data = Dashboard.manager.administration.UsersManager.loginData; //{};
//        Dashboard.manager.authentication.MyAtService.requestedToken = true;
//        
//        Ext.Ajax.request({
//            url: Dashboard.config.Config.SERVER_HOST_NAME + '/authentication/login',
//            cors: true,
//            useDefaultXhrHeader: false,
//            withCredentials: true,
//            method: 'POST',
//            async: false,
//            jsonData: data,
//            success: function (response, opts) {
//                                
//                var resp = Ext.decode(response.responseText);
//
//		if (resp.data) {
//		    Dashboard.tool.Utilities.info('[MainController.getNewToken] success: token loaded');
//
//		    Dashboard.TOKEN = resp.data;
//		    Dashboard.manager.administration.UsersManager.setToken(resp.data);
//                    
//                    Dashboard.manager.authentication.MyAtService.requestedToken = false;
//                    
//                    //get expiration date
//                    try{
//                        var Base64 = {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
//                        var decodedString = Base64.decode(resp.data);
//                        var exp = decodedString.split(',')[2].split(':')[1];
//                        var expirationDate = new Date(parseInt(exp)*1000);
//                        Dashboard.manager.administration.UsersManager.setExpirationDate(expirationDate);
//                        console.log('expiration date :' + expirationDate.toString());
//                    }catch(ex){};
//                }
//                
//            },
//            failure: function (response, opts) {
//                //TODO
//                Dashboard.tool.Utilities.error("MainController.getNewToken" + ' get new Token ERROR');
//            }
//        });
//            
//    },
//    

    resetAllStoreFilters: function () {
        var storeNames = this.getAllStores();
        
        storeNames.forEach(function (storeName) {
            if (typeof storeName === 'string') {
                // Create instance of store
                var store = Ext.create(storeName);
                if (store.getProxy) { // Not all stores have a proxy
                    if (store.getProxy().extraParams && store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = []; // Empty filters
                    }
                }
            }
        });
    },
    
    getAllStores: function () {
        var storeNames = []; // Array of string array names
        var stores = Dashboard.store; // All of the stores under this namespace
        
        // transform object to array
        var storeArray = Object.keys(stores).map(function (key) {
            return stores[key];
        });
        
        storeArray.forEach(function (levelOneStore) {
            if (levelOneStore.$className && levelOneStore.$className !== undefined) { 
                storeNames.push(levelOneStore.$className);
            } else {
                // stores can exist on 2 levels
                // transform object to array
                var storeArray2 = Object.keys(levelOneStore).map(function (key) {
                    return levelOneStore[key];
                });
                storeArray2.forEach(function (levelTwoStore) {
                    if (levelTwoStore.$className && levelTwoStore.$className !== undefined) {
                        storeNames.push(levelTwoStore.$className);
                    }
                });
            }
        });
        return storeNames;
    },

    powerOff : function(sender) {

	var model = Ext.create('Dashboard.model.core.LogOut');
	delete model.data.id;

	model.save({
	    scope : this,
	    success : function(record, response) {  
                
                //init filters
                this.resetAllStoreFilters();
                
                //init catography rights
                Dashboard.manager.cartography.CartographyManager.editionMode = false;
                
                this.redirectToLoginPage();
	    },
	    failure : function(record, response) {
                try {
                    var resp = Ext.decode(response._request._rawRequest.result.responseText);
                    Dashboard.tool.Utilities.error('[MainController.powerOff] error: ' + resp.error.code);

                } catch (ex) {
                    Dashboard.tool.Utilities.error('[MainController.powerOff] : ' + ex);
                }
                this.redirectToLoginPage();
	    }
	});

    },

    redirectToLoginPage : function() {
                
	// Close all open windows
	var windows = Ext.ComponentQuery.query('window');
	for (var i = 1; i < windows.length; i++) {
            try{
                windows[i].close();
            }catch(ex){
            }
        }

	// remove contexts 
	Dashboard.config.Config.contexts = {};

	Dashboard.manager.DataCollectionManager.disableTimer();
	Dashboard.manager.administration.UsersManager.setCurrentUser(null);
                
	Dashboard.app.getMainView().close();
        
	Dashboard.app.setMainView('Dashboard.view.authentication.LoginScreen');
        
    },

    /**
     * Show feature's main panel into viewport main panel
     * 
     * @param {type}
     *                panel
     * @returns {undefined}
     */
    displayInMain : function(panel) {
                        
        var mainContainer = Ext.ComponentQuery.query('panel[name=viewPortCenter]')[0];
        try{
            if(mainContainer.down('container')){
                mainContainer.down('container').doDestroy();
            }
        }catch(ex){
            Dashboard.tool.Utilities.error('[MainController.displayInMain] : ' + ex);
        }
        
	mainContainer.add(panel);
    },

    onItemSelected : function(sender, record) {
	Ext.Msg.confirm('Confirm', getText('Are you sure?'), 'onConfirm', this);
    },

    onConfirm : function(choice) {
	if (choice === 'yes') {
	    //
	}
    },
    
    
    onAbout: function(){
        
        Dashboard.manager.MainMenuManager.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('ABOUT');
        Dashboard.manager.system.AboutManager.displayInMain();
        
    },
    
    
//    configGlobalConfiguration: function(sender){
//        
//        var globalConfiguration = Dashboard.manager.ConfigurationManager.globalConfiguration;
//
//        this.win = Ext.create('Dashboard.view.setting.webClient.GlobalConfiguration', {
//            record : globalConfiguration.data
//        });
//        
//        var button = this.win.down('button[action=save]');
//        button.on('click', this.changeUserProperty);
//
//        this.win.show();
//
//    },
    
    statics: {
    
        changeUserProperty: function(property){

            //var property = sender.up('window').down('combobox[reference=userProperty]').getValue();
            var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var string  = user.data[property+''];

            if(property === 'firstNameLastName'){
                string = user.data.firstName + ' ' + user.data.lastName;
            }

            if(!Ext.String.trim(string)){
                string = user.data.sticker; //getText('&nbsp&nbsp&nbsp&nbsp&nbsp');
            }

            var label = Ext.ComponentQuery.query('app_main')[0].lookupReference('userName');
            label.setHtml(string);

            var config = Ext.create('Dashboard.model.FeatureConfiguration');
            config.data.userProperty = property;

            Dashboard.manager.ConfigurationManager.saveGlobalConfiguration(config);

            //sender.up('window').close();

        }
    
    }
    
});
