Ext.define('Dashboard.manager.historic.ProvisionsManager',{
    extend: 'Ext.app.Controller',
    alias: 'provisionsManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.historic.Provisions',{
        sorters: [{
            property: 'executionDate',
            direction: 'DESC'
        }],
        autoLoad: false
    }),
    
    feature:  Ext.create('Dashboard.store.Features').findRecord('name', 'HISTO_PROVISIONS', 0, false, true, true), 

    loadConfiguration: function(){
        
        this.feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try{
    
            Dashboard.model.FeatureConfiguration.load(this.feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ProvisionsManager.loadConfiguration] error: loading failure');
                    this.displayInMain();
                },
                success: function(record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        // mantis : 6843
                        if (response == undefined || jsonData == undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        this.feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[ProvisionsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.displayInMain();
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(this.feature.data.name, 'MaterialManager'); // 6843
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[ProvisionsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    displayInMain: function(){
        
        Dashboard.tool.Utilities.info('[ProvisionsManager.displayInMain] show provisions Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[ProvisionsManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }
                
        mainController.displayInMain(
            { 
                xtype: 'provisionMain',
                store: this.store,
                configuration: configuration,
                feature: this.feature,
                tag: 'main'
            }
        );
    },
            
    
    getConfiguration: function(){
        
        var configuration = {
            
            enabledTools: {
                create: false,
                edit: false,
                read: false,
                destroy: false,
                duplicate: false,
                exportToFile: false
            },

            //Grid
            table: {

                displayRowNumbers: true,

                columns:[
                    {
                        text     : getText('Date of control'),
                        locked   : true,
                        width    : 150,
                        sortable : true,
                        dataIndex: 'executionDate',
                        formatter: 'date("'+ getText('m/d/Y H:i:s') +'")',
                        cellWrap: false
                    },{
                        text     : getText('Compliance'),
                        xtype: 'booleancolumn',
                        trueText: getText('Compliant'),
                        falseText: getText('Non-compliant'),
                        locked   : true,
                        width    : 100,
                        sortable : true,
                        dataIndex: 'name',
                        cellWrap: false
                    },{
                        text     : getText('Operator'),
                        locked   : true,
                        flex:1,
                        sortable : true,
                        dataIndex: 'operator',
                        cellWrap: false
                    },{
                        text: getText('Control type'),
                        locked   : true,
                        dataIndex: 'name',
                        flex: 1
                    },{
                        text: getText('Reference'),
                        locked   : true,
                        dataIndex: 'productReferenceCode',
                        flex: 2
                    },{
                        text: getText('Reference'),
                        locked   : true,
                        dataIndex: 'productReferenceDesignation',
                        flex: 2
                    },{
                        text: getText('Item'),
                        locked   : true,
                        dataIndex: 'materialName', 
                        flex: 1
                    }
                ]
            }

        };
        
        return configuration;
    },
            
            
    /**
     * Get one item
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getOne: function(id, controller, action){
        
        try{
            Dashboard.model.historic.Profile.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ProvisionsManager.getOne] error: loading failure');
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.historic.Provision', response.data);
                    
                    Dashboard.tool.Utilities.info('[ProvisionsManager.getOne] loading success. provision: '+ model.data.name);
                                        
                    if(action === 'edit'){
                        controller.edit(model);
                    }else if(action === 'displayDetail'){
                        controller.displayDetail(model);
                    }
                },
                callback: function(record, operation, success) {
                    //nothing
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[ProvisionsManager.getOne] error: ' + err);
        }

    },
    
    
    getProperties: function(){
        
        return [
            {
                name: 'lastUpdateDate',
                label: getText('Last update date'),
                type: 'DATE',
                control:Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            },{
                name: 'name',
                label: getText('Name'),
                type: 'STRING'
            },{
                name: 'interventionOrder.number',
                label: getText('Intervention order'),
                type: 'STRING'
            },{
                name: 'InterventionOrdersList',
                label: getText('Intervention order'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'interventionorders',
                        width: 400
                    }
                })
            },{
                name: 'operatorName',
                label: getText('Operator'),
                type: 'STRING'
            }
        ]
    }
    
});