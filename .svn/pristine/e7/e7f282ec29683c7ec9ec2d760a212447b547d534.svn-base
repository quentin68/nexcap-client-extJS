Ext.define('Dashboard.view.shared.IconPicker',{
    extend: 'Ext.window.Window',
    xtype: 'iconPicker',
    
    requires: [
            'Ux.Img'
    ],
    
    title: 'Icon picker',
    //ui: 'icon-picker',
    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    
    imagesList :[
        'fa-archive', 'fa-area-chart', 'fa-bar-chart', 'fa-battery-2', 'fa-battery-empty', 'fa-battery-full', 'fa-bell',
        'fa-binoculars', 'fa-birthday-cake','fa-bomb','fa-book','fa-bug','fa-briefcase', 'fa-bullseye', 
        'fa-calendar', 'fa-camera', 'fa-certificate', 'fa-check-square', 'fa-check', 'fa-clock', 'fa-cog', 'fa-comment', 'fa-commenting',
        'fa-cubes','fa-diamond','fa-euro','fa-eye', 'fa-exclamation-circle', 'fa-exclamation' , 'fa-fighter-jet','fa-flash',
        'fa-frown', 'fa-gavel', 'fa-gears',
        'fa-hand-spock','fa-hdd-o', 'fa-history','fa-hourglass-half','fa-laptop', 'fa-lightbulb', 'fa-line-chart',
        'fa-map','fa-map-marker','fa-microchip', 'fa-paperclip', 'fa-paper-plane-o', 'fa-percent', 
        'fa-plus-circle', 'fa-plus','fa-question', 'fa-question-circle', 'fa-refresh', 'fa-reply-all', 'fa-reply','fa-rocket', 
        'fa-rss-square', 'fa-share-square', 'fa-share',
        'fa-signal', 'fa-sitemap', 'fa-smile','fa-stethoscope','fa-tag','fa-tags', 'fa-tasks',
        'fa-thermometer-empty','fa-thermometer-half','fa-thermometer-full', 'fa-thumbs','fa-thumbs-o-down', 'fa-thumbs-up',
        'fa-times-circle', 'fa-tint','fa-trash','fa-unlock-alt', 'fa-user',
        'fa-wrench', 'feather-cog', 'feather-download', 'feather-grid', 'feather-inbox', 'feather-layers', 'feather-open',
        'feather-outbox', 'feather-sun', 'icomoon-alarm', 'icomoon-filter', 'icomoon-fire', 'icomoon-happy', 'icomoon-lab',
        'icomoon-notification', 'icomoon-paint-format', 'ion-alert-circled', 'ion-android-alarm-clock', 'octicon-tools',
        'oi-check'
    
    ],
    
    initComponent: function(){
        
        var me = this;
        
        Ext.apply( me, {
            
            items:[
                {
                    xtype: 'form',
                    referenceHolder: true,
                    border:false,
                    width: 550,
                    height: 300,
                    bodyPadding: 10,
                    ui: 'icon-picker',
                    scrollable:'y',
                    padding: 12,
                    items:[
                        
                        {
                            xtype: 'hiddenfield',
                            name: 'selectedIconSrc',
                            reference: 'selectedIconSrc',
                            listeners:{
                                change: function(sender){
                                   // alert('change :'+sender.value);
                                }
                            }
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
        this.addIcons();

    },

    
    addIcons: function(){
        
        var path = 'resources/images/icons/256/'; //'resources/images/icons/svg/'
        
        for(var i= 0; i< this.imagesList.length; i++){         
            this.addIcon(path, this.imagesList[i]); 
        }

    },
    
    addIcon: function(path, name){
        
        var src = path + name;
        
        var icon = Ext.create('Ux.Img',{
                    shrinkWrap:true,
                    src: path + name +'.png', //path + name +'.svg',//
                    width:48,
                    height:48,
                    border: false,
                    margin: '12',
                    name: name,
                    listeners:{
                        click: function(sender){ 
                            var fieldset = this.up('form').lookupReference( 'selectedIconSrc' );
                            try{
                                fieldset.setValue(sender.src);
                            }catch(ex){}
                        }
                    }
                    
                });
        
        this.down('panel').add(icon);
        
    }
    
    
});