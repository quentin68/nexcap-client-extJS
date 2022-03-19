
Ext.define('Dashboard.view.system.device.Authorize', {
    extend: 'Ext.window.Window',
    xtype: 'deviceAuthorize',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    parentController: 'deviceMain',

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 350,
    //iconCls: 'fa fa-bullseye',
    plain : true,
    autoScroll: true,
    scrollable:'y',

    record:null,


    initComponent: function() {
        
        this.title = getText('Authorize');
        
        var formPanel = {
            xtype: 'panel',
            border: false,
            title: getText('Place'),
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'autocompleteComboBox',
                    name : 'position',
                    fieldLabel: getText('Position address'),
                    allowBlank: false,
                    queryParam : false, //to remove param "query"
                    displayField: 'name',
                    valueField: 'name',
                    requires : ['Dashboard.store.administration.Positions'],
                    store: Ext.create('Dashboard.store.administration.Positions', {
                        autoLoad: false,
                        sorters: [ {
                            property: 'name',
                            direction: 'ASC'
                        } ]
                    }),
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{path}/{name}',
                        '</tpl>'
                    )
                },
//                {
//                    xtype: 'autocompleteComboBox',
//                    name : 'position',
//                    fieldLabel: getText('Position address'),
//                    allowBlank: false,
//                    displayField: 'address',
//                    valueField: 'address',
//                    requires : ['Dashboard.store.administration.Locations'],
//                    store: Ext.create('Dashboard.store.administration.Locations', {
//                        autoLoad: false,
//                        sorters: [ {
//                            property: 'name',
//                            direction: 'ASC'
//                        } ]
//                    })
//                },
                {
                    xtype: 'textfield',
                    name : 'locationName',
                    fieldLabel: getText('New location name'),
                    hidden: true,
                    allowBlank: true
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
                    formPanel
                ]
            }
        ];
        
        
        this.buttons = [
            {
                text: getText('Save'),
                listeners:{ 
                    scope: this,
                    click: function( me , e , eOpts ){
                        this.parentController.onSubmitAuthorize(me);
                    }
                }
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];
        
        this.callParent(arguments);
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

    
    /**
     * Method used by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function(){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues(); 
                
        var data = {};
        
        var positionModel = this.down('combo[name=position]').getSelectedRecord();
        if (positionModel !== null) {
            data.positionName = positionModel.data.name;
            data.positionId = positionModel.data.id;
        }
        data.locationName = values.locationName;
        
        return data;
    }

});   