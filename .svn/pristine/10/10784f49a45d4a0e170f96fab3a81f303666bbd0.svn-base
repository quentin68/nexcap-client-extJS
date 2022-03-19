
/**
 * Tool to manipulate dates
 */
Ext.define('Dashboard.tool.DateTime', {
    requires: ['Dashboard.config.Config' ],
    
    statics: {
        
        /**
         * var d = new Date();
        print(ISODateString(d)); // prints something like 2009-09-28T19:03:12Z
         */
        ISODateString: function(d){
             
            function pad(n){return n<10 ? '0'+n : n}
            return d.getUTCFullYear()+'-'
                + pad(d.getUTCMonth()+1)+'-'
                + pad(d.getUTCDate())+'T'
                + pad(d.getUTCHours())+':'
                + pad(d.getUTCMinutes())+':'
                + pad(d.getUTCSeconds())+'Z'
       },

        
        
        /**
        * Get localised date format
        * @return format (string)
        */
        getDateFormat: function(){

            if(Dashboard.config.Config.LOCALE === "fr_FR"){
                return "d/m/Y";
            }
            
            if(Dashboard.config.Config.LOCALE === "en_US"){
                return "Y/m/d";
            }   
            
            if(Dashboard.config.Config.LOCALE === "en_EN"){
                return "Y/m/d";
            }  
            
            return "Y/m/d";
        },
        
        
        /**
        * Get localised datetime format
        * @return format (string)
        */
        getDateTimeFormat: function(){

            if(Dashboard.config.Config.LOCALE === "fr_FR"){
                return "d/m/Y H:i:s";
            }
            
            if(Dashboard.config.Config.LOCALE === "en_US"){
                return "m/d/Y H:i:s";
            } 
            
            if(Dashboard.config.Config.LOCALE === "en_EN"){
                return "m/d/Y H:i:s";
            } 
            
            return "Y/m/d H:i:s";
        },
                
        /**
        * Get localised time format
        * @return format (string)
        */
        getTimeFormat: function(){

            if(Dashboard.config.Config.LOCALE === "fr_FR"){
                return "H:i:s";
            }
            
            if(Dashboard.config.Config.LOCALE === "en_US"){
                return "H:i:s";
            } 
            
            if(Dashboard.config.Config.LOCALE === "en_EN"){
                return "H:i:s";
            } 
            
            return "H:i:s";
        },
        
        
        /**
         * Return the current date
         * @Return yyyy-mm-dd hh:mm:ss (string)
         */
        getSqlDateTime: function(){

            var y, mo, d, h, m, s;
            var currentDate = new Date();

            y = currentDate.getFullYear();
            mo = this.addZero(currentDate.getMonth()+1);
            d = this.addZero(currentDate.getDate());

            h = this.addZero(currentDate.getHours());
            m = this.addZero(currentDate.getMinutes());
            s = this.addZero(currentDate.getSeconds());

            var result = y +'-'+ mo +'-'+ d +' '+ h + ':' + m  + ':' + s;
            return result;

        },
        
        
        /**
        * Convert a date to localised date
        * @argument {string} _date 
        * @return string
        */
        convertFormatDate: function(_date){

            if(_date === '' || _date === '0000-00-00' || _date === '0000-00-00 00:00:00'){
                return '';
            }

            _date = this.replace(_date, '-', '/');

            var currentDate = new Date(_date);

            var day = this.addZero(currentDate.getDate());
            var month = this.addZero(currentDate.getMonth() + 1); //months are zero based
            var year = currentDate.getFullYear();

            if(Dashboard.config.Config.LOCALE === "fr_FR"){
                return day + "/" + month + "/" + year;
            }

            return year + "/" + month + "/" + day;
        },
                
        
        /**
         * Convert date object to sql string date
         * @argument {date} dateObject date object
         */
        toDateString: function(dateObject){
    
            var currentDate = dateObject;

            var y = currentDate.getFullYear();
            var mo = this.addZero(currentDate.getMonth()+1);
            var d = this.addZero(currentDate.getDate());

            var result = y +'-'+ mo +'-'+ d;
            return result;
    
        },
                
                
        /**
         * Convert date object to sql string dateTime
         * @argument {date} dateObject date object 
         */        
        toDateTimeString: function(dateObject){
            
            var currentDate = dateObject;

            var y = currentDate.getFullYear();
            var mo = this.addZero(currentDate.getMonth()+1);
            var d = this.addZero(currentDate.getDate());

            var h = this.addZero(currentDate.getHours());
            var m = this.addZero(currentDate.getMinutes());
            var s = this.addZero(currentDate.getSeconds());

            var result = y +'-'+ mo +'-'+ d +' '+ h + ':' + m  + ':' + s;
            return result;
        },
        

        /**
        * Convert a datetime to localised datetime
        * @argument {date} _dateTime 
        * @return string
        */
        convertFormatDateTime: function(_dateTime){

            if(_dateTime === '' || _dateTime === '0000-00-00' || _dateTime === '0000-00-00 00:00:00'){
                return '';
            }

            _dateTime = this.replace(_dateTime, '-', '/');
            var currentDate = new Date(_dateTime);

            var day = this.addZero(currentDate.getDate());
            var month = this.addZero(currentDate.getMonth() + 1); //months are zero based
            var year = currentDate.getFullYear();
            var hours = this.addZero(currentDate.getHours());
            var minutes = this.addZero(currentDate.getMinutes());
            var seconds = this.addZero(currentDate.getSeconds());

            if(Dashboard.config.Config.LOCALE === "fr_FR"){
                return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds ;
            }
            return year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds ;
        },
        
        
        /**
        * Convert a datetime to localised datetime
        * @param {string} dateTime
        * @return string
        */
        convertToServerFormat: function(dateTime){

            if(dateTime === '' || dateTime === null || dateTime === '0000-00-00 00:00:00'){
                return '';
            }

            var day = this.addZero(dateTime.getDate());
            var month = this.addZero(dateTime.getMonth() + 1); //months are zero based
            var year = dateTime.getFullYear();

            return year + "-" + month + "-" + day ;
        },
        
        

        /**
        * If needed, add '0' before number.
        * @param {string} nb
        * @return string
        */
        addZero: function(nb){

            if(nb < 10){
                return "0" + nb;
            }
            return nb;
        },

        /**
        * Replace selected character by another character
        * @param {string} str text
        * @param {string} find char to replace
        * @param {tring} rep new char
        * @return string
        */
        replace: function(str, find, rep){          
            var reg = new RegExp(find, "g");
            return(str.replace(reg, rep));
        }

    }

});   