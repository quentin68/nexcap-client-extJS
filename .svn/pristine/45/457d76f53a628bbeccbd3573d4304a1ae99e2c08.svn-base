Ext.define('Dashboard.view.main.About', {
    extend: 'Ext.window.Window',
    xtype: 'aboutWindow',

    requires: ['Dashboard.tool.Utilities'],

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    width: 500,
    iconCls: 'x-fa fa-info',
    record: null,

    initComponent: function () {
        this.title = getText('About NexCap');

        var supportPanel = {
            xtype: 'panel',
            reference: 'supportPanel',
            id: 'supportPanel',
            title: getText('Support'),
            bodyPadding: 20,
            ui: 'form-panel',

            defaults: {
                labelWidth: 112,
                width: '100%',
                labelSeparator: getText(':'),
                margin: '0 0 12 0'
            },
            items: []
        };

        this.items = [
            supportPanel
        ];

        this.buttons = [{
                text: getText('Close'),
                scope: this,
                handler: this.close
            }];
        this.addDynamicFields();
        this.callParent(arguments);
    },

    addDynamicFields: function () {
        this.getApplicationConfiguration(this.addFields.bind(this));
    },

    addFields: function (properties) {
        var displayFields = [{
                label: getText('Tel.'),
                property: 'supportPhone',
                icon: 'fa fa-phone'
            }, {
                label: getText('Email'),
                property: 'supportMail',
                icon: 'fa fa-envelope-o',
                type: 'email'
            }, {
                label: getText('User manual'),
                property: 'supportDocument',
                icon: 'fa fa-book',
                type: 'link'
            }
        ];

        var supportPanel = Ext.getCmp('supportPanel');
        for (var i = 0; i < displayFields.length; i++) {
            var prop = properties[displayFields[i].property];
            if (prop) {
                var field = this.buildField({
                    value: prop,
                    name: displayFields[i].label,
                    icon: displayFields[i].icon,
                    type: displayFields[i].type
                });
                supportPanel.add(field);
            }
        }
    },

    buildField: function (property) {
        var separator = getText(':') + ' ';
        var value = property.value + '';
        var label = property.name + '' + separator;

        if (property.type === 'link') {
            value = '<a target="_blank" href="'+property.value+'">' + getText('Open') + '</a>';
        }
        
        if (property.type === 'email') {
            value = '<a href="mailto:' + property.value + '">' + property.value + '</a>';
        }
        
        var iconHTML = '';
        if (property.icon) {
            iconHTML = '<i class="' + property.icon + '" aria-hidden="true"></i> ';
        }

        var html = [
            '<table><tr>',
            '<td class="material-detail-label">',
            iconHTML + label,
            '</td>',
            '<td class="material-detail-text">',
            value,
            '</td>',
            '</tr></table>'
        ];

        var field = {
            'html': html
        };

        return field;
    },

    setData: function (data) {
        this.record = data;
    },

    getApplicationConfiguration: function (callback) {
        Dashboard.manager.ConfigurationManager.getOne('/configuration/application', callback);
    }
    
});