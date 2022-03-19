Ext.define('Dashboard.model.LocalProperty', {
    extend: 'Dashboard.model.Base',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    fields: [
        {
            name: 'id', 
            type: 'auto'
        },{
            name: 'name', 
            type: 'string'
        },{
            name: 'label', 
            type: 'string',
            convert: function(val,record) {
                 return getText(val);
            }
        },{
            name: 'type', 
            type: 'string'
        },{
            name: 'dynamicPropertiesContext',
            type: 'string'      
        },{
            name: 'description', 
            type: 'string'
        },{
            name: 'lastUpdateDate', 
            type: 'date',
            convert: function (val) {
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate(); // IE is crap
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            }
        },{
            name: 'control', 
            type: 'auto'
        },{
            name: 'options', 
            type: 'auto'
        },{
            name: 'isDisplayed',
            type: 'boolean'
        },{
            name: 'isEditable',
            type: 'boolean'
        },{
            name: 'enabledInFilters',
            type: 'boolean',
            convert: function(val,record) {
                var control = record.data.control;
                if(typeof record.data.control === 'string'){
                    control = Ext.decode(record.data.control)
                }
                if(control && control.configuration && control.configuration.enabledInFilters){
                    return control.configuration.enabledInFilters;
                }
            }
        },{
            name: 'enabledInTables',
            type: 'boolean',
            convert: function(val,record) {
                var control = record.data.control;
                if(typeof record.data.control === 'string'){
                    control = Ext.decode(record.data.control)
                }
                if(control && control.configuration && control.configuration.enabledInTables){
                    return control.configuration.enabledInTables;
                }
            }
        },{
            name: 'enabledInDetails',
            type: 'boolean',
            convert: function(val,record) {
                var control = record.data.control;
                if(typeof record.data.control === 'string'){
                    control = Ext.decode(record.data.control)
                }
                if(control && control.configuration && control.configuration.enabledInDetails){
                    return control.configuration.enabledInDetails;
                }
            }
        },{
            name: 'enabledInControls',
            type: 'boolean',
            convert: function(val,record) {
                var control = record.data.control;
                if(typeof record.data.control === 'string'){
                    control = Ext.decode(record.data.control)
                }
                if(control && control.configuration && control.configuration.enabledInControls){
                    return control.configuration.enabledInControls;
                }
            }
        },{
            name: 'valorisation',
            type: 'string',
            convert: function(val,record) {
                var control = record.data.control;
                if(typeof record.data.control === 'string'){
                    control = Ext.decode(record.data.control)
                }
                if(control && control.configuration && control.configuration.valorisation){
                    return control.configuration.valorisation;
                }
            }
        },{
            name: 'field',
            type: 'auto',
            convert: function(val,record) {
                var control = record.data.control;
                if(typeof record.data.control === 'string'){
                    control = Ext.decode(record.data.control)
                }
                
                if(control && control.field){
                    return control.field;
                }
            }
        },{
            name: 'renderer',
            type: 'auto'
        }
    ]
});   