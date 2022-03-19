/*  global Ext */

Ext.define('Dashboard.view.shared.viewList.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'viewListGrid',
    
    requires: [
        'Ext.grid.RowNumberer',
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager'
    ],
    store: null,
    configuration: {},
    cls: 'grid-checkbox-issue',
    
    enableLocking: true,
    syncRowHeight: true,
    
    initComponent: function (){
        
        //this.plugins[0].rowBodyTpl = this.getConfiguredTemplate(),

        this.store.on('load', function (store, records, options){
            
            this.loadThumbnails();
            
        }, this);

        var me = this;
        var columns = this.getConfiguredColumns();
                        
        Ext.apply(me, {

            columnLines: true,
            syncRowHeight: true,
            bufferedRenderer: false,
            loadMask: true,
            columns: columns,
            
            
//            selModel: Ext.create('Ext.selection.CheckboxModel', {
//                showHeaderCheckbox: false
//            }),
            
//            selModel: {
//                selType: 'checkboxmodel'
//            },
//            
//            selType: {
//                xtype: 'checkboxmodel',
//                mode: 'SINGLE',
//                showHeaderCheckbox: false,
//                checkerOnCls: Ext.baseCSSPrefix + 'grid-hd-checker-on'
//            },
            
            //showHeaderCheckbox: true,
            selModel: this.getSelectionModelConf().model,
            multiSelect: this.getSelectionModelConf().multiSelect,

            plugins: [
                {
                    ptype: 'rowexpander',
                    rowBodyTpl: this.getConfiguredTemplate(),
                    expandOnDblClick: true
                }
            ],
            
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
                store: this.store,
                displayInfo: true,
                plugins: Ext.create('Ext.ux.ProgressBarPager',{
                    width: 280
                })
                
            },
            
            viewConfig: {
                stripeRows: false,
                getRowClass: function (record){
                    try {
                        return me.getRowColorClass(record);
                    } catch (ex) {
                        return '';
                    }
                }
            }
            // DO NOT REMOVE THIS COMMENT 15/06/2017
//            bbar: [
//                {
//                    labelWidth: 80,
//                    fieldLabel: 'Jump to row',
//                    xtype: 'numberfield',
//                    minValue: 1,
//                    //maxValue: max,
//                    allowDecimals: false,
//                    reference: 'gotoLine',
//                    enableKeyEvents: true,
//                    listeners: {
//                        //scope: this,
//                        specialkey: function(field, e){
//                            if (e.getKey() === e.ENTER) {
//                                this.jumpToRow();
//                            }
//                        }
//                    }
//                }, {
//                    text: 'Go',
//                    handler: this.jumpToRow
//                }
//            ]
        });
        this.callParent();

    },

    jumpToRow: function (){
        var field = this.up('grid').down('numberfield[reference=gotoLine]');
        if (!field.isValid()) {
            return;
        }

        var listView = this.up('grid');
        listView.getSelectionModel().select(field.getValue() - 1, false);
        var record = listView.getSelectionModel().selected.getRange()[0];
        listView.getView().focusRow(record);
    },

    getSelectionModelConf: function (){
        
//        selModel: {
//                type: 'checkboxmodel',
//                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                    var result = this.defaultRenderer(value);
//                    if (record) {
//                        return (record.get('userTrxId') === 1 || record.get('userTrxId') === 3) ? result : '';
//                    }
//                },
//                showHeaderCheckbox: true
//            },
        
        var selectionModel = {
            model: null,
            multiSelect: false
        };
        
        if (this.configuration.multiSelection) {
            selectionModel.model = Ext.create('Ext.selection.CheckboxModel');
//            {
//                mode: 'simple',
//                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                    var result = this.defaultRenderer(value);
//                    if (record) {
//                        return (record.get('userTrxId') === 1 || record.get('userTrxId') === 3) ? result : '';
//                    }
//                },
//                showHeaderCheckbox: true
//            });
            selectionModel.multiSelect = true;
        }
        return selectionModel;
    },

    getConfiguredColumns: function (){

        var columns = [];
        
        //Row numbers
        if (this.configuration.displayRowNumbers) {
//            columns.push(
//                {
//                    xtype: 'rownumberer',
//                    width: 60,
//                    locked: true,
//                    lockable: false,
//                    draggable: false
//                }
//            );
            columns.push(
                {
                    text : '',
                    width: 60,
                    dataIndex: 'rowIndex',
                    sortable : false,
                    locked: true,
                    lockable: false,
                    draggable: false,
                    menuDisabled: true,
                    align: 'center',
                    scope: this,
                    renderer : function(value, metaData, record, rowIndex){
                        var rowNumber = this.store.indexOf(record) + 1 + this.store.lastOptions.start;
                        return rowNumber;
                    }
                }
            );
        }
        
        
        //thumbnails

        if (this.configuration.displayThumbnail) {
            columns.push(
                {
                    dataIndex: 'thumbnailName',
                    width: 50,
                    align: 'center',
                    sortable: false,
                    locked: true,
                    lockable: false,
                    draggable: false,
                    menuDisabled: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store){

                        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;

                        if(record.data.securedThumbnailSrc){
                            thumbnailSrc = record.data.securedThumbnailSrc;
                        }

                        return '<img src="' + thumbnailSrc + '" height="40" width="40" alt="thumbnail" />';
                    }
                }
            );
        }

        for (var i = 0; i < this.configuration.columns.length; i++) {
                        
            var column = this.configuration.columns[i];
            var cleanedColumn = Ext.create('Ext.grid.column.Column', column);
            columns.push(cleanedColumn);
        }

        return columns;
    },
    
    getConfiguredTemplate: function (){
        
        var model = this.configuration.extendedProperties;
        
        if (!model) {
            return new Ext.XTemplate('');
        }

        var tpl = '';
        var p = '<p>';
        
        for (var i = 0; i < model.properties.length; i++) {
            var div = this.buildProperty(model.properties[i]);
            p += div;
        }

        p += '</p>';
        tpl += p;

        
        var template = new Ext.XTemplate(tpl,

            {
                getDynamicPropertyValue: function (property, param, label){

                    var separator = getText(':')+' ';

                    if(!property.propertiesObject[param]){
                        return '';
                    }

                    var value = property.propertiesObject[param].value;
                    if(value === 'true' || value === true){
                        value = getText('Yes');
                    }else if(value === 'false' || value === false){
                        value = getText('No');
                    }else if (value === undefined || value === null){
                        value ="";
                    }

                    var text = label + separator + value +'';
                    return text;
                }
            }
        );
        return template;
    },
    
    
    buildProperty: function(model){
        try {
            
            if (!model.property) {
                return '';
            }
            
            var separator = getText(':') + ' ';
            var label = model.label;
            var property = model.property;
            var style = model.style;
            var div = '';
            
            if (model.isDynamic) {
                div = '<span style="' + style + '">' + '{[this.getDynamicPropertyValue(values, "' + property + '", "' + label + '")]}</span><br/>';
            } else {
                div = '<span style="' + style + '">' + label + separator + '{' + property + '}</span><br/>';
            }
            
            return div;
            
        } catch (ex) {
            Dashboard.tool.Utilities.error('[ViewList.List.buildProperty] error : ' + ex);
            return '';
        }
    },
    
    
    loadThumbnails: function(){
        
        var records = this.store.getData().items;
        
        Ext.each(records, function(record, index){
            
            var thumbnailSrc = record.data.thumbnailSrc;
            
            if(thumbnailSrc && thumbnailSrc !== Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC){
                
                Ext.Ajax.request({
                    scope:this,
                    binary: true,  //set binary to true
                    url: thumbnailSrc,
                    method: "GET",
                    success: function(response) {
                                                
                        var blob = new Blob([response.responseBytes], {type: 'image/png'});
                        var url = window.URL.createObjectURL(blob);
                        record.data.securedThumbnailSrc = url;
                        
                        this.getView().refresh();
                    }
                });
            }
                                    
        }, this);
        
    },

    // ==================================================
    // FORMATTER FUNCTIONS
    // ==================================================

    getRowColorClass: function (record){
        //console.log("record", record);
        try {
            var entityName = record.store.model.entityName;
            if (entityName === 'alerts.ItemAlert' || entityName === 'alerts.DeviceAlert' || entityName === 'alerts.InventoryAlert' || entityName === 'alerts.LocationAlert' || entityName === 'alerts.StockAlert' || entityName === 'alerts.UserAlert' || entityName === 'alerts.OperationAlert') {
                switch (record.data.alertConfiguration.alertLevel) {
                    case "LOW" :
                        return 'yellowRow'; // css class
                    case "MEDIUM" :
                        return 'orangeRow'; // css class
                    case "HIGH" :
                        return 'redRow'; // css class
                    default:
                        return '';
                }

            } else if (entityName === 'consultation.MaterialsSet') {
                if (parseInt(record.data.count) < 0) {
                    return 'redRow'; // css class
                }
                return '';
            } else {
                var isGreen = null;

                switch (entityName) {
                    case 'administration.Stocks' :
                        isGreen = record.data.levelIsCorrect;
                        break;
                    case 'historic.Check' :
                        isGreen = record.data.isRight;
                        break;
                    case 'system.Device' :
                        isGreen = record.data.authorized;
                        break;
                }

                if (isGreen !== null) {
                    if (isGreen) {
                        return 'greenRow'; // css class
                    } else {
                        return 'redRow'; // css class
                    }
                }
            }
            return '';
        } catch (ex) {
            Dashboard.tool.Utilities.info('[ViewList.Grid.getRowColorClass] error : ' + ex);
            return '';
        }
    }
});