Ext.define('Dashboard.model.FeatureConfigurationUnsecured', {
	extend : 'Dashboard.model.FeatureConfiguration',

	proxy : Ext.create('Dashboard.model.Proxy', {
		api : {
			create : Dashboard.config.Config.SERVER_HOST_NAME + '/unsecured/externalconfiguration',
			read : Dashboard.config.Config.SERVER_HOST_NAME + '/unsecured/externalconfiguration',
			update : Dashboard.config.Config.SERVER_HOST_NAME + '/unsecured/externalconfiguration',
			destroy : Dashboard.config.Config.SERVER_HOST_NAME + '/unsecured/externalconfiguration'
		}
	})
});