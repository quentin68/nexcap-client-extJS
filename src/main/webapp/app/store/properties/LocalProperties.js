Ext.define('Dashboard.store.properties.LocalProperties', {
	extend : 'Ext.data.Store',
	alias : 'store.localProperties',

	model : 'Dashboard.model.LocalProperty',

	data : [],

	sorters : [ {
		property : 'label',
		direction : 'ASC'
	} ]
});
