/* global Ext, moment */

Ext.define('Dashboard.model.CategoryCreate', {
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
		name : 'parentCategoryId',
		type : 'auto'
	}, {
		name : 'picture',
		type : 'auto'
	}, {
		name : 'materialPropertyConfigurationIdList',
		type : 'auto'
	} , {
		name : 'productReferencePropertyConfigurationIdList',
		type : 'auto'
	}],

	proxy : Ext.create('Dashboard.model.Proxy', {
		api : {
			create : Dashboard.config.Config.SERVER_HOST_NAME + '/productcategory',
			update : Dashboard.config.Config.SERVER_HOST_NAME + '/productcategory',
			destroy : Dashboard.config.Config.SERVER_HOST_NAME + '/productcategory'
		}
	})
});