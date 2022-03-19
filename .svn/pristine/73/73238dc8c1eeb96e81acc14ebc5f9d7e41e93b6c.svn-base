Ext.define('Dashboard.model.cartography.MapLocation', {
    extend: 'Dashboard.model.cartography.GeoLocElement',
    
    fields:[
        {
            name: 'location',
            type: 'auto'
        },{
            name: 'itemsCount',
            type: 'int'
        },{
            name: 'date',
            type: 'date',
            convert: function (val) {
                try {
                    if (moment(val).isValid())
                        return moment(val).toDate(); // IE is crap

                    return '';
                } catch (e) {
                    return '';
                }
            }
        }
    ]
    
});   