Ext.define('Dashboard.tool.Formatter', {
    requires: ['Dashboard.config.Config' ],
    
    
    statics: {
        
        /**
        * Formats raw values to proper human display
        * Can be extended to cover diffrent formattings
        * @param {type} column
        * @param {type} value
        * @returns {String}
        */
       valueFormatter: function (property, type, value) {
           
           var propValue = value;

           // Order is important 
           if (property === 'isAcknowledged') {
               return this.acknowledgedFormatter(value);
           }
           
           if (property === 'alertLevel') {
               return this.alertLevelFormatter(value);
           }

           if (property === 'identified') {
               return this.refrenceIdentifiedFormatter(value);
           }

           if (type === 'BOOLEAN' || typeof value === 'boolean') {
               return this.booleanFormatter(value);
           }

           if (typeof value === 'string') {
               if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
                   return this.booleanFormatter(value.toLowerCase());
               }
           }
           
           if (type === 'DATE') {
               var date = moment(value).toDate();
               return Ext.Date.format(date, getText('m/d/Y'));
           }
           
           if (type === 'DATETIME') {
               var dateTime = moment(value).toDate();
               return Ext.Date.format(dateTime, getText('m/d/Y H:i:s'));
           }

           if (value === undefined || value === null) {
               propValue = '';
           }

           return propValue;
       },
    
        
        booleanFormatter: function (value) {
            var propValue = '';
            if (value === true || value === 'true') {
                propValue = getText('Yes');
            } else if (value === false || value === 'false') {
                propValue = getText('No');
            }
            return propValue;
        },
        
        
        alertLevelFormatter: function (value) {
            switch (value) {
                case 0:
                    return getText('Low');
                    break;
                case 1:
                    return getText('Medium');
                    break;
                case 2:
                    return getText('High');
                    break;
                case "LOW":
                    return getText('Low');
                    break;
                case "MEDIUM":
                    return getText('Medium');
                    break;
                case "HIGH":
                    return getText('High');
                    break;
                default:
                    return '';
                    break;
            }
        },
        
        
        acknowledgedFormatter: function (value) {
            var html = '<div style="display: block; margin-left: 45%;  margin-right: auto;">'; // center
            // Show value in text if you need to?
            // var propValue = this.booleanFormatter(value);
            // html += propValue;

            if (value === true || value === 'true') {
                html += '<i class="fa fa-check" aria-hidden="true"></i>';
            }

            html += '</div>';
            return html;
        },
        
        
        refrenceIdentifiedFormatter: function (value){
            return value ? getText('Items') : getText('Materials set');
        }
        
    }
    
});