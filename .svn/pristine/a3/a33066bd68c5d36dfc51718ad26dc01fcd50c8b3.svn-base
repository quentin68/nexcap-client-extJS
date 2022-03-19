Ext.define('Dashboard.model.News', {
    extend: 'Dashboard.model.Base',

    fields: [
        'type',
        {
            name: 'date',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s',
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
        },
        'time',
        'author',
        'group',
        'image',
        'title',
        'paragraph'
    ]
});
