Ext.define('Dashboard.model.DataCollection', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'value',
            type: 'auto'
        }, {
            name: 'date', // calcul date
            type: 'date',
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
            name: 'calculByValue',
            type: 'string'
        }

    ]


});