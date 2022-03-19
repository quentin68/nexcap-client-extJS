/* global Ext  */

Ext.define('Dashboard.view.historic.access.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'accessDetail',
    
    
    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        Ext.apply( me, {
            
            defaults:{
                xtype: 'panel'
            },
            
            items: [
                {
                    layout: 'column',
                    reference: 'header'
                }, {
                    title: getText('Access'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    
    clean: function(){
        
        this.down('panel[reference=header]').removeAll();
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        
    },
    
    
    setData: function(data){
        
        if(!data){
            return;
        }
        
        this.down('panel[reference=header]').removeAll();
        
        this.buildHeader(data);
        
        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        characteristicsPanel.add(this.buildField({name: getText('Last update date'),value: this.dateToString(data.lastUpdateDate)}));

    },
    
    
    buildHeader: function(data){
        
        var header = this.down('panel[reference=header]');
        
        var infos = [
{
                xtype: 'container',
                layout: 'vbox',
                items:[
                    {
                        xtype: 'container',
                        flex:1
                    }, {
                        reference: 'title',
                        html: '<h2>' + data.name.toUpperCase() + '</h2>',
                        margin: '0 0 0 12'
                    }, {
                        xtype: 'container',
                        flex:1
                    }
                ]
            }
        ];
        
        header.add(infos);
    }
    
});