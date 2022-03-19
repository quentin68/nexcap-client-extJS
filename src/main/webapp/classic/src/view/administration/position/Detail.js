/* global Ext */

Ext.define('Dashboard.view.administration.position.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'positionDetail',
    
    initComponent: function() {
                
        this.configDetail();
        
        var me = this;
        Ext.apply( me, {
            
            items: [
                 {
                    xtype: 'displayfield',
                    bind: {
                        value: '{name}' 
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'

                },{
                    xtype: 'image',
                    reference: 'thumbnail',
                    width: this.getImageSize() ? this.getImageSize() : '90%',
                    margin: '0 24 12 24'
                },{
                    title: getText('Position'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }//,
//                {
//                    title: getText('Locations'),
//                    reference: 'locations',
//                    iconCls: 'fa fa-map-marker'
//                }
//                ,{
//                    title: getText('Allowed users'),
//                    reference: 'allowedUsers',
//                    iconCls: 'fa fa-street-view' //x-fa fa-user
//                }
            ]
        });

        this.callParent(arguments);

    },
    
    
    setData: function(data){
        
        if(!data){
            return;
        }
        
        this.viewModel.setData(data);
        
        var imgSrc = data.imageSrc;
        
        Ext.Ajax.request({
            scope:this,
            binary: true,  //set binary to true
            url: imgSrc,
            success: function(response) {

                var blob = new Blob([response.responseBytes], {type: 'image/png'}),
                url = window.URL.createObjectURL(blob);

                var thumbnail = this.down('image[reference=thumbnail]');
                thumbnail.setSrc(url);
                thumbnail.setAlt('thumbnail');
            }
        });


        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({name: getText('Path'), value: (data.path === '' ? data.name : data.path)}));
        characteristicsPanel.add(this.buildField({name: getText('Description'), value: data.description || ''}));
        characteristicsPanel.add(this.buildField({name: getText('Last update'), 
            value: (data.lastUpdateDate ? Ext.Date.format(data.lastUpdateDate, getText('m/d/Y')) : '')
        }));

//        var locationsPanel = this.query('panel[reference=locations]')[0];
//        locationsPanel.removeAll();
        
//        var allowedUsersPanel = this.query('panel[reference=allowedUsers]')[0];
//        allowedUsersPanel.removeAll();
    },
    
    clean: function (){

        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
    }
    
});