Ext.define('Dashboard.view.shared.filtering.FiltersBarController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.filtersBar',
    
    require:[],
    
    configurationWindow: null,
    
    //============================================
    //  Events handler
    //============================================
    
    onConfigFilters: function(){
        
        this.showConfigurationWindow();
        
    },
    
    
    //============================================
    //  METHODS
    //============================================
    
    
    /**
     * Show filters configuration window
     * @param {type} model
     * @returns {undefined}
     */
    showConfigurationWindow: function(){
        
        this.configurationWindow = Ext.create('Dashboard.view.shared.filtering.FiltersConfiguration',{
            autoShow: false,
            modelProperties: this.getView().modelProperties,
            filterBarController: this
        });

        this.configurationWindow.show();
                
        if(this.getView().filtersList && this.getView().filtersList.length > 0){
            this.configurationWindow.setFilters(this.getView().filtersList);
        }

    },
    
    
    saveFiltersConfiguration: function(_filters){
        
        // add to view
        this.getView().setFilters(_filters);
        
        // save To Server
        var feature = this.getView().up('panel[tag=main]').feature;
                        
        var filters = [];
        for(var i=0; i<_filters.length; i++){
            
            var filter = {
                name: _filters[i].data.name,
                label: _filters[i].data.label,
                type: _filters[i].data.type,
                comparison: _filters[i].data.comparison,
                configuration: _filters[i].data.configuration
            };
            
            if(_filters[i].data.isDynamicProperty){
                filter.isDynamicProperty = true;
            }
            
            filters.push(filter);
        }
        
        Dashboard.manager.FeaturesManager.saveFiltersConfiguration(feature, filters);
    }

    
});