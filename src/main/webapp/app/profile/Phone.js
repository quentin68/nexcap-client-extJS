
Ext.define('Dashboard.profile.Phone', {
    extend: 'Ext.app.Profile',

    mainView: 'Dashboard.view.main.MainPanel',

    isActive: function() {
        return Ext.os.is('Phone');
    },
    
    
    launch: function () {
        console.log('Launch Phone');
    }
});