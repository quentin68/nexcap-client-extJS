Ext.define('Dashboard.manager.demo.MapManager', {
    extend: 'Ext.app.Controller',
    alias: 'mapManager',
    singleton: true,

    requires: ['Dashboard.tool.Utilities'],

    store: Ext.create('Dashboard.store.demo.Map', {
        autoLoad: false
    }),

    loadConfiguration: function (feature) {
        try {
            this.displayInMain(feature);
        } catch (err) {
            Dashboard.tool.Utilities.error('[MapManager.loadConfiguration] error: ' + err);
        }
    },

    displayInMain: function (feature) {
        Dashboard.tool.Utilities.info('[MapManager.displayInMain] show DEMO Map feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = this.getConfiguration();

        mainController.displayInMain({
            xtype: 'demoMapMain',
            store: this.store,
            configuration: configuration, // default conf
            feature: feature
        });
    },

    getConfiguration: function () {
        var configuration = {
            enabledTools: {
                create: false,
                edit: false,
                read: false,
                destroy: false,
                duplicate: false,
                exportToFile: false
            },
            album: {
                thumb: 'imageSrc',
                caption: 'name',
                size: 's',
                properties: [
                    {
                        property: 'description',
                        label: getText('Description')
                    }
                ]
            },

            table: {
                columns: [],
                extendedProperties: {
                    properties: []
                }
            }
        };

        return configuration;
    },

    /**
     * Get one item
     * 
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getOne: function (id, controller, action) {
        try {
            var index = this.store.findExact('id', id);
            var record = this.store.getAt(index);
            if (record !== null) {

                if (action === 'loadMap') {
                    controller.loadMap(record);
                } else if (action === 'navigateToMap') {
                    controller.navigateToMap(record);
                } else if (action === 'displayDetail') {
                    controller.displayDetail(record);
                }

            }
        } catch (err) {
            Dashboard.tool.Utilities.error('[MapManager.getOne] error: ' + err);
        }
    },

    save: function (model, controller, action) {
        if (!model) {
            throw new Error('[MaterialManager.save] model is null or empty!');
        }

        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function (record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info('[MaterialManager.save] save and read success : material.name: ' + model.data.name);

                Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'material', this.doAfterThumbnailSaved(), this);

                // Display user message
                // Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction(model, Ext.decode(response._response.responseText));
                }
            }
        });
    },

    getProperties: function (action) {

        return [{
                name: 'name',
                label: getText('Item'),
                type: 'STRING'
            }, {
                name: 'code.code',
                label: getText('Code'),
                type: 'STRING'
            }, {
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            }, {
                name: 'productReference.referenceCode',
                label: getText('Ref. code'),
                type: 'STRING'
            }, {
                name: 'productReference.designation',
                label: getText('Ref. designation'),
                type: 'STRING'
            }, {
                name: 'productReference.description',
                label: getText('Ref. description'),
                type: 'STRING'
            }, {
                name: 'productReference.productCategory.name',
                label: getText('Category'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'categories',
                        width: 400
                    }
                })
            }, {
                name: 'useCount',
                label: getText('Use count'),
                type: 'INT'
            }, {
                name: 'alerts.controlName',
                label: getText('Alert'),
                filterOnly: true,
                type: 'STRING'
            }, {
                name: 'lastUpdateDate',
                label: getText('Last update date'),
                type: 'DATE',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'location.address',
                label: getText('Address'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                name: 'assignedLocation.address',
                label: getText('Assigned location'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                name: 'comboItemRefCat',
                label: getText('Combo Item - Reference - Category'),
                type: 'STRING',
                filterOnly: true,
                control: Ext.encode({
                    field: {
                        fieldType: 'comboitemrefcat',
                        width: 400
                    }
                })
            }

        ];
    }

});