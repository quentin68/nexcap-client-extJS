/*  global Ext  */

Ext.define('Dashboard.manager.authentication.MyAtService', {
    extend: 'Ext.app.Controller',
    alias: 'myAtService',
    singleton: true,

    requires: [
        'Dashboard.tool.Utilities'
    ],

    clientId: Dashboard.config.Config.CLIENT_ID,//'CLI_YW00_BrokerDMZ-V',
    appClientId: Dashboard.config.Config.APP_CLIENT_ID,//'CLI_2I87_WEB_SERVANTES-FAL-A350-V',
    redirectUri: Dashboard.config.Config.REDIRECT_URI,//'https://localhost:8443/web',
    authorization_endpoint: Dashboard.config.Config.AUTHORIZATION_ENDPOINT,//'https://v3.airbus.com/FedBroker/as/authorization.oauth2',
    token_endpoint: Dashboard.config.Config.ACCESS_ENDPOINT,//'https://v3.airbus.com/FedBroker/as/token.oauth2',

    idTokenExpirationDate: null,
    refAccessTokenExpirationDate: null,
    idToken: null,
    referenceAccessToken: null,
    oidcAuthenticationGrantType: 'urn:acr:form',
    oidcAuthenticationScope: 'openid profile email',
    oidcAuthenticationResponseType: 'id_token',
    oidcAuthorizationGrantType: 'urn:ietf:params:oauth:grant-type:jwt-bearer',

    // scope(s) dedicated to the application 
    applicationScope: Dashboard.config.Config.APPLICATION_SCOPE,//'SCO_2I87_SERVANTES-FAL-A350-V', 

    requestedToken: false,
    tokenObject: null,
    
    loginScreenController: null,

    /**
     * Method to start authentication flow
     * @param {type} loginScreenController
     * @returns {undefined}
     */
    initAuthorizationFlow: function (loginScreenController){
        
        this.loginScreenController = loginScreenController;
        
        if(this.expired){
            localStorage.setItem('id_token', '');
            localStorage.setItem('ref_access_token', '');
        }
        
        var idToken = localStorage.getItem('id_token') || '';
        var refToken = localStorage.getItem('ref_access_token') || '';
        console.log(idToken, refToken);
        
        if (idToken === '' || refToken === '') {
            if (window.location.href.indexOf('id_token=') > -1) {
                var callbackURL = window.document.location.href.replace(window.document.location.hostname + '/#', '');
                this.extractIdToken(callbackURL);

            } else {
                console.log('start initAuthorizationFlow');
                this.getAuthenticationCode();
            }
        }
    },

    /**
     * Method to get the reference access token
     * with expired date check
     */
    getReferenceAccessToken: function (){

        var ref_token = localStorage.getItem('ref_access_token');
        var ref_token_exp = localStorage.getItem('ref_access_token_expiration');
        var idToken = localStorage.getItem('id_token');
        var id_token_exp = localStorage.getItem('id_token_expiration');

        if (ref_token && !this.expired(ref_token_exp)) {
            return ref_token;

        } else {
            console.log('ref expired');
            localStorage.setItem('ref_access_token', '');
            localStorage.setItem('ref_access_token_expiration', '');

            if (idToken && !this.expired(id_token_exp)) {
                
                this.extractReferenceAccessToken();

            } else {
                console.log('id expired');
                localStorage.setItem('id_token', '');
                localStorage.setItem('id_token_expiration', '');
                this.getAuthenticationCode();
            }
        }
    },

    /**
     * Method to generate nonce randomly
     */
    generateNonce: function (){
        var min = Math.pow(2, 14);
        var max = Math.pow(2, 15);
        var min1 = Math.pow(2, 16);
        var max1 = Math.pow(2, 17);
        var nonce = (Math.floor(Math.random() * (max - min + 1)) + min).toString()
                + '.' + (Math.floor(Math.random() * (max1 - min1 + 1)) + min1).toString();
        localStorage.setItem('nonce', nonce);
        return nonce;
    },

    /**
     * Method to ask airbus onelogin to retrieve users information
     * and redirect user if is not connected
     */
    getAuthenticationCode: function (){

        console.log('start getAuthenticationCode');

        var body = {};
        body.client_id = this.clientId;
        body.response_type = this.oidcAuthenticationResponseType;
        body.redirect_uri = this.redirectUri;
        body.scope = this.oidcAuthenticationScope;
        body.grant_type = this.oidcAuthenticationGrantType;
        body.nonce = this.generateNonce();
        body = Ext.urlEncode(body);
        
        var urlToSanitize = this.authorization_endpoint + '?' + body;
        var urlToSanitizeString = urlToSanitize.toString();
        window.document.location.href = urlToSanitizeString;
        
    },

    /**
     * Method To recuperate the id token from call back url
     * @param callbackURL is the redirection url after authentication on onelogin
     */
    extractIdToken: function (callbackURL){
        
        console.log('start extractCode');
        var params = callbackURL.substring(1, callbackURL.length).split('#')[1];
        
        this.idToken = Ext.Object.fromQueryString(params).id_token;
                        
        var payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(this.idToken.split(".")[1]));

        var expiration_date = payloadObj.exp;
        var dt = new Date(parseInt(expiration_date) * 1000);

        this.idTokenExpirationDate = dt;

        //var nonce = localStorage.getItem('nonce');
        
        //if (this.idToken && payloadObj.nonce === nonce) {
            localStorage.setItem('id_token', this.idToken);
            localStorage.setItem('id_token_expiration', this.idTokenExpirationDate.toString());
            this.extractReferenceAccessToken();
//        } else {
//            localStorage.setItem('id_token', '');
//            localStorage.setItem('id_token_expiration', '');
//        }
    },

    /**
     * Method to check the auto generated nonce with the recieved one in the id_token
     */
    checkNonce: function (){
        
        var decodedToken = this.decode(this.idToken);
        var nonce = localStorage.getItem('nonce');
        return decodedToken.nonce === nonce; //true;//
    },

    /**
     * Method to set the id_token in LocalStorage in first time
     * and extract ref_access_token from airbus api with id_token
     */
    extractReferenceAccessToken: function (){

        var params = {};
        params.client_id = this.appClientId;
        params.grant_type = this.oidcAuthorizationGrantType;
        params.assertion = this.idToken;
        params.scope = this.applicationScope;

        Ext.Ajax.request({
            url: this.token_endpoint,
            method: 'POST',
            async: false,
            useDefaultXhrHeader: false,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            
            params: params,//Ext.JSON.encode(params),
            
            success: function (response, opts){
                var data = JSON.parse(response.responseText);
                console.log('--------- AccessToken Loaded ------------');
                console.log(data);
                Dashboard.manager.authentication.MyAtService.setReferenceAccessToken(data);
            },
            failure: function (response, opts){
                console.log("extractReferenceAccessToken failure");
            }
        });

    },
    

    /**
     * Method to set the ref_access_token in localStorage in first time
     * and set in localStorage too the expiration date of it
     * @param data refToken Recuperate by extractReferenceAccessToken
     */
    setReferenceAccessToken: function (data){
                
        this.referenceAccessToken = data.access_token;
        localStorage.setItem('ref_access_token', this.referenceAccessToken);
        
        var dt = new Date();
        dt.setSeconds(dt.getSeconds() + data.expires_in);
        this.refAccessTokenExpirationDate = dt;
        
        localStorage.setItem('ref_access_token_expiration', this.refAccessTokenExpirationDate.toString());
        
        Ext.Ajax.on("beforerequest", function(conn, options, eOpts ){
            
            
            if(options.url === this.token_endpoint ){
                //debugger;
            }else{
            Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
            }
                      
            Ext.Ajax._defaultHeaders = {
              'Authorization': 'Bearer '+localStorage.getItem("ref_access_token")
            };
         
        }, this);
         
    },
    
    
    /**
     * Checking the date expiration of token
     * @param tokenExpDate Corresponding to the date expiration
     */
    expired: function (tokenExpDate){
                
        tokenExpDate = new Date(tokenExpDate);
        
        var minutes = 1;
        var beforeExpDate = new Date();
        beforeExpDate.setTime(tokenExpDate.getTime() - (minutes * 60 * 1000));
        
        var dt = new Date();
        if (tokenExpDate < dt) {
            return true;
        }else if(beforeExpDate < dt){
            return true;
        }else{
            return false;
        }
    },


    /**
     * token / idToken decoder and cleaner
     * @param {type} code
     * @returns {MyAtServiceAnonym$0.decode@call;cleanCode|MyAtServiceAnonym$0.decode@call;decode64}
     */
    decode: function (data){
                
        var decodedString = this.decode64(data);
        decodedString = this.cleanCode(decodedString);
        return decodedString;
    },
    

    /**
     * Base 64 encoder
     * @param {type} input
     * @returns {String}
     */
    encode64: function (input){

        var keyStr = "ABCDEFGHIJKLMNOP" +
                "QRSTUVWXYZabcdef" +
                "ghijklmnopqrstuv" +
                "wxyz0123456789+/" +
                "=";

        input = escape(input);
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    },
    
    /**
     * Base 64 decoder
     * @param {type} input
     * @returns {string}
     */
    decode64: function (input){

        var keyStr = "ABCDEFGHIJKLMNOP" +
                "QRSTUVWXYZabcdef" +
                "ghijklmnopqrstuv" +
                "wxyz0123456789+/" +
                "=";

        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        
        if (base64test.exec(input)) {
//            console.log("There were invalid base64 characters in the input text.\n" +
//                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
//                    "Expect errors in decoding.");
        }
        
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);
        return unescape(output);
    },
    
    
    /**
     * Parse and clean up token
     * @param {type} decodedString
     * @returns {me.decode}
     */
    cleanCode: function (decodedString){

        var input;
        var output;
        
        for (var i = 0; i < decodedString.length; i++) {
            if (decodedString[i] === '{') {
                input = i;
                break;
            }
        }
        
        for (var i = decodedString.length; i > 0; i--) {
            if (decodedString[i] === '}') {
                output = i;
                break;
            }
        }

        var code = decodedString.substring(input, output + 1);
        code = Ext.decode(code);

        return code;
    }
    

});