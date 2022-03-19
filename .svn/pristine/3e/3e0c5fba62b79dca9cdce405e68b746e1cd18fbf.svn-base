Ext.define('Dashboard.model.UserSettings', {
    extend: 'Dashboard.model.FeatureConfiguration',
    requires: ['Dashboard.tool.Utilities', 'Dashboard.config.Config'],

    proxy: Ext.create('Dashboard.model.Proxy', {
        appendId: false,
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/currentuser/WEB_CLIENT_SETTINGS',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/currentuser/WEB_CLIENT_SETTINGS',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/currentuser/WEB_CLIENT_SETTINGS',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/currentuser/WEB_CLIENT_SETTINGS'
        }
    })
});