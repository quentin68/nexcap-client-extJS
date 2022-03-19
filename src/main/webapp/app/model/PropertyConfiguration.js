Ext.define('App.field.Nexcapweb', {
     extend: 'Ext.data.field.Field',
     alias: 'data.field.nexcapweb',

     convert: function (value, record) {
                  
        if (value === undefined || !value || value === {}) {
            return {nexcapweb: this.addDefaultOptions(record)};
        }
        if(value.nexcapweb === undefined || !value.nexcapweb || value.nexcapweb === {}){
            value.nexcapweb = this.addDefaultOptions(record);
        }
     },
     
     addDefaultOptions: function (record){
                         
        if(!record.data.type){
            record.data.type = 'STRING';
        }

        var nexcapweb = {
            field:{
                fieldType: 'textfield',
                name: record.data.name,
                fieldLabel: record.data.label,
                description: record.data.label,  // description
		dataType: record.data.type,  //Important, type de données utilisé pour la validation et le format d'affichage
		vtype:null,    // infos pour la validation de la saisie
		width: 300, // largeur du contrôle en pixel
                configuration:{  // options générales pour tout le client web
                    controlType: 'textfield',  // type de contrôle en lecture seule (peut être différent du fieldType).
                    controlValorisation: record.data.propertyConfigurationType,  // propertyConfigurationType
                    isEditable:true,  // attributs modifiables
                    isDisplayed:true,  // visible 
                    enabledInTables:true,  // utilisé dans les grilles
                    enabledInDetails:true,  // utilisé dans les fiches de vie
                    enabledInFilters:true, // utilisé dans les filtres
                    enabledInControls:true,   // utilisé dans les contrôles spécifiques
                    required :false  //  saisie obligatoire
                }  
            }
        };
        
        switch(record.data.type){
            case 'STRING':
                nexcapweb = this.addStringParams(nexcapweb);
                break;
            case 'INT':
                nexcapweb = this.addIntParams(nexcapweb);
                break;
            case 'FLOAT':
                nexcapweb = this.addFloatParams(nexcapweb);
                break;
            case 'BOOLEAN':
                nexcapweb = this.addBooleanParams(nexcapweb);
                break;
            case 'DATE':
                nexcapweb = this.addDateParams(nexcapweb);
                break;
            case 'DATETIME':
                nexcapweb = this.addDatetimeParams(nexcapweb);
                break;
            case 'TIME':
                nexcapweb = this.addTimeParams(nexcapweb);
                break;
            case 'LIST':
                nexcapweb = this.addListParams(nexcapweb, record);
                break;
        }

        return Ext.encode(nexcapweb);
    },
    
    addStringParams: function(nexcapweb){
        
        nexcapweb.field.fieldType = 'textfield';
        nexcapweb.field.configuration.controlType = 'textfield';
        nexcapweb.field.minLength = 1;
        nexcapweb.field.maxLength = 1024;
        nexcapweb.field.alphanumeric = false;
        
        return nexcapweb;
    },
    
    addIntParams: function(nexcapweb){
        
        nexcapweb.field.fieldType = 'integerfield';
        nexcapweb.field.configuration.controlType = 'integerfield';
        nexcapweb.field.width = 200;
        nexcapweb.field.minValue = -2147483647;
        nexcapweb.field.maxValue = 2147483647;
        nexcapweb.field.step = '1';
        
        return nexcapweb;
    },
    
    addFloatParams: function(nexcapweb){
        
        nexcapweb.field.fieldType = 'numberfield';
        nexcapweb.field.configuration.controlType = 'numberfield';
        nexcapweb.field.minValue = -2147483647;
        nexcapweb.field.maxValue = 2147483647;
        nexcapweb.field.step = '1';
        nexcapweb.field.decimalSeparator = ',';
        nexcapweb.field.allowDecimals = true;
        nexcapweb.field.decimalPrecision = '2';
        
        return nexcapweb;
    },
    
    addBooleanParams: function(nexcapweb){
        
        nexcapweb.field.fieldType = 'checkbox';
        nexcapweb.field.configuration.controlType = 'checkbox';
        nexcapweb.field.checked = false;
        return nexcapweb;
    },
    
    addDateParams: function(nexcapweb){
        
        nexcapweb.field.fieldType = 'datefield';
        nexcapweb.field.configuration.controlType = 'datefield';
        nexcapweb.field.limitToCurrentDate = false;
        return nexcapweb;
    },
    
    addDatetimeParams: function(nexcapweb){
        
        nexcapweb.field.fieldType = 'datetimefield';
        nexcapweb.field.configuration.controlType = 'datetimefield';
        nexcapweb.field.limitToCurrentDate = false;
        return nexcapweb;
    },
    
    addTimeParams: function(nexcapweb){
        
        nexcapweb.field.fieldType = 'timefield';
        nexcapweb.field.configuration.controlType = 'timefield';
        nexcapweb.field.increment = 1;
        return nexcapweb;
    },
    
    addListParams: function(nexcapweb, record){
        
        nexcapweb.field.fieldType = 'combobox';
        nexcapweb.field.configuration.controlType = 'combobox';
        nexcapweb.field.dataType = 'STRING';
        nexcapweb.field.itemValues = record.data.valueList;
        return nexcapweb;
    }
    
 });


Ext.define('Dashboard.model.PropertyConfiguration', {
    extend: 'Dashboard.model.Base',

    requires: ['Dashboard.tool.Utilities', 'Dashboard.config.Config'],

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'label',
            type: 'string'
        }, {
            name: 'type',
            type: 'string'
        }, {
            name: 'isEditable',
            type: 'boolean'
        }, {
            name: 'isDisplayed',
            type: 'boolean'
        }, {
            name: 'isSystem',
            type: 'boolean'
        }, {
            name: 'propertyConfigurationType',
            type: 'string'
        }, {
            name: 'options',
            type: 'nexcapweb'
        }, {
            name: 'valueList',
            type: 'auto'
        }, {
            name: 'origin',
            type: 'auto'
        }, {
            name: 'control',
            type: 'auto',
            persist: false,
            convert: function (value, record){
                if (value !== undefined) {
                    try {
                        var optionsObj = {
                            field: value.field,
                            configuration: value.configuration
                        };
                        
                        if(!record.data.options){
                            record.data.options = {};
                        }
                        record.data.options.nexcapweb = Ext.encode(optionsObj);
                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[Dashboard.model.PropertyConfiguration] options.nexcapweb encode error: ' + ex);
                    }
                }
            }
        }
    ],
    

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/dynamicproperties',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/dynamicproperties',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/dynamicproperties',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/dynamicproperties'
        }
    }),
        

    statics: {
        
        getControl: function (property){
                        
            var data = property.data;
            
            if (data === undefined) {
                data = property;
            }
            
            if (data.control === undefined) {
                try {
                    if (data.options && data.options.nexcapweb) {
                        
                        data.options.nexcapweb = Ext.decode(data.options.nexcapweb);
                        
                        data.control = data.options.nexcapweb;
                        if(data.control.field && data.control.field.configuration){
                            data.control.configuration = data.control.field.configuration;
                        }
                        
                    } else {
                        Dashboard.tool.Utilities.warn('[Dashboard.model.PropertyConfiguration.getControl] options.nexcapweb doesn\'t exist for property.id=\'' + data.id
                                + '\', property.name=\'' + data.name + '\'');
                    }
                } catch (ex) {
                    Dashboard.tool.Utilities.error('[Dashboard.model.PropertyConfiguration.getControl] options.nexcapweb decode error for property.id=\'' + data.id + '\', property.name=\''
                            + data.name + '\': ' + ex);
                }
            }
            
//            if(data.control.configuration === undefined || !data.control.configuration){
//                //data.options.nexcapweb = Ext.decode(data.options.nexcapweb);
//                if(data.options.nexcapweb.field.configuration){
//                    data.control.configuration = data.options.nexcapweb.field.configuration;
//                }
//            }
            
            if (data.control !== undefined && data.control.field !== undefined && data.control.configuration !== undefined) {
                
                // overwrite control values from base data
                data.control.field.name = data.name;
                data.control.field.fieldLabel = data.label;
                data.control.field.itemValues = data.valueList;
                data.control.configuration.isEditable = data.isEditable;
                data.control.configuration.isDisplayed = data.isDisplayed;
            }
            return data.control;
        }
    }
    
});
