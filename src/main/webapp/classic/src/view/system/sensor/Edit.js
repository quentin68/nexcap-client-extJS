Ext.define('Dashboard.view.system.sensor.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'sensorEdit',

    requires: [
        'Dashboard.tool.Utilities', 
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor'
    ],

    controller: 'sensorMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 550,
    iconCls: 'fa fa-dot-circle-o',
    plain: true,
    autoScroll: true,
    scrollable: 'y',

    record: null,

    initComponent: function (){

        this.title = getText('Edit a sensor');

        var characteristicsPanel = {

            xtype: 'panel',
            bodyPadding: 20,
            ui: 'form-panel',

            defaults: {
                labelWidth: 112,
                width: '100%',
                labelSeparator: getText(':'),
                margin: '0 0 12 0'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
                    maxLength: 255,
                    listeners: {
                        afterrender: function (field){
                            field.focus(false, 100);
                        }
                    }
                }, {
                    xtype: 'textareafield',
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
                width: 600,
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
        this.setData(this.record);

    },

    /**
     * Method stocks by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function (){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        values.id = this.record.id;
        values.sensorType = this.record.sensorType;
        
        return values;
    },

    setData: function (data){

        this.down('form').getForm().setValues(data);
    }

});