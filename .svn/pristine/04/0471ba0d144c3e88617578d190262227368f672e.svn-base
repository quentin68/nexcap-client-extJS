/* global Ext, moment */

Ext.define('Dashboard.view.administration.position.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'positionEdit',
    
    requires: ['Dashboard.tool.Utilities', 'Dashboard.view.shared.imagesViewer.ThumbnailEditor'],
    
    controller: 'positionMain',
    
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 550,
    iconCls: 'fa fa-bullseye',
    plain: true,
    autoScroll: true,
    scrollable: 'y',
    record: null,
    
    initComponent: function(){

        this.title = getText('Edit a position');

        this.positionsStore = Ext.create('Dashboard.store.administration.OtherPositions', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().extraParams.id = this.record.id;
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/positions/getPotentialParents/' + this.record.id;
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/positions/getPotentialParents';
                }
            }
        });

        var characteristicsPanel = {
            xtype: 'panel',
            border: false,
            title: getText('Position'),
            iconCls: 'fa fa-bullseye',
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            },
            items: [{
                    xtype: Ext.widget('thumbnailEditor', {
                        record: this.record,
                        thumbnailSourceType: 'POSITION'
                    })
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
                    // minLength: 4,
                    maxLength: 255,
                    listeners: {
                        afterrender: function(field){
                            field.focus(false, 100);
                        }
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'parentPositionId',
                    reference: 'parentPositionId',
                    fieldLabel: getText('Parent position'),
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false, // to remove param "query"
                    matchFieldWidth: false,
                    store: this.positionsStore,

                    displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">', '{path}/{name}', '</tpl>'),
                    listConfig: {
                        getInnerTpl: function(){
                            return '{path}/{name}';
                        }
                    }
                }, {
                    xtype: 'textarea',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 1024
                }]
        };

        this.items = [{
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width: 650,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable: 'y',
                defaults: {
                    bodyPadding: 20,
                    ui: 'form-panel'
                },
                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },
                items: [characteristicsPanel]
            }];

        this.buttons = [{
                text: getText('Save'),
                action: 'save'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);

        this.setData(this.record);

    },
    /**
     * Method used by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function(){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        values.id = this.record.id;

        if (values.parentPositionId === undefined) {
            values.parentPositionId = null;
        }

        var parentPositionCombo = this.down('autocompleteComboBox[name=parentPositionId]');        
        if(parentPositionCombo.getSelectedRecord() === null){
            values.parentPositionId = null;
        }

        if (this.record.picture !== undefined && this.record.picture.pictureSourceType === null) {
            delete this.record.picture;
        }

        if (this.record.picture !== undefined && this.record.picture.thumbnailName === '') {
            values.picture = {
                thumbnailName: '',
                pictureName: ''
            };
        }

        return values;
    },
    setData: function(data){

        this.positionsStore.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/positions/getPotentialParents/' + data.id;

        this.down('form').getForm().setValues(data);

        if (data.parent) {
            this.down('combo[name=parentPositionId]').setDisabled(false);
            this.down('combo[name=parentPositionId]').setValue(data.parent.id);
        } else {
            this.down('combo[name=parentPositionId]').setDisabled(true);
        }

    },
    setThumbnail: function(tumb){

        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var img = Ext.ComponentQuery.query('positionEdit image[name=thumbnailToEdit]')[0];

        if (tumb !== null) {
            thumbnailSrc = tumb;
        }

        img.setSrc(thumbnailSrc);
        // Ext.ComponentQuery.query('materialEdit panel[name=thumbnailEditor]')[0].updateLayout();
    }

});