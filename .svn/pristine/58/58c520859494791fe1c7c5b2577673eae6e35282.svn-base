Ext.define('Dashboard.model.administration.InterventionOrderCreate', {
	extend : 'Dashboard.model.Base',

	fields : [ {
		name : 'id',
		type : 'auto'
	}, {
		name : 'number',
		type : 'string'
	}, {
		name : 'label',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	}, {
		name : 'productReferenceIds',
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
                }
	}/*, {
		name : 'positionId',
		type : 'int'
	}*/ ],

	proxy : Ext.create('Dashboard.model.Proxy', {
		api : {
			create : Dashboard.config.Config.SERVER_HOST_NAME + '/interventionorders',
			update : Dashboard.config.Config.SERVER_HOST_NAME + '/interventionorders',
			destroy : Dashboard.config.Config.SERVER_HOST_NAME + '/interventionorders'
		}
	})
});