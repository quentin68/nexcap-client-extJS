/*  global Ext */

Ext.define('Dashboard.view.shared.filtering.DateFilter', {
    extend: 'Ux.DateField',
    xtype: 'filter.dateFilter',
    type: 'filter',

    config: {
        filterModel: null
    },

    fieldLabel: null,
    name: null,
    format: getText('m/d/Y'),

    initComponent: function () {
        try {
            if (this.getFilterModel().data.name === 'executionDate' || this.getFilterModel().data.configuration.field.limitToCurrentDate) {
                this.maxValue = new Date();
            }
            this.fieldLabel = this.getFilterModel().data.label;
            this.name = this.getFilterModel().data.name;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[Dashboard.view.shared.filtering.DateFilter.initComponent] Failed setting config ERR: ' + ex);
        }
        this.callParent();
    },

    getFilter: function () {

        if (!this.getValue()) {
            return;
        }

        var filterData = this.getFilterModel().data;

        var value = new Date(this.getValue());
        var convertedValue = Ext.Date.format(value, 'c');
        var filter = this.buildFilter(filterData.name, convertedValue, filterData.comparison);

        return filter;
    },

    buildFilter: function (name, value, comparison) {
        if (!comparison) {
            comparison = 'EQ';
        }

        return {
            'property': name,
            'value': value,
            'type': 'DATE',
            'comparison': comparison
        };
    }

});