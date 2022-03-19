Ext.define('Dashboard.view.shared.filtering.AlertNameFilter', {
    extend: 'Dashboard.view.shared.component.AutocompleteComboBox',
    xtype: 'filter.AlertNameFilter',
    type: 'filter',

    requires: ['Dashboard.store.settings.AlertsConfig'],

    config: {
        filterModel: null
    },

    maxWidth: 600,
    width: 400,
    labelWidthAuto: true,
    border: false,
    name: null,

    fieldLabel: getText('Alert'),
    displayField: 'name',
    valueField: 'name',

    store: Ext.create('Dashboard.store.settings.AlertsConfig', {
        autoLoad: false,
        sorters: [
            {
                property: 'name',
                direction: 'ASC'
            }
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
