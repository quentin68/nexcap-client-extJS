/* global Ext */

Ext.define('Dashboard.view.alerts.currentAlert.StockDetail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'currentAlertStockDetail',
        
    initComponent: function() {
        
        this.configDetail();
                
        var me = this;
        Ext.apply( me, {
                        
            items: [
                 {
                    xtype: 'displayfield',
                    bind: {
                        value: '{controlName}' 
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                }, {
                    title: getText('Alert'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Acknowledgment'),
                    reference: 'acknowledgment',
                    iconCls: 'fa fa-check-circle-o'
                },{
                    title: getText('Stock level'),
                    reference: 'stock',
                    iconCls: 'fa fa-check-square-o'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    setStockData: function(data){
        
        var panel = this.query('panel[reference=stock]')[0];
        
        panel.add(this.buildField({name: getText('Address'), value: data.address}));
        panel.add(this.buildField({name: getText('Level status'), value: data.levelIsCorrect}));
        panel.add(this.buildField({name: getText('Category'), value: data.productCategoryName}));
        panel.add(this.buildField({name: getText('Quantity'), value: data.quantity}));
        panel.add(this.buildField({name: getText('Low Threshold'), value: data.minLevel}));
        panel.add(this.buildField({name: getText('High Threshold'), value: data.maxLevel}));
        
    },
    
    
    setData: function(data){
        
        if(!data){
            return;
        }
        
        this.viewModel.setData(data);
        
        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        characteristicsPanel.add(this.buildField({name: getText('Alert name'), value: data.alertConfiguration.name}));
        characteristicsPanel.add(this.buildField({name: getText('Description'), value: data.alertConfiguration.description}));
        characteristicsPanel.add(this.buildField({name: getText('Alert level'), value: data.alertConfiguration.alertLevel}));
        characteristicsPanel.add(this.buildField({name: getText('Trigger'), value: data.triggerEventLabel}));
        characteristicsPanel.add(this.buildField({name: getText('User'), value: data.userId}));
        characteristicsPanel.add(this.buildField({name: getText('Creation date'), value: this.dateToString(data.startDate, 'DATE_TIME')}));
        characteristicsPanel.add(this.buildField({name: getText('Informations'), value: data.informations}));  // this one to be discuss with marie
        
        // Acknowledgment properties
        var acknowledgmentPanel = this.query('panel[reference=acknowledgment]')[0];
        acknowledgmentPanel.removeAll();

        acknowledgmentPanel.add(this.buildField({name: getText('Is acknowledged'), value: data.isAcknowledged}));
        acknowledgmentPanel.add(this.buildField({name: getText('Reason'), value: data.acknowledgmentReason}));
        acknowledgmentPanel.add(this.buildField({name: 'Acknowledgment Date', value: this.dateToString(data.acknowledgmentDate, 'DATE_TIME')}));
        acknowledgmentPanel.add(this.buildField({name: getText('User'), value: data.acknowledgerSticker}));
        acknowledgmentPanel.add(this.buildField({name: getText('Address'), value: data.address}));
        
        var stockPanel = this.query('panel[reference=stock]')[0];
        stockPanel.removeAll();
        
        // Get stock 
        if (data.stock) {
            Dashboard.manager.administration.StocksManager.getOne(data.stock.id, this, 'setStockData');
        }

    }
    
});