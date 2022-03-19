Ext.define('Dashboard.view.shared.filtering.PropertyConfigurationTypeFilter', {
    extend: 'Ux.ComboBox',
    xtype: 'filter.propertyConfigurationTypeFilter',
    type: 'filter',

    requires: [],

    config: {
        filterModel: null
    },

    maxWidth: 600,
    width: 400,
    labelWidthAuto: true,
    border: false,
    name: null,
    ueryMode: 'local',
    enableKeyEvents: true,

    fieldLabel: getText('Linked object'),
    displayField: 'name',
    valueField: 'name',

    store: Ext.create('Ext.data.Store', {
        fields: ['name', 'label'],
        data: [
            {'name': 'MATERIAL', 'label': getText('Items property')},
            {'name': 'PRODUCTREFERENCE', 'label': getText('References property')},
            {'name': 'USER', 'label': getText('User property')},
            {'name': 'LOCATION', 'label': getText('Location property')}
        ]
    }),

    initComponent: function () {
        var filterData = this.getFilterModel().data;

        this.fieldLabel = filterData.label;
        this.name = filterData.name;

        if (filterData.configuration && filterData.configuration.width) {
            this.width = parseInt(filterData.configuration.width);
        }

        this.callParent();
    },

    getFilter: function () {

        var value = this.getRawValue();

        if (!value) {
            return;
        }

        var filterData = this.getFilterModel().data;
        var filter = this.buildFilter(filterData.name, value, filterData.comparison);

        return filter;
    },

    buildFilter: function (name, value, comparison) {
        if (!comparison) {
            comparison = 'EQ';
        }

        return {
            'property': name,
            'value': value,
            'type': 'ENUM',
            'comparison': comparison
        };
    }

});