/*  global Ext  */

Ext.define('Dashboard.view.indicator.Donut', {
    extend: 'Dashboard.view.indicator.Indicator',

    xtype: 'donut',
    
    requires:[
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate'
    ],
    
    controller:'donut',
    //defaultListenerScope: true,
    
    border: true,
    name:'indicator',
    indicatorType: 'Donut',
    cls: 'indicator',
    
    config: {
        id: null,
        title: 'Mon widget',
        width: 420,
        height: 240,
        layout: 'anchor'
    },

     initComponent: function() {
         
       var donutStore = Ext.create('Ext.data.Store', {
            fields: ['label', 'value', 'color'],
            data: []
        });
        
        this.donut = 70;

        var me = this;

        me.items = [
            {
                xtype: 'polar',
                anchor: '100% 100%',
                insetPadding: '7.5 7.5 7.5 7.5',
                innerPadding: 20,

                legend: {
                    type: 'sprite',
                    docked: 'bottom'
                },

                store: donutStore,

                series: [
                    {
                        type: 'pie',
                        //type: 'pie3d',
                        reference: 'pie',
                        angleField: 'value',
                        border: false,

                        flex:1,
                        offsetX: 0,
                        offsetY: 0,
                        donut: this.donut,
                        padding:0,
                        showInLegend: true,

                        label: {
                            field: 'label',
                            orientation : 'horizontal',
                            display: 'outside',
                            contrast: true,
                            font: '14px Arial',
                            calloutLine: {
                                color: 'rgba(0,0,0,0)', // Transparent to hide callout line
                                length: 30//,
                                //width: 2
                            },
                            renderer: function(text, sprite, config, rendererData, index) {
                                
                                var record = rendererData.store.findRecord('label', text);
                                if(!record){
                                    return text;
                                }
                                
                                // calculate percentage
                                var total = 0;
                                for(var i=0; i < donutStore.data.items.length ; i++){
                                    if(this._hidden[i] === false){
                                        total += donutStore.data.items[i].data.value;
                                    }
                                }

                                var percent = Math.round(record.data.value / total * 100);
                                if(percent < 2){
                                    //config.calloutColor = 'rgba(0,0,0,0)';
                                    return '';
                                }
                                
                                return record.data.value.toString();
                            }
                        },

                        tooltip: {
                            trackMouse: true,
                            style: 'background: #272A36',
                            minWidth: 100,
                            maxWidth: 300,
                            maxHeight: 96,
                            renderer: function (toolTip, record, ctx) {
                                toolTip.setHtml(record.get('label') + ': ' + record.get('value'));
                            }
                        }

                    }
                ],
    //            interactions: [{
    //                type: 'iteminfo',
    //                listeners: {
    //                    show: function(me, item, panel) {
    //                        panel.setHtml('Stock Price: $' + item.record.get('price'));
    //                    }
    //                }
    //            }],
                plugins: 'responsive',
                platformConfig: {
                    desktop: {
                       interactions: 'rotate'
                    }
                },

                listeners: { // Listen to itemclick events on all series.
                    itemclick: function (chart, item, event) {
                        //alert('itemclick', item.category, item.field);
                    }
                }
             }  
        ];
        
        this.callParent();

    },
    
    setConfiguration: function(indicatorModel){
        
        var dataBinding = indicatorModel.data.dataBinding;
   
        this.width = Dashboard.tool.Ihm.getIndicatorWidthBySize(dataBinding.size);
        this.setHeight( dataBinding.height );
        
        var colors = [];
        
        for(var i=0; i< dataBinding.statisticReferences.length; i++ ){
            colors.push(dataBinding.statisticReferences[i].color);
        }

        if(colors){
            this.down('series').setColors(colors);
        }

    }
    
});
