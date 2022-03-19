/* global Ext */

Ext.define('Dashboard.tool.Utilities', { //stringCompacted
    requires: ['Dashboard.config.Config'],

    statics: {

        name: 'Dashboard.tool.Utilities',

        /**
         * Write message into the log console
         * 
         * @param message {string}
         * @param level {string} exemple : Dashboard.tool.Utilities.trace('Close task', 'INFO');
         */
        trace: function (message, level){

            if (level === undefined || level === '') {
                level = 'ALL';
            }

            var levels = {
                'INFO': 1,
                'WARNING': 2,
                'ALERT': 3,
                'ERROR': 4,
                'DEBUG': 5,
                'ALL': 6
            };

            var isMessageCircular = false; // if error message is complex object
            if ((typeof message !== 'string') && (typeof message !== 'number')) {
                try {
                    message = JSON.stringify(message);
                } catch (ex) {
                    isMessageCircular = true;
                }
            }
            if (isMessageCircular) {
                if (Dashboard.config.Config.TRACE_ENABLED && levels[Dashboard.config.Config.TRACE_LEVEL] >= levels[level]) {
                    console.log('[' + level + '] ');
                    console.log(message);
                }
            } else {
                if (Dashboard.config.Config.TRACE_ENABLED && levels[Dashboard.config.Config.TRACE_LEVEL] >= levels[level]) {
                    console.log('[' + level + '] ' + message + "");
                }
            }
        },

        debug: function (message, level){
            this.trace(message, 'DEBUG');
        },

        error: function (message){
            this.trace(message, 'ERROR');
        },

        warn: function (message){
            this.trace(message, 'WARNING');
        },

        info: function (message){
            this.trace(message, 'INFO');
        },

        /**
         * If an user clicks user lower than his level
         */
        privilegeMessage: function (){
            Ext.Msg.alert({
                title: getText('Error'),
                msg: getText('Privileges are not high enough to edit this user'),
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },

        /**
         * If an user clicks on dataGrid's toolbar without selected raw
         */
        showNotSelectedMessage: function (){
            Ext.Msg.alert({
                title: getText('Warning'),
                msg: getText('No element selected'),
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
        },

        /**
         * If an user clicks on a specific check without report
         */
        showNoReportForSelectedSpecificCheck: function (){
            Ext.Msg.alert({
                title: getText('Warning'),
                msg: getText('There are no reports associated with this control!'),
                icon: Ext.Msg.WARNING
            });
        },

        /**
         * If a user add a dynamic field with a label that already exists
         */
        showLabelNotUnique: function (){
            Ext.Msg.show({
                title: getText('Warning'),
                msg: getText('This label already exists!'),
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
        },

        /**
         * If a device is already authorized
         */
        showAlreadyAuthorized: function (){
            Ext.Msg.show({
                title: getText('Warning'),
                msg: getText('This device is already authorized!'),
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
        },

        /**
         * Find data index from couple key / value
         * 
         * @param data (array)
         * @param key (string)
         * @param value (string)or(int)
         * @return int or -1
         */
        findIndex: function (data, key, value){

            for (var i = 0; i < data.length; i++) {
                if (data[i][key] === value) {
                    return i;
                }
            }
            ;
            return -1;
        },

        /**
         * Get Browser
         * 
         */
        getBrowser: function (){

            if (Ext.browser.is.IE) {
                return 'EXPORER';
            }
            return 'NOT_EXPLORER';
        },

        /**
         * get localized name by deviceTypeId
         * 
         * @param {string} value constant
         * @return name (string)
         */
        getDeviceTypeName: function (value){

            var typeName = Dashboard.config.Config.DEVICE_TYPE[value].name;

            if (typeName !== undefined && typeName !== '') {
                return typeName;
            }

            return value;

        },

        /**
         * Check if file extension is valid
         * 
         * @argument {string} fileName File name
         */
        validateFileExtension: function (fileName){
            var exp = /^.*\.(pdf|docx)$/;
            return (exp.test(fileName));
        },

        /**
         * Concat 2 arrays without duplicate items
         * 
         * @argument {array} array1 first array
         * @argument {array} array2 second array
         * @return array
         */
        concatUnique: function (array1, array2){

            var array = [].concat(array1);

            for (var i = 0; i < array2.length; i++) {
                Ext.Array.include(array, array2[i]);
            }

            return array;
        },

        /**
         * Check if value is an integer
         * @param {type} value
         * @returns {Boolean}
         */
        isInt: function (value){
            return !isNaN(value) && parseInt(Number(value)) === value && !isNaN(parseInt(value, 10));
        },

        /**
         * Lookup environment
         * 
         * @returns {String} SENCHA | TOMCAT
         */
        getServerName: function (){
            var url = window.location.toString();
            if (url.includes("localhost:1841")) {
                return 'SENCHA';
            }
            return 'TOMCAT';
        },

        stringCompacted: function (string){
            string = string.toString().trim();//.toLowerCase();
            string = this.removeAccents(string);
            return string;
        },

        removeAccents: function (str){
            var accents = 'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏìíîïÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚšśŤťŸÝÿýŽŻŹžżź';
            var accentsOut = 'AAAAAAAaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIiiiiUUUUUuuuuuLLLlllNNNnnnRrSSssTtYYyyZZZzzz';
            str = str.split('');
            var i, x;
            for (i = 0; i < str.length; i++) {
                if ((x = accents.indexOf(str[i])) !== -1) {
                    str[i] = accentsOut[x];
                }

                if (!this.isAlphanumeric(str[i])) {
                    str[i] = '';
                }

            }
            return str.join('');
        },

        isAlphanumeric: function (string){
            if (/[^a-zA-Z0-9]/.test(string)) {
                return false;
            }
            return true;
        }

    }
}, function (){
    // Dashboard.tool.Utilities.trace('Class loaded : Dashboard.tool.Utilities');
});