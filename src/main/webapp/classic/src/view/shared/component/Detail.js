/* global Ext, moment  */

Ext.define('Dashboard.view.shared.component.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'detail',
   
    config:{
        configuration: null,
        imageSize: '90%',
        configEnabled: false,
        toolBarVisible: true
    },

    reference: 'detail',
    autoScroll: true,
    scrollable:'y',
    cls: 'view-list',
    closeAction: 'hide',
    border: false,
    
    controller: 'detail',
    feature: null,
    //record: null,

    viewModel:{

        data:{
        }
    },

    initComponent: function() {
        
        this.up('panel').minWidth = 200;
                
        var me = this;
        Ext.apply( me, {
            
            dockedItems: [
                {
                    xtype: 'toolbar',
                    hidden: !this.getToolBarVisible(),
                    defaults:{
                        xtype: 'button',
                        scale: 'small',
                        ui: 'view-list',
                        border: false
                    },
                    items: [

                        '->',
                        {
                            iconCls: 'fa fa-wrench',
                            enableToggle: false,
                            handler: 'onConfigDetail',
                            hidden: !this.getConfigEnabled()
                        },{
                            iconCls: 'fa fa-compress',//'fa fa-times',
                            enableToggle: false,
                            handler: 'onHide'
                        }
                    ]
                }
            ],

            defaults:{
                xtype: 'panel',
                ui: 'detail',
                cls: 'detail',
                minHeight: 80,
                bodyPadding: '24 12',
                margin: '0 24 12 24',
                collapsible: true,
                collapseMode: 'header'
            }

        });

        this.callParent(arguments);
        
        this.configViews(this.feature);

    },

    configViews: function (feature){
                
        var mainView = this.up('panel[tag=main]');
        var detailConfiguration = null;
        
        if(feature){
            detailConfiguration = Dashboard.manager.FeaturesManager.getDetailConfiguration(feature);
        }else{
            detailConfiguration = Dashboard.manager.FeaturesManager.getDetailConfiguration(mainView.getController().feature);
        }
        
        if(detailConfiguration){
            this.setConfiguration(detailConfiguration);
        }

    },

    setData: function(data){
        
        if(!data){
            return;
        }
        
    },
    
    
    /*
     * property = key, value or dynamic property object
     */
    buildField: function(property){
                
        var separator = getText(':')+' ';
        var value = property.value + '';
        var label = '';
                
        try{
            // dynamic property
            if(property.data && property.data.options.nexcapweb){
                this.IsValidJSONString(property.data.options.nexcapweb);
                //property.data.options.nexcapweb = Ext.decode(property.data.options.nexcapweb);
            }
        }catch(ex){
            //ignore
            console.log('Ext.decode() checking');
        }
                
        if(property.value === true || property.value === 'true'){
            value = getText('Yes');
        }else if(property.value === false || property.value === 'false'){
            value = getText('No');
        }

        if(property.value === undefined || property.value === null){
            value = '';
        }
        
        try {
            // dynamic property
            label = property.data.label + separator; 
        }catch(ex) {
            // simple key / value
            label = property.name + separator; 
        }

        if(property.name === null){  //only display value
            label = null;
        }
        
        if(label && property.fontWeight === 'Bold'){
            label = '<b>' + label + '</b>';
        }
                
        try {
            if (property.data.options.nexcapweb.field.fieldType === 'textareafield') {
                value = property.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
            }
        } catch (e) {
            // ignore 
        }
                
        try {
            if (property.data.type === 'DATE') {
                if (moment(value).isValid()) {
                    var date = moment(value).toDate();
                    if (date) {
                        value = Ext.Date.format(date, getText('m/d/Y'));
                    }
                }
            }
        } catch (e) {
            // ignore 
        }
        
        try {
            if (property.data.options.nexcapweb.field.fieldType === 'datetimefield') {
                if (moment(value).isValid()) {
                    var datetime = moment(value).toDate();
                    if (datetime) {
                        value = Ext.Date.format(datetime, getText('m/d/Y H:i:s'));
                    }
                }
            }
        } catch (e) {
            // ignore 
        }
        
        var colorStyle = '';
        
        if(property.color){
            colorStyle = 'style="color:'+ property.color +';"';
        }

        var html = [
            '<table><tr '+ colorStyle +'>',
            '<td class="material-detail-label">',
            '<b '+ colorStyle +'>',
            label,
            '</b>',
            '</td>',
            '<td class="material-detail-text">',
            value,
            '</td>',
            '</tr></table>'
        ];

        var field = {
            'html': html
        };

        return field;
    },
    
    
    IsValidJSONString: function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    

    dateToString: function (_date, type) {

        var format = getText('m/d/Y');
        if(type === 'DATETIME' || type === 'DATE_TIME'){
            format = getText('m/d/Y H:i:s');
        }
        
        if (_date !== undefined && _date !== '') {
            var date = new Date(_date);
            return Ext.Date.format(date, format);
        }

        return '';
    },
    
    configDetail: function(feature){
                
        var detailConfiguration = null;
        var viewListConfiguration = null;
        
        if(feature){
            detailConfiguration = Dashboard.manager.FeaturesManager.getDetailConfiguration(feature);
            //viewListConfiguration = feature.data.configuration;
        }else{
            var mainView = this.up('panel[tag=main]');
            detailConfiguration = Dashboard.manager.FeaturesManager.getDetailConfiguration(mainView.feature);
            viewListConfiguration = mainView.configuration;
        }
        
        if(detailConfiguration){
            this.setConfiguration(detailConfiguration);
            this.setImageSize(detailConfiguration.imageSize);
        }
                
        if(viewListConfiguration && viewListConfiguration.enabledTools.configDetail !== undefined){
            this.setConfigEnabled(viewListConfiguration.enabledTools.configDetail);
        }
        
    }


});