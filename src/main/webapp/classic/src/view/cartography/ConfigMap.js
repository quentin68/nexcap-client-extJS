Ext.define('Dashboard.view.cartography.ConfigMap', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyConfigMap',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor'
    ],
    
    tag: 'winMap',
    
    controller: 'cartographyMapStage',
    mainController: null,
    modelProperties: null,
    
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 450,
    iconCls: 'fa fa-cogs',
    plain: true,
    autoScroll: true,
    scrollable: 'y',
    
    record: {},
    
    config : {
	propertiesStore : Ext.create('Dashboard.store.properties.Properties', {
	    autoLoad : false
	}),
	localPropertiesStore : Ext.create('Dashboard.store.properties.LocalProperties')
    },
    
    initComponent: function(){
        
        this.title = getText('Map configuration');
        
        this.getPropertiesStore().on('load', this.onPropertiesLoaded, this);
	this.getPropertiesStore().load();
        
        
        var displayedFields = {
            xtype: 'container',
            margin: '0 0 0 20',
            defaults :{
                xtype: 'autocompleteComboBox',
                name: 'displayedFields',
                store : this.getLocalPropertiesStore(),
                queryMode : 'local',
                displayField : 'label',
                valueField : 'name',
                editable : true,
                allowBlank : true,
                forceSelection : true,
                width: '75%'
            },
            items:[
                {
                    fieldLabel: getText('Property') + ' 1',
                    ref: 'property_1'
                },{
                    fieldLabel: getText('Property') + ' 2',
                    ref: 'property_2'
                },{
                    fieldLabel: getText('Property') + ' 3',
                    ref: 'property_3'
                }
            ]
        };
        
        
         var rulesPanel = {
                        
            xtype: 'panel',
            title: getText('Item\'s displaying Rules'),
            reference: 'rulesPanel',
            bodyPadding: 20,
            scrollable:'y',
            items:[],
            tools: [
                {
                    xtype: 'button',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    listeners:{
                        scope:this,
                        click: function(me){
                            this.mainController.onAddNewRule(me);
                        }
                    }
                }
            ]
        };
        
        
        var globalConfiguration = {
            xtype: 'panel',
            reference: 'globalConfiguration',
            title: getText('Global configuration'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'checkbox',
                    boxLabel: getText('Display elements names'),
                    name: 'displayElementsLabels',
                    checked: true
                }
            ]
        };

        
        var materialsLayerConfiguration = {
            xtype: 'panel',
            reference: 'materialsConfiguration',
            title: getText('Materials layer configuration'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel: getText('Default color'),
                            margin: '0 6 0 0',
                            submitValue: false,
                            labelWidth: 112,
                            width: 112
                        },{
                            xtype: 'ux-panel',
                            ref: 'colorRec',
                            border: true,
                            width: 32, 
                            height: 32,
                            bodyStyle:{
                                background: '#08a51f'//,"#F3F3F3"
                            },
                            listeners:{
                                scope:this,
                                click: function(me){
                                    this.mainController.onColorPicker(me);
                                }
                            },
                            margin: 0
                        },{
                            xtype: 'hiddenfield',
                            name: 'color',
                            value: '#08a51f'
                        }
                    ]
                },{
                    html: getText('Information bubble') + getText(':'), //Info-bulle
                    margin: '20 0 12 0'
                },
                displayedFields//,
//                {
//                    xtype: 'checkbox',
//                    boxLabel: getText('Display label'),
//                    name: 'materialLabelIsVisible',
//                    checked: true
//                }
            ]
        };
        
        
        var devicesLayerConfiguration = {
            xtype: 'panel',
            reference: 'devicesConfiguration',
            title: getText('Devices layer configuration'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
//                {
//                    xtype: 'checkbox',
//                    boxLabel: getText('Display label'),
//                    name: 'deviceLabelIsVisible',
//                    checked: true
//                }
            ]
        };
        
        
        var locationsLayerConfiguration = {
            xtype: 'panel',
            reference: 'locationsConfiguration',
            title: getText('Locations layer configuration'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel: getText('Default color'),
                            margin: '0 6 0 0',
                            submitValue: false,
                            labelWidth: 112,
                            width: 112
                        },{
                            xtype: 'ux-panel',
                            ref: 'colorRec',
                            border: true,
                            width: 32, 
                            height: 32,
                            bodyStyle:{
                                background: '#3AA7DA'//,"#F3F3F3"
                            },
                            listeners:{
                                scope:this,
                                click: function(me){
                                    this.mainController.onColorPicker(me);
                                }
                            },
                            margin: 0
                        },{
                            xtype: 'hiddenfield',
                            name: 'color',
                            value: '#3AA7DA'
                        }
                    ]
                }
//                ,{
//                    xtype: 'checkbox',
//                    boxLabel: getText('Display label'),
//                    name: 'locationLabelIsVisible',
//                    checked: true
//                }
            ]
        };
        
        
        var linksLayerConfiguration = {
            xtype: 'panel',
            reference: 'linksConfiguration',
            title: getText('Links layer configuration'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel: getText('Default color'),
                            margin: '0 6 0 0',
                            submitValue: false,
                            labelWidth: 112,
                            width: 112
                        },{
                            xtype: 'ux-panel',
                            ref: 'colorRec',
                            border: true,
                            width: 32, 
                            height: 32,
                            bodyStyle:{
                                background: '#ffd400'//,"#F3F3F3"
                            },
                            listeners:{
                                scope:this,
                                click: function(me){
                                    this.mainController.onColorPicker(me);
                                }
                            },
                            margin: 0
                        },{
                            xtype: 'hiddenfield',
                            name: 'color',
                            value: '#ffd400'
                        }
                    ]
                }
            ]
        };
        
        
        var labelsLayerConfiguration = {
            xtype: 'panel',
            reference: 'labelsConfiguration',
            title: getText('Labels layer configuration'),
            bodyPadding: 20,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel: getText('Default color'),
                            margin: '0 6 0 0',
                            submitValue: false,
                            labelWidth: 112,
                            width: 112
                        },{
                            xtype: 'ux-panel',
                            ref: 'colorRec',
                            border: true,
                            width: 32, 
                            height: 32,
                            bodyStyle:{
                                background: '#43475b'//,"#F3F3F3"
                            },
                            listeners:{
                                scope:this,
                                click: function(me){
                                    this.mainController.onColorPicker(me);
                                }
                            },
                            margin: 0
                        },{
                            xtype: 'hiddenfield',
                            name: 'color',
                            value: '#43475b'
                        }
                    ]
                }
            ]
        };
        

        this.items = [{
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width: 650,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable: 'y',
                defaults: {
                    bodyPadding: 20,
                    ui: 'form-panel'
                },
                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },
                items: [
                    globalConfiguration,
                    materialsLayerConfiguration,
                    rulesPanel,
                    locationsLayerConfiguration,
                    //devicesLayerConfiguration,
                    linksLayerConfiguration,
                    labelsLayerConfiguration
                ]
            }];

        this.buttons = [{
                text: getText('Save'),
                listeners:{
                    scope: this,
                    click: function(me){
                        this.mainController.onUpdateMapConfiguration(me);
                    }
                }
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);

        this.setData(this.record.data);

    },
    
    //fill properties store
    onPropertiesLoaded : function() {

	this.getLocalPropertiesStore().clearData();
        
        //Local properties
	for (var i = 0; i < this.modelProperties.length; i++) {
                        
	    var property = this.modelProperties[i];
            
	    if (property.control !== undefined && typeof property.control === 'string') {
		property.control = Ext.decode(property.control);
	    }
            
            if(!property.filterOnly || property.filterOnly === false){
                this.getLocalPropertiesStore().add(property);
            }            
	}
        
        // Dynamic properties    
        var records = this.getPropertiesStore().getRange();
        
        if (records.length > 0) {
            
            for (var j = 0; j < records.length; j++) {

                var property = records[j];                

                if (property.data.propertyConfigurationType !== 'MATERIAL') {
                    continue;
                }

                // Add if valid
                if (this.propertyIsValid(property)) {
                    var enabledInFilters = true;
                    property.data.control = Dashboard.model.PropertyConfiguration.getControl(property.data);
                    if (property.data.control === undefined) {
                        // if undefined, propably property created on the server side not yet configured on the web client through Management/Cat/Ref(optionweb not defined)
                        // set to null to show alert popup when selecting this property
                        property.data.type = null;
                    } else {
                        if (property.data.control.field !== undefined && property.data.control.field.dataType !== undefined) {
                            // override property type (LIST/STRING/INT...) with property result type (no LIST -> STRING)
                            property.data.type = property.data.control.field.dataType;
                        }
                        if (property.data.control.configuration !== undefined && property.data.control.configuration.enabledInFilters !== undefined) {
                            enabledInFilters = property.data.control.configuration.enabledInFilters;
                        }
                    }
                    if (enabledInFilters !== false) {
                        this.getLocalPropertiesStore().add(property);
                    }
                }
            }
        }
        
    },
    
    
    addRule: function(rule){
        
        var item = this.buildRuleRaw(rule);
        this.down('panel[reference=rulesPanel]').add(item);
                
    },
    
    
    buildRuleRaw: function(rule){
                                
        //var typeLabel = eval('Dashboard.store.FilterTypes.'+ rule.data.type).label;
        var comparaisonLabel = eval('Dashboard.store.FilterTypes.FILTER_COMPARISON.' + rule.comparison);
        
        var rule = Ext.create('Ext.panel.Panel',{
            layout: 'hbox',
            margin: '0 0 12 0',
            reference: 'rule',
            
            rule: rule,

            defaults:{
                submitValue: false,
                flex:1
            },

            items:[
                {
                    xtype: 'hiddenfield',
                    value: rule.name
                },{
                    xtype: 'displayfield',
                    //fieldLabel: 'Rule',
                    labelSeparator: null,
                    value: rule.label,
                    border: 1,
                    labelWidth: 150
                },{
                    xtype: 'displayfield',
                    fieldLabel: getText(comparaisonLabel),
                    comparison: comparaisonLabel,
                    value: rule.value,
                    labelSeparator: null,
                    border: 1,
                    labelWidth: 150
                },{
                    xtype: 'button',
                    ui: 'indicator-font-icon-button-minus',
                    name: 'minusButton',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa fa-minus-circle',
                    scope: this,
                    flex: 0,
                    
                    listeners:{
                        scope: this,
                        click: function(button, event, eOpts ){
                            this.removeRule(button.up('panel[reference=rule]'));
                        }
                    }
                }
            ]
        });
        
        return rule;
    },
    
    
    removeRule: function(rule){
        
        this.down('panel[reference=rulesPanel]').remove(rule);
        
    },
    
    
    getDisplayingRules: function(){
                
        var rules = [];
        var list = Ext.ComponentQuery.query('panel[reference=rule]');
        
        Ext.each(list, function(ruleField){
            rules.push(ruleField.rule);
        });
        
        return rules;
    },
    
    
    propertyIsValid : function(property) {

	if (property.data.enabledInFilters === false) {
	    return false;
	}
	return true;
    },
    

    getData: function(){
        
        var data = {
            materialsLayer: {
                options: {
                    defaultColor: '#08a51f',
                    //labelIsVisible: this.down('checkbox[name=materialLabelIsVisible]').checked, //displayElementsLabels
                    labelIsVisible: this.down('checkbox[name=displayElementsLabels]').checked,
                    displayingRules: [
    //                    {
    //                        property: 'status',
    //                        value: '1',
    //                        comparison: 'EQ',
    //                        color: '#000',
    //                        icon: 'DEATH'
    //                    }
                    ],
                    displayedFields: []
                },
                displayedFields: []
                
            },
            locationsLayer: {
                options: {
                    defaultColor: '#3AA7DA',
                    //labelIsVisible: this.down('checkbox[name=locationLabelIsVisible]').checked
                    labelIsVisible: this.down('checkbox[name=displayElementsLabels]').checked
                }
            },
            devicesLayer: {
                options: {
                    defaultColor: '#095899',
                    //labelIsVisible: this.down('checkbox[name=deviceLabelIsVisible]').checked
                    labelIsVisible: this.down('checkbox[name=displayElementsLabels]').checked
                }
            },
            linkingZonesLayer: {
                options: {
                    defaultColor: '#ffd400'
                }
            },
            labelsLayer: {
                options: {
                    defaultColor: '#43475b'
                }
            }
        };
                
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
                
        var materialsConf = this.down('panel[reference=materialsConfiguration]');
        if(materialsConf.down('field[name=color]').value){
            data.materialsLayer.options.defaultColor = materialsConf.down('field[name=color]').value;
        }
        
        var locationsConf = this.down('panel[reference=locationsConfiguration]');
        if(locationsConf.down('field[name=color]').value){
            data.locationsLayer.options.defaultColor = locationsConf.down('field[name=color]').value;
        }
        
        var linksConf = this.down('panel[reference=linksConfiguration]');
        if(linksConf.down('field[name=color]').value){
            data.linkingZonesLayer.options.defaultColor = linksConf.down('field[name=color]').value;
        }
        
        var labelsConf = this.down('panel[reference=labelsConfiguration]');
        if(labelsConf.down('field[name=color]').value){
            data.labelsLayer.options.defaultColor = labelsConf.down('field[name=color]').value;
        }
                
        data.id = this.record.data.id;
                        
        if(this.down('field[ref=property_1]').getSelectedRecord()){
            data.materialsLayer.options.displayedFields.push(this.down('field[ref=property_1]').getSelectedRecord().data);
        }
        if(this.down('field[ref=property_2]').getSelectedRecord()){
            data.materialsLayer.options.displayedFields.push(this.down('field[ref=property_2]').getSelectedRecord().data);
        }
        if(this.down('field[ref=property_3]').getSelectedRecord()){
            data.materialsLayer.options.displayedFields.push(this.down('field[ref=property_3]').getSelectedRecord().data);
        }
                
        data.materialsLayer.options.displayingRules = this.getDisplayingRules();
                
        return data;
    },
            
    setData: function(data){
        
        this.down('form').getForm().setValues(data);
        
        try{
            this.down('field[ref=property_1]').setValue(data.materialsLayer.options.displayedFields[0].name);
            this.down('field[ref=property_2]').setValue(data.materialsLayer.options.displayedFields[1].name);
            this.down('field[ref=property_3]').setValue(data.materialsLayer.options.displayedFields[2].name);
        }catch(ex){
            
        };
        
        try{
            var materialsConf = this.down('panel[reference=materialsConfiguration]');
            materialsConf.down('field[name=color]').setValue(data.materialsLayer.options.defaultColor);
            materialsConf.down('panel[ref=colorRec]').setBodyStyle({
                background: data.materialsLayer.options.defaultColor
            });
            
            if(data.materialsLayer.options.labelIsVisible !== undefined){
                this.down('checkbox[name=displayElementsLabels]').setValue(data.materialsLayer.options.labelIsVisible);
            }else{
                this.down('checkbox[name=displayElementsLabels]').setValue(true);
            }
            
        }catch(ex){};
        
        try{
            var locationsConf = this.down('panel[reference=locationsConfiguration]');
            locationsConf.down('field[name=color]').setValue(data.locationsLayer.options.defaultColor);
            locationsConf.down('panel[ref=colorRec]').setBodyStyle({
                background: data.locationsLayer.options.defaultColor
            });
        }catch(ex){};
        
//        try{
//            var devicesConf = this.down('panel[reference=devicesConfiguration]');
//        }catch(ex){};
        
        try{
            var linksConf = this.down('panel[reference=linksConfiguration]');
            linksConf.down('field[name=color]').setValue(data.linkingZonesLayer.options.defaultColor);
            linksConf.down('panel[ref=colorRec]').setBodyStyle({
                background: data.linkingZonesLayer.options.defaultColor
            });
        }catch(ex){};
        
        try{
            var labelsConf = this.down('panel[reference=labelsConfiguration]');
            labelsConf.down('field[name=color]').setValue(data.labelsLayer.options.defaultColor);
            labelsConf.down('panel[ref=colorRec]').setBodyStyle({
                background: data.labelsLayer.options.defaultColor
            });
        }catch(ex){};
        
        try{
            var rulesPanel = this.down('panel[reference=rulesPanel]');
            rulesPanel.removeAll();
            var rulesList = data.materialsLayer.options.displayingRules;
            
            for(var i=0; i < rulesList.length; i++ ){
                var rule = Ext.create('Dashboard.model.cartography.DisplayingRule', rulesList[i]);
                var ruleRaw = this.buildRuleRaw(rule.data);
                rulesPanel.add(ruleRaw);
            }
        }catch(ex){};

    },
            
    setThumbnail: function(thumbSrc){

        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var img = Ext.ComponentQuery.query('cartographyEditMap image[name=thumbnailToEdit]')[0];

        if (thumbSrc !== null) {
            thumbnailSrc = thumbSrc;
        }

        img.setSrc(thumbnailSrc);
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
    }

});