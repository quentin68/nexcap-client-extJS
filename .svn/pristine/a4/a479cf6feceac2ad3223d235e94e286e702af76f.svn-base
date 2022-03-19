/*  global Ext, moment  */

Ext.define('Dashboard.model.ReferenceCreate', {
	extend : 'Dashboard.model.Base',
	requires : [ 'Dashboard.tool.Utilities', 'Dashboard.config.Config' ],

	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'description',
		type : 'string'
	}, {
		name : 'designation',
		type : 'string'
	}, {
		name : 'identified',
		type : 'boolean'
	}, {
		name : 'referenceCode',
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
		name : 'type',
		type : 'string'
	}, {
		name : 'productCategoryId',
		type : 'auto'
	}, {
		name : 'picture',
		type : 'auto'
	}, {
		name : 'codeList',
		type : 'auto'
	}, {
		name : 'materialIdList',
		type : 'auto'
	}, {
		name : 'materialSetIdList',
		type : 'auto'
	}, {
		name : 'interventionOrderIdList',
		type : 'auto'
	}, {
		name : 'files',
		type : 'auto'
	}, {
		name : 'properties',
		type : 'auto'
	}, {
		name : 'materialPropertyConfigurationIdList',
		type : 'auto'
	}, {
		name : 'assignedLocForPositionDtos',
		type : 'auto'
	} ],

	proxy : Ext.create('Dashboard.model.Proxy', {
		api : {
			create : Dashboard.config.Config.SERVER_HOST_NAME + '/productreference',
			update : Dashboard.config.Config.SERVER_HOST_NAME + '/productreference',
			destroy : Dashboard.config.Config.SERVER_HOST_NAME + '/productreference'
		}
	})
});