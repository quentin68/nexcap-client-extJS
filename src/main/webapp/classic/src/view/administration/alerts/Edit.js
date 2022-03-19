Ext.define('Dashboard.view.administration.alerts.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'alertsEdit',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor'
    ],

    controller: 'alertsMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 550,
    iconCls: 'fa fa-cog',
    plain: true,
    autoScroll: true,
    scrollable: 'y',

    record: null,

    initComponent: function () {

        this.title = getText('Edit an alert');

        var alertConfigPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            title: getText('Alert'),
            reference: 'alertConfigPanel',
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            },
            items: [
                {
                    xtype: 'radiogroup',
                    fieldLabel: getText('Alert level'),
                    items: [
                        {boxLabel: getText('Low'), name: 'alertLevel', inputValue: '0', width: 100},
                        {boxLabel: getText('Medium'), name: 'alertLevel', inputValue: '1', width: 100},
                        {boxLabel: getText('High'), name: 'alertLevel', inputValue: '2', width: 100}
                    ]
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    maxLength: 255,
                    fieldLabel: getText('Name')
                }, {
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 1024
                }, {
                    xtype: 'textfield',
                    name: 'params',
                    fieldLabel: getText('Parameters'),
                    validator: function (val) {
                        if (val !== null && Ext.String.startsWith(val, '{') && Ext.String.endsWith(val, '}')) {
                            try {
                                JSON.parse(val);
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }
                        return true;

                    }
                }, {
                    xtype: 'checkbox',
                    name: 'raisedByOnGoingOp',
                    fieldLabel: getText('Raised by ongoing operation'),
                    inputValue: 'raisedByOnGoingOp'
                }
            ]
        });

        var triggersFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Trigger selection'),
            name: 'triggerSelector',
            bodyStyle: 'background-color:#ffffff; padding: 5px',
            autoScroll: true,
            defaults: {
                anchor: '100%'
            },
            items: []
        });

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

                items: [
                    alertConfigPanel,
                    triggersFieldSet
                ]
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
        this.loadTrigger();

    },

    loadTrigger: function () {
        var triggerStore = Ext.create('Dashboard.store.settings.TriggerEnum');
        this.setTriggerSelector(triggerStore.data.items);
    },

    /**
     * Clean and fill the triggers panel
     */
    setTriggerSelector: function (triggersList) {

        var triggersSelector = Ext.ComponentQuery.query('panel[name="triggerSelector"]')[0];
        for (var i = 0; i < triggersList.length; i++) {
            var checked = false;
            if (Ext.Array.contains(this.record.operations, triggersList[i].data.id)) {
                checked = true;
            }
            this.addTrigger(i, triggersList[i].data.id,
                    triggersList[i].data.description,
                    checked,
                    triggersSelector);
        }
    },

    /**
     * add checkBox
     * @argument {int} index description
     * @argument {string} description
     * @argument {int} id
     * @argument {panel} triggerSelector Target panel
     */
    addTrigger: function (index, id, description, checked, triggersSelector) {

        triggersSelector.add({

            xtype: 'checkbox',
            checked: checked,
            border: false,
            anchor: '100%',
            margin: '3 6 0 6',
            boxLabel: description,
            name: 'triggers',
            inputValue: id
        });
    },

    /**
     * Method used by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function () {

        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        delete values.triggers;
        values.id = this.record.id;
        values.raisedByOnGoingOp = this.query('checkbox[name=raisedByOnGoingOp][checked=true]')[0] ? true : false;
        values.operations = [];

        var triggersRecords = this.query('checkbox[name=triggers][checked=true]');
        Ext.Array.each(triggersRecords, function (rec) {
            if (rec.inputValue !== null) {
                values.operations.push(rec.inputValue);
            }
        });
        return values;
    },

    setData: function (data) {
        this.down('form').getForm().setValues(data);
    }

});   