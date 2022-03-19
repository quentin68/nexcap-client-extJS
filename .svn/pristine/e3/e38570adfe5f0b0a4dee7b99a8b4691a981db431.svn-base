/* global Ext */

Ext.define('Dashboard.view.indicator.StackedBarGraphEditor', {
    extend: 'Ext.window.Window',
    xtype: 'stackedBarGraphEditor',
    
    requires: [
        'Ux.Img',
        'Ux.Panel',
        'Ux.ComboBox',
        'Ext.picker.Color',
        'Ext.ux.colorpick.Button',
        'Dashboard.model.DataCollection',
        'Dashboard.view.shared.component.AutocompleteComboBox'
    ],
    
    controller:'stackedBarGraphEditor',
    
    layout: 'fit',
    autoShow: false,
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 500,
    
    iconCls: 'fa fa-bar-chart',
    
    serverId: null,
    record: null,

    initComponent: function() {
        
        this.title = getText('Stacked bar graph editor');
        
        this.filtersList = [];
        this.calculByList = [];
        
        this.calculByStore = Ext.create('Ext.data.Store', {
            fields: ['calculByType', 'label', 'type'],
            data: []
        });
        
        this.statisticsReferencesStore = Ext.create('Dashboard.store.StatisticsReferences',{
            autoLoad: false
        });
        
        var periodsStore = Ext.create('Ext.data.Store', {
            fields: ['period', 'label'],
            data: [
               // {period:'LAST_DAY', label:getText('Jour précédent')},
                {period:'NONE', label:getText('Not any', 'feminine')},
                {period:'LAST_WEEK', label:getText('Last week')},
                {period:'LAST_MONTH', label:getText('Last month')},
                {period:'LAST_3_MONTHS', label:getText('last 3 months')},
                {period:'LAST_6_MONTHS', label:getText('last 6 months')},
                {period:'LAST_YEAR', label:getText('Last year')},
                {period:'LAST_3_YEAR', label:getText('Last 3 years')},
                {period:'DATE_TO_DATE', label:getText('Date to date')}
            ]
        });
        
        var address = Ext.create('Dashboard.store.Addresses',{
            autoLoad: false,
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }],
            listeners:{
                load: function(store, records, successful, operation, eOpts){
                    var notAny = Ext.create('Dashboard.store.Addresses',{
                        name: '* ' + getText('Without address') + ' *',
                        id: 0
                    });
                    store.add(notAny);
                }
            }
        });
        
//       /**
//        * Event handler
//        * @param {type} sender
//        * @returns {undefined}
//        */
//        onAddPropertySelector = function(sender){
//            var selector = this.getPropertySelector();
//            this.down('form').down('panel[reference=propertiesSelectors]').add(selector);
//        };
        
        
        var indicatorFieldSet = {
            xtype: 'fieldset',
            title: getText('Indicator'),
            border: '1 0 0 0',
            margin: '0 12 0 0',
            flex:1,
            defaults:{
                labelSeparator: getText(':'),
                anchor: '100%',
                margin: '0 0 12 0'
            },
            items:[
                {
                    xtype: 'textfield',
                    fieldLabel: getText('Indicator title'),
                    name: 'title',
                    reference: 'formTitle',
                    value: getText('My widget'),
                    maxLength: 255
                }, {
                    xtype: 'combo',
                    name: 'size',
                    reference: 'size',
                    fieldLabel: getText('Size'),
                    displayField: 'label',
                    valueField: 'name',
                    editable:false,
                    value: 'L',
                    store: Ext.create('Dashboard.store.IndicatorSizes',{
                        autoLoad: true
                    })
                }, {
                    xtype: 'numberfield',
                    reference: 'height',
                    name: 'height',
                    fieldLabel: getText('Height'),
                    value: 400,
                    maxValue: 2000,
                    minValue: 200
                }
            ]  
        };
        
        var chartFieldSet = {
            xtype: 'fieldset',
            title: getText('Chart'),
            flex:1,
            border: '1 0 0 0',
            margin: '0 0 0 12',
            defaults:{
                labelSeparator: getText(':'),
                anchor: '100%',
                margin: '0 0 12 0'
            },
            items:[
                {
                    xtype: 'textfield',
                    name: 'xTitle',
                    reference: 'xTitle',
                    fieldLabel: getText('X title')
                }, {
                    xtype: 'textfield',
                    name: 'yTitle',
                    reference: 'yTitle',
                    fieldLabel: getText('Y title')
                }, {
                    xtype: 'checkbox',
                    ui: 'lineEditorCheckbox',
                    fieldLabel: getText('Grid'),
                    boxLabel: getText('Enabled'),
                    name: 'grid',
                    reference: 'grid',
                    inputValue: true
                }
            ]
        };
        
        

        var filtersFieldSet = {
            xtype: 'fieldset',
            title: getText('Filters'),
            flex:1,
            border: '1 0 0 0',
            margin: '0 0 0 12',
            defaults:{
                labelSeparator: getText(':'),
                anchor: '100%',
                margin: '0 0 12 0',
                disabled: true
            },
            items:[

                {
                    xtype: 'combo',
                    name: 'period',
                    reference: 'period',
                    fieldLabel: getText('Period'),
                    displayField: 'label',
                    valueField: 'period',
                    editable: false,
                    store: periodsStore,
                    listeners:{
                        select: function( combo, record, eOpts ){
                            
                            var fromDateField = combo.up('form').lookupReference( 'fromDate' );
                            var toDateField = combo.up('form').lookupReference( 'toDate' );
                            
                            if (combo.value === 'DATE_TO_DATE'){
                                fromDateField.setDisabled(false);
                                toDateField.setDisabled(false);
                                
                            }else{
                                fromDateField.setDisabled(true);
                                toDateField.setDisabled(true);
                            }
                        }
                    }
                }, {
                    xtype: 'datefield',
                    reference: 'fromDate',
                    fieldLabel: getText('From'),
                    name: 'from_date',
                    maxValue: new Date()
                }, {
                    xtype: 'datefield',
                    reference: 'toDate',
                    fieldLabel: getText('To'),
                    name: 'to_date',
                    value: new Date(),
                    maxValue: new Date()
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'address',
                    reference: 'address',
                    fieldLabel: getText('Address'),
                    displayField: 'name',
                    valueField: 'name',
                    editable: true,
                    typeAhead: true,
                    forceSelection: true,
                    store: address
                }, {
                    xtype: 'numberfield',
                    name: 'limit',
                    reference: 'limit',
                    fieldLabel: getText('Limit'),
                    //value: 0,
                    minValue: 0
                }, {
                    xtype      : 'fieldcontainer',
                    reference: 'sort',
                    fieldLabel : getText('Sort'),
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel  : getText('Ascendant'),
                            name      : 'sort',
                            reference: 'sortAsc',
                            inputValue: 'asc'
                        }, {
                            boxLabel  : getText('Descendant'),
                            name      : 'sort',
                            reference: 'sortDesc',
                            inputValue: 'desc'
                        }, {
                            boxLabel  : getText('None'),
                            name      : 'sort',
                            reference: 'sortNone',
                            inputValue: 'none',
                            checked: true
                        }
                    ]
                }
            ]
        };
        
        

        var calculByFieldSet = {
            xtype: 'fieldset',
            title: getText('Attribute'),
            flex:1,
            border: '1 0 0 0',
            margin: '0 12 0 0',
            defaults:{
                labelSeparator: getText(':'),
                anchor: '100%',
                margin: '0 0 12 0'
            },
            items:[
                {
                    xtype: 'combo',
                    name: 'calculBy',
                    reference: 'calculBy',
                    fieldLabel: getText('Calcul by'),
                    displayField: 'label',
                    valueField: 'calculByType',
                    editable: false,
                    disabled: false,
                    allowBlank: false,
                    store: this.calculByStore
                }
            ]
        };
        
        
        var statisticsPanel = {
            xtype: 'fieldset',
            title: getText('Statistics'),
            flex:1,
            border: '1 0 0 0',
            items:[          
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        xtype:'displayfield',
                        labelSeparator: getText(':'),
                        submitValue: false,
                        margin: '0 0 0 12',
                        flex: 1
                    },
                    items:[
                        {
                            fieldLabel: getText('Elements'),
                            margin: '0 0 0 44'
                        }, {
                            fieldLabel: getText('Short labels')
                        },
//                        {
//                            fieldLabel: '',
//                            width: 150,
//                            flex: 0
//                        },
                        {
                            xtype: 'button',
                            ui: 'indicator-font-icon-button-plus',
                            width:24,
                            height:24,
                            scale:'small',
                            flex: 0,
                            border: false,
                            enableToggle: false,
                            iconCls: 'fa fa-plus-circle',
                            scope: this,
                            handler: this.onAddPropertySelector
                        }
                    ]
                },{
                    xtype: 'panel',
                    reference: 'propertiesSelectors',
                    items:[
                        this.getPropertySelector("#115fa6"),
                        this.getPropertySelector("#94ae0a"),
                        this.getPropertySelector("#FAC411")
                    ]
                }
            ]

        };


        this.items = [
            
            {
                xtype: 'form',
                referenceHolder: true,
                border:false,
                width: 900,
                height: 650,
                scrollable:'y',
                bodyPadding: '0 20',
                defaults:{
                    cls: 'bargrapheditor-fieldset'
                },
                items:[ 
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        defaults:{
                            cls: 'bargrapheditor-fieldset'
                        },
                        items:[
                            indicatorFieldSet,
                            chartFieldSet
                        ]
                    },
                    statisticsPanel,
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        defaults:{
                            cls: 'line-editor-fieldset'
                        },
                        items:[
                            calculByFieldSet,
                            filtersFieldSet
                        ]
                    }
                ] 
            }
        ];        

        this.buttons = [
            {
                text: getText('save'),
                handler: 'onSaveIndicator'
            }, {
                text: getText('cancel'),
                scope: this,
                handler: this.close
            }
        ];
        
        this.listeners = {
            scope:this,
            render: function(){
                var comboStatisticReference = this.down('combo[name=statisticReference]');
                var name = comboStatisticReference.getValue();
                
                this.statisticsReferencesStore.load({
                    scope: this,
                    callback: function(records, operation, success) {
                        if (success) {
                            var record = operation.initialConfig.internalScope.findRecord('name', name);
                            this.buildCalculByList(record);
                            this.buildFilters(record);
                        }
                    }
                });
            }
        };

        this.callParent(arguments);

    }, 
    
    getPropertySelector: function(color, label, name, correlationId){
        
        var enabled = true;
        var allowBlank = false;

        var selectors = Ext.ComponentQuery.query('panel[name=propertySelector]');
        if(selectors.length <= 0){
            enabled = false;
        }else{
            selectors[0].down('button[name=minusButton]').setDisabled( false );
            allowBlank = true;
        }
        
        if (!color){
            color = '#115fa6';
        }

        var selector = Ext.create('Ext.panel.Panel',{
            layout: 'hbox',
            margin: '0 0 12 0',
            name: 'propertySelector',

            defaults:{
                margin: '0 0 0 12',
                flex:1,
                allowBlank: true
            },

            items:[
                {
                    xtype: 'ux-panel',
                    border:true,
                    width: 32, 
                    height: 32,
                    bodyStyle:{
                        background:color
                    },
                    listeners:{
                        scope:this,
                        click: function(sender, e){
                            this.getController().onColorPicker(sender);
                        }
                    },
                    margin: 0,
                    flex:0
                }, {
                    xtype: 'hiddenfield',
                    name: 'color',
                    value: color
                }, {
                    xtype: 'ux-combo',
                    name: 'statisticReference',
                    displayField: 'shortDescription',
                    valueField: 'name',
                    value: name ? name : '',
                    editable:false,
                    allowBlank: allowBlank,
                    store: this.statisticsReferencesStore,
                    listeners:{
                        scope:this,
                        select:function(combo, record, eOpts){             
                            
                            var label = combo.up('panel').down('ux-textfield[name=label]');
                            var store = combo.getStore();
                            var record = store.findRecord('name', combo.getValue());
                            label.setValue(record.data.shortDescription);
                            
                            this.down('form').lookupReference('period').clearValue();
                            this.down('form').lookupReference('calculBy').clearValue();

                            this.buildCalculByList(record);
                            this.buildFilters(record);
                            
                            if( Ext.Array.contains(record.data.statisticFilters,'DYNAMIC_PROPERTY') 
                                    || Ext.Array.contains(record.data.statisticFilters,'ALERT_CONFIGURATION')
                                    || Ext.Array.contains(record.data.statisticFilters,'SENSOR')){
                                combo.up('panel[name=propertySelector]').down('button[name=statFilters]').setDisabled(false);
                                combo.up('panel[name=propertySelector]').down('button[name=statFilters]').setVisible(true);
                            }else{
                                combo.up('panel[name=propertySelector]').down('button[name=statFilters]').setDisabled(true);
                                combo.up('panel[name=propertySelector]').down('button[name=statFilters]').setVisible(false);
                            }
                                                        
                            combo.up('panel[name=propertySelector]').down('hiddenfield[name=correlationId]').setValue(new Date().getTime());
                        
                        }
                    }
                }, {
                    xtype: 'button',
                    disabled:true,
                    hidden: true,
                    name: 'statFilters',
                    iconCls: 'fa fa-filter',
                    filter: null,
                    flex: 0,
                    width: 32,
                    listeners:{
                        scope: this,
                        click: function(me){
                            this.onShowFiltersSelector(me);
                        },
                        render: function(button){
                            
                            if(this.record){
                                
                                var statisticFilters = null;
                                var statisticReferences = this.record.data.dataBinding.statisticReferences;
                                
                                for(var i=0; i< statisticReferences.length; i++){
                                    if(statisticReferences[i].name === name ){
                                        if(statisticReferences[i].label === label ){
                                        
                                            statisticFilters = statisticReferences[i].statisticFilters;
                                            break;
                                        }
                                    }
                                }
                                
                                if( statisticFilters && statisticFilters.length > 0){
                                    var filter = statisticFilters[0];
                                    button.setDisabled(false);
                                    button.setVisible(true);
                                    button.filter = filter;
                                }
                            }
                        }
                    }
                }, {
                    xtype: 'ux-textfield',
                    name: 'label',
                    value: label ? label : ''
                }, {
                    xtype: 'button',
                    ui: 'indicator-font-icon-button-minus',
                    name: 'minusButton',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    disabled: !enabled,
                    iconCls: 'fa fa-minus-circle',
                    scope: this,
                    handler: this.deleteProperty,
                    flex:0
                }, {
                    xtype: 'hiddenfield',
                    name: 'correlationId',
                    value: correlationId ? correlationId: null
                }
            ]
        });
        return selector;
    },
    
    onShowFiltersSelector: function(button){
                
        var statisticReference = button.up('panel[name=propertySelector]').down('combo[name=statisticReference]').getSelectedRecord();
        
        if(Ext.Array.contains(statisticReference.data.statisticFilters,'DYNAMIC_PROPERTY')){
        
            this.filtersSelector = Ext.create('Dashboard.view.indicator.StatFiltersSelector',{
                statisticReference: statisticReference,
                propertyConfigurationType: 'MATERIAL',
                modelProperties: Dashboard.manager.administration.MaterialManager.getProperties(),
                target: button
            });
            
        }else if(Ext.Array.contains(statisticReference.data.statisticFilters,'ALERT_CONFIGURATION')){
            
            this.filtersSelector = Ext.create('Dashboard.view.indicator.StatAlertControlsSelector',{
                statisticReference: statisticReference,
                target: button
            });
            
        }else if(Ext.Array.contains(statisticReference.data.statisticFilters,'SENSOR')){
            
            this.filtersSelector = Ext.create('Dashboard.view.indicator.StatSensorsSelector',{
                statisticReference: statisticReference,
                target: button
            });
        }
        
        this.filtersSelector.down('button[reference=onAddNewFilter]').on('click', 'onAddFilters', this);
        this.filtersSelector.show();
        
    },
    
    onAddFilters: function(sender){
                        
        var win = sender.up('window');
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var data = win.getData();
        var targetButton = win.target;
        targetButton.filter = data;
        
        if(data.label){
            var selector = targetButton.up('panel[name=propertySelector]');
            selector.down('textfield[name=label]').setValue(data.label);
        }

        win.close();
    },
    
    
    /**
    * Event handler
    * @param {type} sender
    * @returns {undefined}
    */
    onAddPropertySelector: function(sender){
        
        this.addPropertySelector();
    },
    
    
    addPropertySelector: function(color, label, name){
        
        var selector = this.getPropertySelector(color, label, name); 
        this.down('form').down('panel[reference=propertiesSelectors]').add(selector);
            
    },
            
            
    /**
     * Concat all shared 'calculBy' attributes and fill comboBox store.
     * @param {object} record
     */
    buildCalculByList: function(record){
        
        if(!record){
            return;
        }
        
        var statisticsCombos = this.query('combo[name=statisticReference]');
        var calculByCombo = this.down('combo[name=calculBy]');
        //calculByCombo.clearValue();
        
        //init
        this.calculByList = this.getStatisticCalculByTypesList(record); //this.calculByList.concat(this.getStatisticCalculByTypesList(record));//.unique();
        Dashboard.tool.Utilities.debug('[BarGraphEditor.buildCalculByList] init calculByList: '+ Ext.encode(this.calculByList));
        
        for(var i=0; i<statisticsCombos.length; i++){
            
            if(statisticsCombos[i].getValue()){
                Dashboard.tool.Utilities.debug('[BarGraphEditor.buildCalculByList] statisticsCombos[i].getValue(): '+ statisticsCombos[i].getValue());

                var store = statisticsCombos[i].getStore();
                var statistic = store.findRecord('name', statisticsCombos[i].getValue());

                var newList = this.getStatisticCalculByTypesList(statistic);

                Dashboard.tool.Utilities.debug('[BarGraphEditor.buildCalculByList] newList: '+ Ext.encode(newList));

                for(var j=0; j<this.calculByList.length; j++){ 

                    var exists = false;
                    for(var k=0; k<newList.length; k++){
                        if(this.calculByList[j].calculByType === newList[k].calculByType){
                            exists = true;
                        }
                    }
                    
                    if(!exists){
                        Dashboard.tool.Utilities.debug('[BarGraphEditor.buildCalculByList] delete calculBy: ' + this.calculByList[j].calculByType);
                        this.calculByList.splice(j, 1);
                    }
                };
            }
        }
        
        Dashboard.tool.Utilities.info('[BarGraphEditor.buildCalculByList] this.calculByList: '+ Ext.encode(this.calculByList));
        
        var store = Ext.create('Ext.data.Store', {
            fields: ['calculByType', 'label', 'type'],
            data: this.calculByList
        });

        calculByCombo.setStore(store);
        
    },
            
    /**
     * Get calculBy list from statistic element
     * @param {object} statistic
     */    
    getStatisticCalculByTypesList: function(statistic){

        var list = [];

        Ext.each(statistic.data.calculBy, function(type){
            var calculByObject =  {
                calculByType: type.calculByType,
                label: type.label,
                type: type.type
            };
            list.push(calculByObject);
        });
        
        return list;
    },
            
    
    /**
     * Concat all shared filters and, after, display form's filters.
     */
    buildFilters: function(){
                
        //['PERIOD', 'START_DATE', 'END_DATE', 'ADDRESS', 'LOCATION_ID', 'LIMIT', 'SORTED']
        var statisticFiltersList = Dashboard.manager.StatisticManager.getStatisticFiltersList() ;
        var statisticsFields = this.query('combo[name=statisticReference]');
        
        var filtersNamesList = [];
        
        Ext.each(statisticFiltersList, function(filter){
            filtersNamesList.push(filter.name);
        });
        
        //Statistic combobox
        Ext.each(statisticsFields, function(statisticField, index){

            if(statisticField.getValue()){ 
                // field not empty
                var fieldStore = statisticField.getStore();
                var statistic = fieldStore.findRecord('name', statisticField.getValue());
                
                if(statistic && statistic.data.filters){
                    filtersNamesList = Ext.Array.intersect(filtersNamesList, statistic.data.filters);
                }
            }
        }, this);
                
        Dashboard.tool.Utilities.info('[StackedBarGraphEditor.buildFilters] filters: '+ Ext.encode(filtersNamesList));
        
        this.filtersList = filtersNamesList;
        this.displayFilters(this.filtersList);
        
    },
            
            
    displayFilters: function(filters){

        Dashboard.tool.Utilities.info('[BarGraphEditor.displayFilters] filters: '+ Ext.encode(filters));

        this.down('form').lookupReference('period').setDisabled(true);
        this.down('form').lookupReference('fromDate').setDisabled(true);
        this.down('form').lookupReference('toDate').setDisabled(true);
        this.down('form').lookupReference('address').setDisabled(true);
        this.down('form').lookupReference('limit').setDisabled(true);
        this.down('form').lookupReference('sort').setDisabled(true);

        if(Ext.Array.contains(filters, 'PERIOD')){
            
            var comboPeriod = this.down('form').lookupReference('period');
            var store = comboPeriod.getStore();
            var periodValue = comboPeriod.getValue();
            
            comboPeriod.setDisabled(false);
            
            if(periodValue === 'DATE_TO_DATE' ){
                var filter = store.findRecord('period', 'DATE_TO_DATE');
                if(!filter){
                    this.down('form').lookupReference('period').getStore().add(
                        {period:'DATE_TO_DATE', label:getText('Date to date')}
                    );
                }
                this.down('form').lookupReference('fromDate').setDisabled(false);
                this.down('form').lookupReference('toDate').setDisabled(false);
                
            }else if(!periodValue || periodValue === 'NONE'){

                this.down('form').lookupReference('fromDate').setDisabled(true);
                this.down('form').lookupReference('toDate').setDisabled(true);
                
                if(!Ext.Array.contains(filters, 'START_DATE') && !Ext.Array.contains(filters, 'END_DATE')){
                    var filter = store.findRecord('period', 'DATE_TO_DATE');
                    this.down('form').lookupReference('period').getStore().remove(filter);
                }
                
            }
            
        }else{
            
            if(Ext.Array.contains(filters, 'START_DATE')){
                this.down('form').lookupReference('fromDate').setDisabled(false);
            }

            if(Ext.Array.contains(filters, 'END_DATE')){
                this.down('form').lookupReference('toDate').setDisabled(false);
            }
        }

        if(Ext.Array.contains(filters, 'ADDRESS')){
            this.down('form').lookupReference('address').setDisabled(false);
        }
        
        if(Ext.Array.contains(filters, 'LOCATION_ID')){
            this.down('form').lookupReference('address').setDisabled(false);
        }
        
        if(Ext.Array.contains(filters, 'LIMIT')){
            this.down('form').lookupReference('limit').setDisabled(false);
        }
        
        if(Ext.Array.contains(filters, 'SORTED')){
            this.down('form').lookupReference('sort').setDisabled(false);
        }

    },
    
    
    deleteProperty: function(sender){
        this.getController().deleteProperty(sender);
    },
    
    getInvalidFields: function (){

        var invalidFields = [];

        Ext.suspendLayouts();

        this.down('form').getForm().getFields().filterBy(function (field){
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
     * Method used by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function(){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getFieldValues();
        
        var data = new Object();
        data.dataBinding = new Object();
        
        //Indicator
        data.dataBinding.title = values.title;
        data.dataBinding.size = values.size;
        data.dataBinding.height = values.height;
        
        //Chart
        data.dataBinding.xTitle = values.xTitle;
        data.dataBinding.yTitle = values.yTitle;
        if(values.grid !== undefined){
            data.dataBinding.grid = values.grid;
        }

        data.dataBinding.statisticReferences =  this.getStatistics();
        data.dataBinding.filters = this.getFilters(values);
        
        var attribute = this.getAttribute();
        data.dataBinding.calculByValue = attribute.calculByValue;
        data.dataBinding.calculByType = attribute.calculByType;
        data.title = values.title;

        if(this.serverId){
            data.serverId = this.serverId;
        }
        
        return data;
    },
            
            
    getStatistics: function(){

        var statisticReferences = [];
        var selectors = this.query('panel[name=propertySelector]');
        var index = 1;
        
        Ext.each(selectors, function(selector){
            
            var statisticName = selector.down('combo[name=statisticReference]').getValue();
            
            if(statisticName !== undefined && statisticName){
            
                var label = selector.down('textfield[name=label]').getValue();

                if(label === ""){
                    var combo = selector.down('combo[name=statisticReference]')[0];
                    var store = combo.getStore();
                    var record = store.findRecord('name', combo.getValue());
                    label = record.data.shortDescription;
                }
                
                var statFiltersButton = selector.down('button[name=statFilters]');
                var statFilters = [];
                if(statFiltersButton && statFiltersButton.hidden === false){
                    statFilters.push(statFiltersButton.filter);
                }

                var dataProperty = {
                    name: statisticName,
                    xField: 'name',
                    yField: 'v'+ (index),
                    label: label,
                    color: selector.down('hiddenfield[name=color]').getValue(),
                    statisticFilters: statFilters,
                    correlationId: selector.down('hiddenfield[name=correlationId]').getValue()
                };

                statisticReferences.push(dataProperty);
                index += 1;
            }

        });
        
        return statisticReferences;
    },
            
            
    getAttribute: function(){

        var attribute = {};
        
        //get calculBy value
        var comboCalculBy = this.down('combo[name=calculBy]');
        attribute.calculByValue = comboCalculBy.getValue();
        
        // get calculBy type
        var storeCalculBy = comboCalculBy.getStore();
        var recordCalculBy = storeCalculBy.findRecord('calculByType', comboCalculBy.getValue());
        
        if(recordCalculBy !== undefined){
            attribute.calculByType = recordCalculBy.data.type;
        }else{
            attribute.calculByType = 'STRING';
        }
        
        return attribute;
    },
            
            
    getFilters: function(values){

        var filters = [];
        
        var periodValue = this.down('combo[name=period]').getValue();
        
        if(values.xTitle === ''){
            values.xTitle = this.down('combo[name=period]').getRawValue();
        }

        var periodFilter = {
            "filter":"PERIOD",
            "value": 'LAST_MONTH'//"LAST_MONTH" //"LAST_WEEK"
        };
        
        if(periodValue !== 'DATE_TO_DATE' && periodValue !== 'NONE' && periodValue !== null){
            periodFilter = {
                "filter":"PERIOD",
                "value": periodValue //"LAST_MONTH" //"LAST_MONTH"
            };
            filters.push(periodFilter);
        }
                
        if (values.address === 0) {
            
            filters.push({
                'filter': 'ADDRESS',
                'value': null
            });
            values.filters = filters;
            
        }else if (values.address) {
            
            filters.push({
                'filter': 'ADDRESS',
                'value': values.address
            });
            values.filters = filters;
        }
        
        if(periodValue === 'DATE_TO_DATE'){
            if (values.from_date) {
                filters.push({'filter': 'START_DATE','value': Ext.Date.format(values.from_date, 'c')});
                //filters.push({'filter': 'START_DATE','value': Dashboard.tool.DateTime.ISODateString(values.from_date)});
            }
            if (values.to_date) {
                filters.push({'filter': 'END_DATE','value': Ext.Date.format(values.to_date, 'c')});
                //filters.push({'filter': 'END_DATE','value': Dashboard.tool.DateTime.ISODateString(values.to_date)});
            }
        }
        
        if(values.limit !== undefined && values.limit !== null){
            filters.push({'filter': 'LIMIT','value': values.limit});
        }
        
        if(values.sort !== undefined && values.sort !== null ){
            if(values.sort === 'asc'){
                filters.push({'filter': 'SORTED','value': 'ASC'});
            }else if(values.sort === 'desc'){
                filters.push({'filter': 'SORTED','value': 'DESC'});
            }
        }

        
        return filters;

    }
    
});   