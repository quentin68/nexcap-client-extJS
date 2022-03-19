Ext.define('Dashboard.model.administration.PositionTree', {
	extend : 'Dashboard.model.Base',

	requires : [ 'Dashboard.tool.Utilities', 'Dashboard.config.Config' ],

	fields : [ {
		name : 'id',
		type : 'int',
		convert : function(val, record) {
			if (record.data.parentPosition !== undefined) {
				record.data.locationId = val;
				return val + 1000000000;
			}
			record.data.positionId = val;
			return val;
		}
	}, {
		name : 'locationId',
		type : 'auto'
	}, {
		name : 'positionId',
		type : 'auto'
	}, {
		name : 'type',
		type : 'string',
		convert : function(val, record) {
			if (record.data.parentPosition !== undefined) {
				return 'location';
			}
			return 'position';
		}
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	}, {
		name : 'parent',
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
		name : 'code',
		type : 'auto'
	}, {
		name : 'positionId',
		type : 'auto'
	}, {
		name : 'locationId',
		type : 'auto'
	}, {
		name : 'picture',
		type : 'auto'
	}, {
		name : 'children',
		type : 'auto',
		convert : function(val, record) {
			if (record.data.locations && record.data.locations.length > 0) {
				var newVal = val;
				for (var i = 0; i < record.data.locations.length; i++) {
					newVal.push(record.data.locations[i]);
				}
				return newVal;
			}
		}
	}, {
		name : 'locations',
		type : 'auto'
	}, {
		name : 'leaf',
		// defaultValue : false,
		convert : function(val, record) {
			if (record.data.parentPosition !== undefined) {
				return true;
			}
			return false;
		}
	}, {
		name : 'text',
		type : 'string',
		mapping : 'name',
		convert : function(val, record) {
			if (record.data.name) {
				return record.data.name;
			}
		}
	}, {
		name : 'checkedRow', // checked show checkbox in tree
		type : 'boolean',
		value : false
	} 
    ]
});