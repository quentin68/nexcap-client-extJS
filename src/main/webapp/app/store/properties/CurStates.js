
Ext.define('Dashboard.store.properties.CurStates', {
    extend: 'Dashboard.store.StoreBase',
    
    fields: ['id', 'name', 'label'],
    
    data: [
        {id: 1, name:'En service', label: getText('En service')},
        {id: 2, name:'A vérifier', label: getText('A vérifier')},
        {id: 3, name:'Hors service', label: getText('Hors service')}
    ]
    
});