/* global Ext  */

Ext.define('Dashboard.view.system.device.ManageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.deviceManage',

    require: [
        'Dashboard.view.system.device.Manage'
        
    ],
    
    //feature: Ext.create('Dashboard.store.Features').findRecord('name', 'MAPS_CONSULTATION', 0, false, true, true),
    feature: null,
    
    init: function () {


    },
    
    // ==========================================================================
    // Event handlers
    // ==========================================================================
    
    onRenderMain: function (sender) {

        var buttons = this.getView().query('toolbar[dock=bottom] > *');
        
        if (Dashboard.manager.FeaturesManager.isEnabled('DEVICES_ADMIN') === false) {
            Ext.each(buttons, function(button){
                button.setVisible(false);
            }, this);
        } 
                
    },
    
    onShow: function(){
        this.displayDetail(this.currentMap);
    },
    
    onGoToList: function(){
        Dashboard.manager.system.DevicesManager.displayInMain(this.feature);
    },
    
    onRequireLogs: function(sender){
        this.requireLogs();
    },
    
    onEditConfigurationProperty: function(sender, record){
        this.editConfigurationProperty(record);
    },
    
    onShareConfigurationProperty: function(sender, record){
        this.shareConfigurationProperty(record);
    },
    
    // ==========================================================================
    // METHODS
    // ==========================================================================
    
    
    editConfigurationProperty: function(record){
                
        this.configurationForm = Ext.create('Dashboard.view.system.device.EditConfigurationProperty',{
            record: record
        });
        
        this.configurationForm.down('button[action=save]').on('click',  this.onSaveConfigurationProperty, this);
        this.configurationForm.show();
        
    },
    
    
    onSaveConfigurationProperty: function(sender, event){
                
        var win = sender.up('window');
        var property = win.getData();
        var currentDevice = Ext.ComponentQuery.query('deviceManage')[0].currentDevice;
        
        var configuration = currentDevice.data.configuration;
        Ext.each(configuration, function(configurationProperty){
            if(configurationProperty.name === property.data.name){
                configurationProperty.value = property.data.serverValue;
                return false;
            }
        });
                
        Dashboard.manager.system.DevicesManager.saveConfiguration(currentDevice, this, 'afterConfigurationPropertySaved', property);
        
    },
    
    
    afterConfigurationPropertySaved: function(property){
                
        var name = property.data.name;
        var view = Ext.ComponentQuery.query('deviceManage')[0];
        var field = view.down('ux-displayfield[name='+ name +']');
        field.setFieldStyle('font-weight: bold; color: green');
        field.setValue(property.data.serverValue);        
        
        this.configurationForm.close();
        
    },
    
    
    shareConfigurationProperty: function(record){
        
        this.shareForm = Ext.create('Dashboard.view.system.device.SelectDevices',{
            record: record.data
        });
        this.shareForm.down('button[action=select]').on('click',  this.onSendConfigurationProperty, this);
        this.shareForm.show();
        
    },
    
    onSendConfigurationProperty: function(sender){
        
        var win = sender.up('window');
        var selectedDevices = win.getData();
        
        if(!selectedDevices || selectedDevices.length < 1){
            Ext.Msg.show({
                title: getText('Warning'),
                msg: getText('No element selected'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });            
            return;
        }
        
        var currentDevice = this.getView().currentDevice;
        
        var params = {
            sourceDeviceId: currentDevice.data.id,
            destinationDevicesIdList: selectedDevices,
            configurationPropertiesList: []
        };

        Dashboard.manager.system.DevicesManager.shareConfiguration(currentDevice, this, 'afterConfigurationPropertyShared', params);
        
    },
    
    afterConfigurationPropertyShared: function(params){
        
        Ext.Msg.show({
            title : getText('Success'),
            msg : getText('Configuration property was sent to devices.'),
            buttons : Ext.Msg.OK,
            icon : Ext.Msg.INFO
        });
        
        var shareForm = Ext.ComponentQuery.query('deviceSelectDevices')[0];
        shareForm.close();
        
    },
    
    requireLogs: function(sender){
        
        var device = this.getView().currentDevice;
        
        Dashboard.manager.system.DevicesManager.requireLogs(device.data.id, this, 'afterRequireLogs');
        
    },
    
    afterRequireLogs: function(deviceId){

        Ext.Msg.show({
            title : getText('Success'),
            msg : getText('The request was sent to the device.'),
            buttons : Ext.Msg.OK,
            icon : Ext.Msg.INFO
        });
        
        
        var view = Ext.ComponentQuery.query('deviceManage')[0];
        var currentDevice = view.currentDevice;
        currentDevice.data.logFileRequired = true;
        
        view.buildCharasteristics(currentDevice.data);
                
    },
    
    
    
    /*****************************************************
     * Exemples
     *****************************************************/
    
    getCabinetXLConfiguration: function(){
        
        var conf = [
            { name:'LANGUAGE', value:'en-US', error:'true', message:'C\'ette langue est inconnue !' },
            { name:'LOGOFF_TIMEOUT', value:'6' },
            { name:'DOOR_OPENED_TIMEOUT', value:'300000' },
            { name:'OPTIONS', value:'interventionOrderManagement : true' },
            { name:'DEFAULT_FEATURE', value:'OP_BORROW' },
            { name:'X_TIMES_A_DAY_TIMER_VALUE', value:'3' },
            { name:'POPUP_SHOW_DIALOG_TIMEOUT', value:'6000' },
            { name:'MATERIAL_LIST_STATES', value:'En service,A vérifier,Hors service' },
            { name:'BEHAVIOURS_LOGOUT_TIMEOUT', value:'7000' },
            { name:'INTERNAL_LIGHTING_ENABLED', value:'true' },
            { name:'INTERNAL_LIGHTING_ENABLED_H24', value:'true' },
            { name:'PACKAGE_UPDATE_AUTOMATIC_ENABLED', value:'false' },
            { name:'CUSTOM_TEXT_IO', value:'Intervention order' },
            { name:'REPLACE_MATERIAL_NAME_BY_PROPERTY_IN_GRID', value:'' },
            { name:'DEVICE_NAME', value:'XL Showroom 2' },
            { name:'BUZZ_ON_BADGE_FOUND', value:'75' },
            { name:'DEVICE_FEATURES', value:'USE_COUNT_MANAGEMENT : true, OP_BORROW : true, OP_CALIBRATION : true, OP_MAINTENANCE : true, SEARCH_MATERIAL : true, MAT_ADMIN : true, MAT_INVENTORY : true, USER_ADMIN : true, OP_MAINTAIN : true, WEB_CLIENT : false, REF_INVENTORY_MANAGEMENT : true, ALERT : true, CURRENT_BORROW : true' },
            { name:'HOST_NAME', value:'192.168.63.34' },
            { name:'LISTBOX_NB_LINES', value:'50' },
            { name:'HTTP_REQUEST_TIMEOUT', value:'10000' },
            { name:'GET_HTTP_REQUEST_STREAM_TIMEOUT', value:'10000' },
            { name:'GET_HTTP_REQUEST_STREAM_ASYNCHRONOUSLY', value:'true' },
            { name:'TARGET_PROXY_RESSOURCE_NAME', value:'/nexcap/checkAccess' },
            { name:'NEXCAP_REST_BASE_URI', value:'/nexcap/rest' },
            { name:'PORT', value:'8443' },
            { name:'PROTOCOL', value:'https' },
            { name:'WEB_BROWSER_URL', value:'https://192.168.63.34:8443/web/' },
            { name:'DEVICE_SIGNATURE'      , value:'41392520BF1D4749A4F1F66A87102E89' },
            { name:'DEVICE_TYPE'      , value:'CABINET_XL' },
            { name:'TAG_READER_TYPE'      , value:'IMPINJ' },
            { name:'TAG_SCAN_DURATION'      , value:'10000' },
            { name:'IMPINJ_HOST_NAME'      , value:'SpeedwayR-11-cb-60.local' },
            { name:'CARD_READER'      , value:'CPR' }
        ];
        
        return conf;
        
    }
    
    
});