Ext.define('Dashboard.view.authentication.UpdatePasswordForm', {
    extend: 'Ext.form.Panel',
    xtype: 'updatePasswordForm',
    
    requires: [
        'Dashboard.view.authentication.LoginScreenController',
        'Ext.form.Panel'
    ],
    
    controller: 'loginScreen',
    viewModel: {
        // type: 'authentication'
    },
    
    defaultButton: 'loginButton',
    header: false,
    width: 300,
    height: 257,
    border: 1,
    bodyStyle: 'background:none',
    layout: 'absolute',
    scope: this,
//    listeners:{
//        
//        render: function(me){
//            this.setData();
//        }
//        
//    },
    
    initComponent: function(){

        Dashboard.manager.TranslationsManager.translate(Dashboard.config.Config.LOCALE);
        
        this.items = [
            {
                xtype: 'panel',
                anchor: '100% 100%',
                bodyStyle: 'opacity:0.3;'
            }, {
                xtype: 'panel',
                bodyStyle: 'background:none',
                margin: 16,
                defaults: {
                    margin: '5 0'
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'label',
                        margin: 0,
                        style: {
                            color: '#ff0000',
                            'font-weight': 'normal',
                            'font-size': '14px'
                        },
                        text: getText('Choose a new password')
                    }, {
                        xtype: 'textfield',
                        cls: 'auth-textbox',
                        name: 'login',
                        bind: '{login}',
                        height: 32,
                        hideLabel: true,
                        allowBlank: false,
                        emptyText: getText('Login')
                    }, {
                        xtype: 'textfield',
                        cls: 'auth-textbox',
                        height: 32,
                        hideLabel: true,
                        emptyText: getText('Previous password'),
                        inputType: 'password',
                        name: 'previousPassword',
                        bind: '{previousPassword}',
                        revealable: true,
                        revealed: true,
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        cls: 'auth-textbox',
                        height: 32,
                        hideLabel: true,
                        emptyText: getText('New password'),
                        inputType: 'password',
                        name: 'password',
                        //bind: '{password}',
                        revealable: true,
                        revealed: false,
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        cls: 'auth-textbox',
                        height: 32,
                        hideLabel: true,
                        emptyText: getText('Confirm password'),
                        inputType: 'password',
                        name: 'passwordConfirm',
                        //bind: '{passwordConfirm}',
                        revealable: true,
                        revealed: false,
                        allowBlank: false
                    }, {
                        xtype: 'hidden',
                        name: 'id',
                        value: 'connectForm'
                    }, {
                        xtype: 'button',
                        reference: 'loginButton',
                        scale: 'small',
                        iconAlign: 'right',
                        iconCls: 'x-fa fa-angle-right',
                        text: getText('Update Password and Login'),
                        listeners: {
                            click: 'onUpdatePasswordButton'
                        }
                    }]
            }];

        this.callParent(arguments);
        
    },
    
    setData: function(data){
                
        this.down('field[name=login]').setValue(data.username);
        this.down('field[name=previousPassword]').setValue(data.password);

    },
         
    getData: function(){
        var values = this.getValues();
        var data = {
            username: values.login,
            password: values.password,
            previousPassword: values.previousPassword,
            passwordConfirm: values.passwordConfirm
        };

        return data;
    }

});