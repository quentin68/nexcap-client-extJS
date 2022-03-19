/* global Ext  */

Ext.define('Dashboard.view.historic.inventory.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'inventoryDetail',

    itemsStore: Ext.create(Ext.data.Store, {
        fields: [
            {
                name: 'id', 
                type: 'int',
                convert: function (val, record) {
                    if (val === -1) {
                        return record.data.name;
                    }else{
                        return val;
                    }
                }
            },
            'name', 
            'inventoryState', 
            'productReferenceCode', 
            'productReferenceDesignation'
        ]
    }),

    lotStore: Ext.create(Ext.data.Store, {
        fields: [
            {
                name: 'id',
                type: 'int',
                convert: function (val, record) {
                    if (val === -1) {
                        return record.data.name;
                    }else{
                        return val;
                    }
                }
            },
            'refCode',
            'refDesignation',
            'quantityCounted'
        ]
    }),

    initComponent: function () {
        
        this.configDetail();
        
        this.attachmentFilesStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'file']
        });

        var me = this;
        Ext.apply(me, {

            items: [
                {
                    xtype: 'displayfield',
                    bind: {
                        value: '{reference}'
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                }, {
                    title: getText('Characteristics'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Properties'),
                    reference: 'properties',
                    iconCls: 'fa fa-cube'
                }, {
                    title: getText('Photos'),
                    reference: 'attachments',
                    iconCls: 'fa fa-paperclip',
                    items: [
                        {
                            xtype: 'container',
                            reference: 'files',
                            items: {
                                xtype: 'grid',
                                name: 'attachmentGrid',
                                store: this.attachmentFilesStore,
                                multiSelect: false,
                                viewConfig: {
                                    stripeRows: true
                                },
                                columns: [
                                    {
                                        text: getText('Files'),
                                        dataIndex: 'name',
                                        flex: 1
                                    }, {
                                        text: '',
                                        flex: 1,
                                        renderer: function (value, metaData, rec, rowIndex, colIndex, store){
                                            
                                            var file = rec.data.file;
                                            return file;
//                                            var id = rec.data.refId;
//                                            var path = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/image/INVENTORY/' + id + '/' + encodeURI(file);
//
//                                            return '<a target="_blank" style="text-decoration: inherit; color: inherit;" href="' +
//                                                    path +
//                                                    '" ><i class="fa fa-download" aria-hidden="true"></i> ' +
//                                                    getText('Download') +
//                                                    '</a>';
                                        }
                                    },  {
                                        xtype : 'actioncolumn',
                                        text : getText('Show'),
                                        width : 75,
                                        align : 'center',
                                        items : [
                                            {
                                                icon:'resources/icons/pictureButton.jpg',
                                                tooltip : getText('Show picture'),
                                                scope : this,
                                                handler : function (grid, rowIndex, colIndex, item, e, record) {
                                                                                                        
                                                    var refId = record.data.refId;
                                                    var file = record.data.file; //encodeURI(file)
                                                    var name = record.data.name;
                                                    var path = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/image/INVENTORY/' + refId + '/';
                                                    
                                                    this.doZoom(file, name, path, grid);
                                                }
                                            }
                                        ]
                                    }
                                ],
                                width: '100%'
                            }
                        }
                    ]
                }, {
                    title: getText('Items'),
                    reference: 'items',
                    iconCls: 'x-fa fa-tag'
                },
                {
                    title: getText('Lots'),
                    reference: 'lots',
                    iconCls: 'x-fa fa-tag'
                }, {
                    title: getText('Alerts'),
                    reference: 'alerts',
                    iconCls: 'x-fa fa-exclamation-triangle'
                }
            ]
        });

        this.callParent(arguments);

    },

    setData: function (data) {
        if (!data) {
            return;
        }
        
        var itemsPanel = this.query('panel[reference=items]')[0];
        itemsPanel.removeAll();
        
        itemsPanel.add({
            xtype: 'button',
            iconCls: 'fa fa-file-excel-o',
            tooltip: getText('Export to file'),
            margin: '0 0 15 20',
            listeners: {
                scope: this,
                click: function (me, e, eOpts ){
                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/INVENTORY/' + data.id;
                    var fileName = getText("inventory") + "_" + data.id + '.csv';
                    
                    Dashboard.manager.administration.FilesManager.loadFile(url, fileName, this, 'GET');
                    
                }
            }
        });
        
        itemsPanel.add(
            {
                xtype: 'grid',
                store: this.itemsStore,
                columns: [
                    {text: getText('Name'), dataIndex: 'name', flex: 1},
                    {text: getText('Ref. code'), dataIndex: 'productReferenceCode', flex: 1},
                    {text: getText('Ref. designation'), dataIndex: 'productReferenceDesignation', flex: 1},
                    {text: getText('State'), dataIndex: 'inventoryState', flex: 1}
                ],
                height: 400,
                margin: '0 12 12 24',
                width: '100%'
            }
        );
        //lots
        var lotsPanel = this.query('panel[reference=lots]')[0];
        lotsPanel.removeAll();

        lotsPanel.add({
            xtype: 'button',
            iconCls: 'fa fa-file-excel-o',
            tooltip: getText('Export to file'),
            margin: '0 0 15 20',
            listeners: {
                scope: this,
                click: function (me, e, eOpts ){
                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/INVENTORYMATERIALSET/' + data.id;
                    var fileName = getText("inventory") + "_" + data.id + '.csv';

                    Dashboard.manager.administration.FilesManager.loadFile(url, fileName, this, 'GET');

                }
            }
        });

        lotsPanel.add(
            {
                xtype: 'grid',
                store: this.lotStore,
                columns: [
                    {text: getText('Ref. code'), dataIndex: 'refCode', flex: 1},
                    {text: getText('Ref. designation'), dataIndex: 'refDesignation', flex: 1},
                    {text: getText('Quantity counted'), dataIndex: 'quantityCounted', flex: 1}
                ],
                height: 400,
                margin: '0 12 12 24',
                width: '100%'
            }
        );

        this.viewModel.setData(data);

        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({name: getText('Comments'), value: data.comments}));
        characteristicsPanel.add(this.buildField({name: getText('Operator'), value: data.operator}));
        characteristicsPanel.add(this.buildField({name: getText('Scanned items'), value: data.scannedMaterialCount}));
        characteristicsPanel.add(this.buildField({name: getText('Expected items'), value: data.expectedMaterialCount}));
        if (data.expectedMaterialSetCount !== -1) {
            characteristicsPanel.add(this.buildField({name: getText('Expected material sets'), value: data.expectedMaterialSetCount}));
        }
        characteristicsPanel.add(this.buildField({name: getText('Present items'), value: data.presentMaterialCount}));
        characteristicsPanel.add(this.buildField({name: getText('Missing items'), value: data.missingMaterialCount}));
        characteristicsPanel.add(this.buildField({name: getText('Foreign items'), value: data.foreignMaterialCount}));
        characteristicsPanel.add(this.buildField({name: getText('Unknown items'), value: data.unknownMaterialCount}));
        characteristicsPanel.add(this.buildField({name: getText('logistic operation'), value: data.logisticOperation}));
        characteristicsPanel.add(this.buildField({name: getText('Criteria 1'), value: data.criteriaKey1}));
        characteristicsPanel.add(this.buildField({name: getText('Value criteria 1'), value: data.criteriaValue1}));
        characteristicsPanel.add(this.buildField({name: getText('Criteria 2'), value: data.criteriaKey2}));
        characteristicsPanel.add(this.buildField({name: getText('Value criteria 2'), value: data.criteriaValue2}));

        var properties = data.properties;
        var propertiesPanel = this.query('panel[reference=properties]')[0];
        propertiesPanel.removeAll();

        if (properties) {
            for (var i = 0; i < properties.length; i++) {
                var characteristicFields = this.buildField(properties[i]);
                propertiesPanel.add(characteristicFields);
            }
        }

        var alertsPanel = this.query('panel[reference=alerts]')[0];
        alertsPanel.removeAll();

        for (var i = 0; i < data.alerts.length; i++) {
            alertsPanel.add(this.buildField({
                name: getText('Warning'),
                value: data.alerts[i].alertConfiguration.name
            }));
        }

        this.itemsStore.removeAll();
        this.lotStore.removeAll();
        for (var i = 0; i < data.materials.length; i++) {
            this.itemsStore.add( data.materials[i] );
        }
        for (var i = 0; i < data.materialSets.length; i++) {
            this.lotStore.add( data.materialSets[i] );
        }
        var attachmentGrid = this.down('grid[name=attachmentGrid]');
        var attachmentFilesStore = attachmentGrid.getStore();
        attachmentFilesStore.removeAll();

        if (data.pictures) {
            
            //data.pictureNames = Ext.decode(data.pictureNames);

            for(var i=0; i<data.pictures.length; i++){
                attachmentFilesStore.add({
                    name: getText('Picture') + ' ' + (i+1),
                    file: data.pictures[i].pictureName,
                    refId: data.id
                });
            }
        }

//        var picturesPanel = this.query('panel[reference=pictures]')[0];
//        picturesPanel.items.each(function (childItem) {
//            picturesPanel.remove(childItem);
//        });
//
//        try {
//            if (data.pictureNames) {
//                var pictureNames = data.pictureNames;
//                if (pictureNames && pictureNames.length > 0) {
//                    for (var i = 0; i < pictureNames.length; i++) {
//                        var imageSrc = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/image/INVENTORY/' + data.id + '/' + pictureNames[i];
//                        picturesPanel.add({
//                            xtype: 'image',
//                            width: '90%',
//                            cls: 'img img-detail',
//                            bind: {
//                                src: imageSrc,
//                                alt: imageSrc
//                            }
//                        });
//                    }
//                }
//            }
//        } catch (ex) {
//            Dashboard.tool.Utilities.error('[inventory.Detail.setData] error : ' + ex);
//        }
    },
    
    doZoom: function(file, name, path, maskTarget){
        
        var pictureSrc = path + encodeURI(file);
        
        this.myMask = new Ext.LoadMask({
            msg    : getText('Loading') + '...',
            target : maskTarget
        });
        this.myMask.show();
                 
        Ext.Ajax.request({
            scope:this,
            binary: true,  //set binary to true
            url: pictureSrc,
            method: "GET",
            success: function(response) {

                this.myMask.hide();

                var blob = new Blob([response.responseBytes], {type: 'image/png'}),
                url = window.URL.createObjectURL(blob);

                var record = {
                    file: file,
                    name: name,
                    path: url
                };

                var view = Ext.widget('zoom', {
                    autoShow: false,
                    record: record
                });

                view.show();
            }
        });
    }
    
});