//nexcapUrl =  'https://192.168.63.57:8443/nexcap/api/v0.1/';
//nexcapLanguage = 'en_US';
//webclientTimeout = 30000;

//Cors requests
Ext.Ajax.setUseDefaultXhrHeader(false);
Ext.Ajax.setCors(true);
Ext.Ajax.setWithCredentials(true);
Ext.Ajax.setTimeout(webclientTimeout);


Ext.define('Dashboard.config.Config', {

    statics: {
        
        
        name: 'Dashboard.config.Config',
        
        /**
         * version
         */
        CLIENT_WEB_VERSION: '3.0.2',
        
        
        /**
         * Server Tomcat : '/dashboard/dashboard/'
         * Server Sencha : ''
         */
        //CONTEXT_PATH:  '/web/',
        
        
        /**
         * Serveur configuration
         */
        LOGIN_SCREEN_CONFIGURATION: '',
        
        
        /**
         * REST URL
         */
        SERVER_HOST_NAME: nexcapUrl,
        SERVER_HOST_NAME_ASYNC: nexcapUrl + '/async',
        PROXY_TIMEOUT: webclientTimeout, // 30000, //milliseconds
        
        /**
         * Server URL to UPLOAD file requests
         */
        SERVER_URL_UPLOAD_FILE: nexcapUrl + '/uploadFile.request',
        
        /**
         * Server URL to download attached file
         */
        SERVER_URL_DOWNLOAD_PICTURE: nexcapUrl + '/check-report-picture/download',
        SERVER_URL_DOWNLOAD_ATTACHMENT: nexcapUrl + '/upload_folder/specificcheckreports',
        SERVER_URL_DOWNLOAD_THUMBNAIL : nexcapUrl + '/resources/thumbnail/',
        SERVER_URL_DOWNLOAD_IMAGE: nexcapUrl + '/resources/image/',
        SERVER_URL_DOWNLOAD_IMAGE_CARTO: nexcapUrl + '/carto/resources/image/CARTOMAP/',
        
        /**
         * Default images
         */
        DEFAULT_LOGING_SCREEN_BACKGROUND: "resources/images/background.jpg",
        DEFAULT_THUMBNAIL_SRC: 'resources/images/icons/default_icon.png',
        DEFAULT_404_SRC: 'resources/images/icons/404.png',
        DEFAULT_ICON_SRC: 'resources/images/icons/default_icon.png',
        DEFAULT_MAP_BACKGROUND: 'resources/images/grid800x600.jpg',
        DEFAULT_LOGO_NEXESS: 'resources/images/icons/logo_nexcap.png',
        
        /**
         * Upload folder
         */
        UPLOAD_FOLDER: nexcapUrl + '/upload_folder',
        
        /**
         * GetText localization
         * en_US | fr_FR
         */
        LOCALE: nexcapLanguage,//language, default 'fr_FR'
                
        /**
         * Default request response format
         */
        EXPORT_FORMAT: 'JSON',
        
        /**
         * Default request response encoding characters
         */
        ENCODING: 'UTF8',
        
        /**
         * To enable or disable the displaying traces into FireBug logs file
         */
        TRACE_ENABLED: true,
        
        /**
         * To select the level of errors displaying
         * 'INFO':1, 'WARNING':2, 'ALERT':3, 'ERROR':4, 'DEBUG':5, 'ALL':6 
         */
        TRACE_LEVEL: 'ALL',
        
        /**
         * Défault Count of lines displayed in dataGrids
         */
        DATAGRID_NB_LINES: 50,
        BUFFERED_DATAGRID_NB_LINES: 50,
        
        /**
         * Défault Count of lines displayed in comboBox
         */
        COMBOBOX_NB_LINES: 100,
        
        /**
         * Data collection downloading frequency in ms.
         * 0 : never
         */
        DATAVIZ_REFRESH_PERIOD: 30000,//5000,
        
        
        /**
         * Code type
         */
        RFID_TAG: 'Tag RFID',
        NUMBER: 'Numéro',
        
        
        /**
         * SSO
         */
        AUTHENTICATION: authentication,
        CLIENT_ID: clientId,
        REDIRECT_URI: redirectUri,
        AUTHORIZATION_ENDPOINT: authorizationEndpoint,
        ACCESS_ENDPOINT: accessEndpoint,
        APP_CLIENT_ID: appClientId,
        APPLICATION_SCOPE: applicationScope,
        
        /**
         * ABOUT
         */
        ABOUT_RESUME_FR : 'NexCap® est une plateforme IOT conçue par Nexess <br> permettant la connexion de tout type d’objet industriel <br> et la valorisation des données collectées.',
        ABOUT_RESUME_EN : 'NexCap® is an IOT platform designed by Nexess to connect any industrial object and value collected data.',
        SWITCHBOARD_PHONE: '+33 (0)4 92 38 90 00',
        SWITCHBOARD_MAIL: 'contact@nexess-solution.com',
        SUPPORT_HOURS_FR: 'Du lundi au jeudi : 8h-12h / 13h-17h <br>Le Vendredi : 8-12h / 13h-16h',
        SUPPORT_HOURS_EN: 'From Monday to Thursday  : 8-12AM / 1-5PM <br>Friday : 8-12AM / 1-4PM',
        SUPPORT_PHONE: '+33 (0)4 84 25 00 94',
        SUPPORT_MAIL: 'support@nexess.fr',
        SERVER_VERSION: '2.X.X',
        NEXCAP_DATABASE_VERSION: '2.X.X',
        USER_GUIDE_URL_FR: 'resources/manuals/User_Manual_Fr.pdf',
        USER_GUIDE_URL_EN: 'resources/manuals/User_Manual_En.pdf',
        
        
        /**
         * Geoloc
         */
        
        GEOLOC_DEFAULT_TARGET: Ext.decode(geolocDefaultTarget),
        GEOLOC_DEFAULT_ZOOM: Ext.decode(geolocDefaultZoom),
        SHOW_CURRENT_LOCATION: (showCurrentLocation === 'true'),
        
        /**
         * Context (temporary)
         */
        contexts: {},

        /**
         * Server Enum
         */
        PICTURE_SOURCE_TYPE : {
            material: {id:0, name:'MATERIAL'},
            product_category:{id:1, name:'PRODUCT_REFERENCE'},
            product_reference: {id:2, name:'PRODUCT_CATEGORY'}
        }
        
    }

}, function(){
    //console.log('Class loaded : Dashboard.config.Config');
});   
