/* global Ext */

Ext.define('Dashboard.view.shared.filtering.ComboItemRefCatFilter',{
    extend: 'Ext.container.Container',
    xtype : 'filter.comboItemRefCatFilter',
    type: 'filter',
    
    require:[
        'Ux.ComboBox',
        'Dashboard.view.shared.component.AutocompleteComboBox',
        'Dashboard.store.Categories',
        'Dashboard.store.References',
        'Dashboard.store.Materials'
    ],
    
    config:{
        filterModel:null
    },
    
    layout: 'column',
    border: false,
    name: null,
    
    initComponent: function() {
        
        this.categoriesStore = Ext.create('Dashboard.store.Categories', {
            autoLoad: false,
            sorters: [{
                property: 'name',//fullPath',
                direction: 'ASC'
            }]
        });
        
        this.referencesStore = Ext.create('Dashboard.store.References', {
            autoLoad: false
        });
        
        this.materialsStore = Ext.create('Dashboard.store.Materials', {
            autoLoad: false
        });

        this.defaults = {
            xtype: 'autocompleteComboBox', //'ux-combo'
            valueField: 'id',
            width: 300,
            labelWidthAuto: true,
            labelSeparator: getText(':'),
            listeners: {
                "select" : function(ctrl, evt) {
                    ctrl.up('container[type=filter]').updateComboBox(ctrl);
                }
            }
        };

        this.items = [
            {
                name: 'productCategoryName',
                fieldLabel: getText('Category'),
                displayField: 'name',
                store: this.categoriesStore
            },
//            {
//                name: 'productCategoryAddress',
//                fieldLabel: getText('Category'),
//                displayField: 'fullPath',
//                valueField: 'fullPath',
//                width: 400,
//                store: this.categoriesStore
//            }, 
            {
                name: 'productReferenceCode',
                fieldLabel: getText('Ref. code'),
                displayField: 'referenceCode',
                store: this.referencesStore
            }, {
                name: 'productReferenceDesignation',
                fieldLabel: getText('Ref. designation'),
                displayField: 'designation',
                store: this.referencesStore
            }, {
                name: 'material',
                fieldLabel: getText('Item'),
                displayField: 'name',
                store: this.materialsStore
            }
        ];
        
        this.callParent();
    },
    
    
    updateComboBox: function (ctrl) {
                
        var materialCombo = this.down('combo[name=material]');
        var productReferenceCombo = this.down('combo[name=productReferenceCode]');
        var productReferenceDesCombo = this.down('combo[name=productReferenceDesignation]');
        var productCategoryCombo = this.down('combo[name=productCategoryName]'); //this.down('combo[name=productCategoryAddress]');   

        var record;

        switch (ctrl.name) {
            case 'productCategoryName' :  //'productCategoryAddress':
                productReferenceCombo.reset();            
                productReferenceDesCombo.reset();
                materialCombo.reset();
                break;
                
                case 'productReferenceCode':
                materialCombo.reset();
                var referenceId = productReferenceCombo.getValue();
                record = productReferenceCombo.findRecordByValue(referenceId).data;
                productCategoryCombo.setRawValue(record.productCategory.name); //fullPath
                productReferenceDesCombo.setRawValue(record.designation);
                break;

            case 'productReferenceDesignation':
                materialCombo.reset();
                var referenceId = productReferenceDesCombo.getValue();
                record = productReferenceDesCombo.findRecordByValue(referenceId).data;
                productReferenceCombo.setRawValue(record.referenceCode);
                productCategoryCombo.setRawValue(record.productCategory.name); //fullPath
                break;

            case 'material':
                var materialId = materialCombo.getValue();
                record = materialCombo.findRecordByValue(materialId).data; 
                productReferenceCombo.setRawValue(record.productReference.referenceCode);
                productReferenceDesCombo.setRawValue(record.productReference.designation);            
                productCategoryCombo.setRawValue(record.productReference.productCategory.name); //fullPath
                break;

            default:
                break;
        }
    },
    
    setFilterValue: function (value) {
        
        
        var combo = this.down('combo[name=material]');
        var store = combo.getStore();
        
//        var store = Ext.create('Dashboard.store.Materials', {
//            autoLoad: false
//        });

        store.load({
            callback: function (records, operation, success) {
                if (success === true) {
                    for (var i = 0; i < records.length; i++) {
                        if (records[i].data.name === value) {
                            var id = records[i].data.id;
                            combo.setValue(id);
                        }
                    }
                }
            }
        });        
    },
    
    setCategoryFilterValue: function (value) {
        
        //var materialId = null;
        var combo = this.down('combo[name=productCategoryName]');
        var store = combo.getStore();

        store.load({
            callback: function (records, operation, success) {
                if (success === true) {
                    for (var i = 0; i < records.length; i++) {
                        if (records[i].data.name === value) {
                            var id = records[i].data.id;
                            combo.setValue(id);
                        }
                    }
                }
            }
        });        
    },
    
    setReferenceCodeFilterValue: function (value) {
        
        var combo =  this.down('combo[name=productReferenceCode]');
        var store = combo.getStore();
        
        var productReferenceDesCombo = this.down('combo[name=productReferenceDesignation]');

        store.load({
            callback: function (records, operation, success) {
                if (success === true) {
                    for (var i = 0; i < records.length; i++) {
                        if (records[i].data.referenceCode === value) {
                            var id = records[i].data.id;
                            combo.setValue(id);
                            productReferenceDesCombo.setValue(id);
                        }
                    }
                }
            }
        });        
    },
    
    setReferenceDesignationFilterValue: function (value) {
        
        var combo =  this.down('combo[name=productReferenceDesignation]');
        var store = combo.getStore();

        store.load({
            callback: function (records, operation, success) {
                if (success === true) {
                    for (var i = 0; i < records.length; i++) {
                        if (records[i].data.designation === value) {
                            var id = records[i].data.id;
                            combo.setValue(id);
                        }
                    }
                }
            }
        });        
    },
                   
    getFilter: function(){
        
        var filters = [];
        var materialName = this.down('combo[name=material]').getRawValue();
        var referenceCode = this.down('combo[name=productReferenceCode]').getRawValue();
        var referenceDesignation = this.down('combo[name=productReferenceDesignation]').getRawValue();
        var categoryAddress = this.down('combo[name=productCategoryName]').getRawValue(); //this.down('combo[name=productCategoryAddress]').getRawValue();
        
        var materialProperty = 'name';
        var referenceCodeProperty = 'productReference.referenceCode';
        var referenceDesignationProperty = 'productReference.designation';
        var categoryProperty = 'productReference.productCategory.fullPath'; //'productReference.productCategory.fullPath';
        
        
        var filterData = this.getFilterModel().data;
        if(filterData.configuration.field){
            if(filterData.configuration.field.mapProperties){
                
                var mapProperties = filterData.configuration.field.mapProperties;
                
                materialProperty = mapProperties.material;
                referenceCodeProperty = mapProperties.productReferenceCode;
                referenceDesignationProperty = mapProperties.productReferenceDesignation;
                categoryProperty = mapProperties.category;
            }
         }
                
        if (materialName) {
            var material = this.buildFilter(materialProperty, materialName);
            filters.push(material);
            return filters;
        }

        if (referenceCode) {
            var productReferenceCode = this.buildFilter(referenceCodeProperty, referenceCode);
            filters.push(productReferenceCode);
            return filters;
        }

        if (referenceDesignation) {
            var productReferenceDesignation = this.buildFilter(referenceDesignationProperty, referenceDesignation);
            filters.push(productReferenceDesignation);
            return filters;
        }

        if (categoryAddress) {
            var productCategoryAddress = this.buildFilter(categoryProperty, categoryAddress);
            filters.push(productCategoryAddress );
            return filters;
        }

        return filters;
    },
            
            
    buildFilter: function(property, value, comparison){
        
        return {
            'property': property,
            'value': value,
            'type': 'STRING',
            'comparison': 'CONTAINS'
        };
    }

});