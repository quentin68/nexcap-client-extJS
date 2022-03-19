Ext.define('Dashboard.view.consultation.sendings.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'sendingsDetail',
    
    referencesStore: null,
    
    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        Ext.apply( me, {
            
            items: [
                 {
                    xtype: 'displayfield',
                    bind: {
                        value: '{operationDate}' 
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                    //cls: 'view-list-title'

                },{
                    title: getText('Operation'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                },{
                    title: getText('Item'),
                    reference: 'item',
                    iconCls: 'fa fa-search'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    
    setData: function(data){
        
        if(!data){
            return;
        }
        
        this.viewModel.setData(data);
        
        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({name: 'Operator', value: data.operator}));
        characteristicsPanel.add(this.buildField({name: 'Source address', value: data.sourceAddress}));
        
        var itemPanel = this.query('panel[reference=item]')[0];
        itemPanel.removeAll();
        itemPanel.add(this.buildField({name: 'Name', value: data.material.name}));
        itemPanel.add(this.buildField({name: 'Description', value: data.material.description}));
        itemPanel.add(this.buildField({name: 'Reference Code', value: data.material.productReference.referenceCode}));
        itemPanel.add(this.buildField({name: 'Reference Designation', value: data.material.productReference.designation}));
        itemPanel.add(this.buildField({name: 'Category', value: data.material.productReference.productCategory.fullPath}));
        
    }
    
});