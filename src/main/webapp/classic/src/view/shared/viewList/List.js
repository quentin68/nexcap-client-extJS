/*  global Ext  */

Ext.define('Dashboard.view.shared.viewList.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'viewListList',

    requires: [
        'Ext.grid.RowNumberer',
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager'
    ],
    
    store: null,
    controller: 'list',
    cls: 'viewlist-grid',

    config: {
        configuration: {}
    },
    
    plugins: [
        {
            ptype: 'viewListRowExpander',
            pluginId: 'rowexpander',
            expandOnDblClick: true,
            rowBodyTpl: null
        }//,
//        {
//                ptype: 'bufferedrenderer',
//                variablerowheight: true
//        }
    ],

    initComponent: function() {
        
        this.titleTpl = this.getConfiguredTemplate();
        this.plugins[0].rowBodyTpl = this.getConfiguredExtendTemplate();
        
        this.store.on('load', function (store, records, options){
            
            this.loadThumbnails();
            
        }, this);
        
        var me = this;
        
        Ext.apply( me, {
            
            hideHeaders: true,
            columnLines: true,
            syncRowHeight: true,
            bufferedRenderer: false,
            //variableRowHeight: true,
            loadMask: true,
            
        //    selModel: {
        //        pruneRemoved: false
        //    },
        
            viewConfig: {
                //trackOver: false,
                listeners: {
                    itemclick: 'onClick',
                    expandbody: 'onExpandBody',
                    collapsebody: 'onCollapseBody'

                }
            },
                    
            columns: [
                {
                    text: 'name',
                    dataIndex: 'name',
                    flex: 1,
                    renderer: 'renderTitleColumn'
                }
            ],
            
            
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
                store: this.store,//this.$initParent.store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }

//            bbar: [
//                {
//                    xtype: 'form',
//                    layout: 'hbox',
//                    bodyPadding: 10,
//                    defaults:{
//                    },
//                    items:[
//                        {
//                            xtype: 'numberfield',
//                            labelWidth: 80,
//                            fieldLabel: getText('Jump to row'),
//                            minValue: 1,
//                            //maxValue: max,
//                            allowDecimals: false,
//                            reference: 'gotoLineField',
//                            enableKeyEvents: true,
//                            listeners: {
//                                scope: this,
//                                specialkey: function(field, e){
//                                    if (e.getKey() === e.ENTER) {
//                                        this.jumpToRow(field);
//                                    }
//                                }
//                            }
//                        }, {
//                            xtype: 'button',
//                            text: getText('Go'),
//                            listeners: {
//                                scope: this,
//                                click: function(field, e){
//                                    this.jumpToRow(field)
//                                }
//                            }
//                        }
//                    ]
//                }
//            ]  
        });
        
        this.callParent();
    },
            
    jumpToRow: function(sender){
        var form = sender.up('form');
        if (form.isValid()) {
            var field = form.down('numberfield[reference=gotoLineField]');
            this.view.bufferedRenderer.scrollTo(field.getValue() - 1, true);
        }    
    },
    
//    validStates: {
//        all: 1,
//        news: 1,
//        forum: 1
//    },
//    
//
//    isValidState: function (state) {
//        return state in this.validStates;
//    },
    
    getConfiguredTemplate: function(){
                        
        var model = this.configuration.mainProperties;
        
        if(model.thumb === 'thumbnailSrc'){
            model.thumb = 'securedThumbnailSrc';
        }
        
        var content = '';
        
        if(!model){
            return new Ext.XTemplate('');
        }
        
        var content = '';
        
        Ext.each(model.properties, function(property){
            content += this.buildProperty(property);
        }, this);
            
        
        var subTitle = this.buildProperty(model.subTitle);
        
        if(subTitle === 'undefined:'){
            subTitle = '';
        }
                        
        var tpl =  new Ext.XTemplate(
            '<div class="text-wrapper">',
                '<div class="viewlist-data">',
                    '<div class="viewlist-picture"><img src="{'+ model.thumb +'}"></div>',
                    '<div class="viewlist-content">',
                        '<div class="viewlist-title">{'+ model.title +'}',
                            subTitle,
                        '</div>' ,
                        '<p class="text_ellipsis">',
                            content,
                        '</p>',
                        '<div class="viewlist-paragraph viewlist-paragraph-simple" {expanded}></div>',
                        '<div class="viewlist-toggle expand" {expanded}>',
                            '<span>expand</span>',
                            '<img src="resources/icons/expand-news.png">',
                        '</div>',
                    '</div>',
                '</div>',
            '<div>', {
            
            getDynamicPropertyValue: function (property, param, label) {
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
        });

        return tpl;
    },
            
    
    
    getConfiguredExtendTemplate: function(){
        
        var model = this.configuration.extendedProperties;
        
        if(!model){
            return new Ext.XTemplate('');
        }
        
        var content = '' ;
        
        Ext.each(model.properties, function(property){
            content += this.buildProperty(property);
        }, this);
        
        var tpl = new Ext.XTemplate(
            '<div class="text-wrapper">',
                '<div class="viewlist-data">',
                    '<div class="viewlist-paragraph">',
                        '<p class="text_ellipsis">',
                            content,
                        '</p>',
                    '</div>',
                    '<div class="viewlist-toggle collapse"><span>collapse</span><img src="resources/icons/collapse-news.png"></div>',
                '</div>',
            '</div>', 
            {
                getDynamicPropertyValue: function (property, param, label) {
                    
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
        
        return tpl;
    },
    
    
    buildProperty: function(model){
        try {
            var separator = getText(':') + ' ';
            var label = model.label;
            var property = model.property;
            var style = model.style;
            var div = '';

            if (!model.property) {
                return '';
            }

            if (model.option && model.option.type === 'condition') {
                var cases = '';
                for (var i = 0; i < model.option.cases.length; i++) {
                    var condition = model.option.cases[i];
                    cases += '<tpl case="' + condition.value + '"><span style="' + condition.style + '">{' + property + '}</span>';
                }
                var tpl = '<tpl switch="' + property + '">' + cases + '</tpl>';
                return tpl;
            }

            if (model.isDynamic) {
                div = '<div style="' + style + '">{[this.getDynamicPropertyValue(values, "' + property + '", "' + label + '")]}</div>';
            } else {
                div = '<div style="' + style + '">' + label + separator + '{' + property + '}</div>';
            }

            return div;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[ViewList.List.buildProperty] error : ' + ex);
            return '';
        }
    },
    
    
    loadThumbnails: function(){
        
        var records = this.store.getData().items;
        
        Ext.each(records, function(record){
            
            var thumbnailSrc = record.data.thumbnailSrc;
            
            if(thumbnailSrc){
                
                Ext.Ajax.request({
                    scope:this,
                    binary: true,  //set binary to true
                    method: "GET",
                    url: thumbnailSrc,
                    success: function(response) {
                        
                        var blob = new Blob([response.responseBytes], {type: 'image/png'}),
                        url = window.URL.createObjectURL(blob);

                        record.data.securedThumbnailSrc = url;
                        this.getView().refresh();

                    }
                });
            }
                                    
        }, this);
        
    }
    
});
