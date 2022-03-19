/* global Ext, moment */

Ext.define('Dashboard.model.administration.PositionCreate', {
	extend : 'Dashboard.model.Base',

	requires : [ 'Dashboard.tool.Utilities', 'Dashboard.config.Config' ],

	fields : [ {
		name : 'id',
		type : 'auto'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	}, {
		name : 'parentPositionId',
		type : 'auto'
	}, {
		name : 'locations',
		type : 'auto'
	}, {
		name : 'counterIdList',
		type : 'auto'
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
                },
		dateFormat : 'd/m/Y h:m:s'
	}, {
		name : 'posX',
		type : 'auto'
	}, {
		name : 'posY',
		type : 'auto'
	}, {
		name : 'path',
		type : 'string'
	}, {
		name : 'picture',
		type : 'auto'
	} ],

	proxy : Ext.create('Dashboard.model.Proxy', {
		api : {
			create : Dashboard.config.Config.SERVER_HOST_NAME + '/positions',
			update : Dashboard.config.Config.SERVER_HOST_NAME + '/positions'
		}
	})

});