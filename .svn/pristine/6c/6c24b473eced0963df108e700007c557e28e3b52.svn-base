/* global Ext */

Ext.define('Dashboard.view.setting.serverConfig.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'serverConfigEdit',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor'
    ],
    
    controller: 'serverConfigMain',

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 550,
    iconCls: 'fa fa-wrench',
    plain : true,
    autoScroll: true,
    scrollable:'y',

    record:null,

    
    initComponent: function () {

        this.title = getText('Edit a configuration');

        var configServerPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            title: getText('Configuration'),
            reference: 'configServerPanel',
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            },
            items: [
                {
                    xtype: 'displayfield',
                    name: 'domain',
                    fieldLabel: getText('Name')
                }, {
                    xtype: 'displayfield',
                    name: 'key',
                    fieldLabel: getText('Key')
                }
            ]
        });


        this.items = [
            {
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
                    configServerPanel
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
        this.setData(this.record);
        if (this.record.typeData === 'featuresConfig') {
            this.loadFeaturesConfig(this.record);
        }
    },
    
   addValueField: function(data){
        var item = this.buildValueField(data);
        this.down('panel[reference=configServerPanel]').add(item);
    },
    
    buildValueField: function (data) {
            
        var property = null;
        
        if(data.key === 'language' || data.key === 'locale'){
            
            var checked = true;
            if(data.value === 'en_US'){
                checked = false;
            }
            
            property = {
                xtype: 'radiogroup',
                fieldLabel: getText('Language'),
                //columns: 2,
                vertical: false,
                items: [
                    { boxLabel: 'en_US', name: 'value', inputValue: 'en_US', checked: !checked },
                    { boxLabel: 'fr_FR', name: 'value', inputValue: 'fr_FR', checked: checked}
                ]
            };
            
            return property;
        }
        
        switch (data.typeData) {
            
            case 'integer':
                property = Ext.create('Ext.form.field.Number', {
                    name: 'value',
                    value: data.value,
                    fieldLabel: getText('Value'),
                    minValue: 0

                });
                break;
            case 'featuresConfig':
                property = Ext.create('Ext.panel.Panel', {
                    ui: 'form-panel',
                    name: 'featuresConfigPanel',
                    autoScroll: true,
                    title: getText('Value')
                });
                break;
            default:
                property = {
                    xtype: 'textarea',
                    name: 'value',
                    value: data.value,
                    maxLength: 4096,
                    allowBlank: false,
                    fieldLabel: getText('Value')
                };
        }

        return property;
    },
    
    inlineFeaturesConfig: function (data) {
        var arr = [];
        for (var key in data.value) {
            if (data.value.hasOwnProperty(key)) {
                var temp = {};
                temp['name'] = key;
                temp['value'] = data.value[key];
                arr.push(temp);
            }
        }
        return arr;
    },
    
    createFeatureStore: function (items) {
        var featuresStore = Ext.create('Dashboard.store.settings.FeaturesConfig');
        featuresStore.data.clear();
        
        for (var i = 0; i < items.length; i++) {
            featuresStore.insert(i,{
                name: items[i].name,
                label: items[i].name,
                checked: items[i].value
            });
        }

        return featuresStore;
    },
    
    loadFeaturesConfig: function (data) {
        var items = this.inlineFeaturesConfig(data);
        var featuresStore = this.createFeatureStore(items);
        this.setFeatureSelector(featuresStore.data.items);
    },

    setFeatureSelector: function (features) {
        var panel = Ext.ComponentQuery.query('panel[name="featuresConfigPanel"]')[0];
        for (var i = 0; i < features.length; i++) {
            panel.add(this.buildCheckBoxField(features[i], this.record.value[features[i].data.name]));
        }
    },
    
    buildCheckBoxField: function(feature, checked){
        return {
            xtype: 'checkbox',
            checked: checked,
            border: false,
            anchor: '100%',
            margin: '3 6 0 6',
            boxLabel: feature.data.label,
            name: 'feature',
            inputValue: feature.data.name,
            scope: this
        };       
    },
    
    /**
     * Method used by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function(){ 
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        values.domain = this.record.domain;
        values.key = this.record.key;   
        
        if (this.record.typeData === 'featuresConfig') {
            var featuresConfig = {};
            var records = this.query('checkbox[name=feature]');
            Ext.Array.each(records, function (rec) {
                if (rec.inputValue) {
                    var name = rec.inputValue;
                    featuresConfig[name] = rec.checked;
                }
            });
            values.value = Ext.encode(featuresConfig);
        }
        
        return values;
    },            
            
    setData: function(data){
        
       this.down('form').getForm().setValues(data);
       this.addValueField(data);
    }

});   