/* global Ext */

Ext.define('Dashboard.view.administration.location.Create', {
    extend: 'Ext.window.Window',
    xtype: 'locationCreate',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor'
        //'Dashboard.view.administration.user.UsersGridPanel'
    ],
    
    controller: 'positionMain',

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 550,
    iconCls: 'fa fa-map-marker',
    plain : true,
    autoScroll: true,
    scrollable:'y',

    record:null,
    
    usersStore: null,
    propertiesConfiguration: null,

    initComponent: function() {
        
        this.title = getText('Create a location');
        
        this.positionsStore = Ext.create('Dashboard.store.administration.Positions', {
            autoLoad: true
        });
        
        this.usersStore = Ext.create(Ext.data.Store,{
            fields:['id', 'sticker', 'badgeNumber', 'firstName', 'lastName']
        });
        
        var characteristicsPanel = {
            xtype: 'panel',
            border: false,
            title: getText('Location'),
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'textfield',
                    name : 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
//                    minLength: 4,
//                    maxLength: 30,
                    listeners: {
                        afterrender: function(field) {
                            field.focus(false, 100);
                        }
                    }
                },
                {
                    xtype: 'autocompleteComboBox',
                    name: 'parentPositionId',
                    reference: 'parentPositionId',
                    fieldLabel: getText('Parent position'),
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam : false,
                    matchFieldWidth: false,
                    store: this.positionsStore,
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{path}/{name}',
                        '</tpl>'
                    ),
                    listConfig: {
                        getInnerTpl: function () {
                            return '{path}/{name}';
                        }
                    }
                },
                {
                    xtype: 'textarea',
                    name : 'description',
                    fieldLabel: getText('Description')
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    items:[
                       {
                           xtype: 'textfield',
                           name: 'code',
                           readOnly: true,
                           fieldLabel: getText('Code'),
                           flex: 1,
                           margin: '0 6 0 0',
                           listeners: {
                                scope: this,
                                render: function(cmp) {
                                    cmp.getEl().on('click', function(){
                                        cmp.up('window').onAddCode();
                                    }); 
                                }
                            }
                       }, {
                            xtype: 'button',
                            //ui: 'indicator-font-icon-button-plus',
                            name: 'editButton',
                            scale: 'small',
                            border: false,
                            enableToggle: false,
                            iconCls: 'fa fa-rss',
                            scope: this,
                            flex: 0,
                            margin: '0 6 0 0',
                            listeners: {
                                scope: this,
                                click: function(button, event, eOpts){
                                    this.onAddCode();
                                }
                            }
                        }, {
                            xtype: 'button',
                            //ui: 'indicator-font-icon-button-minus',
                            name: 'minusButton',
                            scale: 'small',
                            border: false,
                            enableToggle: false,
                            iconCls: 'fa fa-minus-circle',
                            scope: this,
                            handler: this.deleteProperty,
                            flex: 0,
                            listeners: {
                                scope: this,
                                click: function(button, event, eOpts){
                                    this.confirmRemoveCode();
                                }
                            }
                        }
                    ],
                    listeners: {
                        'added': function(me){
                            if (Dashboard.manager.FeaturesManager.isEnabled('OP_ASSOCIATE_TAG')) {
                                me.hidden = false;
                            } else {
                                me.hidden = true;
                            }
                        }
                    }
                }                  
            ]
        };
        
        
//        var traceabilityInformationPanel = {
//
//            name: 'traceabilityInformationPanel',
//            title: getText('Traceability information'),
//            collapsible: false,
//            hidden: false,
//            layout: 'hbox',
//            margin: '0 0 6 0',
//            listeners: {
//                'added': function (me){
//                    if (Dashboard.manager.FeaturesManager.isEnabled('OP_ASSOCIATE_TAG')) {
//                        me.hidden = false;
//                    } else {
//                        me.hidden = true;
//                    }
//                }
//            },
//            items: [
//                {
//                   xtype: 'textfield',
//                   name: 'code',
//                   fieldLabel: getText('RFID code'),
//                   maxLength: 200,
//                   enableKeyEvents: true,
//                   selectOnFocus: true,
//                   afterSubTpl: '<i class="greyLabel">' + getText('Before scanning RFID tag, place your cursor in the above code textfield') + '</i>',
//                   flex: 1,
//                   margin: '0 6 0 0'
//               }, {
//                   xtype: 'button',
//                   iconCls: 'fa fa-tag fa-white',
//                   text: 'Scan',
//                   handler: function (){
//                       Ext.ComponentQuery.query('textfield[name=code]')[0].focus();
//                   }
//               }   
//            ]
//        };
        
        
        var propertiesPanel = Ext.create('Ext.panel.Panel', {
            title: getText('Properties'),
            reference: 'propertiesPanel',
            defaults: {
                margin: '0 0 12 0',
                submitValue: false
            },
            items: []
        });
        
                
            
        var usersPanel = {
            xtype: 'panel',
            title: getText('Allowed users'),
            iconCls: 'fa fa-shield',
            reference: 'usersPanel',
            collapsible: false,
            ui: 'form-panel',
            
            items: [
                {
                    xtype: 'container',
                    reference: 'allowedUsers',
                    items:{
                        xtype: 'grid',
                        name: 'usersGrid',
                        store: this.usersStore,
                        multiSelect: true,
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [
                            { text: getText('Identifier'), dataIndex: 'sticker', flex:1 },
                            { text: getText('Badge number'), dataIndex: 'badgeNumber', flex:1 },
                            { text: getText('First name'), dataIndex: 'firstName', flex:1 },
                            { text: getText('Last name'), dataIndex: 'lastName', flex:1 }
                        ],
                        height: 400,
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
                    handler: 'onAddUser'
                },{
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onRemoveUser'
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
                    characteristicsPanel,
                    propertiesPanel,
                    usersPanel
                ]
            }
        ];
        
        
        this.buttons = [
            {
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
        
    listeners: {
        scope: this,
        afterrender: function (me, layout, eOpts) {
            me.controller.buildFields({data: me.propertiesConfiguration});
            me.onUserFeatureChange();
        }
    },
    onUserFeatureChange: function () {
        var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var len = user.data.profiles.length;
        var user_feature_activated=[];
        var featureName;
        for (i=0;i<len;i++) {
            for (j=0;j<user.data.profiles[i].features.length;j++) {
                if (user.data.profiles[i].features[j].name === "USER_ADMIN") {
                    featureName = "USER_ADMIN";
                }
                else if (user.data.profiles[i].features[j].name === "USER_PROFILE_ADMIN"){
                    user_feature_activated.push("USER_PROFILE_ADMIN");
                }
                else if (user.data.profiles[i].features[j].name === "USER_DEVICE_ADMIN"){
                    user_feature_activated.push("USER_DEVICE_ADMIN");
                }
            }
        }
        if (!featureName) {
            if (user_feature_activated.length>1){
                featureName = "USER_BOTH_PROFILE_DEVICE_ADMIN";
            }
            else {
                featureName = user_feature_activated[0];
            }
        }
        switch (featureName) {
            case "USER_PROFILE_ADMIN":
                this.down('button[handler=onAddUser]').setHidden(true);
                this.down('button[handler=onRemoveUser]').setHidden(true);
                break;
            default:
                console.log("no case of rights! You can do it all!");
        }
    },
    onAddCode: function(){
        this.addCode();
    },
    
    
    addCode: function(){
        this.windowAddCode = Ext.create('Dashboard.view.shared.component.AddCodeWindow');
        
        this.windowAddCode.down('button[action=addCode]').on('click', function (me) {
            this.addNewCode(me);
        }, this);
        
        this.windowAddCode.show();
    },
    
    addNewCode: function(sender){
        
        var win = sender.up('window');
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var data = win.getData();
        this.down('field[name=code]').setFieldLabel(data.codeTypeLabel);
        this.down('field[name=code]').setValue(data.code);
        this.down('field[name=code]').data = data;
                
        win.close();
        
    },
    
    confirmRemoveCode: function(code){

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to remove this code ?'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn){
                if (btn === 'yes') {
                    this.deleteCode();
                }
            }
        });
    },
    
    deleteCode: function(){
        this.down('field[name=code]').setFieldLabel(getText('code'));
        this.down('field[name=code]').setValue('');
        this.down('field[name=code]').data = {code : ''};
    },
    
    addField: function (field) {
        this.down('panel[reference=propertiesPanel]').add(field);
    },

    cleanFields: function () {
        this.down('panel[reference=propertiesPanel]').removeAll();
    },

    getProperties: function () {
        var list = this.query('component[tag=property]');
        var propertiesList = [];
        var sensorId = null;

        for (var i = 0; i < list.length; i++) {

            var include = true;
            var value = list[i].value;

            if (list[i].xtype === 'datefield') {
                if (list[i].rawValue.trim() !== '') {
                    value = Ext.Date.format(list[i].value, 'Y-m-d'); // yyyy-MM-dd HH:mm
                } else {
                    value = null;
                }
            }

            if (list[i].xtype === 'radio') {
                if (list[i].value === true) {
                    value = list[i].inputValue;
                } else {
                    include = false;
                }
            }

            if (list[i].fieldType === 'datetimefield') {
                var date = list[i].down('field[xtype=datefield]').value;
                var time = list[i].down('field[xtype=timefield]').value;
                value = Ext.Date.format(date, 'Y-m-d') + ' ' + Ext.Date.format(time, 'H:i:s');
            }

            var property = {
                name: list[i].name,
                value: value
            };
            
            if(list[i].property){
                if(list[i].property.sensorId){
                    sensorId = list[i].property.sensorId;
                }else{
                    sensorId = null;
                }
                property.sensorId = sensorId;
            }

            if (include) {
                propertiesList.push(property);
            }
        }

        return propertiesList;
    },
    
            
    loadUsers: function(){
        
        this.referencesStore = Ext.create('Dashboard.store.References',{
            listeners:{
                scope: this,
                beforeload: function( store , operation , eOpts){
//                    var myFilter = {
//                        property: 'interventionOrderIdList',
//                        value: data.id,
//                        type: 'LONG',
//                        comparison: 'EQ'
//                    };
//                    
//                    if(!store.getProxy().extraParams.filter){
//                        store.getProxy().extraParams.filter = [];
//                    }
//                    
//                    store.getProxy().extraParams.filter.push(myFilter);
                },
                load: function( store , operation , eOpts){
                    if(store.getProxy().extraParams.filter){
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });
        
        this.referencesStore.load();

    }, 
    
    
    setData: function(data){
                
        this.record = data;

        var parentId = null;
        if(data.type === 'location'){
            parentId = data.parentId;
        }else{
            parentId = data.positionId;
        }
        
        this.down('combo[name=parentPositionId]').setValue(parentId);
        
    },
            
            
    getAllowedUsers: function(){

        var usersList = [];
        var users = this.down('grid').store.data.items;
        
        if(users){
            Ext.each(users, function(row) {
                usersList.push(row.data.id);
            });
        }
        
        return usersList;
    },

    
    /**
     * Method used by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function () {

        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        
        if (values.code !== null && values.code !== undefined) {
            values.code = this.down('field[name=code]').data;
        } else {
            values.code = null;
        }

        values.authorizedUserIdList = this.getAllowedUsers();
        values.properties = this.getProperties();

        return values;
    }

});   