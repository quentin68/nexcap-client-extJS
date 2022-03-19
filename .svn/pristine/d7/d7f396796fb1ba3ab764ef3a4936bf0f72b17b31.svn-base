/* global Ext  */

Ext.define('Dashboard.store.enums.CodeType', {
    extend: 'Ext.data.Store',
    alias: 'store.codeType',
    
    fields: [
        'value', 
        'label',
        {
            name: 'localizedLabel',
            type: 'string',
            convert: function(val, record){
                if(record.data.label){
                    return getText(record.data.label);
                }
            }
        }
    ],
    
    data: [
        {
            value: 'RFID_TAG',
            label: 'RFID Tag'
        }, 
//        {
//            value: 'WEIGHTPAD_ID',
//            label: 'Weightpad code'
//        }, 
        {
            value: 'ALPHANUM_INPUT',
            label: 'Alphanumeric input'
        }, {
            value: 'FREE_INPUT',
            label: 'Free input'
        }, {
            value: 'QR_CODE',
            label: 'QR code'
        }, {
            value: 'BAR_CODE',
            label: 'Bar code'
        }
    ],

    statics: {
        RFID_TAG: {
            value: 'RFID_TAG',
            label: 'RFID Tag'
        },
        WEIGHTPAD_ID: {
            value: 'WEIGHTPAD_ID',
            label: 'Weightpad code'
        },
        ALPHANUM_INPUT: {
            value: 'ALPHANUM_INPUT',
            label: 'Alphanumeric input'
        },
        FREE_INPUT: {
            value: 'FREE_INPUT', // Code libre
            label: 'Free input'
        },
        QR_CODE: {
            value: 'QR_CODE', // QR Code
            label: 'QR code'
        },
        BAR_CODE: {
            value: 'BAR_CODE',
            label: 'Bar code' //code-barres
        }
    }
});