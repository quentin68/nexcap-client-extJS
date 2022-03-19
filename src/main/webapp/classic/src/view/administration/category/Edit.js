/* global Ext */

Ext.define('Dashboard.view.administration.category.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'categoryEdit',

    requires: ['Dashboard.tool.Utilities', 'Dashboard.view.shared.imagesViewer.ThumbnailEditor'],

    controller: 'categoryMain',

    title: getText('Edit a category'),
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    iconCls: 'fa fa-bar-chart',

    propertyPanelInEdition: null,
    categoriesStore: null,

    record: null,

    initComponent: function (){

        this.categoriesStore = Ext.create('Dashboard.store.administration.OtherCategories', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().extraParams.id = this.record.id;
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        var characteristicsPanel = {

            xtype: 'panel',
            title: getText('Category'),
            bodyPadding: 20,
            ui: 'form-panel',

            defaults: {
                labelWidth: 112,
                width: '100%',
                labelSeparator: getText(':'),
                margin: '0 0 12 0'
            },
            items: [
                {
                    xtype: Ext.widget('thumbnailEditor', {
                        record: this.record,
                        thumbnailSourceType: 'PRODUCT_CATEGORY'
                    })
                            
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
                    maxLength: 255,
                    listeners: {
                        afterrender: function (field){
                            field.focus(false, 100);
                        }
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'parentCategoryId',
                    reference: 'parentCategory',
                    fieldLabel: getText('Parent category'),
                    displayField: 'fullPath',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false, // to remove param "query"
                    matchFieldWidth: false,
                    store: this.categoriesStore,
                    listConfig: {
                        getInnerTpl: function (){
                            return '{path}/<b>{name}</b>';
                        }
                    }
                }, {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 1024
                }
            ]
        };

        var materialPropertiesPanel = {

            xtype: 'panel',
            title: getText('Items properties'),
            reference: 'materialPropertiesPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            hidden: !Dashboard.manager.FeaturesManager.isEnabled('DYNAMIC_PROPERTIES_ADMIN'),
            items: [],
            tools: [
                {
                    xtype: 'button',
                    scale: 'small',
                    iconCls: 'fa fa-search-plus',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onAssignMaterialProperty',
                    cls: 'btnAssignProp',
                    margin: '0 6 0 0'
                }, {
                    xtype: 'button',
                    // ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onCreateMaterialProperty'
                }
            ]
        };

        var referencesPropertiesPanel = {
            xtype: 'panel',
            title: getText('References properties'),
            reference: 'referencesPropertiesPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            hidden: !Dashboard.manager.FeaturesManager.isEnabled('DYNAMIC_PROPERTIES_ADMIN'),
            items: [],
            tools: [
                {
                    xtype: 'button',
                    scale: 'small',
                    iconCls: 'fa fa-search-plus',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onAssignReferenceProperty',
                    cls: 'btnAssignProp',
                    margin: '0 6 0 0'
                }, {
                    xtype: 'button',
                    // ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onCreateReferenceProperty'
                }
            ]
        };

        this.items = [
            {
                xtype: 'form',
                referenceHolder: true,
                border: false,
                width: 700,
                height: 650,
                scrollable: 'y',

                defaults: {
                    width: '100%'
                },
                items: [
                    characteristicsPanel, 
                    materialPropertiesPanel, 
                    referencesPropertiesPanel
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Save'),
                action: 'save'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);

    },

    addProperty: function (propertyConfModel) {
        
        var panel;
        if (propertyConfModel.data.propertyConfigurationType === 'PRODUCTREFERENCE') {
            panel = this.down('panel[reference=referencesPropertiesPanel]');
        } else if (propertyConfModel.data.propertyConfigurationType === 'MATERIAL') {
            panel = this.down('panel[reference=materialPropertiesPanel]');
        }
        var properyPanel = this.buildProperty(propertyConfModel);
        
        for(var i=0; i< panel.items.items.length; i++){
            var item = panel.items.items[i];

            var serverName = propertyConfModel.data.name;
            var newName = Dashboard.tool.Utilities.stringCompacted(item.record.data.name);

            if(serverName === newName){
                Ext.Msg.show({
                    title: getText('Warning'),
                    msg: getText('Dynamic property already exists')+ getText(':') + item.record.data.label ,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.WARNING
                });
                return;
            }
        }
        
        panel.add(properyPanel);
        
//        // If is in panel but not sent to server yet
//        var isPropertyInPanel = false;
//        for (var i = 0; i < panel.items.items.length; i++) {
//            var panelProperty = panel.items.items[i];
//            if (panelProperty.record.id === propertyConfModel.data.id) {
//                isPropertyInPanel = true;
//                break;
//            }
//        }
//        
//        if (!isPropertyInPanel) {
//            panel.add(properyPanel);
//        } else {
//            Ext.Msg.show({
//                title: getText('Warning'),
//                msg: getText('Dynamic property already exists'),
//                buttons: Ext.Msg.OK,
//                icon: Ext.Msg.WARNING
//            });
//        }
    },

    updateProperty: function (propertyConfModel){
        
        var panel;
        if (propertyConfModel.data.propertyConfigurationType === 'PRODUCTREFERENCE') {
            panel = this.down('panel[reference=referencesPropertiesPanel]');
        } else if (propertyConfModel.data.propertyConfigurationType === 'MATERIAL') {
            panel = this.down('panel[reference=materialPropertiesPanel]');
        }
        // replace item in panel
        var newProperyPanel = this.buildProperty(propertyConfModel);
        var position = panel.items.indexOf(this.propertyPanelInEdition);
        panel.insert(position, newProperyPanel);
        panel.remove(this.propertyPanelInEdition, true);
        panel.updateLayout();

        this.propertyPanelInEdition = null;
    },

    buildProperty: function (model){

        var label = model.data.label;
        var isControlUndefined = Dashboard.model.PropertyConfiguration.getControl(model.data) === undefined;

        var property = Ext.create('Ext.panel.Panel', {
            layout: 'hbox',
            margin: '0 0 12 0',
            name: 'dynamicProperty',

            record: model,

            defaults: {
                // margin: '0 0 0 12',
                submitValue: false,
                flex: 1,
                xtype: 'button',
                width:24,
                height:24,
                scale:'small',
                border: false,
                enableToggle: false
            },

            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'dynamicPropertyId',
                    value: model.data.id
                }, {
                    xtype: 'hiddenfield',
                    name: 'dynamicPropertyName',
                    value: model.data.name
                }, {
                    xtype: 'displayfield',
                    name: 'label',
                    value: (label ? label : '') + (isControlUndefined ? '<span class="fa fa-exclamation-triangle" style="margin-left:10px; color:red;"/>' : '')
                }, {
                    name: 'upArrow',
                    ui: 'indicator',
                    iconCls: 'fa-arrow-circle-o-up',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            button.up('window').getController().onUpFilter(button, button.up('panel'));
                        }
                    }
                }, {
                    name: 'downArrow',
                    ui: 'indicator',
                    iconCls: 'fa-arrow-circle-o-down',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            button.up('window').getController().onDownFilter(button, button.up('panel'));
                        }
                    }
                }, {
                    ui: 'indicator-font-icon-button-edit',
                    name: 'editButton',
                    iconCls: 'fa fa-pencil',
                    scope: this,
                    // hidden: !model.data.isEditable,
                    flex: 0,
                    listeners: {
                        scope: this,
                        click: function (button, event, eOpts){
                            this.propertyPanelInEdition = button.up('panel');
                            button.up('window').getController().onEditProperty(button, button.up('panel').record);
                        }
                    }
                }, {
                    ui: 'indicator-font-icon-button-minus',
                    name: 'minusButton',
                    iconCls: 'fa fa-minus-circle',
                    scope: this,
                    disabled: model.data.isSystem,
                    flex: 0,
                    listeners: {
                        scope: this,
                        click: function (button, event, eOpts){
                            this.confirmRemoveProperty(button.up('panel[name=dynamicProperty]'));
                        }
                    }
                }]
        });

        return property;
    },

    confirmRemoveProperty: function (property){

        var name = property.record.data.name;

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to dissociate property ') + " \"" + name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn){
                if (btn === 'yes') {
                    this.removeProperty(property);
                }
            }
        });
    },

    removeProperty: function (property){

        property.ownerCt.remove(property);
        this.getController().updateCategory(this);
    },

    getMaterialProperties: function (){

        var list = this.down('panel[reference=materialPropertiesPanel]').query('panel[name=dynamicProperty]');
        var materialPropertyConfigurationList = [];

        for (var i = 0; i < list.length; i++) {
            var id = list[i].query('field[name=dynamicPropertyId]')[0].value;
            var name = list[i].query('field[name=dynamicPropertyName]')[0].value;
            materialPropertyConfigurationList.push({
                id: id,
                name: name
            });
        }

        return materialPropertyConfigurationList;
    },

    getReferencesProperties: function (){

        var list = this.down('panel[reference=referencesPropertiesPanel]').query('panel[name=dynamicProperty]');
        var referencePropertiesList = [];

        for (var i = 0; i < list.length; i++) {
            var id = list[i].query('field[name=dynamicPropertyId]')[0].value;
            var name = list[i].query('field[name=dynamicPropertyName]')[0].value;
            referencePropertiesList.push({
                id: id,
                name: name
            });
        }

        return referencePropertiesList;
    },

    setData: function (data){

        this.down('textfield[name=name]').setValue(data.name);
        this.down('textareafield[name=description]').setValue(data.description);

        if (data.parentCategory !== null) {
            this.down('combo[reference=parentCategory]').setValue(data.parentCategory.id);
            this.down('combo[reference=parentCategory]').setVisible(true);
        } else {
            this.down('combo[reference=parentCategory]').allowBlank = true;
            this.down('combo[reference=parentCategory]').setVisible(false);
            this.updateLayout();
        }

        // Item fill properties
        Ext.each(data.materialPropertyConfigurationList, function (propertyConf){
            var property = Ext.create('Dashboard.model.PropertyConfiguration', propertyConf);
            this.addProperty(property);
        }, this);

        // Ref. fill properties
        Ext.each(data.productReferencePropertyConfigurationList, function (propertyConf){
            var property = Ext.create('Dashboard.model.PropertyConfiguration', propertyConf);
            this.addProperty(property);
        }, this);

    },

    setThumbnail: function (tumb){

        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var img = Ext.ComponentQuery.query('categoryEdit image[name=thumbnailToEdit]')[0];

        if (tumb !== null) {
            thumbnailSrc = tumb;
        }

        img.setSrc(thumbnailSrc);
    },

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function (){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        values.id = this.record.id;
        values.name = (values.name).trim();
        if (this.down('combo[name=parentCategoryId]').hidden === true) {
            values.parentCategoryId = null;
        }

        //parentCategoryId
        var parentCategoryCombo = this.down('autocompleteComboBox[name=parentCategoryId]');        
        if(parentCategoryCombo.getSelectedRecord() === null){
            values.parentCategoryId = null;
        }

        values.materialPropertyConfigurationIdList = [];
        Ext.each(this.getMaterialProperties(), function (propertyConf){
            values.materialPropertyConfigurationIdList.push(propertyConf.id);
        });
        delete values.materialPropertyConfigurationList;

        values.productReferencePropertyConfigurationIdList = [];
        Ext.each(this.getReferencesProperties(), function (propertyConf){
            values.productReferencePropertyConfigurationIdList.push(propertyConf.id);
        });
        delete values.productReferencePropertyConfigurationList;

        if (this.record.picture !== undefined && this.record.picture.pictureSourceType === null) {
            delete this.record.picture;
        }

        if (this.record.picture !== undefined && this.record.picture.thumbnailName === '') {
            values.picture = {
                thumbnailName: '',
                pictureName: ''
            };
        }

        return values;
    }
});
