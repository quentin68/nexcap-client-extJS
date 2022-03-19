Ext.define('Dashboard.view.administration.category.Selector', {
    extend: 'Ext.window.Window',
    xtype: 'categorySelector',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],

    title: getText('Categories selection'),
    iconCls: 'iconBox',
    layout: 'fit',
    closable : false,
    closeAction : 'destroy',
    resizable : true,
    modal : true,
    record : [], 
    constrain: true,
    bodyPadding: 16,
    
    parentController: null,

    initComponent: function() {
        
        var categoriesStore = Ext.create('Dashboard.store.Categories',{
            autoLoad: true
        });
        
         var categoriesGridPanel = new Ext.grid.GridPanel({
            store: categoriesStore,
            itemId: 'categoriesGridPanel',
            reference: 'categoriesGridPanel',
            autoHeight: true,
            columnLines: true,
            multiSelect: true,
            columns: [
                    {
                        width: 50,
                        sortable: false,
                        dataIndex: 'thumbnailSrc',
                        renderer: function(value){     
                            return '<img src="' + value + '" height="40" width="40" />'; 
                        }
                    },
                    {
                        text: getText('Name'),
                        width: 100,
                        dataIndex: 'name',
                        flex: 1
                    },
                    {
                        text: getText('Description'),
                        width: 150,
                        dataIndex: 'description'
                    },
                    {
                        text: getText('Parent category'),                        
                        dataIndex: 'parentCategory',
                        flex: 1,
                        renderer: function(parentCategory){  
                            if(parentCategory === null){
                                return '';
                            }
                            return parentCategory.name; 
                        }
                    },
                    {
                        text: getText('Has references'),
                        dataIndex: 'hasReferences',
                        flex: 1,
                        renderer: function(hasReferences){   
                            if(hasReferences){
                               return getText('Yes');
                            }else{
                                return getText('No');
                            }                                        
                        }
                    }                    
                ],
                bbar: {
                    xtype: 'pagingtoolbar',
                    pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
                    store: categoriesStore,
                    displayInfo: true,
                    plugins: new Ext.ux.ProgressBarPager()
                }
            
        });
        
        this.items = [
            {
                xtype: 'form',
                width: 640,
                height: 480,
                border: false,
                layout: 'fit',
                
                fieldDefaults: {
                    labelWidth: 112,
                    anchor: '100%',
                    labelSeparator: getText(':')
                }, 
                items: [ 
                    categoriesGridPanel
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Select'),
                action: 'selectCategories',
                listeners:{ 
                    scope: this,
                    click: function( me , e , eOpts ){
                        this.parentController.onSelectCategories(me);
                    }
                }
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },   
    
    /**
     * Method used by the controller to get values
     * @return (object) data NOT encoded to jSon
     */
    getData: function(){
              
        // Get form values
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        return values; 
    }
    
});   