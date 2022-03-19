Ext.define('Dashboard.tool.Ihm', {
    requires: ['Dashboard.config.Config' ],
    mixins: ['Ext.mixin.Responsive'],
    
    config:{
        size: null   
    },
    
    constructor: function(config) {
            this.initConfig(config);
    },
            
    updateSize: function(size) {
            console.log(size); // logs "1" or "2" as screen shape changes between wide and tall
    },

    responsiveConfig: {
        wide: function(){
            alert('land');
//            size: function(){
//                Ext.getCmp('mainPanelCenter').getWidth();
//            }
            //width = main.getWidth();
            //alert('land' + main.getWidth() + "  " + main.getHeight());
        },
        tall: function(){
            alert('port');
            //width = main.getHeight();
            //alert('port' + main.getWidth() + "  " + main.getHeight());
        }
    },
    
    statics: {
        
        DASHBOARD_COLUMNS_SIZE_UNIT: 300,
        DASHBOARD_COLUMNS_COUNT: 4,
        DASHBOARD_INDICATOR_MARGIN: 24,
        SIZE_S_COEF: 1,
        SIZE_M_COEF: 2,
        SIZE_L_COEF: 3,
        SIZE_XL_COEF: 4,
        
        
        /**
         * 
         * @returns {number} width
         */
        getMainWidth: function(){
            
            var main = Ext.getCmp('mainPanelCenter');
            
            if(!main){
                return;
            };
            
            var width = main.getWidth();
            return width - this.DASHBOARD_INDICATOR_MARGIN;
            
        },
        
        
        getIndicatorWidthBySize: function(size){
            
            var margin = this.DASHBOARD_INDICATOR_MARGIN;

            if(!size){
                return 200;
            }
            
            var columnsCount = Math.floor(this.getMainWidth() / this.DASHBOARD_COLUMNS_SIZE_UNIT);
            
            if(this.getMainWidth() >= 850 ){
                
            }else if(this.getMainWidth() >= 650 && this.getMainWidth() < 850){
                this.SIZE_S_COEF = 1;
                this.SIZE_M_COEF = 2;
                this.SIZE_L_COEF = 2;
                this.SIZE_XL_COEF = 3;
                
            }else if(this.getMainWidth() >= 300 && this.getMainWidth() < 650){
                this.SIZE_S_COEF = 1;
                this.SIZE_M_COEF = 2;
                this.SIZE_L_COEF = 2;
                this.SIZE_XL_COEF = 2;
                
            }else if(this.getMainWidth() < 300 ){
                this.SIZE_S_COEF = 1;
                this.SIZE_M_COEF = 1;
                this.SIZE_L_COEF = 1;
                this.SIZE_XL_COEF = 1;
            }

            //todo if phone columnsCount = 1
            
            switch(size){
                case "S":
                    return (this.getMainWidth() / columnsCount - margin);
                    
                case "M":
                    return (this.getMainWidth() / columnsCount * this.SIZE_M_COEF) - margin;
                  
                case "L":
                    return (this.getMainWidth() / columnsCount * this.SIZE_L_COEF) - margin;
                 
                case "XL":
                    return this.getMainWidth() - margin;
                   
            }
            
            return 200;

        }
        
    }
    
});