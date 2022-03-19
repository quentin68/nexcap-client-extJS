<%
	String url = request.getRequestURL().toString();
        /**
         *  Disabled for SSO
	if (url.contains("localhost")) {
            
	    String locahostIpAddress = fr.nexess.PropertiesManager.getHostAddresses().get(0);
	    String redirectUrl = url.replace("localhost", locahostIpAddress);
	    System.out.println("NexCap accessed using localhost URL > redirecting to '" + redirectUrl + "'");
	    response.sendRedirect(redirectUrl);
	    return;
	}
        **/
        
	fr.nexess.PropertiesManager.loadConfig(request.getContextPath());
        
	String NEXCAP_URL = fr.nexess.PropertiesManager.getNexcapURL();
	String NEXCAP_LANGUAGE = fr.nexess.PropertiesManager.getNexcapLanguage();
	String WEBCLIENT_TIMEOUT = fr.nexess.PropertiesManager.getWebclientTimeout();
        
        String AUTHENTICATION = fr.nexess.PropertiesManager.getAuthentication();
        String CLIENT_ID = fr.nexess.PropertiesManager.getClientId();
        String REDIRECT_URI = fr.nexess.PropertiesManager.getRedirectUri();
        String AUTHORIZATION_ENDPOINT = fr.nexess.PropertiesManager.getAuthorizationEndpoint();
        String ACCESS_ENDPOINT = fr.nexess.PropertiesManager.getAccessEndpoint();
        String APP_CLIENT_ID = fr.nexess.PropertiesManager.getAppClient();
        String APPLICATION_SCOPE = fr.nexess.PropertiesManager.getApplicationScope();
        
        String GEOLOC_DEFAULT_TARGET = fr.nexess.PropertiesManager.getGeolocDefaultTarget();
        String GEOLOC_DEFAULT_ZOOM = fr.nexess.PropertiesManager.getGeolocDefaultZoom();
        String SHOW_CURRENT_LOCATION = fr.nexess.PropertiesManager.getShowCurrentLocation();
%>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <link type="image/png" rel="icon" href="favicon.png" />
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    
    <title>NexCap2</title>
  
        
    <!-- Include the cartography framework -->
    <script src="resources/js/konva.min.js"></script>
    
    <script src="resources/js/jsrsasign-all-min.js"></script> 
    
    <!-- Include the Google Maps API -->
    <!--script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3&sensor=false"></script-->
    
    <!-- Include the OpenLayers API -->
    <script src="lib/ol-debug.js"></script>
    <link rel="stylesheet" type="text/css" href="lib/openLayers/ol.css">

    
    <script type="text/javascript">
        var Ext = Ext || {}; // Ext namespace won't be defined yet...

        // This function is called by the Microloader after it has performed basic
        // device detection. The results are provided in the "tags" object. You can
        // use these tags here or even add custom tags. These can be used by platform
        // filters in your manifest or by platformConfig expressions in your app.
        //
        Ext.beforeLoad = function (tags) {
            var s = location.search,  // the query string (ex "?foo=1&bar")
                profile;

            // For testing look for "?classic" or "?modern" in the URL to override
            // device detection default.
            //
            if (s.match(/\bclassic\b/)) {
                profile = 'classic';
            }
            else if (s.match(/\bmodern\b/)) {
                profile = 'modern';
            }
            else {
                profile = tags.desktop ? 'classic' : 'modern';
                //profile = tags.tablet ? 'modern' : 'classic';
                //profile = tags.phone ? 'modern' : 'classic';
            }

            Ext.manifest = profile; // this name must match a build profile name

            // This function is called once the manifest is available but before
            // any data is pulled from it.
            //
            //return function (manifest) {
                // peek at / modify the manifest object
            //};
        };
		
        nexcapUrl = '<%= NEXCAP_URL %>';
        nexcapLanguage = '<%= NEXCAP_LANGUAGE %>';
        webclientTimeout = '<%= WEBCLIENT_TIMEOUT %>';
        
        authentication = '<%= AUTHENTICATION %>';
        clientId = '<%= CLIENT_ID %>';
        redirectUri = '<%= REDIRECT_URI %>';
        authorizationEndpoint = '<%= AUTHORIZATION_ENDPOINT %>';
        accessEndpoint = '<%= ACCESS_ENDPOINT %>';
        appClientId = '<%= APP_CLIENT_ID %>';
        applicationScope = '<%= APPLICATION_SCOPE %>';
        
        geolocDefaultTarget = '<%= GEOLOC_DEFAULT_TARGET %>';
        geolocDefaultZoom = '<%= GEOLOC_DEFAULT_ZOOM %>';
        showCurrentLocation = '<%= SHOW_CURRENT_LOCATION %>';
                
    </script>
    
     <!-- Include the translations -->
    <!--script type="text/javascript" src="ext/build/classic/locale/locale-en.js"></script-->
    
    
    <!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" data-app="2141a71d-433a-4e58-bc29-f71b7f14257b" type="text/javascript" src="bootstrap.js"></script>

</head>
<body>
    <script type="text/javascript">
    window.addEventListener("beforeunload", function(event) {
    userCancels=true;
    var model = Ext.create('Dashboard.model.core.LogOut');
    delete model.data.id;

    model.save({
    scope : this,
    success : function(record, response) {
    },
    failure : function(record, response) {
    model.save();
    }
    });

    if (navigator.userAgent.indexOf("Firefox") > 0) {
    //console.log("Firefox");
    event.returnValue = "just for the alert";
    }
    else {
    return undefined
    }
    });
    window.onfocus = function () {
    if (userCancels) {
    //logout screen: when user wants to stay
    // Close all open windows
    var windows = Ext.ComponentQuery.query('window');
    for (var i = 1; i < windows.length; i++) {
    try{
    windows[i].close();
    } catch(ex){
    }
    }

    // remove contexts
    Dashboard.config.Config.contexts = {};
    Dashboard.manager.DataCollectionManager.disableTimer();
    Dashboard.manager.administration.UsersManager.setCurrentUser(null);
    Dashboard.app.getMainView().close();
    Dashboard.app.setMainView('Dashboard.view.authentication.LoginScreen');

    userCancels=false;
    }
    }
    </script>

</body>
</html>
