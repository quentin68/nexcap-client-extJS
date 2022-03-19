Ext.define('Dashboard.model.cartography.LinkingZone', {
    extend: 'Dashboard.model.cartography.GeoLocElement',
    
    fields: [
        {
            name: 'id',
            type: 'auto'
        }, {
            name: 'linkedMapId',
            type: 'int'
        }, {
            name: 'linkedMapName', //label
            type: 'string'
        }, {
            name: 'geometry',
            type: 'auto'
        }, {
            name: 'color',
            type: 'string'
        }
    ]

});   