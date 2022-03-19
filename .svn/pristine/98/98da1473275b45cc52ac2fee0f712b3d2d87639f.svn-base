
/*  global Ext */

Ext.define('Dashboard.view.shared.viewList.EditExtendedRow', {
    extend: 'Ext.window.Window',
    xtype: 'viewListEditExtendedRow',
    requires: [
        'Dashboard.tool.Utilities'
    ],

    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    layout: 'fit',
    
    controller: 'viewListEditExtendedRow',
    mainController: null,
    modelProperties: null,
    
    record: null,
    property: null,
    
    initComponent: function() {
        
        this.title = getText('Extended row configuration');
        
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
            items:[]
        };
        
        
        var form = {
            xtype: 'panel',
            border:false,
            flex: 1,
            height: '100%',
            bodyPadding : '0 0 24 0',
            scrollable:'y',

            defaults: {
                width: '100%',
                ui: 'property-create',
                minHeight: 80,
                bodyPadding : '24',
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
        Ext.apply( me, {
        

            items: [
                {
                    xtype: 'form',
                    border:false,
                    width: 500,//950,
                    height: 350,//600,
                    layout: 'hbox',

                    items: [form],

                    buttons: [
                        {
                            text: getText('Save'),
                            disabled: false,
                            handler: 'onSaveRow'
                        },{
                            text: getText('Cancel'),
                            scope: this,
                            handler: this.close
                        }
                    ]                       
                }
            ]
        });

        this.callParent(arguments);
        
        if(this.record.isDynamic){ // dynamic property
            this.propertiesStore = Ext.create('Dashboard.store.properties.Properties', {
                autoLoad: true,
                listeners: {
                    scope: this,
                    beforeload: function (store, operation, eOpts) {
                        store.getProxy().extraParams.filter = [{
                                property: 'name',
                                value: this.record.dataIndex,
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
            
            
     displayFieldForm: function(record){
        
        //cleaning
        var container = this.lookupReference('fieldFormContainer');
        container.removeAll();
                
        var formComponent = {
            
            xtype: 'panel',
            tag: 'field',
            referenceHolder: true,
            width: '100%',
            layout: 'anchor',
            defaults: {
                labelSeparator: getText(':')
            },
            items: [    //add font color, font weigth, font size
                {
                    xtype: 'textfield',
                    name: 'label',
                    fieldLabel: getText('Label'),
                    reference: 'label',
                    value: record.text,
                    anchor: '100%'
                }
            ]
        };

        if(formComponent){
            container.add(formComponent);
        }
    },

    
    /**
     * Method used by the controller to get values
     * @return (object) data
     */
    getData: function(){
        
        var data = {};

        data.property = this.record.dataIndex;
        data.dataIndex = this.record.dataIndex;
        data.label = this.down('field[name=label]').getRawValue();
        data.text = data.label;
        data.fit = true;
        data.style = 'color:black; font-size:12px;';
        data.type = this.record.type;
        data.isDynamic = this.record.isDynamic;
        
        return data;
    }
    
});  