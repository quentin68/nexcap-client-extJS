/*  global Ext */

Ext.define('Dashboard.view.indicator.PostIt', {
    extend : 'Dashboard.view.indicator.Indicator',
    xtype: 'postIt',

    cls: 'postit-panel',
    
    controller:'postIt',

    name:'indicator',
    border: true,
    width: null,
    height: null,
    title: null,

    layout: 'hbox',
    bodyPadding: '0',
    
    initComponent: function() {
        
        var me = this;

        Ext.apply( me, {
            
            viewModel: {
                data: {
                    statisticReference: '', 
                    icon: 'cloud-icon.png',
                    label: 'label',
                    value: 'value',
                    color: 'color'
                }
            },
    
            items:[
                {
                    xtype: 'panel',
                    width: 100,
                    height: '100%',
                    flex:0,
                    layout: 'center',
                    bind:{
                        bodyStyle:{ 
                            background: '{color}'
                        }
                    },
                    items:[ 
                        {
                            xtype: 'image',
                            width: 48,
                            height: 48,
                            bind:{
                                src: '{icon}',
                                alt: '{icon}'
                            }
                        }
//                        {
//                            bind:{
//                                html: '<span class="postit-image-container" style="background: {color};">'+
//                                    '<img src="{icon}" width="48" alt="{label}"/>'+
//                                    '</span>'
//                            }
//                        }
                    ]
                }, {
                   xtype: 'panel',
                   minHeigth : 88,
                   flex:1,
                   layout: 'vbox',
                   border: false,
                   defaults:{
                        xtype: 'displayfield',
                        width:'100%',
                        constraint: true,
                        editable: false
                   },
                   items:[
                       {
                            fieldCls: 'postit-value',
                            margin: '20 20 0 20',
                            bind:{
                                value: '{value}'
                            }
                        }, {
                            fieldCls: 'postit-label',
                            margin: '20 20 20 20',
                            bind:{
                                value: '{label}'
                            }
                        }   
                    ]
                }
            ]
        });
        
        this.callParent(arguments);
    },
    
    showEditionButtons: function(){
 
        var buttonsList = this.query('button[flag=editionMode]');
       
        Ext.each(buttonsList, function(button){
            button.setVisible(true);
        });
       
        this.getHeader().height = 40;
        this.updateLayout();
    },
   
    hideEditionButtons: function(){
 
        var buttonsList = this.query('button[flag=editionMode]');
       
        Ext.each(buttonsList, function(button){
            button.setVisible(false);
        });
 
        this.getHeader().height = 0;
        this.updateLayout();
    }

});
