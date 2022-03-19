Ext.define('Dashboard.store.ProfilesLevel', {
    extend : 'Dashboard.store.StoreBase',
    alias : 'store.profilesLevel',

    requires : [ 'Dashboard.tool.Utilities'],

    model : 'Dashboard.model.administration.Profile',

    proxy : Ext.create('Dashboard.store.Proxy', {
        url : Dashboard.config.Config.SERVER_HOST_NAME + '/profiles/profileslevel',
        actionMethods : {
            read : 'GET'
        }
    })

    // listeners: {
    //     load: function(records, success, eOpts) {
    //         for (var i = 0; i < records.getData().items.length; i++) {
    //             value = records.getData().items[i].data;
    //             var new_data = {"level": value};
    //             records.getData().items[i].data = new_data;
    //         }
    //        // console.log('check_new',records);
    //     }
    // }
});