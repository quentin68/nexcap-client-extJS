Ext.define('Dashboard.view.shared.filtering.ComboBoxFilter',{
    extend: 'Ux.ComboBox',
    xtype : 'filter.comboBoxFilter',
    type: 'filter',
    
    config:{
        filterModel:null
    },
   
    fieldLabel: null,
    name: null,
    displayField: 'show',
    valueField: 'show',
    queryMode: 'local',
    filterPickList: true,
    width: 300,

    store: null,
            
    initComponent: function() {        
        var filterData = this.getFilterModel().data;
        this.fieldLabel = filterData.label;
        this.labelSeparator = getText(':');
        this.name = filterData.name;
        
//        if (filterData.comparison === 'IS_NULL' || filterData.comparison === 'IS_NOT_NULL') {
//            console.log(filterData);
//        }
        
        if(filterData.configuration && filterData.configuration.width){
            this.width = parseInt(filterData.configuration.width);
        }
        
        if(filterData.configuration.field){

            var itemsData = [];
            var itemValues = filterData.configuration.field.itemValues;

            for(var i = 0; i < itemValues.length; i++){
                if(itemValues[i]){
                    var item = {id: i, show: itemValues[i]};
                    itemsData.push(item);
                }
            }

            this.store = Ext.create('Ext.data.Store', {
                autoLoad: false,
                fields: ['id','show'],
                data: itemsData
             });
         }

        this.callParent();
    },
            
    getFilter: function(){

        var value = this.getRawValue();
        
        if (!value){
            return;
        }
        
        var filterData = this.getFilterModel().data;
        var filter = this.buildFilter(filterData.name, value, filterData.comparison);

        return filter;
    },
            
    buildFilter: function(name, value, comparison){
        if(!comparison){
            comparison = 'CONTAINS';
        }

        value = value.trim();
        
        return {
            'property': name,
            'value': value,
            'type': 'STRING',
            'comparison': comparison
        }
    }

});