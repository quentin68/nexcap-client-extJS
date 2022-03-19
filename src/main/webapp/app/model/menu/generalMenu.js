Ext.define('Dashboard.model.menu.generalMenu',{
    
    extend: 'Ext.data.TreeModel',
    alias: 'model.generalMenu',
    
    
    fields: [
        'text', 
        'label',
        'name',
        'iconCls'
    ]
    
    
});