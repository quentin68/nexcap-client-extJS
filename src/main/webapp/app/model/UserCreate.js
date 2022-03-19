Ext.define('Dashboard.model.UserCreate', {
	extend : 'Dashboard.model.Base',
	requires : [ 'Dashboard.tool.Utilities', 'Dashboard.config.Config' ],

	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'login',
		type : 'string'
	}, {
		name : 'sticker',
		type : 'string'
	}, {
		name : 'badgeNumber',
		type : 'string'
	}, {
		name : 'firstName',
		type : 'string'
	}, {
		name : 'lastName',
		type : 'string'
	}, {
		name : 'email',
		type : 'string'
	}, {
		name : 'lastUpdateDate',
		type : 'date',
                convert: function (val) {
                    try {
                        if (moment(val).isValid()) {
                            return moment(val).toDate(); // IE is crap
                        }
                        return '';
                    } catch (e) {
                        return '';
                    }
                }
	}, {
		name : 'profileIdList',
		type : 'auto'
	}, {
		name : 'password',
		type : 'string'
	}, {
		name : 'activated',
		type : 'boolean'
	}, {
                name: 'technical',
                type: 'boolean'
        }, {
		name : 'authorizedLocationIdList',
		type : 'auto'
	}, {
		name : 'requirementsNameList',
		type : 'auto'
	}, {
		name : 'picture',
		type : 'auto'
	} ],

	proxy : Ext.create('Dashboard.model.Proxy', {
		api : {
			create : Dashboard.config.Config.SERVER_HOST_NAME + '/users',
			update : Dashboard.config.Config.SERVER_HOST_NAME + '/users',
			destroy : Dashboard.config.Config.SERVER_HOST_NAME + '/users'
		}
	})
});