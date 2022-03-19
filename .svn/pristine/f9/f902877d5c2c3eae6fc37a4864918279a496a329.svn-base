
Ext.define('Dashboard.store.consultation.MaterialsSets', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.materialsSets',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.consultation.MaterialsSet',
    
    sorters: [
        {
            property: 'productReference.referenceCode',
            direction: 'ASC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/materialsets/search'
    })
});   