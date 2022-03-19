Ext.define('Dashboard.model.cartography.MapGeoLocArea', {
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    posX: 0,
    posY: 0,
    width: 0,
    height: 0,
    
    constructor: function(config) {
         Ext.apply(this, config);
    }
    
});   