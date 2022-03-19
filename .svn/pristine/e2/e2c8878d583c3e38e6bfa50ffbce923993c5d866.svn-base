/*  global Ext */

Ext.define('Dashboard.view.indicator.PostItEditor', {
    extend: 'Ext.window.Window',
    xtype: 'postItEditor',
    
    requires: [
        'Ux.Img',
        'Ux.Panel',
        'Ux.ComboBox',
        'Ext.picker.Color',
        'Ext.ux.colorpick.Button',
        'Dashboard.model.StatisticReference',
        'Dashboard.store.StatisticsReferences'
    ],
    
    controller:'postItEditor',
    
    iconCls: 'fa fa-comment',
    layout: 'fit',
    autoShow: false,
    closable : false,
    resizable : false,
    modal : true,
    constrain: true,
    closeAction : 'destroy',

    serverId: null,
    record: null,
    addressStore: null,

    initComponent: function() {
        
        this.title = getText('Post-it widget editor');
        
        this.addressStore = Ext.create('Dashboard.store.Addresses',{
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

        var path = 'resources/images/icons/';
                
        var correlationId = null;
        try{
            correlationId = this.record.data.dataBinding.correlationId;
        }catch(ex){}
        
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
                    store: this.addressStore
                }
            ]
        };

        
        this.items = [
            
            {
                xtype: 'panel',
                border:false,
                bodyPadding: 10,
                layout: 'hbox',
                
                items: [
                    {
                        xtype: 'ux-panel',
                        border:true,
                        width: 100,
                        bodyStyle:{
                            background:"red"
                        },
                        items:[
                            {
                                xtype: 'ux-img',
                                shrinkWrap:true,
                                src: path + 'cloud-icon.png',
                                width:48,
                                height:48,
                                margin: '16 26',
                                name: 'iconSrc',
                                listeners:{
                                    scope:this,
                                    click: function(sender, e){
                                        this.getController().onIconPicker(sender);
                                        e.stopPropagation();
                                    }
                                }
                            }
                        ],
                        listeners:{
                            scope:this,
                            click: function(sender, e){
                                this.getController().onColorPicker(sender);
                            }
                        }
                    }, {
                        xtype: 'form',
                        itemId: 'form',
                        margin: '0 0 0 12',
                        width: 450,
                        
                        fieldDefaults: {
                            width: '100%',
                            labelSeparator: getText(':')
                        },
                        items:[
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                margin: '0 0 12 0',
                                //flex:1,
                                defaults:{
                                    
                                    
                                },
                                items:[
                                    {
                                        xtype: 'combo',
                                        name: 'statisticReference',
                                        reference: 'comboStatisticReferences',
                                        fieldLabel: getText('Information'),
                                        displayField: 'shortDescription',
                                        valueField: 'name',
                                        allowBlank: false,
                                        editable: false,
                                        store: Ext.create('Dashboard.store.DataCollections', {
                                            autoLoad: true,
                                            listeners:{
                                                scope: this,
                                                load:function(){
                                                    this.buildFilters();
                                                }
                                            }
                                        }),
                                        flex:1,
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
                                                    combo.up('form').down('button[name=statFilters]').setDisabled(false);
                                                    combo.up('form').down('button[name=statFilters]').setVisible(true);
                                                }else{ 
                                                    combo.up('form').down('button[name=statFilters]').setDisabled(true);
                                                    combo.up('form').down('button[name=statFilters]').setVisible(false);
                                                }
                                                
                                                combo.up('form').down('hiddenfield[name=correlationId]').setValue(new Date().getTime());
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
                                                    var statisticFilters = this.record.data.dataBinding.statisticFilters;

                                                    if( statisticFilters && statisticFilters.length > 0){
                                                        var filter = statisticFilters[0];
                                                        button.setDisabled(false);
                                                        button.setVisible(true);
                                                        button.filter = filter;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Label',
                                name: 'label',
                                allowBlank: true,
                                maxLength: 255
                            }, {
                                xtype: 'combo',
                                name: 'size',
                                itemId: 'comboSize',
                                fieldLabel: getText('Size'),
                                displayField: 'label',
                                valueField: 'name',
                                editable:false,
                                value: 'S',
                                store: Ext.create('Dashboard.store.IndicatorSizes',{
                                    autoLoad: true
                                })
                            },
                            filtersFieldSet,
                            {
                                xtype: 'hiddenfield',
                                name: 'color',
                                allowBlank: true
                            }, {
                                xtype: 'hiddenfield',
                                name: 'icon',
                                allowBlank: true
                            }, {
                                xtype: 'hiddenfield',
                                name: 'correlationId',
                                value: correlationId ? correlationId: null
                            }
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

        this.callParent(arguments);
        
    }, 
    
    
    onShowFiltersSelector: function(button){
        
        var statisticReference = button.up('form').down('combo[name=statisticReference]').getSelectedRecord();
        
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
            this.down('textfield[name=label]').setValue(data.label);
        }

        win.close();
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
        
        this.down('autocompleteComboBox[reference=address]').setDisabled(true);
        
        if(Ext.Array.contains(filters, 'ADDRESS')){
            this.down('autocompleteComboBox[reference=address]').setDisabled(false);
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
        
        if(!values.color){
            values.color = 'red';
        }
        
        if(!values.label){
            values.label = this.lookupReference('comboStatisticReferences').getRawValue();
        }
        
        if(!values.icon){
            values.icon = 'resources/images/icons/cloud-icon.png';
        }
                        
        data.dataBinding = values;
        
        var statFiltersButton = this.down('button[name=statFilters]');
        var statFilters = [];
        
        if(statFiltersButton.hidden === false){
            statFilters.push(statFiltersButton.filter);
        }
        
        data.dataBinding.statisticFilters = statFilters;
        data.dataBinding.correlationId = this.down('hiddenfield[name=correlationId]').getValue();
        
//        var generalFilters = this.getFilters(values);
//        if(generalFilters){
//            Ext.each(generalFilters, function(filter){
//                data.dataBinding.statisticFilters.push(filter);
//            });
//        }
        data.dataBinding.filters = this.getFilters(values);
                
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
    }
    
});   