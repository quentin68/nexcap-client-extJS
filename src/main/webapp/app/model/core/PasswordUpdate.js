Ext.define('Dashboard.model.core.PasswordUpdate', {
	extend : 'Dashboard.model.Base',

	fields : [ {
		name : 'login',//username',
		type : 'string'
	}, {
		name : 'oldPassword',//'password',
		type : 'string'
	}, {
		name : 'newPassword',//previousPassword',
		type : 'string'
	} ],

	proxy : {

		type : 'rest',
		noCache : true,
		timeout : 30000,
		appendId : true,
                
                cors: true,
                useDefaultXhrHeader: false,
                withCredentials: true,

		api : {},
		url : Dashboard.config.Config.SERVER_HOST_NAME + '/users/updatepassword/',
		actionMethods : {
			read : 'GET',
			create : 'POST',
			update : 'POST',
			destroy : 'DELETE'
		},
		reader : {
			type : 'json',
			rootProperty : 'data',
			encoding : 'utf8',
			successProperty : 'success',
			totalProperty : 'total'
		},

		writer : {
			type : 'json',
			writeAllFields : true
		},

		listeners : {
			exception : function(proxy, response, operation) {
				Dashboard.tool.Utilities.error(response);
			}
		}
	}

});