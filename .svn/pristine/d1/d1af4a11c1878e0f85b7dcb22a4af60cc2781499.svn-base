Ext.define('Dashboard.view.indicator.Area',{
    extend: 'Dashboard.view.indicator.Indicator',
    xtype: 'area',
    
    requires:[
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Area'
    ],
    
    controller:'line',
    
    border: true,
    name:'indicator',
    id: null,
    title: 'New line',
    minWidth: 800,
    height: 500,
    layout: 'hbox',
    
    viewModel: {
        data: {
            
            width : 800,
            height: 500,
            title: 'Historique emprunts',
            icon: 'cloud-icon.png',
            columnsColor:['orange', '#94ae0a'],
            legendLabels: ['Empruntés', 'Restitués'],
            statisticRequest: {
                
                format: 'category,number1,number2',
                informations:['OP_BORROWING', 'OP_RETURN'],
                fields:[
                    {
                        valueType: 'category',
                        property: 'day',
                        name: 'category'
                    },
                    {
                        valueType: 'number',
                        property: 'totalCount',
                        name: 'number1'
                    },
                    {
                        valueType: 'number',
                        property: 'totalCount',
                        name: 'number2'
                    }
                ],
                filters:[
                    {
                        property: 'date',
                        operator: 'after',
                        value: '12-12-2016'
                    },
                    {
                        property: 'date',
                        operator: 'before',
                        value: '12-12-2016'
                    }
                ] 
            }

        }
    },
    
    initComponent: function() {
        var me = this;
        
        me.myDataStore = Ext.create('Ext.data.Store', {
            
            fields: ['name', 'data1', 'data2'],
            
            data: [{
                'name': 'metric one',
                'data1': 10,
                'data2': 14
            }, {
                'name': 'metric two',
                'data1': 7,
                'data2': 16
            }, {
                'name': 'metric three',
                'data1': 5,
                'data2': 14
            }, {
                'name': 'metric four',
                'data1': 2,
                'data2': 6
            }, {
                'name': 'metric five',
                'data1': 27,
                'data2': 36
            }]

        });

        me.items = [
            
            {
                xtype: 'cartesian',
                renderTo: document.body,
                width: 500,
                height: 300,
                store: {
                    fields: ['name', 'g1', 'g2'],
                    data: [
                        {"name": "Item-0", "g1": 18.34,"g2": 0.04},
                        {"name": "Item-1", "g1": 2.67, "g2": 14.87},
                        {"name": "Item-2", "g1": 1.90, "g2": 5.72},
                        {"name": "Item-3", "g1": 21.37,"g2": 2.13},
                        {"name": "Item-4", "g1": 2.67, "g2": 8.53},
                        {"name": "Item-5", "g1": 18.22,"g2": 4.62},
                        {"name": "Item-6", "g1": 28.51, "g2": 12.43},
                        {"name": "Item-7", "g1": 34.43, "g2": 4.40},
                        {"name": "Item-8", "g1": 21.65, "g2": 13.87},
                        {"name": "Item-9", "g1": 12.98, "g2": 35.44},
                        {"name": "Item-10", "g1": 22.96, "g2": 38.70},
                        {"name": "Item-11", "g1": 0.49, "g2": 51.90},
                        {"name": "Item-12", "g1": 20.87, "g2": 62.07},
                        {"name": "Item-13", "g1": 25.10, "g2": 78.46},
                        {"name": "Item-14", "g1": 16.87, "g2": 56.80}
                    ]
                },

                interactions: {
                    type: 'panzoom'
                },

                legend: {
                    docked: 'right'
                },

                axes: [{
                    type: 'numeric',
                    position: 'left',
                    grid: true
                }, {
                    type: 'category',
                    position: 'bottom',
                    visibleRange: [0, 0.4]
                }],

                series: [
                    {
                        type: 'area',
                        xField: 'name',
                        yField: ['g1', 'g2'],
                        title: ['G1', 'G2'],
                        style: {
                            stroke: '#666666',
                            fillOpacity: 0.8
                        }
                    }
                ]
            }  
        ]; //items
    
        this.callParent();
    },
  
    setData: function(indicatorModel){
        
        //TODO
        
    }
    
});