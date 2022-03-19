Ext.define('Dashboard.model.cartography.GeoLocItem', {
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    id: null,
    item: null,
    posRecords: null,
    
    constructor: function(config) {
         Ext.apply(this, config);
    }

});   