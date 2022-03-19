/* global Ext */

Ext.define('Dashboard.view.indicator.VerticalBarGraph',{
    extend: 'Dashboard.view.indicator.Indicator',
    xtype: 'verticalBarGraph',
    
    requires:[
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.CrossZoom'
    ],
    
    controller:'verticalBarGraph',
    
    border: true,
    name:'indicator',
    id: null,
    title: 'New vertical bargraph',
    minWidth: 100,
    height: 400,
    layout: 'hbox',
    
    
    initComponent: function() {
        var me = this;
        
        me.myDataStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'v1'],
            data: [ ],
            sorters: [
                {
                    property: 'v1',
                    direction: 'DESC'
                }
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
    createChart: function(series, store, xTitle, yTitle, titles){
        
        var legend = titles[0];
        
        var chart = {
            xtype: 'cartesian',
            reference: 'chart',
            renderTo: document.body,
            width: '100%',
            height: '100%',
            flipXY: true,
            insetPadding: '24 10 24 24',
            
            innerPadding: {
                right: 50
            },
            
//            interactions: 'itemhighlight',

//            plugins: {
//                ptype: 'chartitemevents',
//                moveEvents: true
//            },
            
            store: this.myDataStore,
            
            axes: [
                {
                    type: 'category',
                    position: 'left',
                    margin: 24,

                    label:{
                        textAlign: 'left'
                    }
                },
                {
                    type: 'numeric',
                    position: 'top',
                    title: {
                        text: legend,
                        fontSize: 14,
                        fontWeight: 'bolder',
                        textAlign: 'left'
                    },
                    style: {
                        axisLine: false,
                        globalAlpha: 0,
                        hidden: true
                    }
                }
            ],

            series: series//,
            
//            legend: {
//                docked: 'top'
//            }
            
//            renderer: function (sprite, config, rendererData, index) {
//                if (config.type === 'marker') {
//                    return { strokeStyle: (index % 2 === 0 ? 'red' : 'black') };
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
            xField: 'name',
            yField: 'v1',
            
            style: {
                opacity: 0.80,
                minGapWidth: 5//,
//                minBarWidth: 16,
//                maxBarWidth: 32
            },

            label: {
                display: 'outside',
                'text-anchor': 'middle',
                font: '14px Arial',
                field: ['v1'],
                color: "#000000",
                orientation: 'horizontal',
                calloutLine: {
                    color: 'rgba(0,0,0,0)'//, // Transparent to hide callout line
                    //length: 12//,
                    //width: 2
                }
            },

//            highlight: {
//                strokeStyle: 'black',
//                fillStyle: '#57cbd1',
//                radius: 10
//            },

            tooltip: {
                trackMouse: true,
                maxWidth: 300,
                minHeight: 32,
                maxHeight: 96,
                style: 'background: #272A36',
                hideDelay: 3000,
                renderer: function (toolTip, record, ctx) {
                    toolTip.setHtml(record.get('name') + ': ' + record.get('v1'));
                }
            },

            renderer: function(sprite, record, attr, index, store){

                var nbColors = color.length;// ["#115fa6", "#94ae0a", "#FFBF00", "#FF0D00", "#8C00FF", "#2BFF00", "F#6FF00", "#C8FF00", "#EBD1E5", "#EBD1E5"  ];
                var  indexColor =   index % nbColors;

                return Ext.apply(attr, {
                   fill: color[indexColor]
                });
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
        
        var multicolored = dataBinding.multicolored;
        
        var series = [];
        var yField = [];
        var titles = [];
        var colors = [];
        
        for(var i = 0; i < dataBinding.statisticReferences.length; i++){
            
            var statisticReference = dataBinding.statisticReferences[i];
            
            yField.push(statisticReference.yField);
            titles.push(statisticReference.label);
        }
        
        if(multicolored){
            colors = [
                "#115fa6", //blue,
                "#FAC411", //orange
                "#94ae0a", //kaki
                "#FF0D00", //red
                "#8C00FF", //purple
                "#7A7A7A",  //grey
                "#226A82", //petrol
                "#F0AAEA", //Pink
                "#946E62", //brown
                "#19942C" //green
            ];
        }else{
            for(var j = 0; j<100; j++){    
                colors.push(dataBinding.statisticReferences[0].color);
            }
        }
        
        //name, yfield, titles, label, color
        var curve = this.createCurve(
            statisticReference.xField,
            yField,
            titles,
            statisticReference.label,
            colors
        ); 

        series.push(curve);
        
        var chart = this.createChart(series, this.myDataStore, xTitle, yTitle, titles);
        this.add(chart);
    }
    
    
    
});
