Ext.define('Dashboard.view.shared.filtering.AlertLevelFilter', {
    extend: 'Ux.ComboBox',
    xtype: 'filter.AlertLevelFilter',
    type: 'filter',

    requires: [],

    config: {
        filterModel: null
    },

    typeAhead: false,
    maxWidth: 600,
    width: 150,
    labelWidthAuto: true,
    border: false,
    name: null,
    queryMode: 'local',
    enableKeyEvents: true,
    fieldLabel: getText('Alert level'),
    displayField: 'label',

    store: Ext.create('Ext.data.Store', {
        fields: ['label'],
        data: [
            {'label': getText('Low')},
            {'label': getText('Medium')},
            {'label': getText('High')}
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

        // switch (value) {
        //     case getText('Low'):
        //     case 'Low':
        //         value = 0;
        //         break;
        //     case getText('Medium'):
        //     case 'Medium':
        //         value = 1;
        //         break;
        //     case getText('High'):
        //     case 'High':
        //         value = 2;
        //         break;
        //     default:
        //         return;
        //         break;
        // }

        var filterData = this.getFilterModel().data;
        var filter = this.buildFilter(filterData.name, value, filterData.comparison);

        return filter;
    },
    
    setFilterValue: function (valueLevel) {
        var value = null;
        switch (valueLevel) {
            case 0:
                value = getText('Low');
                break;
            case 1:
                value = getText('Medium');
                break;
            case 2:
                value = getText('High');
                break;
            default:
                return;
                break;
        }
        this.setValue(value);
    },

    buildFilter: function (name, value, comparison) {
        if (!comparison) {
            comparison = 'EQ';
        }

        return {
            'property': name,
            'value': value,
//            'type': 'INT',
            'comparison': comparison
        };
    }
});
