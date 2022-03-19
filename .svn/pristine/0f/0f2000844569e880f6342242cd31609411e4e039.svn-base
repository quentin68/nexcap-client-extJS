Ext.define('Dashboard.view.administration.alerts.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.alertsMain',

    require: [],

    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'BASIC_ALERT_CONFIGURATION', 0, false, true, true),

    windowEdit: null,

    selection: null,

    init: function () {

        this.control({
            // Selected item in dataGrid
            'alertsMain viewListGrid': {itemclick: this.onSelectItem},

            // Edit window
            'alertsEdit button[action=save]': {click: this.onUpdate}
        });
    },

    //==========================================================================
    //   Event handlers
    //==========================================================================

    onRenderMain: function (sender) {

        if (!this.getView().configuration) {
            Dashboard.tool.Utilities.error('[profile.MainController.onRenderMain] configuration null or empty !');
        }
    },

    onSelectItem: function (sender) {
        this.selection = sender.selection;
    },

    onEdit: function (sender) {
        var model = this.getSelection();
        if (model) {
            this.edit(model);
        }
    },

    onDestroy: function (sender) {
        this.doDelete();
    },

    onRefresh: function (sender) {
        this.refresh();
    },

    onUpdate: function (sender) {
        var win = sender.up('window');
        this.update(win);
    },

    //==========================================================================
    //   Methods 
    //==========================================================================


    getSelection: function () {
        var selection = null;
        var viewList = this.getView().down('viewList');

        if (viewList) {
            selection = viewList.getSelection();
        }

        if (!selection) {
            return null;
        }

        return selection;
    },

    enableButtons: function () {
        this.getView().lookupReference('editButton').setDisabled(false);
        this.getView().lookupReference('deleteButton').setDisabled(true);
    },

    edit: function (model) {
        this.windowEdit = Ext.create('Dashboard.view.settings.alertsConfig.Edit', {record: model.data});
        this.windowEdit.show();
    },

    refresh: function () {
        var store = Ext.ComponentQuery.query('alertsConfigMain')[0].store;
        store.load();
    },

    update: function (win) {

        if (!win.down('form').isValid()) {
            Ext.Msg.show({title: getText('Error'), msg: getText('Form not valid!'), buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
            return;
        }

        var data = win.getData();
        var model = Ext.create('Dashboard.model.alerts.AlertsConfiguration', data);  // old: Ext.create('Dashboard.model.settings.AlertsConfig', data);
        Dashboard.manager.settings.AlertsConfigManager.update(model, this, 'doPostEditAction');

    },

    doPostEditAction: function (model) {

        var win = Ext.ComponentQuery.query('alertsConfigEdit')[0];
        win.close();
        this.refresh();
    }
});