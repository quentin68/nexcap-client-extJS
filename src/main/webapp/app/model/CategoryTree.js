/* global Ext, moment */

Ext.define('Dashboard.model.CategoryTree', {
    extend: 'Dashboard.model.Base',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    fields: [
        {
            name: 'id', 
            type: 'auto'
        }, {
            name: 'name', 
            type: 'string'
        }, {
            name: 'description', 
            type: 'string'
        }, {
            name: 'lastUpdateDate', 
            type: 'date', 
            dateFormat: 'd/m/Y h:m:s',
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
            name: 'parentCategory', 
            type: 'auto'
        }, {
            name: 'subCategoryList',
            type: 'auto'
        },{
            name: 'path', 
            type: 'string'
        }, {
            name: 'fullPath',
            type: 'string'
        }, {
            name: 'productReferenceIdList',
            type: 'auto'
        }, {
            name: 'picture',
            type: 'auto'
        }, {
            name: 'materialPropertyConfigurationList',
            type: 'auto'
        }, {
            name: 'leaf',
            defaultValue : false
        }
    ]

});   