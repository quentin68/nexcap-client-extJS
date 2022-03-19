/* global Ext */

Ext.define('Dashboard.view.shared.viewList.Album', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewListAlbum',

    requires: [
        'Ext.ux.ProgressBarPager'
    ],

    controller: 'album',

    config: {
        store: null,
        configuration: null
    },

    autoScroll: true,
    scrollable: 'y',
    
    deferInitialRefresh: false,

    initComponent: function () {
        
        this.getStore().on('load', function (store, records, options){
            
            this.loadThumbnails();
            
        }, this);

        var imageTpl = this.getConfiguredTemplate();

        var me = this;

        Ext.apply(me, {

            items: [
                {
                    xtype: 'dataview',
                    cls: 'pictures-card',
                    reference: 'dataview',

                    store: this.getStore(),
                    tpl: imageTpl,
                    itemSelector: 'div.thumb-wrap',

                    border: false,

                    singleSelect: false,
                    overItemCls: 'x-item-over',

//                    prepareData: function(data) {
//                        Ext.apply(data, {
//                            shortName: Ext.util.Format.ellipsis(data.name, 15),
//                            sizeString: Ext.util.Format.fileSize(data.size),
//                            dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
//                        });
//                        return data;
//                    }//,

                    //trackOver: true
                    listeners: {
                        scope: this,
                        itemclick: function (view, record, item, index, e, eOpts) {
                        }
                        //                 selectionchange: function(dv, nodes ){
                        //                    //var l = nodes.length,
                        //                     //   s = l !== 1 ? 's' : '';
                        //                    //this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
                        //                }
                    }
                }


            ],

            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
                store: this.getStore(),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }



        });

        this.callParent(arguments);

    },

    getConfiguredTemplate: function () {
        
        var parentScope = this;
        var model = this.getConfiguration();
        
        if(model.thumb === 'imageSrc'){
            model.thumb = 'securedImageSrc';
        }
                
        if (!model) {
            return new Ext.XTemplate('');
        }

        var separator = getText(':') + ' ';
        var tpl = '<div class="album-thumb-rapper"><img class="thumb-medium" src="{' + model.thumb + '}" /></div>' +
                '<div class="clearfix"></div>' +
                '<div class="card-title">{' + model.caption + '}</div>';
        var p = '<p>';

        for (var i = 0; i < model.properties.length; i++) {
            var row = model.properties[i];

            var formattedRow = parentScope.valueFormatter(row);
            
            var label = row.label;
            var property = row.property;
            var style = row.style;
            var div = '';

            if (row.isDynamic) { //isDynamic
                div = '<div style="' + style + '">{[this.getDynamicPropertyValue(values, "' + property + '", "' + label + '")]}</div>';
            } else {
                div = '<div style="' + style + '">' + label + separator + '{' + property + '}</div>';
            }

            p += div;
        }

        p += '</p>';
        tpl += p;

        var template = new Ext.XTemplate(
                '<tpl for=".">',
                '<div class="thumb-wrap">',
                tpl,
                '</div>',
                '</tpl>', {

                    getDynamicPropertyValue: function (property, param, label) {

                        if (!property.propertiesObject[param]) {
                            return '';
                        }

                        var value = property.propertiesObject[param].value;

                        if (value === 'true') {
                            value = getText('Yes');
                        } else if (value === 'false') {
                            value = getText('No');
                        } else if (value === undefined || value === null) {
                            value = '';
                        }

                        var text = label + separator + value + '';

                        return text;
                    }
                });

        return template;
    },

    valueFormatter: function (row) {
        console.log('valueFormatter');
        console.log(row);

        return {
            label: row.label,
            property: row.property,
            style: row.style
        };
    },
    
    loadThumbnails: function(){
        
        var records = this.getStore().getData().items;
        
        Ext.each(records, function(record){
                        
            var imageSrc = record.data.imageSrc;
            
            if(imageSrc){
                
                Ext.Ajax.request({
                    scope:this,
                    binary: true,  //set binary to true
                    method: "GET",
                    url: imageSrc,
                    success: function(response) {
                        
                        var blob = new Blob([response.responseBytes], {type: 'image/png'}),
                        url = window.URL.createObjectURL(blob);

                        record.data.securedImageSrc = url;
                                                
                        this.lookupReference('dataview').refresh();

                    }
                });
            }
                                    
        }, this);
        
    }
});