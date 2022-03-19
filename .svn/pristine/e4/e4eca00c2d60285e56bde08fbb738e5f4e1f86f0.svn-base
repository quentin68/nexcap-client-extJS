/* global Ext, moment, eval */

Ext.define('Dashboard.view.shared.filtering.FiltersBar', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.filtersBar',
    
    requires:[
        'Dashboard.view.shared.filtering.ComboBoxFilter',
        'Dashboard.view.shared.filtering.InterventionOrdersFilter',
        'Dashboard.view.shared.filtering.ReferencesCodeFilter',
        'Dashboard.view.shared.filtering.ReferencesDesignationFilter',
        'Dashboard.view.shared.filtering.ReferencesDescriptionFilter',
        'Dashboard.view.shared.filtering.CategoriesFilter',
        'Dashboard.view.shared.filtering.CheckBoxFilter',
        'Dashboard.view.shared.filtering.DateFilter',
        'Dashboard.view.shared.filtering.DateTimeFilter',
        'Dashboard.view.shared.filtering.DatesRangeFilter',
        'Dashboard.view.shared.filtering.ComboItemRefCatFilter',
        'Dashboard.view.shared.filtering.TextFilter',
        'Dashboard.view.shared.filtering.TextAreaFilter',
        'Dashboard.view.shared.filtering.IntegerFilter',
        'Dashboard.view.shared.filtering.AddressFilter',
        'Dashboard.view.shared.filtering.LongFilter',
        'Dashboard.view.shared.filtering.UsersFilter',
        'Dashboard.view.shared.filtering.ProfilesFilter',
        'Dashboard.view.shared.filtering.NumberFilter',
        'Dashboard.view.shared.filtering.BadgeNumberFilter',
        'Dashboard.view.shared.filtering.ValueIsFilled',
        'Dashboard.view.shared.filtering.AlertLevelFilter',
        'Dashboard.view.shared.filtering.AlertNameFilter',
        'Dashboard.view.shared.filtering.PropertyConfigurationTypeFilter',
        'Dashboard.view.shared.filtering.PropertyTypeFilter',
        'Dashboard.view.shared.filtering.ReferencesIdentifiedFilter',
        'Dashboard.view.shared.filtering.EnumFilter',
        'Dashboard.view.shared.filtering.DatesTimeRangeFilter',
        'Dashboard.view.shared.filtering.CodeFilter',
        'Dashboard.view.shared.filtering.CategoriesFullPathFilter',
        'Dashboard.view.shared.filtering.DeviceTypeFilter'
    ],

    controller: 'filtersBar',
    
    store:null,
    modelProperties: null,
    filtersList: [],
    
    name: 'filtersBar',
    border: false,
    bodyPadding: 6,
    frame: false,
    layout: 'vbox',
    minHeight : 150,
    animate: false,
    collapsed: true,
    titleCollapse: true,
    collapsible: true,
    maxHeight: 400,
    scrollable:'y',
    closeAction : 'destroy',
    //keyMapEnabled: true,
    
    defaults:{
        xtype: 'panel',
        border: false,
        width: '100%',
        bodyPadding: 6
    },
    
    fieldDefaults: {
        labelWidth: 100,
        labelSeparator: getText(':'),
        margin: '0 16 16 16',
        maxWidth: 500
    },
    
    listeners: {
        
        afterrender: function (me, eOpts) {
            var main = this.up('panel');
            
            me.keyMap = Ext.create('Ext.util.KeyMap', {
                scope: me,
                target: me.getEl(),
                binding: [
                    {
                        key: 13,//Ext.event.Event.ENTER,
                        fn: function(){ me.onEnterKey(); }
                    }, {
                        key: 27,//Ext.event.Event.Esc,
                        fn: me.onEscKey
                    }
                ]
            });
                        
            try{
                if (main.store.getProxy().extraParams.filter) {
                    var filtersList = main.store.getProxy().extraParams.filter;
                    if (filtersList.length > 0) {
                        this.setFiltersValues(filtersList);
                    }
                } else {
                    main.store.getProxy().extraParams.filter = [];
                }
            }catch(ex){
                Dashboard.tool.Utilities.error('[filterBar.afterrender] error : ' + ex);
            }
        }
    },
    
//    listeners: {
//        render: function (win) {
//            var map = new Ext.KeyMap(win.getEl(), {
//                key: Ext.EventObject.ENTER,
//                fn: function () {
//                    Ext.Msg.alert('KeyMap', 'You pressed ENTER');
//                },
//                scope: win
//            });
//        }
//    },
    
//    listeners:{
//        scope: this,
//        afterRender: function(){
//    //        this.callParent(arguments); // always!!
//            this.bindKeyMap();
//        }
//    },

    initComponent: function() {
        
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var userSettings = currentUser.getUserSettings();
        
        this.title = getText('filters');
                
        if(userSettings.personalFilters === true){
            this.title = getText('My personal filters');
        }
        
        var filtersPanel = {
            reference: 'filtersPanel',
            layout: 'column'
        };
        
        var enterButton = Ext.create('Ext.button.Button', {
            width: 80,
            margin: '0 8 0 0',
            text: getText('Filter'),
            listeners: {
                scope: this,
                "click" : function (ctrl, evt) {
                    this.updateDataStore();
                }
            }
        });
        
        var buttonsPanel = {
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            defaults:{
                xtype: 'button',
                width: 80,
                margin: '0 8 0 0'
            },
            items: [
                {
                    text: getText('Reset'),
                    listeners: {
                        scope: this,
                        "click" : function (ctrl, evt) {
                            this.resetForm();
                            this.updateDataStore();
                        }
                    }
                },
                enterButton
            ]
        };
        
        
        
//        var map = new Ext.util.KeyMap({
//            target: enterButton.getEl(),
////            enter: {
////                        handler: function() {
////                            Ext.Msg.alert('key pressed', 'you have pressed enter');
////                        }
////                    },
////                    esc: {
////                        handler: function() {
////                            Ext.Msg.alert('keypress', 'you have pressed escape');
////                        }
////                    },
//            binding: [{
//                key: 13,
//                fn: function() {
//                    alert('button');
//                }
//            }]
//        });
        

        var me = this;
        Ext.apply( me, {
            
//            keyMap: {
//                    enter: {
//                        handler: function() {
//                            Ext.Msg.alert('key pressed', 'you have pressed enter');
//                        }
//                    },
//                    esc: {
//                        handler: function() {
//                            Ext.Msg.alert('keypress', 'you have pressed escape');
//                        }
//                    }
//                },

            
            items: [
                filtersPanel,
                buttonsPanel
            ],
            
            dockedItems: [                
                {
                    xtype: 'toolbar',
                    flag: 'editionMode',
                    defaults:{
                        xtype: 'button',
                        scale: 'small',
                        ui: 'view-list',
                        border: false
                    },
                    items: [
                        '->',
                        {
                            iconCls: 'fa fa-wrench',
                            enableToggle: false,
                            handler: 'onConfigFilters'
                        }
                    ]
                }
            ]   

        } );
        
        this.callParent(arguments);
        
        if(Dashboard.manager.FeaturesManager.isEnabled('EXTERNAL_CONFIGURATION_ADMIN') === false){
            this.down('toolbar').hidden = true;
        }
        
        if(userSettings.personalFilters === true){
            this.down('toolbar').hidden = false;
        }
        
        this.configFilters(this.filtersList);
    },
    
    
    
    onEnterKey: function(){
        var panel = Ext.ComponentQuery.query('filtersBar')[0];
        panel.updateDataStore();
    },
    
    onEscKey: function(){
        var panel = Ext.ComponentQuery.query('filtersBar')[0];
        panel.resetForm();
        panel.updateDataStore();
    },
    
    
    /**
     * Build filter and add them to filterBar
     * @param {type} filtersList
     * @returns {undefined}
     */
    configFilters: function(filtersList){
                
        filtersList = this.cleanFilters(filtersList);
                        
        Ext.each(filtersList, function(filter){
            var newFilter = this.buildFilter(filter);
            this.down('panel[reference=filtersPanel]').add(newFilter);
        }, this);
        
    },
    
    
    /**
     * Build filters and add them to filterBar
     * @param {type} filtersList
     * @returns {undefined}
     */
    addFilters: function(filtersList){
                                
        Ext.each(filtersList, function(filter){
            var newFilter = this.buildFilter(filter);
            this.down('panel[reference=filtersPanel]').add(newFilter);
        }, this);
    },
    
    setFiltersValues: function (values) {
       
        var filtersPanel = this.down('panel[reference=filtersPanel]');
        if (!filtersPanel) {
            return;
        }
        
        var filterCounter = 0;
        var filterFields = filtersPanel.query(); 

        for (var i = 0; i < filterFields.length; i++) {
            //try {
                var filter = filterFields[i];
                if (!filter.filterModel) {
                    throw 'Filter model is NULL';
                }
                var filterConfig = filter.filterModel.data;

                // Combo Item Ref Cat Filter
                if (filter.id.startsWith('filter-comboItemRefCatFilter-')) {
                    //debugger;
                    values.forEach(function (value) {
                        if (value.property === 'name' && value.comparison === 'CONTAINS') {
                            filter.setFilterValue(value.value);
                        }
                        if (value.property === 'productReference.productCategory.name' && value.comparison === 'CONTAINS') {
                            filter.setCategoryFilterValue(value.value);
                        }
                        if (value.property === 'productReference.referenceCode' && value.comparison === 'CONTAINS') {
                            filter.setReferenceCodeFilterValue(value.value);
                        }
                        if (value.property === 'productReference.designation' && value.comparison === 'CONTAINS') {
                            filter.setReferenceDesignationFilterValue(value.value);
                        }

                    });
                    i += 4;
                    filterCounter++;
                    continue;
                }
                
                // Dates Range                 
                if (filterConfig.type === 'DATES_RANGE' && filter.id.startsWith('filter-datesRangeFilter-')) {
                    values.forEach(function (value) {
                        if (value.property === 'startDate' && value.comparison === 'GT') {
                            if (moment(value.value).isValid()) {
                                var dateValue = moment(value.value).toDate(); // IE is crap
                                filter.setValueStart(dateValue);
                                filterCounter++;
                            }
                        }
                        if (value.property === 'startDate' && value.comparison === 'LT') { // @todo check prop error
                            if (moment(value.value).isValid()) {
                                var dateValue = moment(value.value).toDate(); // IE is crap
                                dateValue.setDate(dateValue.getDate() - 1);
                                filter.setValueEnd(dateValue);
                                filterCounter++;
                            }
                        }
                    });
                    i = i + 3;
                    continue;
                }
                
                values.forEach(function (value) {
                    var propName = value.property;
                    
                    // dynamic properties
                    propName = propName.replace('materialPropertyValues.', '');

                    if ((filterConfig.name === propName) && (filterConfig.comparison === value.comparison)) {
                        try {
                            
                            filterCounter++;
                            
                            if(value.comparison === 'IS_NOT_NULL' || value.comparison === 'IS_NULL'){
                                filter.setValue(value.value);
                                
                            }else if (filterConfig.type === 'DATE') {
                                if (moment(value.value).isValid()) {
                                    var dateValue = moment(value.value).toDate(); // IE is crap
                                    filter.setValue(dateValue);
                                }
                                
                            } else if (filterConfig.type === 'DATETIME') {
                                if (moment(value.value).isValid()) {
                                    var dateValue = moment(value.value).toDate(); // IE is crap
                                    filter.setFilterValue(dateValue);
                                }
                                
                            } else if(filterConfig.type === 'ALERT_LEVEL'){
                                    filter.setFilterValue(value.value);
                            }else {
                                filter.setValue(value.value);
                            }
                        } catch (ex) {
                            Dashboard.tool.Utilities.error('[Dashboard.view.shared.filtering.setFiltersValues] | Cant set filter data : ' + ex);
                        }
                    }
                });
//            } catch (ex) {
//                Dashboard.tool.Utilities.error('[Dashboard.view.shared.filtering.setFiltersValues] | Filter model not found [' + filter.name + '] : ' + ex);
//            }
        }

        if(values.length > 0){
            var extra= false;
            for (i=0; i< values.length; i++) {
                if (values[i].property === "operationType") {
                    extra = true;
                }
            }
            if (extra) {
                values.length = values.length-1
            }
            this.setTitle(getText('filters') + ' (' + values.length + ')');
        }
        
//        if (filterCounter > 0) {
//            this.setTitle(getText('filters') + ' (' + filterCounter + ')');
//        }
    },
        
    
    cleanFilters: function(filtersList){
                  
        var deletedProperties = this.findDeletedProperties(filtersList);

        Ext.each(deletedProperties, function(deletedProperty){
            for(var i=0; i<filtersList.length; i++){
                if(filtersList[i].data.name === deletedProperty.data.name){
                    filtersList.splice(i, 1);
                }
            }
        });

        return filtersList;
    },
    
    
    findDeletedProperties: function(filtersList){
        
        var deletedProperties = [];

        var dynamicProperties = Dashboard.manager.system.DynamicPropertiesManager.store;
        
        Ext.each(filtersList, function(filter){
            
            // Test if dynamic
            var found = Ext.Array.findBy(this.modelProperties, function (item){
                if(item.name === filter.data.name){
                    return true;
                }else{
                    return false;
                }
            });
            
            //If property not dynamic, return
            if(found){
                return true; //continue
            }
                        
            if(dynamicProperties.findRecord('name', filter.data.name, 0, false, true) === null){
                Dashboard.tool.Utilities.info('[ViewList.findDeletedProperties] deleted property : ' + filter.data.name);
                deletedProperties.push(filter);
            }
            
        }, this);
        
        return deletedProperties;
        
    },
    
    
    buildFilter: function(filter){
        
        if(Ext.typeOf(filter)=== 'object'){
            return this.getDynamicFilter(filter);
        } // else ???  @todo
    },
            
            
    getDynamicFilter: function(filter){
                
        var filterType = filter.data.type;
                        
        if(filter.data.comparison === 'IS_NULL' ||  filter.data.comparison === 'IS_NOT_NULL'){
            filterType = 'VALUE_IS_FILLED';
            //filter.data.configuration.field.fieldType = 'valueisfilled';
        }
        
        var className = eval('Dashboard.store.FilterTypes.' + filterType).className;
        
        var filterField = Ext.create('Dashboard.view.shared.filtering.'+ className,{
            filterModel: filter
        });
        
        // Add tooltip to filter label
        filterField.setListeners({
            render: function (cts) {
                try {
                    if (className === 'DatesRangeFilter' && cts.items.items['0'].name === 'labelDateRange') {
                        // Date range
                        var labelId = cts.items.items['0'].id;
                        var propertyName = getText('Range');
                        
                    } else if (className === 'DateTimeFilter') {
                        // Date time
                        var labelId = cts.items.items['0'].id;
                        var operator = cts.filterModel.data.comparison;
                        var propertyName = Dashboard.store.FilterTypes.FILTER_COMPARISON[operator];
                        
                    } else if(className === 'ComboItemRefCatFilter'){
                        var labels = [];
                        cts.items.items.forEach(function (field) {
                            labels.push(field.id);
                        });
                        var operator = 'CONTAINS';
                        var propertyName = Dashboard.store.FilterTypes.FILTER_COMPARISON[operator];
                        
                    }else{
                        // Other
                        var labelId = cts.labelEl.id;
                        var operator = cts.filterModel.data.comparison;
                        var propertyName = Dashboard.store.FilterTypes.FILTER_COMPARISON[operator];
                    }
                    
                    try{
                        var operatorName = cts.filterModel.data.configuration.field.label;
                    }catch(ex){
                        throw 'Filter configuration is probably from a version < 2.2.0, please update external_configuration `| error: ' + ex;
                    }
                    
                    if (labels) {
                        labels.forEach(function (labelId) {
                            Ext.create('Ext.tip.ToolTip', {
                                target: labelId,
                                html: operatorName + getText(':') + ' ' + getText(propertyName)
                            });
                        });
                        
                    } else {
                        Ext.create('Ext.tip.ToolTip', {
                            target: labelId,
                            html: operatorName + getText(':') + ' ' + getText(propertyName)
                        });
                    }
                } catch (ex) {
                    Dashboard.tool.Utilities.error('[Dashboard.view.shared.filtering.getDynamicFilter] Tooltip error :' + ex);
                }
            }
        });
        
        return filterField;

    },
            
    
    /**
     * Load filtered data from server, refresh grid and display page 1.
     */
    updateDataStore: function(){
        
        var store = this.store;
        var filters = this.getFilters();
        
        if(!filters){
            filters = [];
        }
        
        if(filters.length > 0){
            this.setTitle(getText('filters') + ' (' + filters.length + ')');
            store.getProxy().extraParams.filter = filters;
            
        }else{
            this.setTitle(getText('filters'));
            store.getProxy().extraParams.filter = [];
        }
        
        // Refresh grid and display page 1
        store.loadPage(1, {           
            callback: function(records, operation, success) {
                // do something after the load finishes
            },
            scope: this
        });        
    },
    
    
    getInvalidFields: function (){

        var invalidFields = [];
        Ext.suspendLayouts();

        this.getForm().getFields().filterBy(function (field){
            if (field.validate())
                return;
            invalidFields.push(field);
        });

        Ext.resumeLayouts(true);
        var messages = [];

        for (var i = 0; i < invalidFields.length; i++) {
            messages.push(invalidFields[i].fieldLabel + " > " + invalidFields[i].activeErrors[0]);
        }

        Ext.Msg.show({
            title: getText('Errors'),
            message: messages.join('<br>'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });

        return invalidFields;
    },
   
    
    /**
     * get date filters
     * @return json filters
     */
    getFilters: function(){
        
        if (!this.isValid()) {
            this.getInvalidFields();
            return;
        }
                        
        var filters = [];
        
        filters = this.getSingleFieldFilters(filters);
        filters = this.getMultipleFieldsFilters(filters);
                
        return filters;
    },
    
    
    getSingleFieldFilters: function(filters){
        
        var fieldsList = this.query('field[type=filter]');
        
        for(var i=0; i<fieldsList.length; i++) {
            
            var filter = fieldsList[i].getFilter();
                        
            if(filter){
            
                if(fieldsList[i].filterModel.data.isDynamicProperty){

                    switch (fieldsList[i].filterModel.data.configuration.propertyConfigurationType) {
                        case 'PRODUCT_REFERENCE':
                        case 'PRODUCTREFERENCE':
                            filter.property = 'productReferencePropertyValues.' + filter.property;
                            break;

                        case 'MATERIAL':
                            filter.property = 'materialPropertyValues.' + filter.property;
                            break;

                        case 'USER':
                            filter.property = 'userPropertyValues.' + filter.property;
                            break;

                        case 'LOCATION':
                             filter.property = 'locationPropertyValues.' + filter.property;
                             break;

                        default:
                           // Should never happen // Il ne faut jamais dire jamais ! On ne sait jamais !!
                            Dashboard.tool.Utilities.error('[FilterBar.getFilters] unsuported propertyConfigurationType : ' + 
                                    fieldsList[i].filterModel.data.configuration.propertyConfigurationType);
                            break;
                    }
                }
                
                if(filter.linkedFilter){
                    var linkedFilter = filter.linkedFilter;
                    delete filter.linkedFilter;
                    filters.push(linkedFilter);
                }
                
                filters.push(filter);
            }
        }
        
        return filters;
    },
    
    
    getMultipleFieldsFilters: function(filters){
        
        var container = this.query('container[type=filter]');
        
        for(var i=0; i<container.length; i++) {
            
            var specificFilter = container[i].getFilter();
            
            if(!specificFilter){
                continue;
            }
            
            var filtersArray = [];
            if(Ext.typeOf(specificFilter) === 'array'){
                filtersArray = specificFilter;
            }else{
                filtersArray.push(specificFilter);
            }
            
            Ext.each(filtersArray, function(filter){
                
                if(container[i].filterModel.data.isDynamicProperty){
                    switch (container[i].filterModel.data.configuration.propertyConfigurationType) {
                        case 'PRODUCTREFERENCE':
                            filter.property = 'productReferencePropertyValues.' + filter.property;
                            break;

                        case 'MATERIAL':
                            filter.property = 'materialPropertyValues.' + filter.property;
                            break;

                        case 'USER':
                            filter.property = 'userPropertyValues.' + filter.property;
                            break;

                        case 'LOCATION':
                            filter.property = 'locationPropertyValues.' + filter.property;
                            break;

                        default:
                            // Should never happen   //  Il ne faut jamais dire jamais ! On ne sait jamais !!
                            Dashboard.tool.Utilities.error('[FilterBar.getFilters] unsuported propertyConfigurationType : ' +
                                    container[i].filterModel.data.configuration.propertyConfigurationType);
                            break;
                    }
                }

                filters.push(filter);
                
            }, this);
        }
        
        return filters;
    },

    
    /**
     * Clean filters
     */
    resetForm: function(){
        
        this.getForm().reset();
        
        var start = Ext.ComponentQuery.query('datefield[name="dateStart"]')[0];
        if(start){
            start.setMaxValue(new Date());
        }
        
        var end = Ext.ComponentQuery.query('datefield[name="dateEnd"]')[0];
        if(end){
            end.setMaxValue(new Date());
            end.setMinValue(null);
        }
    },
    
    
    setFilters: function(filters){
                
        if(!filters){
            Dashboard.tool.Utilities.error('[FilterBar.setFilters] error filters list null or empty');
            return;
        }

        this.filtersList = filters;
        this.down('panel[reference=filtersPanel]').removeAll();
        this.addFilters(this.filtersList);
    }
    
    
});