Ext.define('Dashboard.manager.BaseManager', {
    extend: 'Ext.app.Controller',
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    className: 'BaseManager',
    
    store: null,
        
    loadConfiguration: function(feature){
        
        this.className = Ext.getClass(this).getName();
        
        try{
    
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'].loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.displayInMain(feature);
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.FeatureConfiguration', Ext.decode(response.data));
                    
                    feature.data.configuration = model;
                    Dashboard.tool.Utilities.info('['+this.className+'].loadConfiguration] loading success. Feature: '+ model.data.featureName);
                                        
                    this.displayInMain(feature);
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('['+this.className+'].loadConfiguration] error: ' + err);
        }

    }
    
});