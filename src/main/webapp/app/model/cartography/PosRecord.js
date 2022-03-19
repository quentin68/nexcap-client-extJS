Ext.define('Dashboard.model.cartography.PosRecord', {
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    id: null,
    date: null,
    posX: 0,
    posY: 0,
    
    constructor: function(config) {
         Ext.apply(this, config);
    }

});   