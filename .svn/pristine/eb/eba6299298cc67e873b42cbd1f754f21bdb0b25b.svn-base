/* global Ext */

Ext.define('Dashboard.view.authentication.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'loginForm',
    
    requires: [
        'Dashboard.view.authentication.LoginScreenController',
        'Ext.form.Panel'
    ],
    
    controller: 'loginScreen',
    viewModel: {
        //type: 'authentication'
    },
    
    defaultButton: 'loginButton',
    header: false,
    width: 300,
    height: 180,
    border: 1,
    bodyStyle: 'background:none',
    layout: 'absolute',
    
    initComponent: function(){

        //Dashboard.manager.TranslationsManager.translate(Dashboard.config.Config.LOCALE);
        
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
                            color: '#000000',
                            'font-weight': 'normal',
                            'font-size': '12px'
                        },
                        text: Dashboard.manager.TranslationsManager.getTranslation('Sign into your account')
                    },
                    {
                        xtype: 'textfield',
                        cls: 'auth-textbox',
                        name: 'login',
                        bind: '{login}',
                        height: 32,
                        hideLabel: true,
                        allowBlank: false,
                        listeners: {
                            afterrender: function(login, opt){
                                login.focus();
                            }
                        },
                        emptyText: Dashboard.manager.TranslationsManager.getTranslation('login')//,
                                //            triggers: {
                                //                glyphed: {
                                //                    cls: 'trigger-glyph-noop auth-email-trigger'
                                //                }
                                //            }
                    }, {
                        xtype: 'textfield', //'passwordfield'
                        cls: 'auth-textbox',
                        height: 32,
                        hideLabel: true,
                        emptyText: Dashboard.manager.TranslationsManager.getTranslation('password'),
                        inputType: 'password',
                        name: 'password',
                        bind: '{password}',
                        revealable: true,
                        revealed: false,
                        allowBlank: false//,
                                //            triggers: {
                                //                glyphed: {
                                //                    cls: 'trigger-glyph-noop auth-password-trigger'
                                //                }
                                //            }
                    },
                    //        {
                    //            xtype: 'container',
                    //            layout: 'hbox',
                    //            items: [
                    //                {
                    //                    xtype: 'checkboxfield',
                    //                    flex : 1,
                    //                    cls: 'form-panel-font-color rememberMeCheckbox',
                    //                    height: 30,
                    //                    bind: '{persist}',
                    //                    boxLabel: 'Remember me'
                    //                },
                    //                {
                    //                    xtype: 'box',
                    //                    html: '<a href="#passwordreset" class="link-forgot-password"> Forgot Password ?</a>'
                    //                }
                    //            ]
                    //        },
                    {
                        xtype: 'button',
                        reference: 'loginButton',
                        scale: 'small',
                        iconAlign: 'right',
                        iconCls: 'x-fa fa-angle-right',
                        text: Dashboard.manager.TranslationsManager.getTranslation('User login'),
                        listeners : {
                            scope: this,
                            click : function(button) {
                                this.getController().onLoginButton(button);
                                button.setDisabled(true); 
                                Ext.defer(function() {
                                    try{
                                        button.setDisabled(false);
                                    }catch(ex){}
                                },  500) ;
                            } 
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    },
    
    getData: function(){
        var values = this.getValues();
        var data = {
            username: values.login,
            password: values.password
        };

        return data;
    }

});