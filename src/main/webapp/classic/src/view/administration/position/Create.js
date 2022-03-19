Ext.define('Dashboard.view.administration.position.Create', {
    extend: 'Ext.window.Window',
    xtype: 'positionCreate',

    requires: ['Dashboard.tool.Utilities', 'Dashboard.view.shared.imagesViewer.ThumbnailEditor'],

    controller: 'positionMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 550,
    iconCls: 'fa fa-bullseye',
    plain: true,
    autoScroll: true,
    scrollable: 'y',

    record: null,

    usersStore: null,

    initComponent: function (){

        this.title = getText('Create a position');

        this.positionsStore = Ext.create('Dashboard.store.administration.Positions', {
            autoLoad: true
        });

        var characteristicsPanel = {
            xtype: 'panel',
            border: false,
            title: getText('Position'),
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            },
            items: [
                {
                    xtype: Ext.widget('thumbnailEditor')
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
                    // minLength: 4,
                    maxLength: 255,
                    listeners: {
                        afterrender: function (field){
                            field.focus(false, 100);
                        }
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'parentPositionId',
                    reference: 'parentPositionId',
                    fieldLabel: getText('Parent position'),
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false, // to remove param "query"
                    matchFieldWidth: false,
                    store: this.positionsStore,
                    // listeners:{
                    // 'select': 'onPositionSelected'
                    // },
                    displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">', '{path}/{name}', '</tpl>'),
                    listConfig: {
                        getInnerTpl: function (){
                            return '{path}/{name}';
                        }
                    }
                }, {
                    xtype: 'textarea',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 1024
                }
            ]
        };

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

                items: [characteristicsPanel]
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
    },

    setData: function (data){

        this.record = data;

        var parentId = null;
        if (data.type === 'location') {
            parentId = data.parentId;
        } else {
            parentId = data.positionId;
        }

        this.down('combo[name=parentPositionId]').setValue(parentId);

    },

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function (){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        return values;
    }

});