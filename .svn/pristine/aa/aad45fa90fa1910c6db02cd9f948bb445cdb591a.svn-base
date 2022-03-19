/* global Ext  */

Ext.define('Dashboard.model.system.About', {
    extend: 'Dashboard.model.Base',

    fields: [
        "nexcapUrl",
        "nexcapUserManualUrl",
        "nexcapLanguage",
        "nexessMail",
        "nexessPhone",
        "supportPhone",
        "supportMail",
        "supportHours",
        "nexcapVersion",
        "nexcapDatabaseVersion"
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        appendId: false,
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/about'
        }
    })
});   