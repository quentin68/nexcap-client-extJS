/* global Ext */

Ext.define('Dashboard.view.indicator.PieEditor', {
    extend: 'Ext.window.Window',
    xtype: 'pieEditor',
    
    requires: [
        'Ux.Img',
        'Ux.Panel',
        'Ux.ComboBox',
        'Ext.picker.Color',
        'Ext.ux.colorpick.Button',
        'Dashboard.model.DataCollection'
    ],
    
    controller:'pieEditor',
    
    layout: 'fit',
    autoShow: false,
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    iconCls: 'fa fa-pie-chart',
    height: 450,
    
    serverId: null,
    indicatorType: null,
    record: null,
    
    initComponent: function() {
        
        this.title = getText('Pie widget editor');
        
        this.statisticReferencesStore = Ext.create('Dashboard.store.DataCollections', {
            autoLoad: true,
            listeners:{
                scope: this,
                load:function(){
                    this.buildFilters();
                }
            }
        });
        
        var addressStore = Ext.create('Dashboard.store.Addresses',{
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
        
        var indicatorFieldSet = {
            xtype: 'panel',
            border: false,
            flex:1,
            layout: 'hbox',
            defaults:{
                labelSeparator: getText(':'),
                margin: '0 0 12 0',
                flex:1
            },
            items:[
                {
                    xtype: 'combo',
                    name: 'size',
                    reference: 'size',
                    fieldLabel: getText('Size'),
                    displayField: 'label',
                    valueField: 'name',
                    editable:false,
                    value: 'M',
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
                    minValue: 200,
                    margin: '0 0 0 12'
                }
            ]  
        };
        
        
        var filtersFieldSet = {
            xtype: 'fieldset',
            title: getText('Filters'),
            flex:1,
            border: '1 0 0 0',
            cls: 'line-editor-fieldset',
            defaults:{
                labelSeparator: getText(':'),
                anchor: '100%',
                margin: '0 0 12 12',
                disabled: true
            },
            items:[
                 {
                    xtype: 'autocompleteComboBox',
                    name: 'address',
                    reference: 'address',
                    fieldLabel: getText('Address'),
                    displayField: 'name',
                    valueField: 'name',
                    editable: true,
                    typeAhead: true,
                    forceSelection: true,
                    store: addressStore
                }
            ]
        };


        this.items = [
            
            {
                xtype: 'form',
                referenceHolder: true,
                border:false,
                bodyPadding: 24,
                margin: '0 0 0 12',
                width: 850,
                scrollable:'y',
                
                items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: getText('Widget title'),
                        labelSeparator: getText(':'),
                        name: 'title',
                        reference: 'formTitle',
                        width:'100%',
                        allowBlank: false,
                        maxLength: 255
                    },
                    indicatorFieldSet,
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        defaults:{
                            xtype:'displayfield',
                            labelSeparator: getText(':'),
                            flex: 1,
                            submitValue: false
                        },
                        items:[
                            {
                                fieldLabel: getText('Statistics'),
                                margin: '0 0 0 44'
                            }, {
                                fieldLabel: getText('Short labels'),
                                margin: '0 0 0 12'
                            }, {
                                xtype: 'button',
                                ui: 'indicator-font-icon-button-plus',
                                width:24,
                                height:24,
                                scale:'small',
                                margin: '0 0 0 12',
                                flex: 0,
                                border: false,
                                enableToggle: false,
                                iconCls: 'fa fa-plus-circle',
                                scope: this,
                                handler: this.onAddPropertySelector
                            }
                        ]
                    }, {
                        xtype: 'panel',
                        reference: 'propertiesSelectors',
                        items:[
                            this.getPropertySelector("#115fa6"),
                            this.getPropertySelector("#94ae0a"),
                            this.getPropertySelector("#FAC411")
                        ]
                    },
                    filtersFieldSet

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

        this.callParent(arguments);

    }, 
    
    getPropertySelector: function(color, label, statisticReference, attribute, correlationId){
        
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
                    value: statisticReference ? statisticReference : '',
                    allowBlank: allowBlank,
                    editable:false,
                    store: this.statisticReferencesStore,
                    listeners:{
                        scope:this,
                        select:function(combo, record, eOpts){             

                            var label = combo.up('panel').down('textfield[name=label]');
                            var store = combo.getStore();
                            var record = store.findRecord('name', combo.getValue());
                            label.setValue(record.data.shortDescription);
                            
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
                                    if(statisticReferences[i].statisticReference === statisticReference ){
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
    
    
    addPropertySelector: function(color, label, statisticReference, attribute, correlationId){
        
        var selector = this.getPropertySelector(color, label, statisticReference, attribute, correlationId);
        this.down('form').down('panel[reference=propertiesSelectors]').add(selector);
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
     * Concat all shared filters and, after, display form's filters.
     */
    buildFilters: function(){
                
        var statisticsFields = this.query('combo[name=statisticReference]');
        var filtersNamesList = ["ADDRESS"];
        
        //Statistic combobox
        Ext.each(statisticsFields, function(statisticField, index){

            if(statisticField.getValue()){ // field not empty
                
                var fieldStore = statisticField.getStore();
                var statistic = fieldStore.findRecord('name', statisticField.getValue());
                
                if(statistic && statistic.data.filters){
                    filtersNamesList = Ext.Array.intersect(filtersNamesList, statistic.data.filters);
                }
            }
        }, this);
                
        Dashboard.tool.Utilities.info('[DonutEditor.buildFilters] filters: '+ Ext.encode(filtersNamesList));
        
        this.filtersList = filtersNamesList;
        this.displayFilters(this.filtersList);
        
    },
    
    
    displayFilters: function(filters){

        this.down('form').lookupReference('address').setDisabled(true);
        
        if(Ext.Array.contains(filters, 'ADDRESS')){
            this.down('form').lookupReference('address').setDisabled(false);
        }

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
        
        data.dataBinding.statisticReferences =  this.getStatistics();
        data.dataBinding.filters = this.getFilters(values);
        
        data.title = values.title;
        
        if(this.serverId){
            data.serverId = this.serverId;
        }
        
        return data;
    },
    
    
    getFilters: function(values){

        var filters = [];
        
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

        return filters;
    },
            
            
    getStatistics: function(){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getFieldValues();
        var generalFilters = this.getFilters(values);

        var statisticReferences = [];
        var selectors = this.query('panel[name=propertySelector]');

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
                
//                if(generalFilters){
//                    Ext.each(generalFilters, function(filter){
//                        statFilters.push(filter);
//                    });
//                }

                var dataProperty = {
                    statisticReference: statisticName,
                    label: label,
                    color: selector.down('hiddenfield[name=color]').getValue(),
                    statisticFilters: statFilters,
                    filters: generalFilters,
                    correlationId: selector.down('hiddenfield[name=correlationId]').getValue()
                };

                statisticReferences.push(dataProperty);
            }
        });
        
        return statisticReferences;
    }
    
});   