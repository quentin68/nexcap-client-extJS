Ext.define('Dashboard.view.shared.filtering.ReferencesIdentifiedFilter', {
    extend: 'Ux.ComboBox',
    xtype: 'filter.ReferencesIdentified',
    type: 'filter',

    requires: [],

    config: {
        filterModel: null
    },

    typeAhead: false,
    maxWidth: 300,
    width: 150,
    labelWidthAuto: true,
    border: false,
    name: null,
    queryMode: 'local',
    enableKeyEvents: true,
    fieldLabel: getText('Type'),
    displayField: 'label',
    valueField: 'name',

    store: null,

    initComponent: function () {
        
        this.store = Ext.create('Ext.data.Store', {
            fields: ['label'],
            data: [
                {'name': 'identified', 'label': getText('Item')},
                {'name': 'unidentified', 'label': getText('Materials set')}
            ]
        });
        
        var filterData = this.getFilterModel().data;

        this.fieldLabel = filterData.label;
        this.name = filterData.name;

        if (filterData.configuration && filterData.configuration.width) {
            this.width = parseInt(filterData.configuration.width);
        }

        this.callParent();
    },

    getFilter: function () {
        var value = this.getValue();

        if (!value) {
            return;
        }

        if(value === 'identified'){
            value = true;
        }else{
            value = false;
        }

        var filterData = this.getFilterModel().data;
        var filter = this.buildFilter(filterData.name, value, filterData.comparison);

        return filter;
    },
    
    setFilterValue: function (valueLevel) {
        var value = null;
        switch (valueLevel) {
            case true:
                value = getText('Item');
                break;
            case false:
                value = getText('Materials set');
                break;
            default:
                // 
                break;
        }
        this.setValue(value);
    },

    buildFilter: function (name, value, comparison) {
        
        if(!comparison){
            comparison = 'EQ';
        }
        
        return {
            'property': name,
            'value': value,
            'type': 'BOOLEAN',
            'comparison': comparison
        };
    }
});
