/* global Ext */
Ext.define('Dashboard.view.system.importData.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'importDetail',

    importStore: Ext.create(Ext.data.Store, {
        fields: ['id', 'nbComputedLines', 'nbUsersCreated', 'nbLocationsCreated', 'nbPositionsCreated', 'nbReferencesCreated']
    }),
    
    errorsStore: null,

    initComponent: function (){
        
        this.configDetail();

        var me = this;

        Ext.apply(me, {

            items: [{
                    xtype: 'displayfield',
                    bind: {
                        value: '{name}'
                    },
                    cls: 'import-detail-title',
                    margin: '12 12 12 24'

                }, {
                    title: getText('Import'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Elements created'),
                    reference: 'created',
                    iconCls: 'fa fa-user-plus'
                }, {
                    title: getText('Items'),
                    reference: 'items',
                    iconCls: 'fa fa-tag'
                }, {
                    title: getText('Errors list'),
                    reference: 'errors',
                    iconCls: 'fa fa-exclamation'
                }]
        });

        this.callParent(arguments);

    },

    clean: function (){

        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        var createdPanel = this.query('panel[reference=created]')[0];
        createdPanel.removeAll();
        var itemsPanel = this.query('panel[reference=items]')[0];
        itemsPanel.removeAll();
        var errorsPanel = this.query('panel[reference=errors]')[0];
        errorsPanel.removeAll();

    },

    setData: function (data){

        if (!data) {
            return;
        }
        this.viewModel.setData(data);

        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        // Classic properties
        characteristicsPanel.add(this.buildField({
            name: getText('Number of computed lines'),
            value: data.nbComputedLines
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Number of processed lines'),
            value: data.nbProcessedLines
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Number of mistaken lines'),
            value: data.nbMistakenLines
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Number of ingnored lines'),
            value: data.nbIgnoredLines
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Import status'),
            value: getText(data.importStatus)
        }));

        var createdPanel = this.query('panel[reference=created]')[0];
        createdPanel.removeAll();

        createdPanel.add(this.buildField({
            name: getText('Number of users created'),
            value: data.nbUsersCreated
        }));
        createdPanel.add(this.buildField({
            name: getText('Number of locations created'),
            value: data.nbLocationsCreated
        }));
        createdPanel.add(this.buildField({
            name: getText('Number of positions created'),
            value: data.nbPositionsCreated
        }));
        createdPanel.add(this.buildField({
            name: getText('Number of references created'),
            value: data.nbReferencesCreated
        }));
        createdPanel.add(this.buildField({
            name: getText('Number of categories created'),
            value: data.nbCategoriesCreated
        }));
        createdPanel.add(this.buildField({
            name: getText('Number of items created'),
            value: data.nbItemsCreated
        }));

        var itemsPanel = this.query('panel[reference=items]')[0];
        itemsPanel.removeAll();

        itemsPanel.add(this.buildField({
            name: getText('Number of existing items'),
            value: data.nbExistingItems
        }));
        itemsPanel.add(this.buildField({
            name: getText('Number of updated items'),
            value: data.nbUpdatedItems
        }));
        itemsPanel.add(this.buildField({
            name: getText('Number of deleted items'),
            value: data.nbDeletedItems
        }));

        var errorsPanel = this.query('panel[reference=errors]')[0];
        errorsPanel.removeAll();
        errorsPanel.setTitle(getText('Errors list'));

        if (data.errorsList !== "[]") {
            var errorslist = JSON.parse(data.errorsList);
            
            errorsPanel.setTitle(getText('Errors list') + ' (' + errorslist.length + ')');
                        
            var formatedErrorsList = [];

            for(var i=0; i < errorslist.length; i++){
                
                if(i > 499){
                    errorsPanel.setTitle(getText('Errors list') + ' ( 500 / ' + errorslist.length + ')');
                    break;
                }
                
                formatedErrorsList.push({
                    error: errorslist[i]
                });
            };
            
            this.errorsStore = Ext.create(Ext.data.ArrayStore, {
                fields: ['error'],
                pageSize : 20,
                proxy: {
                    type: 'memory',
                    reader: {type: 'array', root : 'data', totalProperty : 'total'}
                }
            }),
                                
            this.errorsStore.setData(formatedErrorsList);
            
            var errorsColumns = [
                {text: getText('Error'), dataIndex: 'error', flex: 1, sortable: true}
            ];
            
            var errorsGrid = this.buildGrid(this.errorsStore, errorsColumns);
            errorsPanel.add(errorsGrid);
            
        }

        // Sort alphabetically 
        var properties = properties.sort(function (a, b){
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        for (var i = 0; i < properties.length; i++) {
            var characteristicFields = null;
            var control = Dashboard.model.PropertyConfiguration.getControl(properties[i].configuration);
            if (control !== undefined) {
                var configuration = control.configuration;
                if (configuration && configuration.enabledInDetails !== undefined) {
                    if (configuration.enabledInDetails === true) {
                        characteristicFields = this.buildField(properties[i]);
                        characteristicsPanel.add(characteristicFields);
                    }
                } else {
                    characteristicFields = this.buildField(properties[i]);
                    characteristicsPanel.add(characteristicFields);
                }
            }
        }
    },
    
    
    buildGrid: function(store, columns){
        
        var grid = {
            xtype: 'grid',
            store: store,
            loadMask: true,
            width: '100%',
            maxHeight: 300,
            layout: {
                type: 'fit',
                align: 'stretch'
            },
            viewConfig: {
                stripeRows: true
            },
            columns: columns//,
//            bbar: {
//                xtype: 'pagingtoolbar',
//                store: store,
//                pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
//                displayInfo: false
//            }
        };
        
        return grid;
    }

});
