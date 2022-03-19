Ext.define('Dashboard.view.shared.filtering.BadgeNumberFilter',{
    extend: 'Dashboard.view.shared.component.AutocompleteComboBox',//'Ux.ComboBox',
    xtype : 'filter.badgeNumberFilter',
    type: 'filter',

    config:{
        filterModel:null
    },
    
    maxWidth: 600,
    width: 400,
    labelWidthAuto: true,
    border: false,
    name: null,
    fieldLabel: getText('Badge number'),
    displayField: 'badgeNumber',
    valueField: 'badgeNumber',
    //filter: [{property: 'name', comparison: 'contains', type: 'string', value: ''}],
    requires : ['Dashboard.store.Users'],
    store: Ext.create('Dashboard.store.Users', {
        autoLoad: false,
        sorters: [ {
            property: 'badgeNumber',
            direction: 'ASC'
        } ],
        listeners:{
            beforeload: function(me){
                me.getProxy().extraParams.filter = [{
                    'property': 'badgeNumber',
                    'value': '',
                    'type': 'STRING',
                    'comparison': 'NE'
                }];
            },
            load: function(me){
                me.getProxy().extraParams.filter = [];
            }
        }
    }),
         
   
    initComponent: function() {
        
        var filterData = this.getFilterModel().data;
        this.fieldLabel = filterData.label;
        this.name = filterData.name;
        
        if(filterData.configuration && filterData.configuration.width){
            this.width = parseInt(filterData.configuration.width);
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
        return {
            'property': name,
            'value': value,
            'type': 'STRING',
            'comparison': comparison
        };
    }

});