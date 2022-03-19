/*  global Ext, CODETYPE */

Ext.define('Dashboard.view.shared.component.AddCodeWindow', {
    extend: 'Ext.window.Window',
    xtype: 'addCodeWindow',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.enums.CodeType'
    ],

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 350,
    width: 550,
    iconCls: 'fa fa-rss',
    plain : true,
    autoScroll: true,
    scrollable:'y',
    
    title: null,
    vtype: null,
    accept: null,
    controller: null,
    codeTypesStore: null,

    initComponent: function() {
        
        if(!this.title){
            this.title = getText('Add RFID code');
        }
                        
        this.codeTypesStore = Ext.create('Dashboard.store.enums.CodeType');

        var comboCodeTypes = {
            xtype: 'combo',
            name: 'codeType',
            reference: 'comboCodeTypes',
            fieldLabel: getText('Code type'),
            displayField: 'localizedLabel',
            valueField: 'value',
            value: 'RFID_TAG',
            allowBlank: false,
            queryParam: false,
            store: this.codeTypesStore,
            forceSelection: true,
            listeners: {
                scope: this,
                focus: function(me){
                     if (!me.isExpanded) {
                        me.expand();
                    }
                    me.getPicker().focus();
                },
                change: function(me, newValue, oldValue, eOpts){
                    
                    var properties = {
                        minLength: 24,
                        maxLength: 28,
                        vtype: 'alphanumeric',
                        afterSubTpl: '<p><i class="greyLabel">' + getText('Before scanning RFID tag, place your cursor in the above code textfield') + '</i></p>'
                    };

                    if(newValue === "RFID_TAG"){
                        //default
                        
                    }else if(newValue === "ALPHANUM_INPUT"){
                        properties.minLength = 1;
                        properties.maxLength = 255;
                        properties.afterSubTpl = null;
                        
                    }else {
                        properties.minLength = 1;
                        properties.maxLength = 255;
                        properties.vtype = null;
                        properties.afterSubTpl = null;
                    }
                    
                    var code = this.down('textfield[name=code]').getValue();
                    this.updateCodeField(properties, code);
                }
            }
        };
        
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 20,
                border: false,
                width: 500,
                height: 400,
                
                fieldDefaults: {
                    labelWidth: 112,
                    width: '100%',
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },

                items: [
                    comboCodeTypes,
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        reference: 'codeContainer',
                        items:[
                            {
                               xtype: 'textfield',
                               name: 'code',
                               enableKeyEvents: true,
                               selectOnFocus: true,
                               afterSubTpl: '<p><i class="greyLabel">' + getText('Before scanning RFID tag, place your cursor in the above code textfield') + '</i></p>',
                               flex: 1,
                               margin: '0 6 0 0',
                               allowBlank: false,
                               maxLength: 28,
                               minLength: 24,
                               vtype: 'alphanumeric',
                               listeners:{
                                   render: function(me){
                                       me.focus();
                                   }
                               }
                           }
                        ]
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Add'),
                action: 'addCode'
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];
        this.callParent(arguments);
    },
    
    
    updateCodeField: function(properties, code){
        
        var codeField =  {
            xtype: 'textfield',
            name: 'code',
            enableKeyEvents: true,
            selectOnFocus: true,
            afterSubTpl: properties.afterSubTpl,
            flex: 1,
            margin: '0 6 0 0',
            allowBlank: false,
            maxLength: properties.maxLength,
            minLength: properties.minLength,
            vtype: properties.vtype,
            value: code,
            listeners:{
                render: function(me){
                    me.focus();
                }
            }
        };
        
        var target = this.down('container[reference=codeContainer]');
        target.removeAll();
        target.add(codeField);
        
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
            var text = '';
            if(invalidFields[i].fieldLabel !== undefined){
                text += invalidFields[i].fieldLabel + " > ";
            }

            messages.push( text + invalidFields[i].activeErrors[0]);
        }
        
        Ext.Msg.show({
            title: getText('Errors'),
            message: messages.join('<br>'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });

        return invalidFields;
    },
    
    
    setData: function (data){
        
        if(data){
            this.down('combo[name=codeType]').setValue(data.codeType);

            Ext.defer(function(){
                this.down('textfield[name=code]').setValue(data.code);
            }, 100, this);
        }
        
    },
    
    
    /**
     * Method used by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function(){        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
                
        if(values.codeType === 'RFID_TAG'){
            
            if (values.code.length > 24) {
                values.code = values.code.slice(-24); // Keep last 24 chars
            }
            values.code = (values.code).toUpperCase();
        }
        
        var comboTypeCodeValue = this.down('combo[name=codeType]').getSelection();
        
        var code = {
            codeType: comboTypeCodeValue.data.value,
            code: values.code,
            codeTypeLabel: getText(comboTypeCodeValue.data.label)
        };
        
        return code;
    }

});   