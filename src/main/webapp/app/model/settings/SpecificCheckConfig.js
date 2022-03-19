Ext.define('Dashboard.model.settings.SpecificCheckConfig', {
    extend: 'Dashboard.model.Base',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    
    fields: [
        {
            name: 'id', 
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        },
        {
            name: 'specificForm',
            type: 'auto'
        },
        {
            name: 'count',
            type: 'int',
            convert: function(val,record) {
                
                if(record.data.specificForm && record.data.specificForm.length > 0){
                    return record.data.specificForm.length ;
                }
                return 0;
            }
        },
        {
            name: 'productReferenceIds',
            type: 'auto'
        },
        {
            name: 'productCategoryIds',
            type: 'auto'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {            
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheckConfiguration',
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheckConfiguration',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheckConfiguration',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheckConfiguration'
        }
    })

});   