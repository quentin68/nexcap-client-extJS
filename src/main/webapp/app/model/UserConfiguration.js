Ext.define('Dashboard.model.UserConfiguration', {
    extend: 'Dashboard.model.FeatureConfiguration',
    requires: ['Dashboard.tool.Utilities', 'Dashboard.config.Config'],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/currentuser',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/currentuser',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/currentuser',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/currentuser'
        }
    })
});
