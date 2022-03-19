Ext.define('Dashboard.view.indicator.Pie', {
    extend: 'Dashboard.view.indicator.Indicator',
    xtype: 'pie',
    
    requires:[
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate'
    ],
    
    controller:'pie',
    //defaultListenerScope: true,
    
    border: true,
    name:'indicator',
    
    config: {
        id: null,
        title: 'Mon widget',
        width: 420,
        height: 240,
        layout: 'anchor'
    },

     initComponent: function() {
         
       var pieStore = Ext.create('Ext.data.Store', {
            fields: ['label', 'value', 'color'],
            data: []
        });

        var me = this;

        me.items = [
            {
                xtype: 'polar',
                anchor: '100% 100%',
                insetPadding: '7.5 7.5 7.5 7.5',
                innerPadding: 24,

                legend: {
                    type: 'sprite',
                    docked: 'bottom',
                    flex:1
                },

                store: pieStore,

                series: [
                    {
                        type: 'pie',
                        reference: 'pie',
                        angleField: 'value',
                        border: false,

                        flex:1,
                        offsetX: 0,
                        offsetY: 0,
                        donut: false,
                        padding:0,

                        label: {
                            field: 'label',
                            orientation : 'horizontal',
                            display: 'outside',//'outside' | 'inside' | 'rotate' | 'horizontal' | 'vertical'| 'none'
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
                                for(var i=0; i < pieStore.data.items.length ; i++){
                                    if(this._hidden[i] === false){
                                        total += pieStore.data.items[i].data.value;
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
                
                plugins: 'responsive',
                platformConfig: {
                    desktop: {
                       interactions: [
                            {
                                type: 'rotate'
                            }
                        ]
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
