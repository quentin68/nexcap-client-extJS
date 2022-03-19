Ext.define('Dashboard.model.settings.SpecificCheckReport', {
    extend : 'Dashboard.model.Base',

    requires : [ 'Dashboard.tool.Utilities', 'Dashboard.config.Config' ],

    fields : [ {
	name : 'id',
	type : 'int'
    }, {
	name : 'specificCheckConfigurationId',
	type : 'int'
    }, {
	name : 'name',
	type : 'string'
    }, {
	name : 'deviceName',
	type : 'string'
    }, {
	name : 'operator',
	type : 'string'
    }, {
	name : 'executionDate',
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
	name : 'productCategoryName',
	type : 'string'
    }, {
	name : 'productReferenceCode',
	type : 'string'
    }, {
	name : 'productReferenceDesignation',
	type : 'string'
    }, {
	name : 'fields',
	type : 'string'
    }, {
	name : 'pictureNames',
	type : 'auto'
    }, {
	name : 'attachments',
	type : 'auto'
    }, {
	name : 'isRight',
	type : 'boolean'
    } ],

    proxy : Ext.create('Dashboard.model.Proxy', {
	actionMethods : {
	    read : 'GET',
	    create : 'POST'
	},
	api : {
	    create : Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheckReport',
	    read : Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheckReport'
	}
    })
});