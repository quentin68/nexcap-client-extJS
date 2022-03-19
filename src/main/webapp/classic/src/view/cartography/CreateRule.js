Ext.define('Dashboard.view.cartography.CreateRule', {
    extend : 'Ext.window.Window',
    xtype : 'createRule',
    requires : [ 
        'Dashboard.tool.Utilities',
        'Ux.Panel'
    ],

    autoShow : false,
    closable : true,
    resizable : true,
    modal : true,
    constrain : true,
    closeAction : 'destroy',
    layout : 'fit',

    controller : 'createRule',
    mainController : null,
    modelProperties : null,

    config : {
        propertiesStore : null,
	localPropertiesStore :  null
    },

    initComponent : function() {

	this.title = getText('Create new displaying rule');
                
        var configMap = Ext.ComponentQuery.query('cartographyConfigMap')[0];

	this.setPropertiesStore(configMap.config.propertiesStore);
	this.setLocalPropertiesStore(configMap.config.localPropertiesStore);


	var newRule = {
	    xtype : 'panel',
	    title : getText('New Rule'),
	    reference : 'newRule',
	    iconCls : 'fa fa-magic',
	    items : [ 
                {
                    xtype : 'combo',
                    name : 'property',
                    fieldLabel : getText('Property'),
                    store : this.getLocalPropertiesStore(),
                    labelWidth: 112,
                    queryMode : 'local',
                    displayField : 'label',
                    valueField : 'name',
                    editable : true,
                    allowBlank : false,
                    forceSelection : true,
                    listeners : {
                        'select' : 'onPropertySelected'
                    }
                }, {
                    xtype : 'panel',
                    reference : 'fieldFormContainer',
                    items : []
                }
            ]
	};

//	var form = {
//	    xtype : 'panel',
//	    border : false,
//	    flex : 1,
//	    height : '100%',
//	    bodyPadding : '0 0 24 0',
//	    scrollable : 'y',
//	    defaults : {
//                xtype: 'panel',
//                ui: 'form-panel',
//                bodyPadding: 20,
//                border: false,
//                width: '100%'
////		width : '100%',
////		ui : 'property-create',
////		minHeight : 80,
////		bodyPadding : '24',
////		layout : 'anchor',
////		defaults : {
////		    anchor : '100%'
////		}
//	    },
//            fieldDefaults: {
//                    labelWidth: 112,
//                    width: '100%',
//                    labelSeparator: getText(':'),
//                    margin: '0 0 12 0'
//                },
//	    items : [ 
//                newRule
//            ]
//	};

	var me = this;
	Ext.apply(me, {

	    items : [ {
		xtype : 'form',
		border : false,
		width : 500,// 950,
		height : 350,// 600,
		//layout : 'hbox',
                scrollable: 'y',
                defaults: {
                    xtype: 'panel',
                    ui: 'form-panel',
                    bodyPadding: 20,
                    border: false,
                    width: '100%'
                },
                fieldDefaults: {
                    labelWidth: 112,
                    width: '100%',
                    labelSeparator: getText(':'),
                    margin: '0 0 12 0'
                },

		items : [
                    newRule 
                ],

		buttons : [ 
                    {
                        text : getText('Add'),
                        disabled : false,
                        //handler : 'onSaveNewRule'
                        listeners:{
                            scope:this,
                            click: function(sender, e){
                                this.mainController.onSaveNewRule(sender);
                            }
                        }
                    }, {
                        text : getText('Cancel'),
                        scope : this,
                        handler : this.close
                    } 
                ]
	    } ]
	});

	this.callParent(arguments);

    },
    
    
    getTextField: function(){
        var field = {
            xtype: 'textfield',
            fieldLabel : getText('Value'),
            name: 'valueField',
            allowBlank : false,
            reference : 'textField'
        };
        return field;
    },
    
    
    getIntField: function(){
        var field = {
            xtype : 'numberfield',
            fieldLabel : getText('Value'),
            reference : 'intField',
            name : 'valueField',
            allowBlank: false,
            value : 0,
            step: 1,
            allowDecimals: false
        };
        return field;
    },
    
    
    getNumberField: function(){
        var field = {
            xtype : 'numberfield',
            fieldLabel : getText('Value'),
            reference : 'numberField',
            name : 'valueField',
            value : 0,
            step: 1,
            decimalSeparator: ',',
            allowDecimals: true,
            allowBlank: false
        };
        return field;
    },
    
    
    getDateField: function(){
        var field = {
            xtype : 'datefield',
            fieldLabel : getText('Value'),
            reference : 'dateField',
            name : 'valueField',
            format: getText('m/d/Y')
        };
        return field;
    },
    
    getBooleanField: function(){
        var field = {
            xtype: 'radiogroup',
            fieldLabel : getText('Value'),
            reference : 'booleanField',
            name : 'valueField',
            items: [
                { 
                    boxLabel: getText('Yes'), 
                    name: 'valueField',
                    inputValue: true,
                    checked: true
                },{ 
                    boxLabel: getText('No'),
                    name: 'valueField',
                    inputValue: false
                }                       
            ]
        };
        return field;
    },

    
    getResultPanel: function(){
        
//        var path = Dashboard.config.Config.CONTEXT_PATH + 'resources/images/icons/256/';
        var path = 'resources/images/icons/256/';
        
        var resultPanel = {
            xtype: 'container',
            //title: getText('Result'),
            layout : 'hbox',
            items:[
                {
                   xtype: 'displayfield',
                   fieldLabel : getText('Result'),
                   width: null
                },{
                        xtype: 'ux-panel',
                        border:true,
                        width: 72,
                        bodyStyle:{
                            background:"#08a51f"
                        },
                        items:[
                            {
                                xtype: 'ux-img',
                                shrinkWrap:true,
                                src: path + 'fa-rss-square.png',
                                width:32,
                                height:32,
                                margin: '20',
                                name: 'iconSrc',
                                listeners:{
                                    scope:this,
                                    click: function(sender, e){
                                        this.mainController.onIconPicker(sender);
                                        e.stopPropagation();
                                    }
                                }
                            }
                        ],
                        listeners:{
                            scope:this,
                            click: function(sender, e){
                                this.mainController.onColorPicker(sender);
                            }
                        }
                    }, {
                        xtype: 'hiddenfield',
                        name: 'color',
                        allowBlank: true,
                        value: '#08a51f'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'icon',
                        allowBlank: true,
                        value: path  + 'fa-rss-square.png'
                    }
                
//                {
//                    xtype: 'panel',
//                    layout: 'hbox',
//                    reference: 'color',
//                    hidden: true,
//                    items:[
//                        {
//                            xtype:'displayfield',
//                            fieldLabel: getText('Color'),
//                            margin: '0 6 0 0',
//                            submitValue: false,
//                            labelWidth: 112,
//                            width: 112
//                        },{
//                            xtype: 'ux-panel',
//                            reference: 'colorRec',
//                            border: true,
//                            width: 32, 
//                            height: 32,
//                            bodyStyle:{
//                                background: "#F3F3F3"
//                            },
//                            listeners:{
//                                scope:this,
//                                click: function(me){
//                                    this.mainController.onColorPicker(me);
//                                }
//                            },
//                            margin: 0
//                        },{
//                            xtype: 'hiddenfield',
//                            name: 'color',
//                            value: '#000'
//                        }
//                    ]
//                }
            ]
        };
        
        return resultPanel;
        
    },
    

    /**
     * Method used by the controller to get values
     * 
     * @return (object) filter
     */
    getData : function() {

	var values = this.down('form').getValues();
	var label = this.down('combo[name=property]').getRawValue();
	var property = this.down('combo[name=property]').getSelection();
        var propertyValueType = property.data.type;

//	if (values.label) {
//	    label = values.label;
//	}

        var field = null;
        if (property.data.control !== undefined) {
            field = property.data.control.field;
        }

        if (property.data !== undefined) {
            if (field === null) {
                field = {};
            }
            field.label = property.data.label;
        }
        
	var data = {
	    name : values.property,
	    label : label,
	    type : propertyValueType,//values.filterType,
	    comparison : values.comparison,
            value:  values.valueField,
            color: values.color,
            iconSrc: values.icon
	};

	if (property.data.propertyConfigurationType !== undefined) {
	    data.isDynamicProperty = true;
	}
        
        if (property.data.propertyConfigurationType) {
            data.propertyConfigurationType = property.data.propertyConfigurationType;
        }
        
	return data;
    }

});