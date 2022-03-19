
Ext.define('Dashboard.view.shared.filtering.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'filteringEdit',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.property.TextFieldForm',
        'Dashboard.view.shared.property.TextAreaForm',
        'Dashboard.view.shared.property.NumberFieldForm',
        'Dashboard.view.shared.property.DateFieldForm',
        'Dashboard.view.shared.property.TimeFieldForm',
        'Dashboard.view.shared.property.DateTimeFieldForm',
        'Dashboard.view.shared.property.ComboBoxForm',
        'Dashboard.view.shared.property.CheckBoxForm',
        'Dashboard.view.shared.property.RadioGroupForm',
        'Dashboard.view.shared.property.TagFieldForm'
    ],
    

    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    layout: 'fit',
    
    controller: 'filteringEdit',
    
    mainController: null,
    record: null,
    

    initComponent: function() {
        
        var fieldTypes = Ext.create('Dashboard.store.properties.FieldTypes');
        
        this.title = getText('Edit property');
        
        var charasteristics = {
            xtype: 'panel',
            title: getText('Characteristics'),
            reference: 'characteristics',
            iconCls: 'fa fa-info',
            items:[
                {
                    xtype: 'combo',
                    name: 'fieldType',
                    reference: 'fieldType',
                    fieldLabel: getText('Field type'),
                    store: fieldTypes,
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'name',
                    editable: false,
                    allowBlank: false,
                    listeners:{
                        'select': 'onFieldTypeSelected'
                    }
                },{
                    xtype      : 'fieldcontainer',
                    fieldLabel : getText('Owners'),
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1,
                        disabled:true
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel  : getText('Items property'),
                            name      : 'valorisation',
                            reference : 'valorisationItems',
                            inputValue: 'items',
                            checked   : true
                        },{
                            boxLabel  : getText('References property'),
                            name      : 'valorisation',
                            reference : 'valorisationReferences',
                            inputValue: 'references'
                        }
                    ]
                }
            ]
        };
        
        
        var configuration = {
            
            xtype: 'panel',
            title: getText('Configuration'),
            iconCls: 'fa fa-cog',
            reference: 'fieldFormContainer',
            items:[
//                {
//                    xtype: 'textFieldForm'
//                }
            ]
        };
        
        
        var options = {
            xtype: 'panel',
            title: getText('Default options'),
            iconCls: 'fa fa-cog',
            reference: 'optionContainer',
            defaults:{
                xtype: 'checkbox',
                checked: true
            },
            items:[
                {
                    boxLabel: getText('Editable value'),
                    name: 'isEditable',
                    reference: 'isEditable',
                    inputValue: true
                },{
                    boxLabel: getText('Displayed'),
                    name: 'isDisplayed',
                    reference: 'isDisplayed',
                    inputValue: true
//                },{
//                    boxLabel: getText('Required'), //saisie obligatoire
//                    name: 'required',
//                    inputValue: true
                },{
                    boxLabel: getText('Usable in tables'),
                    name: 'enabledInTables',
                    reference: 'enabledInTables',
                    inputValue: true
                },{
                    boxLabel: getText('Usable in details'),
                    name: 'enabledInDetails',
                    reference: 'enabledInDetails',
                    inputValue: true
                },{
                    boxLabel: getText('Usable in filters'),
                    name: 'enabledInFilters',
                    reference: 'enabledInFilters',
                    inputValue: true
                },{
                    boxLabel: getText('Usable in controls'),
                    name: 'enabledInControls',
                    reference: 'enabledInControls',
                    inputValue: true
                }
            ]
        };
        
        
        var preview = {
            xtype: 'panel',
            ui: 'property-create',
            title: getText('Preview'),
            iconCls: 'fa fa-check',
            reference: 'previewContainer',
            //bodyPadding : 24,
            layout: 'center',
            flex:1,
            height: '100%',
            bodyStyle: {
                background: '#F2F2F2', //extraLight
                padding: '24px'
            },
            items:[
                {
                    html: '<span><b>' + getText('Select a field type') +'</b></span>'
                }
            ]
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
                charasteristics,
                configuration,
                options
            ]                       
        };
        
        
        var me = this;
        Ext.apply( me, {
        

            items: [
                {
                    xtype: 'form',
                    border:false,
                    width: 950,
                    height: 600,
                    layout: 'hbox',

                    items: [
                        form,
                        preview
                    ],

                    buttons: [
                        {
                            text: getText('Save'),
                            disabled: false,
                            handler: 'onSaveProperty'
                        },
                        {
                            text: getText('Cancel'),
                            scope: this,
                            handler: this.close
                        }
                    ]                       
                }
            ]
        });

        this.callParent(arguments);

    },   
    
    
    setData: function(property){
        
        this.record = property;
        
        var field = property.data.control.field;
        var conf = property.data.control.configuration;
        
        this.down('form').getForm().setValues(conf);
        
        this.lookupReference('fieldType').setValue(field.fieldType);
        
        if(conf.valorisation === 'items'){
            this.lookupReference('valorisationItems').setValue(true);
        }else if(conf.valorisation === 'references'){
            this.lookupReference('valorisationReferences').setValue(true);
        }
        
        this.getController().onFieldTypeSelected(this.down('combo[name=fieldType]'), field);
    
    },

    
    /**
     * Method used by the controller to get values
     * @return (object) data
     */
    getData: function(){
        
//        var winForm = this.down('form').getForm();
//        var values = winForm.getFieldValues();

        var values = this.down('form').getValues();
        
        var field = this.down('panel[tag=field]').getData();
        
        var data = {
            id: this.record.data.id,
            name: field.name,
            label: field.fieldLabel,
            type: field.dataType,
            displayed: values.isDisplayed,
            editable: values.isEditable,
            control: {
                field: field,
                configuration: values
            }
        };
        
        return data; 
    }
    
});  


//private Long id;
// private String name;
// private String label;
// private PropertyType type; 
// private boolean isEditable;
// private boolean isDisplayed;
// private String control;
// private List<PropertyConfigurationOptionDto> options;