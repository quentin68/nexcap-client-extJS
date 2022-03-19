/*  global Ext, getText */

Ext.define('Dashboard.engine.ResponseManager', {
    requires : [ 'Dashboard.tool.Utilities' ],

    statics : {

	/**
	 * Do actions after success. Show the user message.
	 * 
	 * @argument {action} action Request action
	 * @argument {object} msg User message
	 */
	showSuccess : function(action, msg) {

	    if (msg === '' || msg === undefined) {
		msg = getText('The operation has been done!');//getText('L\'opération a bien été effectuée !');
	    }

	    if (action.userMessage !== undefined) {
		msg = action.userMessage;
	    }

	    Ext.Msg.show({
		title : getText('Success'),
		msg : msg,
		buttons : Ext.Msg.OK,
		icon : Ext.Msg.INFO
	    });
	},

	/**
	 * Do actions after failure. Show the user message.
	 * 
	 * @param action
	 *                (action) .
	 */
	showFailure : function(action) {
            
	    var resp = action.result;

	    // Dashboard.tool.Utilities.trace('Request error = '+resp.error.code + ' / ' + resp.error.name + ' / ' + resp.error.logMessage , 'INFO');

	    switch (action.failureType) {

	    case Ext.form.Action.CLIENT_INVALID:
		// Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
		Ext.Msg.alert(getText('Warning'), getText('The form can not be sent : errors detected.'));
		break;

	    case Ext.form.Action.CONNECT_FAILURE:
		Ext.Msg.alert(getText('Error'), getText('Connection Problem') + ' :' + action.response.status + ' ' + action.response.statusText);
		break;

	    case Ext.form.Action.SERVER_INVALID:

		var userMessage = getText('Failed to process');
		var title = getText('Error');

		if (resp.error !== undefined) {
		    if (resp.error.message !== null && resp.error.message !== undefined && resp.error.message !== '') {
			userMessage = resp.error.message;

			if (resp.error.code !== null && resp.error.code !== undefined) {
			    title = getText('Error') + ' n° ' + resp.error.code;
			}

			if (resp.error.name !== null && resp.error.name !== undefined) {
			    Dashboard.tool.Utilities.error('Request failed : ' + resp.error.name);
			}
		    }

		    Ext.Msg.alert({
			title : title,
			msg : userMessage,
			buttons : Ext.Msg.OK,
			icon : Ext.Msg.WARNING
		    });

		} else {
		    Ext.Msg.alert(getText('Error'), getText('Request failed : ') + action.response.responseText);
		}

		break;

		case Ext.form.Action.INVENTORY_REPORT_UNKNOWN:
			Ext.Msg.alert(getText('Error'),'Fichier indisponible');
			break;

		case Ext.form.Action.PACKAGE_NAME_ALREADY_EXIST:
			Ext.Msg.alert(getText('Error'),'Ce nom de package existe déjà');

			break;

	    default:
		Ext.Msg.alert(getText('Error'), 'Pas de communication avec le serveur !');
	    }
	}, // end failure

	/**
	 * Do actions after error. Show the user message.
	 * 
	 * @param {object}
	 *                data response.records[0].data
	 */
	showSuccessMessage : function(data) {

	    var userMessage = getText('Operation successfull!');
	    var title = getText('Success');
	    if (data.userMessage) {
		if (data.userMessage.message !== null && data.userMessage.message !== undefined && data.userMessage.message !== '') {
		    userMessage = data.userMessage.message;
		}
	    }

	    Ext.Msg.show({
		title : title,
		msg : userMessage,
		buttons : Ext.Msg.OK,
		icon : Ext.Msg.INFO
	    });
	}, // end showSuccess

	/**
	 * Do actions after error. Show the user message.
	 * 
	 * @param {object}
	 *                data response.records[0].data
	 */
	showErrorMessage : function(data) {
                        
	    var userMessage = getText('Failed to process');
	    var title = getText('Unknown error');
	    var errorName = '';

	    // Error undefined
	    if (data.error === undefined || !data.error) {
		Ext.Msg.show({
		    title : title,
		    msg : userMessage,
		    buttons : Ext.Msg.OK,
		    icon : Ext.Msg.WARNING
		});
		Dashboard.tool.Utilities.error('showErrorMessage failed: unknown error', 'ERROR');
		return;
	    }

	    if (data.error.level !== null && data.error.level !== undefined && data.error.level !== '') {
		errorLabel = data.error.message;
	    }

	    // Nominal case : display user message
	    if (data.error.message !== null && data.error.message !== undefined && data.error.message !== '') {
		userMessage = data.error.message;
	    }

	    if (data.error.code !== null && data.error.code !== undefined && data.error.code !== '') {
		title = getText('Error') + ' n° ' + data.error.code;
	    }
	    if (data.error.name !== null && data.error.name !== undefined && data.error.name !== '') {
		errorName = data.error.name;
	    }
		//temp for code=0
		if (data.error.code === 0 && data.error.message == '') {
			Ext.Msg.show({
				title: getText('Error'),
				msg: getText('Unavailable file'),
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.ERROR
			});
			return;
		}
	    // Error : SESSION_HAS_EXPIRED
	    if (data.error.code === 1311) {
                
                title = getText('Warning');

		Dashboard.tool.Utilities.error('SESSION_HAS_EXPIRED / Action : User deconnection');

		// Display message
		Ext.Msg.show({
		    title : title,
		    msg : userMessage,
		    buttons : Ext.Msg.OK,
		    icon : Ext.Msg.WARNING,
		    fn : function(btn) {
			if (btn === 'ok') {
			    // User deconection
			    document.location.href = contPath + '/j_spring_security_logout';
			}
		    }
		});

		return;
	    }
            
            if (data.error.code === 2302) {
                Ext.Msg.show({
                    title: getText('Warning'),
                    msg: getText('OI number already exists'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.WARNING
                });
                return;
            }

	    if (data.error.code === 3003) {
		// don't show a popup for RESOURCE_UNKNOWN errors
		return;
	    }
            
            // Delete dynamic property custom message
            if ((data.error.code === 1053 || data.error.code === 1054) || (data.error.code === 1055 || data.error.code === 1056)) {
                var rawMessage = userMessage;//  // remove message 
                rawMessage = rawMessage.replace('ERROR_PROPERTY_CONFIGURATION_USED_BY_ALERT','');
                rawMessage = rawMessage.replace('ERROR_PROPERTY_CONFIGURATION_USED_BY_SPECIFIC_CHECK_CONFIGURATION','');
                rawMessage = rawMessage.replace('PROPERTY_CONFIGURATION_USED_BY_STATISTIC','');
                rawMessage = rawMessage.replace('PROPERTY_CONFIGURATION_USED_BY_CONTEXT','');
                rawMessage = rawMessage.slice(1, -1); // remove brackets [ ]
                
                var opElements = rawMessage.split(';');
                opElements.pop();// remove last empty element
                
                var displayMessage = '';
                switch (data.error.code) {
                    case 1053:
                        displayMessage += getText('Property is used by these') + ' ' + getText('Alerts').toLowerCase();
                        break;
                    case 1054:
                        displayMessage += getText('Property is used by these') + ' ' + getText('Checks').toLowerCase();
                        break;
                    case 1055:
                        displayMessage += getText('Property is used by these') + ' ' + getText('Statistics').toLowerCase();
                        break;
                    case 1056:
                        displayMessage += getText('Property is used by these') + ' ' + getText('Contexts').toLowerCase();
                        break;
                    default:
                        Dashboard.tool.Utilities.error('showErrorMessage.formatDynamicPropertyDeleteMessage Unknown code : ' + data.error.code);
                        break;
                }
                
                displayMessage += '<br><ul>';
                opElements.forEach(function (element) {
                    displayMessage += '<li>' + element + '</li>';
                });
                displayMessage += '</ul>';
                
                Ext.Msg.show({
                    title: title,
                    msg: displayMessage,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.WARNING
                });
                return;
            }
            
            // ERROR_PROPERTY_CONFIGURATION_ALREADY_EXIST
            if (data.error.code === 1048) {
                userMessage = getText('Dynamic property already exists');
            }
            
            // ERROR_CONTROL_HAS_ALERT
            if (data.error.code === 3302) {
                userMessage = getText('Alert on control');
            }
            
            // ERROR_LOCATION_USED_BY_STOCK_LEVEL
            if (data.error.code === 409) {
                userMessage = getText('A stock level is applied to this location');
            }
            
            // ERROR_PRODUCT_REFERENCE_USED_BY_STOCK_LEVEL
            if (data.error.code === 213) {
                userMessage = getText('Product reference used by stock level');
            }
            
            // PACKAGE_DEVICE_TYPE_NOT_VALID
            if (data.error.code === 1717) {
                userMessage = getText("The package is not compatible with these devices");
            }
            
	    // Display message
	    Ext.Msg.show({
		title : title,
		msg : userMessage,
		buttons : Ext.Msg.OK,
		icon : Ext.Msg.WARNING
	    });

	    Dashboard.tool.Utilities.error('showErrorMessage: ' + errorName + ' / ' + title, 'ERROR');

	}, // end showError

	/**
	 * Build json data from rest request
	 * 
	 * @argument {request} request
	 * @argument {boolean} success Request success
	 * @return {object} responseData Json data
	 */
	responseHandler : function(request, success) {

	    if (success === true) {

		try {
		    var response = request._operation._response;
		    var responseData = Ext.decode(response.responseText);
		    if (responseData.success !== undefined && responseData.success === false) {
			Dashboard.engine.ResponseManager.showErrorMessage(responseData);
			return false;
		    }
		    return responseData;
		} catch (err) {
		    Dashboard.tool.Utilities.error('responseHandler error:' + err, 'ERROR');
		    return false;
		}
	    }

	    return false;

	},

	/**
	 * Request errors handler
	 * 
	 * @argument {proxy} proxy
	 * @argument {response} response Server response
	 * @argument {operation} operation Proxy rest operation
	 */
	errorHandler : function(proxy, response, operation) {
            
	    switch (response.status) {

	    // case 300:
	    // document.location.href=contPath + '/j_spring_security_logout';
	    // Dashboard.tool.Utilities.trace('Action : User deconnection');
	    // break;

	    case 401:
                                
                if(Dashboard.config.Config.AUTHENTICATION === "OAUTH2" || Dashboard.config.Config.AUTHENTICATION === "!!!OAUTH2"){
                    return;
                }
		// authentication required -> redirect on the login page after login
                Ext.Msg.show({
                    title: getText('Déconnexion'),
                    msg: getText('La session a expiré, veuillez vous reconnecter.'), //WTF fr ?
                    buttons: Ext.MessageBox.YES,
                    icon: Ext.MessageBox.INFO,
                    fn: function (btn) {
                        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
                        mainController.resetAllStoreFilters();
                        mainController.redirectToLoginPage();
                    }
                });
                break;
                
	    case 403:
		// user not allowed
		Ext.Msg.alert(getText('Error') + ' ' + response.status, getText('User not allowed') + ' :' + response.status + ' ' + response.statusText);
		Dashboard.tool.Utilities.trace('errorHandler error: ' + response.status + ' ' + response.statusText, 'ERROR');
		break;

	    case 404:
	    case 500:
	    case 200: // Request OK, but success = false
                try{
                    var responseText = Ext.decode(response.responseText);
                    this.showErrorMessage(responseText);
                }catch(ex){
                    Dashboard.tool.Utilities.trace('errorHandler error: ' + ex, 'ERROR');
                }
		break;

	    default:
		Ext.Msg.alert(getText('Error'), getText('Connection failed with server!'), Ext.emptyFn);
		Dashboard.tool.Utilities.trace('errorHandler error: ' + getText('Connection failed with server!'), 'ERROR');
	    }
	}

    }
// end static

});
