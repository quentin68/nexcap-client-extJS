Ext.define('Dashboard.view.settings.specificCheckConfig.Create', {
    extend: 'Ext.window.Window',
    xtype: 'specificCheckConfigCreate',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor'
    ],
    
    controller: 'specificCheckConfigMain',

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 550,
    iconCls: 'fa fa-cog',
    plain : true,
    autoScroll: true,
    scrollable:'y',
    record:null,
    referencesStore: null,
    categoriesStore: null,


    initComponent: function() {
        
        this.title = getText('Create a specific check');
       
        this.referencesStore = Ext.create(Ext.data.Store,{
            fields:['id', 'referenceCode', 'designation', 'productCategory', 'type']
        });
        
        this.referencesStore.setRemoteSort(false);
        this.referencesStore.sort([
            {
                property: 'referenceCode',
                direction: 'DESC'
            },
            {
                property: 'designation',
                direction: 'DESC'
            },
            {
                property: 'type',
                direction: 'DESC'
            }, {
                property: 'productCategory',
                direction: 'DESC'
            }
        ]);
        
        this.categoriesStore = Ext.create(Ext.data.Store,{
            fields:['id', 'name', 'description', 'parentCategory', 'hasReferences']
        });
        this.categoriesStore.setRemoteSort(false);
        this.categoriesStore.sort([
            {
                property: 'name',
                direction: 'DESC'
            },
            {
                property: 'description',
                direction: 'DESC'
            }, {
                property: 'parentCategory',
                direction: 'DESC'
            }, {
                property: 'hasReferences',
                direction: 'DESC'
            }
        ]);
        
         var specificCheckConfigPanel = Ext.create('Ext.panel.Panel',{
            border: false,
            title: getText('Specific check'),
            reference: 'specificCheckConfigPanel',
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'textfield',
                    name : 'name',
                    maxLength: 255,
                    allowBlank: false,
                    fieldLabel: getText('Name')
                }             
            ]
        });
        
         var specificCheckParagraphPanel = {
            
            xtype: 'panel',
            title: getText('Specific check paragraph'),
            reference: 'specificCheckParagraphPanel',
            bodyPadding: 20,
            ui: 'form-panel',
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
                    handler: 'onCreateSpecificCheckParagraph'
                }
            ]
        };
        
        var parentScope = this;

        function categorySort(store, direction, category) {
            var data = store.getData();
            var productCategoryNames = [];
            var rootCategory = null;

            data.items.forEach(function (item) {
                if (item.data[category] !== null) {
                    productCategoryNames.push(item.data[category].name);
                } else {
                    rootCategory = item.data;
                }
            });

            if (direction === 'ASC') {
                productCategoryNames.sort();
            } else {
                productCategoryNames.reverse();
            }

            // Sort store
            var sortedData = [];

            // Add root category first
            if (rootCategory !== null) {
                sortedData.push(rootCategory);
            }

            productCategoryNames.forEach(function (name) {
                data.items.forEach(function (item) {
                    if (item.data[category] !== null && item.data[category].name === name) {
                        sortedData.push(item);
                    }
                });
            });
            store.setData(sortedData);
        }
        
        var referencesPanel = {
            xtype: 'panel',
            title: getText('References'),
            reference: 'referencesPanel',
            collapsible: false,
            ui: 'form-panel',
            
            items: [
                {
                    xtype: 'container',
                    reference: 'references',
                    items:{
                        xtype: 'grid',
                        name: 'referencesGrid',
                        store: this.referencesStore,
                        multiSelect: true,
                        viewConfig: {
                            stripeRows: true
                        },
                        listeners: {
                            sortchange : function (ct, column, direction, eOpts){
                                if (column.dataIndex === 'productCategory') {
                                    categorySort(parentScope.referencesStore, direction, 'productCategory');
                                }
                            }
                        },
                        columns: [
                            { text: getText('Reference code'), dataIndex: 'referenceCode', flex:1 },
                            { text: getText('Designation'), dataIndex: 'designation', flex:1 },
                            { text: getText('Category'), dataIndex: 'productCategory', flex:1 , 
                                    renderer: function(productCategory){  
                                        return productCategory.fullPath; 
                                    }
                            },
                            { text: getText('Type'), dataIndex: 'type', flex:1 }
                        ],
                        height: '100%',
                        width: '100%'
                    }
                }

            ],
            
            tools: [
                {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onAssociate'
                },{
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onDissociate'
                }
            ]    
        };

        var categoriesPanel = {
            xtype: 'panel',
            title: getText('Categories'),
            reference: 'categoriesPanel',
            collapsible: false,
            ui: 'form-panel',
            
            items: [
                {
                    xtype: 'container',
                    reference: 'categories',
                    items:{
                        xtype: 'grid',
                        name: 'categoriesGrid',
                        store: this.categoriesStore,
                        multiSelect: true,
                        viewConfig: {
                            stripeRows: true
                        },
                        listeners: {
                            sortchange: function (ct, column, direction, eOpts) {
                                if (column.dataIndex === 'parentCategory') {
                                    categorySort(parentScope.categoriesStore, direction, 'parentCategory');
                                }
                            }
                        },
                        columns: [
                            { text: getText('Name'), dataIndex: 'name', flex:1 },
                            { text: getText('Description'), dataIndex: 'description', flex:1 },
                            { text: getText('Parent category'), dataIndex: 'parentCategory', flex:1, 
                                    renderer: function(parentCategory){    
                                        if(parentCategory === null){
                                            return '';
                                        }
                                        return parentCategory.name; 
                                    },
                                    getSortParam: function () {
                                        return 'parentCategory.name';
                                    },
                                    sortType: function (value) {
                                       return value;
                                    }
                            },
                            { text: getText('Has references'), dataIndex: 'hasReferences', flex:1 ,
                                    renderer: function(hasReferences){   
                                        if(hasReferences){
                                           return getText('Yes');
                                        }else{
                                            return getText('No');
                                        }                                        
                                    },
                                    sortType: function (value) {
                                        return value === getText('Yes');
                                    }
                            }
                        ],
                        height: '100%',
                        width: '100%'
                    }
                }

            ],
            
            tools: [
                {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onAssociateCategory'
                },{
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onDissociateCategory'
                }
            ]    
        };
        
        this.items = [ 
            {  
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width : 650,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable:'y',
                
                defaults:{
                    bodyPadding: 20,
                    ui: 'form-panel'
                },
                
                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },
                
                items : [
                    specificCheckConfigPanel,
                    specificCheckParagraphPanel,
                    referencesPanel,
                    categoriesPanel
                ]
            }
        ];
        
        
        this.buttons = [
            {
                text: getText('Export pdf'),
                action: 'exportPdf'
            },{
                text: getText('Save'),
                action: 'save'
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];
        
        this.callParent(arguments);        
    },
    
    addParagraph: function(model){

        var item = this.buildParagraph(model);
        this.down('panel[reference=specificCheckParagraphPanel]').add(item);
        
    },
    
    
    updateParagraph: function(currentPanel, model){
        var item = this.buildParagraph(model);
        var index = currentPanel.ownerCt.items.indexOf(currentPanel);
        currentPanel.ownerCt.remove(currentPanel);
        this.down('panel[reference=specificCheckParagraphPanel]').insert(index,item);
    },
    
    buildParagraph: function(model){
        
        var label = model.data.title;
        
        var paragraph = Ext.create('Ext.panel.Panel',{
            layout: 'hbox',
            margin: '0 0 12 0',
            name: 'dynamicParagraph',
            
            record: model,

            defaults:{
                submitValue: false,
                flex:1
            },

            items:[
                {
                    xtype: 'hiddenfield',
                    name: 'paragraphId',
                    value: model.data.id
                },{
                    xtype: 'hiddenfield',
                    name: 'type',
                    value: model.data.type
                },{
                    xtype: 'hiddenfield',
                    name: 'max',
                    value: model.data.max
                },{
                    xtype: 'displayfield',
                    name: 'title',
                    value: label ? label : ''
           
                },{
                    xtype: 'button',
                    ui: 'indicator',
                    name: 'upParagraph',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa-arrow-circle-o-up',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').getController().onUpParagraph(button, button.up('panel[name=dynamicParagraph]'));
                        }
                    }
                },{
                    xtype: 'button',
                    ui: 'indicator',
                    name: 'downParagraph',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa-arrow-circle-o-down',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').getController().onDownParagraph(button, button.up('panel[name=dynamicParagraph]'));
                        }
                    }
                },{
                    xtype: 'button',
                    ui: 'indicator-font-icon-button-minus',
                    name: 'editButton',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa fa-pencil',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').getController().onEditSpecificCheckParagraph(button, button.up('panel[name=dynamicParagraph]'), this.up('panel').record);
                        }
                    }
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
                    flex:0,
                    listeners:{
                        scope: this,
                        click: function(button, event, eOpts ){
                            this.confirmRemoveParagraph(button.up('panel[name=dynamicParagraph]'));
                        }
                    }
                }
            ]
        });
        
        return paragraph;
    },
    
    
    confirmRemoveParagraph: function(paragraph){
        
        var name = paragraph.record.data.title;
        
        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete paragraph ') + " \"" + name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    paragraph.ownerCt.remove(paragraph);        
                }
            }
        }); 
    },
   
    
    getParagraph: function(isReportPdf){

        var list = this.down('panel[reference=specificCheckParagraphPanel]').query('panel[name=dynamicParagraph]');
        var paragraphList = [];
        
        for(var i=0; i<list.length; i++){
            var type = list[i].query('field[name=type]')[0].value;
            var title = list[i].query('field[name=title]')[0].value;
            var max = list[i].query('field[name=max]')[0].value;
            var controls = [];
            if(!isReportPdf){
                controls = list[i].record.data.controls;
            }else{
                Ext.each(list[i].record.data.controls, function (control) {
                controls.push({
                    propertyName: control.propertyName,
                    controlType: control.controlType,
                    label: control.label,
                    value: control.options !== "" ? control.options : control.properties,
                    comment: control.comment
                });
            }, this);
            }
            paragraphList.push({
                                  type:type, 
                                  title:title, 
                                  max: max,
                                  controls: controls
                              });
        }
        
        return paragraphList;
    },
    /**
     * Method specificCheckConfig by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function(){

       var winForm = this.down('form').getForm();
       var values = winForm.getValues(); 
        
        values.specificForm = this.getParagraph(false);
        
        var references = this.down('grid[name=referencesGrid]').store.data.items;
        
        if(references){
            values.productReferenceIds = [];
            Ext.each(references, function(raw) {
                values.productReferenceIds.push(raw.data.id);
            });
        }
        
        var categories = this.down('grid[name=categoriesGrid]').store.data.items;
        
        if(categories){ 
            values.productCategoryIds = [];
            Ext.each(categories, function(raw) {
                values.productCategoryIds.push(raw.data.id);
            });
        }
        return values;
    },
    
    getDataExport: function(){
       var winForm = this.down('form').getForm();
       var values = winForm.getValues(); 
       var paragraph = this.getParagraph();
       if (Ext.decode(paragraph, true) === null) {        
            paragraph =  Ext.encode(paragraph);
        }
        values.fields = Ext.encode(this.getParagraph(true));
        var references = this.down('grid[name=referencesGrid]').store.data.items;        
        if (references[0]) {
            values.productReferenceCode = references[0].data.referenceCode;
            values.productReferenceDesignation = references[0].data.designation;

        } else {
            values.productReferenceCode = '';
            values.productReferenceDesignation = '';
        }
        values.executionDate = Ext.Date.format(new Date(), 'c');
        values.deviceName = "deviceName";
        values.operator = "operator";
        values.materialName = "materialName";
        values.isRight = true;
        
        return values;
    }

});   