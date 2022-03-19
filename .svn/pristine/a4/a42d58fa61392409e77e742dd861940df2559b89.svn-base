Ext.define('Dashboard.model.historic.Check', {
    extend : 'Dashboard.model.Base',

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
	name : 'operator',
	type : 'string'
    }, {
	name : 'deviceName',
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
	name : 'materialName',
	type : 'string'
    }, {
	name : 'productReferenceCode',
	type : 'string'
    }, {
	name : 'productReferenceDesignation',
	type : 'string'
    }, {
	name : 'productCategoryName',
	type : 'string'
    }, {
	name : 'specificCheckReportId',
	type : 'int'
    }, {
	name : 'isRight',
	type : 'boolean'
    }, {
	name : 'isAcknowledged',
	type : 'boolean'
    } ],

    proxy : Ext.create('Dashboard.model.Proxy', {
	api : {
	    create : Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheck',
	    read : Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheck',
	    update : Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheck',
	    destroy : Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheck'
	}
    })

});