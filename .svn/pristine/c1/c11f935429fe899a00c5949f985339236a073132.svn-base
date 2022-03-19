/* global Ext */

Ext.define('Dashboard.view.alerts.currentAlert.InventoryDetail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'currentAlertInventoryDetail',
        
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
                }, {
                    title: getText('Inventory'),
                    reference: 'inventory',
                    iconCls: 'x-fa fa-tag'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    
    setInventoryData: function(model){

        var data = model.data;
        var panel = this.query('panel[reference=inventory]')[0];

        panel.add(this.buildField({name: getText('Remarks'), value: data.comments})); //check
        panel.add(this.buildField({name: getText('Scanned items'), value: data.scannedMaterialCount}));
        panel.add(this.buildField({name: getText('Expected items'), value: data.expectedMaterialCount}));
        panel.add(this.buildField({name: getText('Present items'), value: data.presentMaterialCount}));
        panel.add(this.buildField({name: getText('Missing items'), value: data.missingMaterialCount}));
        panel.add(this.buildField({name: getText('Foreign items'), value: data.foreignMaterialCount}));
        panel.add(this.buildField({name: getText('Unknown items'), value: data.unknownMaterialCount}));
        panel.add(this.buildField({name: getText('Inventory type'), value: data.context})); // confirm this
        panel.add(this.buildField({name: getText('Criteria'), value: data.reference})); //confirm this
        characteristicsPanel.add(this.buildField({name: getText('Inventory Date'), value: data.executionDate}));
        
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
        acknowledgmentPanel.add(this.buildField({name: getText('Reason'), value: data.acknowledmentDescription}));
        acknowledgmentPanel.add(this.buildField({name: 'Acknowledgment Date', value: this.dateToString(data.acknowledgmentDate, 'DATE_TIME')}));
        acknowledgmentPanel.add(this.buildField({name: getText('User'), value: data.userSticker}));
        acknowledgmentPanel.add(this.buildField({name: getText('Address'), value: data.address})); // this one to be discuss with Marie
        
        
        var inventoryPanel = this.query('panel[reference=inventory]')[0];
        inventoryPanel.removeAll();

        // Get Inventory data 
        if (data.inventory) {
            Dashboard.manager.historic.InventoriesManager.getOne(data.inventory.id, this, 'setInventoryData');
        }
        
    }
    
});