Ext.define('Dashboard.view.system.importData.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.importViewModel',

   requires: [
        'Dashboard.model.system.Import'
    ],

    stores: {
        viewListBinding: {
            type: 'imports',
            autoLoad: true
            
        }
    }
});
