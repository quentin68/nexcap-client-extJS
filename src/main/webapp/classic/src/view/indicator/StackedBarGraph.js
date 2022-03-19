Ext.define('Dashboard.view.indicator.StackedBarGraph',{
    extend: 'Dashboard.view.indicator.Indicator',

    xtype: 'stackedBarGraph',
    
    requires:[
        'Ext.chart.series.Bar',
         'Ext.chart.interactions.CrossZoom'
    ],
    
    controller:'stackedBarGraph',
    
    border: true,
    name:'indicator',
    id: null,
    title: 'New stacked bargraph',
    minWidth: 100,
    height: 400,
    layout: 'hbox',
    
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
     * @param {boolean} grid
     * @returns {LineAnonym$0.createChart.chart}
     */
    createChart: function(series, store, xTitle, yTitle, gridVisible){
        
        var grid = false;
        
        if(gridVisible){
            grid = {
                odd: {
                    fillStyle: 'rgba(255, 255, 255, 0.06)'//,
//                    stroke: 'red',
//                    opacity: 0.3,
//                    lineWidth: 1
                },
                even: {
                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                }
            }
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
            
            plugins: {
                ptype: 'chartitemevents',
                moveEvents: true
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
//                        value: 800,
//                        line: {
//                            strokeStyle: 'red',
//                            lineDash: [6, 3],
//                            title: {
//                                text: 'Limite haute',
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

            legend: {
                type: 'sprite',
                docked: 'bottom'
            },

            series: series//,

//            listeners: { // Listen to itemclick events on all series.
//                itemclick: function (chart, item, event) {
//                    alert('itemclick', item.category, item.field);
//                }
//            }
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
    createCurve: function(xField, yField, titles, label, color){
        
        var curve = {
            type: 'bar',
            xField: xField,
            yField: yField,
            title: titles,
            stacked: true,
            colors : color,

            style: {
                opacity: 0.80,
                minGapWidth: 16
            },

            subStyle: {
                fill: color,
                'stroke-width': 1//,
//                stroke: '#1F6D91'
            },
                    
            tooltip: {
                trackMouse: true,
                maxWidth: 300,
                maxHeight: 96,
                style: 'background: #272A36',
                hideDelay: 3000,
                renderer: function (toolTip, record, ctx) {
                    var index = ctx.series._yField.indexOf(ctx.field);
                    var label = ctx.series._title[index];
                    toolTip.setHtml(record.get('name') +',' + label + ' : ' +record.get(ctx.field));
                    //toolTip.setHtml(label + ' : ' +record.get(ctx.field));
                }
            }//,
                    
//            listeners: {
//                itemmousemove: function (series, item, event) {
//                     console.log('itemmousemove', item.category, item.field);
//                }
//            }
//            label: {
//                display: 'insideEnd',//'outside',
//                'text-anchor': 'middle',
//                field: yField,
//                color: "#000000",
//                orientation: 'horizontal'//'vertical'//
//            }
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