/* global Ext  */

Ext.define('Dashboard.view.authentication.LoginScreenController', {
    extend : 'Ext.app.ViewController',
    alias : 'controller.loginScreen',

    requires : [ 
        'Dashboard.view.main.MainController', 
        'Dashboard.model.core.Authentication'
    ],

    view : 'loginScreen',

    onRenderMain : function(sender) {

	var currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('LOGIN_SCREEN');
	Dashboard.manager.authentication.LoginScreenManager.loadConfiguration(currentFeature);

    },

    buildScreen : function(feature) {
        
        //debugger;

	var config = feature.data.configuration.data.appearance;
	this.getView().configuration = config;
	this.getView().setConfiguration(config);

    },

    onLoginButton : function(sender) {

	var form = sender.up('form');

	if (!form.getForm().isValid()) {
	    Ext.Msg.show({
		title : getText('Error'),
		msg : getText('Form not valid!'),
		buttons : Ext.Msg.OK,
		icon : Ext.Msg.ERROR
	    });
	    return;
	}

	var data = form.getData();
        Dashboard.manager.administration.UsersManager.loginData = data;

	var authentication = Ext.create('Dashboard.model.core.Authentication', data);
	delete authentication.data.id;
        
        var myMask = new Ext.LoadMask({
            msg    : getText('Please wait...') + '...',
            target : form
        });

        myMask.show();

	authentication.save({
	    scope : this,
	    success : function(record, response) {

                myMask.hide();
                
		var resp = Ext.decode(response._response.responseText);

		if (resp.data) {
		    Dashboard.tool.Utilities.info('[LoginScreenController.onLoginButton] success: token loaded');

		    Dashboard.TOKEN = resp.data;
		    Dashboard.manager.administration.UsersManager.setToken(resp.data);
                    
                    //get expiration date
//                    try{
//                        var Base64 = {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
//                        var decodedString = Base64.decode(resp.data);
//                        var exp = decodedString.split(',')[2].split(':')[1];
//                        var expirationDate = new Date(parseInt(exp)*1000);
//                        Dashboard.manager.administration.UsersManager.setExpirationDate(expirationDate);
//                        console.log('expiration date :' + expirationDate.toString());
//                    }catch(ex){};

		    this.loadCurrentUser(resp.data, record.data.username);
		}

	    },
	    failure : function(record, response) {
                
                myMask.hide();
                
		this.manageError(response, 'onLoginButton', authentication);
	    }
	});

    },
    
    
    redirectToDashboard : function() {
        
        var refToken = localStorage.getItem('ref_access_token');
        var id_token_exp = localStorage.getItem('id_token_expiration');

        if (!refToken || !id_token_exp) {
            return;
        }
        
        var payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(refToken.split(".")[1]));
        console.log("acces toekne payload=> " + payloadObj);

        Dashboard.tool.Utilities.info('[LoginScreenController.onLoginButton] success: token loaded');

        console.log('----------  CLIENT WEB LOADING  ------------');
        this.loadCurrentUser(refToken, payloadObj.given_name);

    },


    
//    loadCurrentUser : function(token, userLogin) {
//
//	var store = Ext.create('Dashboard.store.core.CurrentUser', {
//	    autoload : false
//	});
//        
//        debugger;
//        
//        store.getProxy().setHeaders({
//            Authorization:'Bearer ' + token
//        });
//
//	store.load({
//	    scope : this,
//	    callback : function(records, operation, success) {
//                
//		if (success) {
//		    var model = records[0];
//
//		    Dashboard.manager.administration.UsersManager.setCurrentUser(model);
//		    Dashboard.tool.Utilities.info('[LoginScreenController.loadCurrentUser] loading success. User: ' + model.data.sticker);
//
//		    if (model.data.properties && model.data.properties.configuration) {
//			Ext.each(model.data.properties, function(property) {
//			    property.configuration.control = Ext.decode(property.configuration.control);
//			});
//		    }
//
//		    //if (model.data.login === userLogin) {
//                        
//                        this.loadCurrentUserSettings(model, token);
//			//this.onUserLogged(model);
//
////		    } else {
////
////			Ext.Msg.show({
////			    title : getText('Error'),
////			    msg : getText('Unknown user!'),
////			    buttons : Ext.Msg.OK,
////			    icon : Ext.Msg.ERROR
////			});
////		    }
//
//		} else {
//		    Dashboard.tool.Utilities.error('[LoginScreenController.loadCurrentUser] loading failed');
//		}
//	    }
//	});
//
//    },

    loadCurrentUser : function(token, userLogin) {

	var store = Ext.create('Dashboard.store.core.CurrentUser', {
	    autoload : false
	});
        
        //debugger;
        
//        store.getProxy().setHeaders({
//            Authorization:'Bearer ' + token
//        });

	store.load({
	    scope : this,
	    callback : function(records, operation, success) {
                
		if (success) {
		    var model = records[0];

		    Dashboard.manager.administration.UsersManager.setCurrentUser(model);
		    Dashboard.tool.Utilities.info('[LoginScreenController.loadCurrentUser] loading success. User: ' + model.data.sticker);

		    if (model.data.properties && model.data.properties.configuration) {
			Ext.each(model.data.properties, function(property) {
			    property.configuration.control = Ext.decode(property.configuration.control);
			});
		    }

		    //if (model.data.login === userLogin) {
                        
                        this.loadCurrentUserSettings(model, token);
			//this.onUserLogged(model);

//		    } else {
//
//			Ext.Msg.show({
//			    title : getText('Error'),
//			    msg : getText('Unknown user!'),
//			    buttons : Ext.Msg.OK,
//			    icon : Ext.Msg.ERROR
//			});
//		    }

		} else {
		    Dashboard.tool.Utilities.error('[LoginScreenController.loadCurrentUser] loading failed');
		}
	    }
	});

    },
    
    
    loadCurrentUserSettings : function(currentUser, token) {

        var proxy = Dashboard.model.UserSettings.getProxy();
        proxy.headers.Authorization = 'Bearer ' + token;

	Dashboard.model.UserSettings.load('', {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[LoginScreenController.loadCurrentUserSettings] error: loading user settings failure');
                    this.onUserLogged(currentUser, token);
                },
                success: function(record, operation) {
                                        
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var settings = Ext.decode(response.data.value);

                        if (response === undefined || settings === undefined) {
                            throw 'Bad JSON in response'; 
                        }
                        
                        //var settings = Ext.create('Dashboard.model.UserSettings', value.settings);
                        currentUser.data.userSettings = settings;
                        Dashboard.tool.Utilities.info('[LoginScreenController.loadCurrentUserSettings] loading users\'s settings success.');
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[UsersManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.onUserLogged(currentUser, token);
                    
                }
            });

    },
    

    onUpdatePasswordButton : function(sender) {

	var form = sender.up('form');

	if (!form.getForm().isValid()) {
	    Ext.Msg.show({
		title : getText('Error'),
		msg : getText('Form not valid!'),
		buttons : Ext.Msg.OK,
		icon : Ext.Msg.ERROR
	    });
	    return;
	}

	var data = form.getData();

	if (data.previousPassword === data.password) {
	    Ext.Msg.show({
		title : getText('Warning'),
		msg : getText('New password must be different!'),
		buttons : Ext.Msg.OK,
		icon : Ext.Msg.WARNING
	    });
	    return;
	}
                
        if (data.password !== data.passwordConfirm) {
	    Ext.Msg.show({
		title : getText('Warning'),
		msg : getText('Password not confirmed!'),
		buttons : Ext.Msg.OK,
		icon : Ext.Msg.WARNING
	    });
	    return;
	}

	var model = Ext.create('Dashboard.model.core.PasswordUpdate', {
            login: data.username,
            oldPassword: data.previousPassword,
            newPassword: data.password
        });
        
	delete model.data.id;

//        var proxy = model.getProxy();
//        proxy.headers.Authorization = 'Bearer ' + Dashboard.manager.administration.UsersManager.getToken();
        
        //Dashboard.manager.authentication.MyAtService.getReferenceAccessToken(callback, this);

        //var keys = model.data.login + '/' + model.data.oldPassword + '/' + model.data.newPassword;
	model.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/users/updatepassword';//+ keys;

	model.save({
	    scope : this,
	    success : function(record, response) {
                                
		this.authenticate({
                    username: record.data.login,
                    password: record.data.newPassword
                });

	    },
	    failure : function(record, response) {
		this.manageError(response, 'onUpdatePasswordButton');
	    }
	});

    },

    authenticate : function(data) {

	var authentication = Ext.create('Dashboard.model.core.Authentication', data);
	delete authentication.data.id;

	authentication.save({
	    scope : this,
	    success : function(record, response) {

		var resp = Ext.decode(response._response.responseText);

		if (resp.data) {
		    Dashboard.tool.Utilities.info('[LoginScreenController.onLoginButton] success: token loaded');

		    Dashboard.TOKEN = resp.data;
		    Dashboard.manager.administration.UsersManager.setToken(resp.data);

		    this.loadCurrentUser(resp.data, record.data.username);
		}

	    },
	    failure : function(record, response) {
		this.manageError(response, 'authenticate', authentication);
	    }
	});
    },

    manageError : function(response, methodName, authentication) {
                
	var resp = null;
        
	try {
	    resp = Ext.decode(response._request._rawRequest.result.responseText);
	} catch (err) {
	    Dashboard.tool.Utilities.error('[LoginScreenController.' + methodName + '] error during server response decode -> server unavailable');
	    Ext.Msg.alert(getText('Error'), getText('Server unavailable!'));
	}

	if (resp !== undefined) {
            
	    var errorName = resp.error.name;
	    Dashboard.tool.Utilities.error('[LoginScreenController.' + methodName + '] error: code: ' + resp.error.code);

            if(resp.message){

                Ext.Msg.show({
		    title : getText('Error'),
		    msg : resp.message,
		    buttons : Ext.Msg.OK,
		    icon : Ext.Msg.ERROR
		});
                
                if(errorName === 'USER_PASSWORD_EXPIRED' ){
                    this.showChangePassword(authentication);
                }
                return;
            }

	    switch (errorName) {
                case 'USER_BAD_CREDENTIALS':
                    Ext.Msg.alert(getText('Error'), getText('Incorrect login and / or password'));
                    break;
                    
                case 'USER_PASSWORD_INVALID':
                    Ext.Msg.alert(getText('Error'), getText('Incorrect login and / or password'));
                    break;

                case 'USER_PASSWORD_EXPIRED':
                    Ext.Msg.alert(getText('Warning'), getText('Please, choose a new password.'));
                    this.showChangePassword(authentication);
                    break;
                    
                case 'USER_PASSWORD_ALREADY_EXISTS':
                    Ext.Msg.alert(getText('Error'), getText('This password is already in use!'));
                    break;
                    
                case 'USER_NOT_CONFIRMED_NEW_PASSWORD':
                    Ext.Msg.alert(getText('Error'), getText('Passwords are not the same!'));
                    break;
                    
                case 'USER_EMPTY_NEW_PASSWORD':
                    Ext.Msg.alert(getText('Error'), getText('The new password is missing!'));
                    break;
                    
                case 'USER_BADGE_NUMBER_ALREADY_EXISTS':
                    Ext.Msg.alert(getText('Error'), getText('This badge number is already in use!'));
                    break;
                    
                case 'USER_PASSWORD_EXPIRED':
                    Ext.Msg.alert(getText('Error'), getText('Password expired!'));
                    break;
                    
                case 'USER_SELF_DELETION':
                    Ext.Msg.alert(getText('Error'), getText('Deleted user'));
                    break;
                    
                case 'USER_STICKER_WRONG_FORMAT':
                    Ext.Msg.alert(getText('Error'), getText('User sticker : wrong format'));
                    break;
                    
                case 'USER_BADGE_NUMBER_UNKNOW':
                    Ext.Msg.alert(getText('Error'), getText('User badge number unknow'));
                    break;
                    
                case 'USER_ACCOUNT_LOCKED':
                    Ext.Msg.alert(getText('Error'), getText('User account locked'));
                    break;
                
                case 'USER_HAS_ON_GOING_OPERATION':
                    Ext.Msg.alert(getText('Error'), getText('User has on going operation'));
                    break;
                    
                case 'USER_SESSION_ERROR':
                    Ext.Msg.alert(getText('Error'), getText('Maximum sessions for this principal exceeded'));
                    break;
                    
                case 'USER_ID_NOT_EXISTS':
                    Ext.Msg.alert(getText('Error'), getText('User not exists'));
                    break;
                    
                case 'USER_ALREADY_CONNECTED':
                    Ext.Msg.alert(getText('Error'), getText('User already connected'));
                    break;
                    
                default:
                    Ext.Msg.alert(getText('Error'), getText('Login error'));
                    Dashboard.tool.Utilities.error('[LoginScreenController.' + methodName + '] unhandled error: ' + JSON.stringify(resp.error));
            }
	}
    },

    onUserLogged : function(user, token) {
        this.getUserContexts(user, token);
    },
   
    getUserContexts: function (user, token){
        var parentContext = this;
      
//        var proxy = user.getProxy();
//        proxy.headers.Authorization = 'Bearer ' + token;
      
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/currentUserAvailableContextNames',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
//            headers: {
//                Authorization : 'Bearer ' + token
//            },
            
            method: 'GET',
            success: function (response, opts) {
                
//                var proxy = Dashboard.manager.system.DynamicPropertiesManager.store.getProxy();
//                proxy.headers.Authorization = 'Bearer ' + token;
                
                Dashboard.manager.system.DynamicPropertiesManager.store.load();
                
                try {
                    var responseObj = JSON.parse(response.responseText);
                    
                    if(responseObj.success){
                        if (responseObj.data.length >= 2) {
                            Dashboard.tool.Utilities.info('[LoginScreenController.getUserContexts] success loding contexts : ' + JSON.stringify(responseObj.data));
                            parentContext.showSelectContextWindow(user, responseObj.data);
                        
                        } else {
                            Dashboard.tool.Utilities.info('[LoginScreenController.getUserContexts] success loding contexts : no contexts found');
                            parentContext.showMustGoOn();
                        }                        
                    }else {
                        throw '[LoginScreenController.getUserContexts] ERROR ' + (responseObj.error || 'null');
                    }
                } catch (e) {
                    Dashboard.tool.Utilities.error('[LoginScreenController.getUserContexts] error: loading contexts : ' + e);
                    Dashboard.engine.ResponseManager.showFailure(getText('Failed loading context'));
                }
            },
            failure: function (response, opts) {
                Dashboard.engine.ResponseManager.showFailure(getText('Failed loadebuding context'));
            }
        });
    },
    
    showSelectContextWindow: function (user, contexts){
        var contextSelectWindow = Ext.create('Dashboard.view.dashboard.contextSelectWindow');
        contextSelectWindow.setData(contexts);
        contextSelectWindow.setParentScope(this, 'login');
        
        contextSelectWindow.show();
    },
    
    showMustGoOn : function() {
        
	Dashboard.app.getMainView(this.getView()).destroy();
	Dashboard.app.setMainView('Dashboard.view.main.MainPanel');
    },

    showChangePassword : function(authentication) {
        
	var formContainer = Ext.ComponentQuery.query('panel[reference=loginFormContainer]')[0];
	formContainer.removeAll();
        
        formContainer.add({
	    xtype : 'updatePasswordForm',
	    width : 300,
	    margin : 40
	});
        formContainer.down('updatePasswordForm').setData(authentication.data);

    },

    showLoginPassword : function() {

	var formContainer = Ext.ComponentQuery.query('panel[reference=loginFormContainer]')[0];
	formContainer.removeAll();
	formContainer.add({
	    xtype : 'loginForm',
	    width : 300,
	    margin : 40
	});

	// Ext.ComponentQuery.query('authenticationBody')[0].updateLayout();

    }
});
