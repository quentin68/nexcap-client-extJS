
Ext.define('Dashboard.model.operation.Sending', {
    extend: 'Dashboard.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'productReferenceCode',
            type: 'string'
        }, {
            name: 'productReferenceDesignation',
            type: 'string'
        }, {
            name: 'date',
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
            name: 'sourceAddress',
            type: 'string'
        }, {
            name: 'destinationPath',
            type: 'string'
        }, {
            name: 'userSticker',
            type: 'string'
        }, {
            name: 'recipient',
            type: 'string'
        }, {
            name: 'sendingNumber',
            type: 'string'
        }, {
            name: 'quantity',
            type: 'int'
        }, {
            name: 'assignedLocationAddress',
            type: 'string'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/send',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/send',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/send',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/send'
        }
    })

});