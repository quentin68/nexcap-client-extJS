/* global Ext, moment  */
Ext.define('Dashboard.model.system.ServerLogTree', {
    extend: 'Ext.data.TreeModel',

    requires: ['Dashboard.tool.Utilities', 'Dashboard.config.Config'],

    fields: [
        {
            name: 'name',
            type: 'string'
        }, {
            name: 'url', //href
            type: 'string',
            convert: function (val, record, node){         
                var url = '';
                if (record.get('file') === true) {
                                        
                    url = Dashboard.config.Config.SERVER_HOST_NAME + '/logging/log?fileName=' + encodeURI(record.get('name'));
                    if(record.get('folder') && record.data.depth > 1){
                        url += '&folder=' + record.get('folder');
                    }
                }
                return url;
            }
        }, {
            name: 'hrefTarget',
            value: '_blank'
        }, {
            name: 'lastUpdateDate',
            type: 'date',
            convert: function (val){
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate();
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            },
            dateFormat: 'd/m/Y h:m:s'
        }, {
            name: 'text',
            type: 'string',
            convert: function (val, record){
                if (record.data.name !== undefined) {
                    return name;
                }
            }
        }, {
            name: 'children',
            type: 'auto'
        }, {
            name: 'leaf',
            convert: function (val, record){
                if (record.data.file === true) {
                    return true;
                }
                return false;
            }
        }
    ]
});