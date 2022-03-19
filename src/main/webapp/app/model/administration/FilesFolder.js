/* global Ext */
Ext.define('Dashboard.model.administration.FilesFolder', {
    extend: 'Ext.data.Model',
    requires: ['Dashboard.tool.Utilities'],
    
    fields: [
        {
            name: 'folderName',
            type: 'string',
            convert: function (val, record) {
                if (!val) {
                    return getText('Mixed');
                }
            }
        }
    ]

});