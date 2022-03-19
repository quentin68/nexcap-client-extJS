Ext.define('Dashboard.view.cartography.EditMap', {
    extend: 'Ext.window.Window',
    xtype: 'cartographyEditMap',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor'
    ],
    
    tag: 'winMap',
    
    controller: 'cartographyMapStage',
    mainController: null,
    
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 450,
    iconCls: 'fa fa-user',
    plain: true,
    autoScroll: true,
    scrollable: 'y',
    
    record: {},
    
    initComponent: function(){
        
        this.title = getText('Edit map');
        this.positionsStore = Ext.create('Dashboard.store.administration.Positions', {
            autoLoad: true
        });

        var characteristicsPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            title: getText('Map'),
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            },
            items: [
                {
                    xtype: Ext.widget('thumbnailEditor', {
                        record: this.record,
                        thumbnailSourceType: 'CARTOGRAPHY'
                    })
                }, {
                    xtype: 'textfield',
                    name: 'title',
                    fieldLabel: getText('Title'),
                    allowBlank: false,
                    margin: '20 0 0 0',
                    maxLength: 255
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'rootPosition',
                    reference: 'rootPosition',
                    fieldLabel: getText('Linked position'),
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank: true,
                    queryParam : false,
                    matchFieldWidth: false,
                    store: this.positionsStore,
                    displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">', '{path}/{name}', '</tpl>'),
                    listConfig: {
                        getInnerTpl: function () {
                            return '{path}/{name}';
                        }
                    }

                },
                {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    margin: '20 0 0 0',
                    maxLength: 1024
                }
            ]
        });
        

        this.items = [{
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
                    characteristicsPanel
                ]
            }];

        this.buttons = [{
                text: getText('Save'),
                listeners:{
                    scope: this,
                    click: function(me){
                        this.mainController.onUpdateMap(me);
                    }
                }
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);

        this.setData(this.record.data);

    },
    

    getData: function(){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        
        values.name = values.title;
        values.id = this.record.data.id;
        this.record.data.rootPosition = values.rootPosition;
        return values;
    },
            
    setData: function(data){

        this.down('form').getForm().setValues(data);
        if (data.rootPositionDto!==null) {
            this.down('combo[name=rootPosition]').setValue(data.rootPositionDto.id);
        }

    },
            
    setThumbnail: function(thumbSrc){

        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var img = Ext.ComponentQuery.query('cartographyEditMap image[name=thumbnailToEdit]')[0];

        if (thumbSrc !== null) {
            thumbnailSrc = thumbSrc;
        }

        img.setSrc(thumbnailSrc);
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
            messages.push(invalidFields[i].fieldLabel + " > " + invalidFields[i].activeErrors[0]);
        }

        Ext.Msg.show({
            title: getText('Errors'),
            message: messages.join('<br>'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });

        return invalidFields;
    }

});