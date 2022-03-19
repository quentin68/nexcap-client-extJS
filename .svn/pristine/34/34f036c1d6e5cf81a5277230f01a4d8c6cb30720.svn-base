package fr.nexess;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.InterfaceAddress;
import java.net.NetworkInterface;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.commons.lang3.StringUtils;

/**
 * @author FLO_MIN
 */
public class PropertiesManager {
    private static final String PROPERTIES_FOLDER_SYSTEM_KEY = "nexcap_web_config_directory";
    //private static final String PROPERTIES_FILE = "nexcap-web.properties";
    private static final String PROPERTIES_FILE_PREFIX = "nexcap-";
    private static final String PROPERTIES_FILE_SUFFIX = ".properties";
    private static final String NEXCAP_NEXCAP_URL_KEY = "NEXCAP_URL";
    private static final String NEXCAP_LANGUAGE_KEY = "NEXCAP_LANGUAGE";
    private static final String WEBCLIENT_TIMEOUT = "WEBCLIENT_TIMEOUT";

    private static final String DEFAULT_NEXCAP_URL = "https://localhost:8443/nexcap/api/v0.1";
    private static final String DEFAULT_NEXCAP_LANGUAGE = "fr_FR";
    private static final String DEFAULT_WEBCLIENT_TIMEOUT = "30000";
    
    private static final String DEFAULT_GEOLOC_DEFAULT_TARGET = "[48.853182, 2.349883]";
    private static final String DEFAULT_GEOLOC_DEFAULT_ZOOM = "17";

    private static String nexcapUrl = null;
    private static String nexcapLanguage = null;
    private static String webClientTimeout = null;
    
    private static String authentication = null;
    private static String clientId = null;
    private static String redirectUri = null;
    private static String authorizationEndpoint = null;
    private static String accessEndpoint = null;
    private static String appClient = null;
    private static String applicationScope = null;
    
    private static String geolocDefaultTarget = null;
    private static String geolocDefaultZoom = null;
    private static String showCurrentLocation = null;

    /**
     * Get the properties file and initialize the properties
     */
	 /*
    static {
        File propertiesFile = null;
        Properties prop = null;
        try {
            // Get a handle to the JNDI environment naming context
            Context env = (Context) new InitialContext().lookup("java:comp/env");

            // Get a single value
            String nexcapWebConfigDirectory = (String) env.lookup(PROPERTIES_FOLDER_SYSTEM_KEY);
            propertiesFile = new File(nexcapWebConfigDirectory + "/" + PROPERTIES_FILE);
            if (!propertiesFile.exists()) {
                throw new Exception("file not found");
            }
            try (InputStream input = new FileInputStream(propertiesFile)) {
                // load a properties file
                prop = new Properties();
                prop.load(input);
                System.out.println("Properties file '" + propertiesFile.getAbsolutePath() + "' loaded");
            }
        } catch (Exception e) {
            System.err.println("Can't load property file '" + (propertiesFile != null ? propertiesFile.getAbsolutePath() : PROPERTIES_FILE) + "': " + e);
        }

        try {
            // Get Server URL from properties or use default one
            String nexcapUrlFromProperties = getProperty(prop, NEXCAP_NEXCAP_URL_KEY, DEFAULT_NEXCAP_URL);
            if (nexcapUrlFromProperties.contains("localhost")) {
                // Replace localhost in address by ip
                List<String> hostAddresses = getHostAddresses();
                if (hostAddresses.isEmpty()) {
                    throw new Exception("No NetworkInterface found, can't get localhost IP");
                }
                String locahostIpAddress = getHostAddresses().get(0);
                nexcapUrlFromProperties = nexcapUrlFromProperties.replace("localhost", locahostIpAddress);
                System.out.println("Replacing 'localhost' in NexCap URL using first local IP among [" + StringUtils.join(hostAddresses, ", ") + "] --> '" + nexcapUrlFromProperties + "'");
            }
            nexcapUrl = nexcapUrlFromProperties;

            nexcapLanguage = getProperty(prop, NEXCAP_LANGUAGE_KEY, DEFAULT_NEXCAP_LANGUAGE);
			
			webClientTimeout = getProperty(prop, WEBCLIENT_TIMEOUT, DEFAULT_WEBCLIENT_TIMEOUT);

        } catch (Exception e) {
            System.err.println("Can't get server URL: " + e);
        }
    }
	*/
    private static String getProperty(Properties properties, String key, String defaultValue) throws Exception {
        String value = null;
        if (properties == null) {
            value = defaultValue;
            System.out.println("No properties file loaded, using default value for '" + key + "' -> '" + defaultValue + "'");
        } else {
            value = properties.getProperty(key);
            if (StringUtils.isBlank(value)) {
                throw new Exception("Invalid property '" + key + "' in properties file !");
            }
            System.out.println("'" + key + "' set to '" + value + "' from properties file");
        }
        return value;
    }

    /**
     * Gets the list of localhost IPs.
     *
     * @return the list of localhost IPs
     * @throws Exception the exception
     */
    public static List<String> getHostAddresses() throws Exception {
        List<String> hostAddresses = new ArrayList<>();
        List<NetworkInterface> networkInterfaceList = Collections.list(NetworkInterface.getNetworkInterfaces());
        if (networkInterfaceList == null || networkInterfaceList.isEmpty()) {
            hostAddresses.add("127.0.0.1");
        } else {
            for (NetworkInterface ni : networkInterfaceList) {
                if (!ni.isLoopback() && ni.isUp() && ni.getHardwareAddress() != null) {
                    for (InterfaceAddress ia : ni.getInterfaceAddresses()) {
                        if (ia.getBroadcast() != null) { //If limited to IPV4
                            hostAddresses.add(ia.getAddress().getHostAddress());
                        }
                    }
                }
            }
        }
        return hostAddresses;
    }

	
	public static void loadConfig(String contextRoot){
		System.out.println("contextRoot="+ contextRoot);
        File propertiesFile = null;
        Properties prop = null;
        try {
            // Get a handle to the JNDI environment naming context
            Context env = (Context) new InitialContext().lookup("java:comp/env");

            // Get a single value
            String nexcapWebConfigDirectory = (String) env.lookup(PROPERTIES_FOLDER_SYSTEM_KEY);
            propertiesFile = new File(nexcapWebConfigDirectory + "/" + PROPERTIES_FILE_PREFIX + contextRoot.substring(1) + PROPERTIES_FILE_SUFFIX);
            if (!propertiesFile.exists()) {
                throw new Exception("file not found");
            }
            try (InputStream input = new FileInputStream(propertiesFile)) {
                // load a properties file
                prop = new Properties();
                prop.load(input);
                System.out.println("Properties file '" + propertiesFile.getAbsolutePath() + "' loaded");
            }
        } catch (Exception e) {
            System.err.println("Can't load property file '" + (propertiesFile != null ? propertiesFile.getAbsolutePath() : PROPERTIES_FILE_PREFIX + contextRoot + PROPERTIES_FILE_SUFFIX) + "': " + e);
        }

        try {
            // Get Server URL from properties or use default one
            String nexcapUrlFromProperties = getProperty(prop, NEXCAP_NEXCAP_URL_KEY, DEFAULT_NEXCAP_URL);
            if (nexcapUrlFromProperties.contains("localhost")) {
                // Replace localhost in address by ip
                List<String> hostAddresses = getHostAddresses();
                if (hostAddresses.isEmpty()) {
                    throw new Exception("No NetworkInterface found, can't get localhost IP");
                }
                String locahostIpAddress = getHostAddresses().get(0);
                nexcapUrlFromProperties = nexcapUrlFromProperties.replace("localhost", locahostIpAddress);
                System.out.println("Replacing 'localhost' in NexCap URL using first local IP among [" + StringUtils.join(hostAddresses, ", ") + "] --> '" + nexcapUrlFromProperties + "'");
            }
            nexcapUrl = nexcapUrlFromProperties;

            nexcapLanguage = getProperty(prop, NEXCAP_LANGUAGE_KEY, DEFAULT_NEXCAP_LANGUAGE);
			
            webClientTimeout = getProperty(prop, WEBCLIENT_TIMEOUT, DEFAULT_WEBCLIENT_TIMEOUT);
            
            // SSO
            authentication = getProperty(prop, "AUTHENTICATION", "");
            clientId = getProperty(prop, "CLIENT_ID", "");
            redirectUri = getProperty(prop, "REDIRECT_URI", "");
            authorizationEndpoint = getProperty(prop, "AUTHORIZATION_ENDPOINT", "");
            accessEndpoint = getProperty(prop, "ACCESS_ENDPOINT", "");
            appClient = getProperty(prop, "APP_CLIENT_ID", "");
            applicationScope = getProperty(prop, "APPLICATION_SCOPE", "");
            
            //Geoloc
            geolocDefaultTarget = getProperty(prop, "GEOLOC_DEFAULT_TARGET", DEFAULT_GEOLOC_DEFAULT_TARGET);
            geolocDefaultZoom = getProperty(prop, "GEOLOC_DEFAULT_ZOOM", DEFAULT_GEOLOC_DEFAULT_ZOOM);
            showCurrentLocation = getProperty(prop, "SHOW_CURRENT_LOCATION", "false");
            

        } catch (Exception e) {
            System.err.println("Can't get server URL: " + e);
        }		
    }
	
	
	
    /**
     * Gets the server URL.
     *
     * @return the server URL
     */
    public static String getNexcapURL() {
        return nexcapUrl;
    }

    /**
     * Gets the server language.
     *
     * @return the server language
     */
    public static String getNexcapLanguage() {
        return nexcapLanguage;
    }
	
   /**
     * Gets the webclient timeout.
     *
     * @return webclient timeout
     */
    public static String getWebclientTimeout() {
        return webClientTimeout;
    }
    
    /**
     * Gets the webclient authentication type.
     *
     * @return webclient authentication type
     */
    public static String getAuthentication() {
        return authentication;
    }
    
    /**
     * Gets the webclient clientId.
     *
     * @return webclient clientId
     */
    public static String getClientId() {
        return clientId;
    }
    
    /**
     * Gets the webclient redirectUri.
     *
     * @return webclient redirectUri
     */
    public static String getRedirectUri() {
        return redirectUri;
    }
    
    /**
     * Gets the webclient authorizationEndpoint.
     *
     * @return webclient authorizationEndpoint
     */
    public static String getAuthorizationEndpoint() {
        return authorizationEndpoint;
    }
    
    /**
     * Gets the webclient tokenEndpoint.
     *
     * @return webclient tokenEndpoint
     */
    public static String getAccessEndpoint() {
        return accessEndpoint;
    }
    
    /**
     * Gets the webclient appClient.
     *
     * @return webclient appClient
     */
    public static String getAppClient() {
        return appClient;
    }
    
    /**
     * Gets the webclient applicationScope.
     *
     * @return webclient applicationScope
     */
    public static String getApplicationScope() {
        return applicationScope;
    }
    
    /**
     * Gets the geoloc default target
     * @return webclient geolocDefaultTarget
     */
    public static String getGeolocDefaultTarget() {
        return geolocDefaultTarget;
    }
    
    /**
     * Gets the geoloc default zoom
     * @return webclient geolocDefaultZoom
     */
    public static String getGeolocDefaultZoom() {
        return geolocDefaultZoom;
    }
    
    /**
     * Current localization reading
     * @return boolean
     */
    public static String getShowCurrentLocation() {
        return showCurrentLocation;
    }

}
