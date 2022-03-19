Ext.define('Dashboard.view.shared.filtering.TextFilter',{
    extend: 'Ux.TextField',//'Ext.form.field.Text',
    xtype : 'filter.textFilter',
    type: 'filter',
    
    config:{
        
        filterModel:null

    },
   
    fieldLabel: null,
    name: null,
    maxLength: 255,
    placeHolder: getText('Empty'),
    width: 250,
            
    initComponent: function() {
        
        var filterData = this.getFilterModel().data;
        this.fieldLabel = filterData.label;
        this.name = filterData.name;
        
        if(filterData.configuration && filterData.configuration.width){
            this.width = parseInt(filterData.configuration.width);
        }
    
        this.callParent();
    },
    
    setFieldValue: function (val){
        this.setValue(val);
    },
            
    getFilter: function(){

        var value = this.getValue();
        
        if (!value){
            return;
        }
        
        value = value.trim();
        
        var filterData = this.getFilterModel().data;
        
        var filter = this.buildFilter(filterData.name, value, filterData.comparison);

        return filter;
    },
            
    buildFilter: function(name, value, comparison){
        if(!comparison){
            comparison = 'CONTAINS';
        }
        return {
            'property': name,
            'value': value,
            'type': 'STRING',
            'comparison': comparison
        };
    }//,
    

//    getFormComponent: function(){
//
//        return {
//            xtype: 'panel',
//            tag: 'field',
//            referenceHolder: true,
//            width: '100%',
//            layout: 'anchor',
//
//            defaults: {
//                submitValue: false,
//                allowBlank: true,
//                listeners: {
//                    change:'onFormChange'
//                }
//            },
//            items: [
//                {
//                    xtype: 'textfield',
//                    fieldLabel: getText('Label'),
//                    reference: 'fieldLabel',
//                    name: 'fieldLabel',
//                    allowBlank: false,
//                    anchor: '100%'
//                },
//                {
//                    xtype: 'numberfield',
//                    fieldLabel: getText('Width'),
//                    reference: 'width',
//                    name: 'width',
//                    allowDecimals: false,
//                    value: 200,
//                    maxValue: 600,
//                    minValue: 90
//                }
//            ]
//        };
//    }


});