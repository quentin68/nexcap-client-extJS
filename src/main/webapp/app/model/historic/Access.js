
/* global Ext, moment  */

Ext.define('Dashboard.model.historic.Access', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id', 
            type: 'int'
        },{
            name: 'loginDate', 
            type: 'date',
            convert: function (val) {
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate();
                    }
                    return '';
                } catch (e) {
                    return '';

                }
            }
        },{
            name: 'logoutDate', 
            type: 'date',
            convert: function (val) {
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate();
                    }
                    return '';
                } catch (e) {
                    return '';

                }
            }
        },{
            name: 'userName', 
            type: 'string'
        },{
            name: 'operator', 
            type: 'string'
        },{
            name: 'address', 
            type: 'string'
        },{
            name: 'deviceName', 
            type: 'string'
        },{
            name: 'deviceType', 
            type: 'string'
        },{
            name: 'tagReaderName', 
            type: 'string'
        }
        
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/access',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/access',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/access',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/access'
        }
    })

});