/* global Ext  */

Ext.define('Dashboard.view.indicator.BarGraph',{
    extend: 'Dashboard.view.indicator.Indicator',
    xtype: 'barGraph',
    
    requires:[
        'Ext.chart.series.Bar'
    ],
    
    controller:'barGraph',
    
    border: true,
    name:'indicator',
    id: null,
    title: 'New bargraph',
    minWidth: 100,
    height: 400,
    layout: 'hbox',
    cls: 'indicator',
    
    initComponent: function() {
        var me = this;
        
        me.myDataStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'v1', 'v2'],
            data: [ ]
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
     * @param {boolean} gridVisible
     * @returns {LineAnonym$0.createChart.chart}
     */
    createChart: function(series, store, xTitle, yTitle, gridVisible){
        
        var grid = false;
        
        if(gridVisible){
            
            grid = {
                    odd: {
                        fillStyle: 'rgba(255, 255, 255, 0.06)'
//                                stroke: 'red',
//                            opacity: 0.3//,
//                            lineWidth: 1
                    },
                    even: {
                        fillStyle: 'rgba(0, 0, 0, 0.03)'
//                            stroke: 'orange',
//                            opacity: 0.3
                    }
                };
        }
        
        var chart = {
                xtype: 'cartesian',
                reference: 'chart',
                renderTo: document.body,
                width: '100%',
                height: '100%',
                flipXY: false,
                insetPadding: 24,
                store: store,
                
                plugins: 'responsive',
                platformConfig: {
                    desktop: {
                       interactions: 'crosszoom'
                    }
                },

//                plugins: {
//                    ptype: 'chartitemevents',
//                    moveEvents: true
//                },

                legend: {
                    type: 'sprite',
                    docked: 'bottom'
                },

                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        titleMargin: 24,

                        title: {
                            text: yTitle,
                            fontSize: 14
                        },
                        grid: grid,
                        
                        minimum: 0//,

    //                    limits: [{
    //                        value: 50,
    //                        line: {
    //                            strokeStyle: 'red',
    //                            lineDash: [6, 3],
    //                            title: {
    //                                text: 'Monthly minimum',
    //                                fontSize: 14
    //                            }
    //                        }
    //                    }]
                    }, 
                    {
                        type: 'category',
                        position: 'bottom',
                        title: {
                            text: xTitle,
                            fontSize: 14
                        },
                        grid: false,
                        label: {
//                            rotate: {
//                                degrees: 315 
//                            }
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
     * @param {string} titles
     * @param {string} label
     * @param {string} color
     * @param {boolean} smooth
     * @param {boolean} marker
     * @returns {LineAnonym$0.createCurve.curve}
     */
    createCurve: function(xField, yField, titles, label, color, smooth, marker){
        
        var curve = {
            type: 'bar',
            xField: xField,
            yField: yField,
            title: titles,
            stacked: false,
            colors : color,

            style: {
                opacity: 0.80,
                minGapWidth: 16
            },

            subStyle: {
                fill: color,//["#115fa6", "#94ae0a", "#FAC411", "FA4811"],
                //stroke: ['#18428E', 'green'],
                'stroke-width': 1
            },
                    
            tooltip: {
                trackMouse: true,
                maxWidth: 300,
                minHeight: 32,
                maxHeight: 96,//32,
                style: 'background: #272A36',
                hideDelay: 3000,
                renderer: function (toolTip, record, ctx) {
                    var index = ctx.series._yField.indexOf(ctx.field);
                    var label = ctx.series._title[index];
                    toolTip.setHtml(record.get('name') +',' + label + ' : ' +record.get(ctx.field));
                }
            },

//            listeners: {
//                itemmousemove: function (series, item, event) {
//                     console.log('itemmousemove', item.category, item.field);
//                }
//            },
            label: {
                display: 'none',//'outside',
                'text-anchor': 'middle',
                field: yField,//['number1','number2'],
                color: "#000000",
                orientation: 'horizontal'//'vertical'//
            }
        };
        
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
        
        var series = [];
        var yField = [];
        var titles = [];
        var colors = [];
        
        for(var i = 0; i < dataBinding.statisticReferences.length; i++){
                        
            var statisticReference = dataBinding.statisticReferences[i];
            
            yField.push(statisticReference.yField);
            titles.push(statisticReference.label);
            colors.push(statisticReference.color);
        }
        
        //name, yfield, titles, label, color
        var curve = this.createCurve(
            statisticReference.xField,
            yField,
            titles,
            statisticReference.label,
            colors//statisticReference.color
        ); 

        series.push(curve);
        
        var chart = this.createChart(series, this.myDataStore, xTitle, yTitle, grid);
        this.add(chart);
    }
    
});
