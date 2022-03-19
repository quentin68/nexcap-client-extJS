/* global Ext */

Ext.define('Dashboard.view.shared.filtering.ValueIsFilled', {
    extend: 'Ux.CheckBox',
    xtype : 'filter.valueIsFilled',
    type: 'filter',
    
    config:{
        filterModel:null
    },
   
    fieldLabel: null,
    name: null,
    checked: false,
    boxLabel: 'Doggy',
    width : null,
            
    initComponent: function() {
        
        var filterData = this.getFilterModel().data;
        this.fieldLabel = filterData.label;
        this.name = filterData.name;
        
        var comparison = filterData.comparison;
        
        if(comparison === 'IS_NOT_NULL'){
            this.boxLabel = getText('is not empty');
        }else {
            this.boxLabel = getText('is empty');
        }
                
        this.callParent();
    },
            
    getFilter: function(){

         var value = this.checked;

        if (!value){
            return;
        }
        
        var filterData = this.getFilterModel().data;
        var filter = this.buildFilter(filterData.name, value, filterData.comparison);

        return filter;
    },
            
    buildFilter: function(name, value, comparison){
        
        var filter = this.getFilterModel();
        var dataType = 'STRING';
                
        var originalFilterType = filter.data.type;
        var store = Ext.create('Dashboard.store.FilterTypes');
        var filterType = store.findRecord('type', originalFilterType);
        
        if(filterType){
            dataType = filterType.data.propertyValueType;
        }
        
        
//        
//        if(filter.data.configuration !== undefined && filter.data.configuration.field !== undefined && filter.data.configuration.field.dataType ){
//            dataType = filter.data.configuration.field.dataType;
//        }else if(filter.data.type === 'CHECKBOX'){
//            dataType = 'BOOLEAN';
//        }else if(filter.data.type === 'LONG'){
//            dataType = 'BOOLEAN';
//        }
        switch (filter.data.label) {
            case "Code (Tag RFID)":
                filter.data.configuration.field.codeType = "RFID_TAG";
                break;
            case  "Code (Code libre)":
                filter.data.configuration.field.codeType = "FREE_INPUT";
                break;
            case  "Code (Code alphanumérique)":
                filter.data.configuration.field.codeType = "ALPHANUM_INPUT";
                break;
            case  "Code (QR code)":
                filter.data.configuration.field.codeType = "QR_CODE";
                break;
            case "Code (Code-barres)":
                filter.data.configuration.field.codeType = "BAR_CODE";
                break;
        }

        var value_array = [];
        value_array.push(filter.data.configuration.field.codeType);
        if (filter.data.configuration.field.codeType){
            if (comparison === "IS_NULL") {
                return {
                    "property": "codes.codeType",
                    'value': value_array,
                    "comparison": "NOT_IN"
                }
            } else {
                return {
                    'property': name,
                    'value': value,
                    'type': 'STRING',
                    'comparison': comparison,
                    'linkedFilter':  {
                        "property": "codes.codeType",
                        "comparison": "EQ",
                        "value": filter.data.configuration.field.codeType,
                        "type": "ENUM"
                    }

                }
            }
        }
        else {
            return {
                'property': name,
                'value': value,
                'type': dataType,
                'comparison': comparison
            }
        }
    }
});