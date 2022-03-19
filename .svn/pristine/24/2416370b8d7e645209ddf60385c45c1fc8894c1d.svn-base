Ext.define('Dashboard.view.shared.filtering.CheckBoxFilter',{
    extend: 'Ux.CheckBox',
    xtype : 'filter.checkBoxFilter',
    type: 'filter',
    
    config:{
        filterModel:null
    },
   
    fieldLabel: null,
    name: null,
    checked: false,
            
    initComponent: function() {
        
        var filterData = this.getFilterModel().data;
        this.fieldLabel = filterData.label;
        this.name = filterData.name;
        /**
         * 0007360
        if(filterData.configuration.field){
            this.checked = filterData.configuration.field.checked;
        }
         */        
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
        return {
            'property': name,
            'value': value,
            'type': 'BOOLEAN',
            'comparison': comparison
        };
    }//,
    
//    statics:{
//        
//        getFormComponent: function(){
//            
//            return {
//                xtype: 'panel',
//                tag: 'field',
//                referenceHolder: true,
//                width: '100%',
//                layout: 'anchor',
//                
//                defaults: {
//                    submitValue: false,
//                    allowBlank: true,
//                    listeners: {
//                        change:'onFormChange'
//                    }
//                },
//                items: [
//                    {
//                        xtype: 'textfield',
//                        fieldLabel: getText('Label'),
//                        reference: 'fieldLabel',
//                        name: 'fieldLabel',
//                        allowBlank: false,
//                        anchor: '100%'
//                    },
//                    {
//                        xtype: 'checkbox',
//                        fieldLabel: getText('Checked'),
//                        reference: 'checked',
//                        name: 'checked',
//                        checked: false
//                    }
//                ]
//            };
//            
//        }
//        
//    }

});