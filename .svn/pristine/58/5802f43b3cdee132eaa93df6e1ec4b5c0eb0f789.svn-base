Ext.define('Dashboard.view.shared.filtering.CodeFilter',{
    extend: 'Ux.TextField',//'Ext.form.field.Text',
    xtype : 'filter.codeFilter',
    type: 'filter',
    
    config:{
        
        filterModel:null

    },
   
    fieldLabel: null,
    name: null,
    minLength: 1,
    maxLength: 255,
    placeHolder: getText('Empty'),
    width: 300,
    codeType: 'RFID_TAG',
    vtype:  null,
            
    initComponent: function() {
                
        this.codeTypesStore = Ext.create('Dashboard.store.enums.CodeType');
        
        var filterData = this.getFilterModel().data;
        this.fieldLabel = filterData.label;
        this.name = filterData.name;
        
        if(filterData.configuration && filterData.configuration.width){
            this.width = parseInt(filterData.configuration.width);
        }
        
        if(filterData.configuration && filterData.configuration.field.codeType){
            var codeTypeName = filterData.configuration.field.codeType;

            if(codeTypeName === "RFID_TAG"){
                
                if(filterData.comparison === 'EQ'){
                    this.minLength = 24;
                }

                this.maxLength = 28;
                this.vtype = 'alphanumeric';

            }else if(codeTypeName === "ALPHANUM_INPUT"){
                this.vtype = 'alphanumeric';
            }
        }
                    
        this.callParent();
    },
    
    setFieldValue: function (val){
        this.setValue(val);
    },
            
    getFilter: function(){

        var value = this.getValue();
        
        if (!value){
            return;
        }
        
        value = value.trim();
        var filterData = this.getFilterModel().data;
        switch (filterData.label) {
            case "Code (Tag RFID)":
                filterData.configuration.field.codeType = "RFID_TAG";
                break;
            case  "Code (Code libre)":
                filterData.configuration.field.codeType = "FREE_INPUT";
                break;
            case  "Code (Code alphanumérique)":
                filterData.configuration.field.codeType = "ALPHANUM_INPUT";
                break;
            case  "Code (QR code)":
                filterData.configuration.field.codeType = "QR_CODE";
                break;
            case "Code (Code-barres)":
                filterData.configuration.field.codeType = "BAR_CODE";
                break;
        }
        var filter = this.buildFilter(filterData.name, value, filterData.comparison, filterData.configuration.field.codeType);

        return filter;
    },
            
    buildFilter: function(name, value, comparison, codeType){
        if(!comparison){
            comparison = 'EQ';
        }
        
        return {
            'property': name,
            'value': value,
            'type': 'STRING',
            'comparison': comparison,
            //'codeType': codeType//,
            'linkedFilter':  {
                "property": "codes.codeType",
                "comparison": "EQ",
                "value": codeType,
                "type": "ENUM"
              }

        };
    }

});