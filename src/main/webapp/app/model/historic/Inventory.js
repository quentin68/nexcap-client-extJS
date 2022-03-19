/* global Ext, moment */
Ext.define('Dashboard.model.historic.Inventory', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id', 
            type: 'int'
        },{
            name: 'address', 
            type: 'string'
        },{
            name: 'operator', 
            type: 'string'
        },{
            name: 'executionDate', 
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
        },{
            name: 'scannedMaterialCount', 
            type: 'int'
        },{
            name: 'expectedMaterialCount', 
            type: 'int'
        },{
            name: 'expectedMaterialSetCount',
            type: 'int'
        },{
            name: 'foreignMaterialCount', 
            type: 'int'
        },{
            name: 'presentMaterialCount',
            type: 'int'
        },{
            name: 'missingMaterialCount',
            type: 'int'
        },{
            name: 'unknownMaterialCount',
            type: 'int'
        },{
            name: 'comments', 
            type: 'string'
        },{
            name: 'materials', 
            type: 'string'
        },{
            name: 'inventoryResult', 
            type: 'string'
        },{
            name: 'materialName', 
            type: 'string'
        },{
            name: 'materialCategoryName', 
            type: 'string'
        },{
            name: 'materialReferenceDesignation', 
            type: 'string'
        },{
            name: 'materialReferenceCode', 
            type: 'string'
        },{
            name: 'materialAddress', 
            type: 'string'
        },{
           name: 'inventoryLocationId',
           type: 'int'
        },{
            name: 'thumbnailName',
            type: 'string'
        },{
            name: 'pictureName',
            type: 'string'
        },{
            name: 'pictureSourceType', //“MATERIAL”,”PRODUCT_CATEGORY”,”PRODUCT_REFERENCE”
            type: 'string'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/history/inventories',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/history/inventories',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/history/inventories',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/history/inventories'
        }
    })

});