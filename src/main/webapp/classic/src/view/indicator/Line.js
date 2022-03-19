/* global Ext  */

Ext.define('Dashboard.view.indicator.Line',{
    extend: 'Dashboard.view.indicator.Indicator',
    xtype: 'line',
    
    requires:[
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Area',
        'Ext.chart.interactions.CrossZoom'
    ],
    
    controller:'line',
    
    border: true,
    name:'indicator',
    id: null,
    title: 'New line',
    minWidth: 100,
    height: 400,
    layout: 'hbox',
    cls: 'indicator',
    
    initComponent: function() {
        
        var me = this;
        
        me.myDataStore = Ext.create('Ext.data.Store', {
            
            fields: ['name', 'v1', 'v2'],
            data: [
//                {"name": "Item-0", "v1": 18.34,"v2": 0.04},
//                {"name": "Item-1", "v1": 2.67, "v2": 14.87},
//                {"name": "Item-2", "v1": 1.90, "v2": 5.72},
//                {"name": "Item-3", "v1": 21.37,"v2": 2.13},
//                {"name": "Item-4", "v1": 2.67, "v2": 8.53},
//                {"name": "Item-5", "v1": 18.22,"v2": 4.62},
//                {"name": "Item-6", "v1": 28.51, "v2": 12.43},
//                {"name": "Item-7", "v1": 34.43, "v2": 4.40},
//                {"name": "Item-8", "v1": 21.65, "v2": 13.87},
//                {"name": "Item-9", "v1": 12.98, "v2": 35.44},
//                {"name": "Item-10", "v1": 22.96, "v2": 38.70},
//                {"name": "Item-11", "v1": 0.49, "v2": 51.90},
//                {"name": "Item-12", "v1": 20.87, "v2": 62.07},
//                {"name": "Item-13", "v1": 25.10, "v2": 78.46},
//                {"name": "Item-14", "v1": 16.87, "v2": 56.80}
            ]

        });

        me.items = [];

        this.callParent();

    },

    
    /**
     * Create new empty chart
     * @param {set[curve]} series
     * @param {store} store
     * @param {string} xTitle
     * @param {string} yTitle
     * @param {boolean} grid
     * @returns {LineAnonym$0.createChart.chart}
     */
    createChart: function(series, store, xTitle, yTitle, grid, filled){
        
        var chart = {
                xtype : 'cartesian',
                renderTo: document.body,
                width: '100%',
                height: '100%',
                insetPadding: '24 52 12 52',
                store: store,
                
                plugins: 'responsive',
                platformConfig: {
                    desktop: {
                       interactions: [{
                              type: 'crosszoom'
//                            type: 'panzoom',
//                            zoomOnPanGesture: true
                        }]
                    }
                },
                //interactions: 'panzoom',

                legend: {
                    type: 'sprite',
                    docked: 'bottom'
                },

                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        title: {
                            text: yTitle,
                            fontSize: 15
                        },
                        grid: grid//,
//                        minimum: 0
                    },
                    {
                        type: 'category',
                        visibleRange: [0, 1],
                        position: 'bottom',
                        //fields: ['name'],
                        title: {
                            text: xTitle,
                            fontSize: 14
                        }
                    }
                ],

                series: series
            };
            
        return chart;    
        
    },
    
    /**
     * Create new curve
     * @param {string} xField
     * @param {string} yField
     * @param {string} label
     * @param {string} color
     * @param {boolean} smooth
     * @param {boolean} marker
     * @returns {LineAnonym$0.createCurve.curve}
     */
    createCurve: function(xField, yField, label, color, smooth, _marker, filled){
        
                
        var curve = {
            type: 'line',
            xField: xField,
            yField: yField,
            title: label, //legend label
            //colors : [ color ],
            //color : color,
            fill: filled,

            tooltip: {
                trackMouse: true,
                maxWidth: 300,
                minHeight: 32,
                maxHeight: 96,
                style: 'background: #272A36',
                hideDelay: 3000,
                renderer: function (toolTip, record, ctx) {
                    var index = ctx.series._yField.indexOf(ctx.field);
                    var label = ctx.series._title[index];
                    toolTip.setHtml(record.get('name') +',' + label + ' : ' +record.get(ctx.field));
                }
            },

            subStyle: {
                fill: color, //filled ? color : null,
                //colors: [ color ],
                smooth: smooth,
                stroke: color,
                fillOpacity: 0.6,
                miterLimit: 3,
                lineCap: 'miter',
                lineWidth: 2
            }
        };
        
        if(_marker === true){
            curve.marker = {
                type: 'circle',
                radius: 4,
                lineWidth: 2
            };
            }
        
        return curve;
    },
    
  
    setConfiguration: function(indicatorModel){

        this.title = indicatorModel.data.title;
        this.serverId = indicatorModel.data.id;
        
        var dataBinding = indicatorModel.data.dataBinding;
        
        this.width = Dashboard.tool.Ihm.getIndicatorWidthBySize(dataBinding.size);
        this.height = dataBinding.height;
        
        var xTitle = dataBinding.xTitle;
        var yTitle = dataBinding.yTitle;
        
        var grid = dataBinding.grid;
        var filled = dataBinding.filled;
        
        if(filled === undefined){
            filled = null;
        }
        
        var series = [];
        
        for(var i = 0; i < dataBinding.statisticReferences.length; i++){
            
            var statisticReference = dataBinding.statisticReferences[i];
            
            //name, yfield, label, color, smooth, marker
            var curve = this.createCurve(
                statisticReference.xField,
                statisticReference.yField,
                statisticReference.label,
                statisticReference.color,
                statisticReference.smooth,
                statisticReference.marker,
                filled
            ); 
    
            series.push(curve);
        }
        
        var chart = this.createChart(series, this.myDataStore, xTitle, yTitle, grid, filled);
        this.add(chart);
    }
    
});
