/* global Ext */

Ext.define('Dashboard.view.administration.profile.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'profileEdit',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    controller: 'profileMain',

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 550,
    iconCls: 'fa fa-users',
    plain : true,
    autoScroll: true,
    scrollable:'y',

    record:null,
    rightsList: [],
    
    rightsStore : null,

    initComponent: function() {
        this.levelStore = Ext.create('Dashboard.store.ProfilesLevel', {
            autoLoad: true
        });
        this.title = getText('Edit a profile');
        
        var characteristicsPanel = Ext.create('Ext.panel.Panel',{
            border: false,
            title: getText('Profile'),
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'textfield',
                    name : 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
                    minLength: 4,
                    maxLength: 50,
                    listeners: {
                        afterrender: function(field) {
                            field.focus(false, 100);
                        }
                    }
                },{
                    xtype: 'textarea',
                    name : 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 300
                },{
                    xtype: 'autocompleteComboBox',
                    name: 'level',
                    reference: 'level',
                    fieldLabel: getText('Level'),
                    queryParam : false,
                    displayField:'label',
                    valueField: 'value',
                    allowBlank: false,
                    matchFieldWidth: false,
                    store:  this.levelStore
                }
            ]
        });
        
            
        var rightsFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Rights selection'),
            name: 'rightsSelector',
            bodyStyle: 'background-color:#ffffff; padding: 5px',
            autoScroll: false,
            defaults: {
                anchor: '100%'
            },
            items: [
                this.buildGroupCheckBoxField('DASHBOARD', 'DASHBOARD'),
                this.buildGroupCheckBoxField('ALERTS', 'ALERTS'),
                this.buildGroupCheckBoxField('BUSINESS', 'BUSINESS'),
                this.buildGroupCheckBoxField('CONSULTATION', 'CONSULTATION'),
                this.buildGroupCheckBoxField('HISTORIC', 'HISTORIC'),
                this.buildGroupCheckBoxField('MANAGEMENT', 'MANAGEMENT'),
                this.buildGroupCheckBoxField('CARTOGRAPHY', 'CARTOGRAPHY'),
                this.buildGroupCheckBoxField('SYSTEM', 'SYSTEM'),
                this.buildGroupCheckBoxField('SETTINGS', 'CONFIGURATION')
            ]
        });


        this.items = [ 
            {  
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width: 650,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable:'y',
                
                defaults:{
                    bodyPadding: 20,
                    ui: 'form-panel'
                },
                
                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
                    //anchor: '100%',
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },
                
                items: [
                    characteristicsPanel,
                    rightsFieldSet
                ]
            }
        ];
        
        
        this.buttons = [
            {
                text: getText('Save'),
                action: 'save'
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];
        
        this.callParent(arguments);
        this.setData(this.record);
        this.loadRights();
        //this.setRights();

    },
    
    
    loadRights: function(){

        this.rightsStore = Ext.create('Dashboard.store.Rights');
        var localRights = this.rightsStore.data.items;
        // async filterRights
        this.filterRights(localRights);
    },
    
   /**
    * 
    * @param {type} availableRights
    * @param {type} localfeature
    * @returns {isFound: Bool, label: String | null}
    */
    isInRightsList: function (availableRights, localfeature) {
        
        for (var k = 0; k < availableRights.length; k++) {
            
            var remoteRight = availableRights[k];
            
            if (localfeature.data.name === remoteRight.name) {
                return {isFound: true, label: remoteRight.translatedName};
            }
        }
        return {isFound: false, label: null};
    },
    
    // I hate myself for this 💀 function, if you want to insult me email me at raed.chammam@gmail.com
    filterRights: function (localRights) {
        var parentScope = this;
        
        var filteredRights = [];

        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/features/available',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'GET',
            success: function (response, opts) {
                var responseObj = JSON.parse(response.responseText);
                if (responseObj.success) {
                    var availableRights = responseObj.data;
                                        
                    // Go over local rights
                    for (var i = 0; i < localRights.length; i++) {
                        // Is local feature in Remote available Rights list ?
                        if(localRights[i].data.hiddenInProfiles !== true){
                            
                            var foundRight = parentScope.isInRightsList(availableRights, localRights[i]);                        
                            if (foundRight.isFound) {
                                
                                if(foundRight.label !== ''){
                                    localRights[i].data.label = foundRight.label;
                                }else{
                                    localRights[i].data.label = getText(localRights[i].data.label);
                                }
                                
                                filteredRights.push(localRights[i]);                            
                            }
                        }
                    }
                    parentScope.setRightsSelector(filteredRights);
                } else {
                    throw '[Profile.Create.getUserfilterRightsContexts] ERROR ' + (responseObj.error || 'null');
                }
            }, failure: function (response, opts) {
                Dashboard.engine.ResponseManager.showFailure(getText('Failed loading available features'));
            }
        });
    },
    
    hideUnusedGroups: function (rightsList){
        var groups = {
            DASHBOARD: 0,
            CONFIGURATION: 0,
            SYSTEM: 0,
            MANAGEMENT: 0,
            HISTORIC: 0,
            CONSULTATION: 0,
            BUSINESS: 0,
            ALERTS: 0,
            CARTOGRAPHY: 0
        };
        
        for (var i = 0; i < rightsList.length; i++) {
            groups[rightsList[i].data.group]++;
        }
                
        for (var key in groups) {
            if (groups.hasOwnProperty(key)) {
                if (groups[key] === 0) {
                    var panel = Ext.ComponentQuery.query('panel[name="' + key + '"]')[0];
                    var parentPanel = panel.up('panel');
                    parentPanel.hide();
                }
            }
        }
    },

            
    setRightsSelector: function (rightsList){
        
        var panelAlerts = Ext.ComponentQuery.query('panel[name="ALERTS"]')[0];
        var panelOperation = Ext.ComponentQuery.query('panel[name="BUSINESS"]')[0];
        var panelConsultation = Ext.ComponentQuery.query('panel[name="CONSULTATION"]')[0];
        var panelHistoric = Ext.ComponentQuery.query('panel[name="HISTORIC"]')[0];
        var panelAdmin = Ext.ComponentQuery.query('panel[name="MANAGEMENT"]')[0];
        var panelCartography = Ext.ComponentQuery.query('panel[name="detailCARTOGRAPHY"]')[0];
        var panelSystem = Ext.ComponentQuery.query('panel[name="SYSTEM"]')[0];
        var panelConfiguration = Ext.ComponentQuery.query('panel[name="CONFIGURATION"]')[0];
        var panelDashboard = Ext.ComponentQuery.query('panel[name="DASHBOARD"]')[0];
        
        panelAlerts.removeAll();
        panelOperation.removeAll();
        panelConsultation.removeAll();
        panelHistoric.removeAll();
        panelAdmin.removeAll();
        panelSystem.removeAll();
        panelConfiguration.removeAll();
        panelDashboard.removeAll();
        panelCartography.removeAll();
        
        if(!rightsList ){
            return false;
        }
        
        this.hideUnusedGroups(rightsList);
        
        for(var i = 0; i < rightsList.length; i++){
            this.addRight(i, rightsList[i]);
        }
        
        this.setRights();
    },
            
            
    setRights: function(){

        var rights = this.record.features;
        
        if(!rights){
            return;
        }

        Ext.each(rights, function(right){
            var rightField = this.down('checkbox[rightName='+ right.name +']');
            if(rightField){
                rightField.setValue(true);
            }
        }, this);

    },      


    addRight: function(index, right){
        
        var panel = Ext.ComponentQuery.query('panel[name="'+ right.data.group +'"]')[0];
        
        var feature = Dashboard.manager.FeaturesManager.getFeatureByName(right.data.name);
        var right = Dashboard.manager.FeaturesManager.getRightByName(right.data.name);
        
        var add = true;
        if(right.data.hiddenInProfiles){
            add = false;
        }     
        
        if(feature && feature.data.enabled && add){
            panel.add( this.buildCheckBoxField(right));
        }
    },
            
            
    buildCheckBoxField: function(right){
        return {
            xtype: 'checkbox',
            checked: false,
            border: false,
            anchor: '100%',
            margin: '3 6 0 6',
            boxLabel: right.data.label,
            name: 'right',
            inputValue: right.data.id,
            scope: this,
            handler: 'onRightChecked',
            rightName: right.data.name
        };       
    },
            
            
   buildGroupCheckBoxField: function(label, reference){
        return {
            xtype: 'panel',
            margin: '20 0 0 0',
            name: 'groupPanel',
            items:[
                {
                    xtype: 'checkbox',
                    checked: false,
                    border: false,
                    anchor: '100%',
                    margin: '3 6 0 6',
                    boxLabel: getText(label),
                    name: reference,
                    scope: this,
                    handler: 'onGroupChecked'
                },{
                    xtype: 'panel',
                    bodyPadding: '0 0 0 30',
                    name: reference
                }
            ]
        };       
    },    
            
            
   onGroupChecked: function(sender){

        var fields = sender.up('panel').query('checkbox[name=right]');

        Ext.each(fields, function(field){
            field.setValue(sender.checked);
        }, this);
        sender.up('panel').updateLayout();
    },
            
            
    onRightChecked: function(sender){

        var groupField = sender.up('panel[name=groupPanel]').down('checkbox[handler=onGroupChecked]');

        var uncheckedFields = sender.up('panel').query('checkbox[checked=false]');

        if(!sender.checked){
            groupField.handler = null;
            groupField.setValue(false);
            groupField.handler = 'onGroupChecked';
        }

        if(uncheckedFields.length < 1){
            groupField.setValue(true);
        }
        // Make sure dashboard has consultation if admin is ON
        this.validateManagmentRights(sender, groupField);
    },
    
    
    validateManagmentRights: function (sender, groupField) {
        try {
            if (groupField.name === 'DASHBOARD') {
                
                if (sender.rightName === 'DASHBOARD_CONFIGURATION' && sender.checked) {
                    groupField.setValue(true);
                }
                if (sender.rightName === 'DASHBOARD_CONSULTATION' && !sender.checked) {
                    groupField.isChecked(false);

                    groupField.ownerCt.items.items[1].items.items.forEach(function (item) {
                        if (item.setValue) {
                            item.setValue(false);
                        }
                    });
                }
            }
        } catch (ex) {
            Dashboard.tool.Utilities.error('[administration.profile.Edit.validateManagmentRights] error :' + ex);
        }
        
         try {
            if (groupField.name === 'CARTOGRAPHY') {
                
                if (sender.rightName === 'MAPS_ADMIN' && sender.checked) { //Admin
                    groupField.setValue(true);
                }
                if (sender.rightName === 'MAPS_CONSULTATION' && !sender.checked) { // Consultation
                    groupField.isChecked(false);

                    groupField.ownerCt.items.items[1].items.items.forEach(function (item) {
                        if (item.setValue) {
                            item.setValue(false);
                        }
                    });
                }
            }
        } catch (ex) {
            Dashboard.tool.Utilities.error('[administration.profile.Create.validateManagmentRights] error :' + ex);
        }
    },
    
    scrollIntoView: function(el,cmp) {
        var dy = cmp.scroller.offset.y + el.getY() - cmp.body.getY();
        cmp.scroller.setOffset({x:0, y:-dy}, true);
    },

    
    /**
     * Method used by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function(){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        var data = {};
        data.id = this.record.id;  
        data.name = values.name;
        data.description = values.description;
        data.level = values.level;
        data.features = [];
              
       
        var records = this.query('checkbox[name=right][checked=true]');
        Ext.Array.each(records, function(rec){
            if (rec.inputValue) {
                 data.features.push({
                     "id": rec.inputValue,
                     "name": rec.rightName
                 });
            }
        });
        
        return data;
    },
            
            
    setData: function(data){
        this.down('form').getForm().setValues(data);
        if (data.level!==null) {
            this.down('combo[name=level]').setValue(data.level);
        }
    }


});   