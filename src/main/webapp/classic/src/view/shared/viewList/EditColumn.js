/*  global Ext */

Ext.define('Dashboard.view.shared.viewList.EditColumn', {
    extend: 'Ext.window.Window',
    xtype: 'viewListEditColumn',
    requires: ['Dashboard.tool.Utilities'],

    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    layout: 'fit',

    controller: 'viewListEditColumn',
    mainController: null,
    modelProperties: null,

    record: null,
    property: null,

    initComponent: function (){

        this.title = getText('Column configuration');

	var selectPropertyPanel = {
	    xtype : 'panel',
	    title : getText('Property'),
	    reference : 'selectPropertyPanel',
	    iconCls : 'fa fa-info',
            defaults: {
                labelSeparator: getText(':')
            },
	    items : [ 
                {
                    xtype : 'displayfield',
                    name : 'property',
                    fieldLabel : getText('Property')
                } 
            ]
	};

        var configuration = {
            xtype: 'panel',
            title: getText('Configuration'),
            iconCls: 'fa fa-cog',
            reference: 'fieldFormContainer',
            items: []
        };

        var form = {
            xtype: 'panel',
            border: false,
            flex: 1,
            height: '100%',
            bodyPadding: '0 0 24 0',
            scrollable: 'y',

            defaults: {
                width: '100%',
                ui: 'property-create',
                minHeight: 80,
                bodyPadding: '24',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                }
            },
            items: [
                selectPropertyPanel, 
                configuration
            ]
        };

        var me = this;
        Ext.apply(me, {

            items: [
                {
                    xtype: 'form',
                    border: false,
                    width: 500,//950,
                    height: 350,//600,
                    layout: 'hbox',

                    items: [form],

                    buttons: [
                        {
                            text: getText('Save'),
                            disabled: false,
                            handler: 'onSaveColumn'
                        }, {
                            text: getText('Cancel'),
                            scope: this,
                            handler: this.close
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
                
        if(this.record.propertyName){ // dynamic property
            this.propertiesStore = Ext.create('Dashboard.store.properties.Properties', {
                autoLoad: true,
                listeners: {
                    scope: this,
                    beforeload: function (store, operation, eOpts) {
                        store.getProxy().extraParams.filter = [{
                                property: 'name',
                                value: this.record.propertyName,
                                type: 'STRING',
                                comparison: 'EQ'
                            }];
                    },
                    load: function (store, operation, eOpts) {
                        if (store.getProxy().extraParams.filter) {
                            store.getProxy().extraParams.filter = [];
                        }
                        this.property = store.getData().items[0].data;
                        this.onPropertyLoaded(store);
                        this.down('displayfield[name=property]').setValue(this.property.label);
                    }
                }
            });
            
        }else{ // classic property
        
            var properties = this.modelProperties;
            for(var i=0; i<properties.length; i++){
                if(properties[i].name === this.record.dataIndex){
                    this.property = properties[i];
                    break;
                }
            }
            
            this.onFormRender();
            this.down('displayfield[name=property]').setValue(getText(this.property.label));
        }
                

    },
    
    onPropertyLoaded: function(sender){
        this.displayFieldForm(this.record);
    },

    onFormRender: function (sender){
        this.displayFieldForm(this.record);
    },

    displayFieldForm: function (record){

        //cleaning
        var container = this.lookupReference('fieldFormContainer');
        container.removeAll();
        //var isDynamic = record.propertyConfigurationType;

        var formComponent = {

            xtype: 'panel',
            tag: 'field',
            referenceHolder: true,
            width: '100%',
            layout: 'anchor',

            defaults: {
                labelSeparator: getText(':')
            },

            items: [//add font color, font weigth, font size
                {
                    xtype: 'textfield',
                    name: 'text',
                    fieldLabel: getText('Title'),
                    reference: 'text',
                    value: record.text,
                    anchor: '100%'
                }, {
                    xtype: 'textfield',
                    name: 'propertyName',
                    reference: 'propertyName',
                    value: record.propertyName,
                    hidden: true
                }, {
                    xtype: 'numberfield',
                    name: 'width',
                    fieldLabel: getText('Width'),
                    reference: 'width',
                    allowDecimals: false,
                    value: record.width,
                    maxValue: 600,
                    minValue: 30
                }, {
                    xtype: 'checkboxfield',
                    name: 'flex',
                    fieldLabel: getText('Size auto'),
                    inputValue: true,
                    checked: record.flex,
                    listeners: {
                        render: function (me, eOpts){
                            var widthField = me.up('form').down('numberfield[name=width]');
                            widthField.setDisabled(me.checked);
                        },
                        change: function (me, eOpts){
                            var widthField = me.up('form').down('numberfield[name=width]');
                            widthField.setDisabled(eOpts);
                        }
                    }
                }, {
                    xtype: 'checkboxfield',
                    name: 'cellWrap',
                    fieldLabel: getText('Cell wrap'),
                    inputValue: true,
                    checked: record.cellWrap ? true : false
                }, {
                    xtype: 'checkboxfield',
                    name: 'sortable',
                    fieldLabel: getText('Sortable'),
                    inputValue: false,
                    checked: record.sortable ? true : false
                }, {
                    xtype: 'checkboxfield',
                    name: 'hidden',
                    fieldLabel: getText('Hidden'),
                    inputValue: true,
                    checked: record.hidden ? true : false
                }, {
                    xtype: 'checkboxfield',
                    name: 'lockable',
                    fieldLabel: getText('Lockable'),
                    inputValue: true,
                    checked: record.lockable ? true : false
                }, {
                    xtype: 'checkboxfield',
                    name: 'locked',
                    fieldLabel: getText('Locked'),
                    inputValue: true,
                    checked: record.locked ? true : false
                }
            ]
        };

        if (formComponent) {
            container.add(formComponent);
        }
    },
    
    

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data
     */
    getData: function (){

        var data = {};
        
        //data.property = this.property;
        data.text = this.down('field[name=text]').getRawValue();
        data.width = this.down('field[name=width]').getValue();
        data.flex = this.down('field[name=flex]').checked;
        data.cellWrap = this.down('field[name=cellWrap]').checked;
        data.sortable = this.down('field[name=sortable]').checked;
        data.hidden = this.down('field[name=hidden]').checked;
        data.lockable = this.down('field[name=lockable]').checked;
        data.locked = this.down('field[name=locked]').checked;
        data.type = this.record.type;
        var dataIndex = null;
        
        if (this.property.propertyConfigurationType) {
            dataIndex = 'properties';
            data.renderer = Ext.Function.pass(this.getPropertyValue, this.property.name);
            data.isDynamic = true;
            data.propertyName = this.record.propertyName;
        }else {
	    dataIndex = this.record.dataIndex;
	}
        
        data.dataIndex = dataIndex;

        try {
            data.property = {
                name: this.property.name,
                type: this.property.field.dataType || this.property.field.fieldType
            };
        } catch (ex) {
            // nothing
        }

        return data;
    },

    getPropertyValue: function (propertyName, properties, metaData, record){
        var val;
        if (properties[(propertyName)]) {
            val = properties[(propertyName)].value;
        }
        return val;
    }

});