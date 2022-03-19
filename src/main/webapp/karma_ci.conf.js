// Karma configuration
// Generated on Tue May 30 2017 11:35:59 GMT+0200 (Paris, Madrid (heure d’été))

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'ext/build/ext-all-debug.js', // pour charger les composant Ext
            'test/beforeLoad.js', // pour charger la fonction "getText(key)" 

            'app/config/Config.js',
            'app/tool/Utilities.js',
            'app/tool/DateTime.js',
            'app/store/StatisticFilters.js',
            'app/model/Base.js',
            'app/model/Proxy.js',
            'app/model/Category.js',
            'app/model/settings/SpecificCheckParagraphConfig.js',
            'classic/src/view/settings/specificCheckConfig/paragraph/CreateController.js',
            'app/engine/ResponseManager.js',
            'app/engine/ExportToFile.js',
            'app/model/PropertyConfiguration.js',
            'app/model/StatisticReferenceProperty.js',
            'app/model/CalculByType.js',
            'app/model/DashboardScene.js',
            'app/model/Feature.js',
            'app/model/filter.js',
            'app/store/OperationType.js',
            'app/store/Features.js',
            'classic/src/view/alerts/currentAlert/MainController.js',

            'app/model/FeatureConfiguration.js',
            'app/manager/ConfigurationManager.js',
            'app/view/main/MainController.js',
            'app/model/core/Authentication.js',

            'classic/src/view/authentication/LoginScreenController.js',
            'classic/src/view/authentication/LoginForm.js',

            'test/**/*.js'        // Dossier contenant tous les tests 
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/**/*.js': ['coverage'],
            'classic/src/**/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress','junit', 'coverage'], // 'coverage' pour utiliser Istanbul | 'junit' for jenkins
        
        // the default configuration 
        junitReporter: {
            outputDir: 'testreport', // results will be saved as $outputDir/$browserName.xml 
            outputFile: 'test_report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile 
            suite: '', // suite will become the package name attribute in xml testsuite element 
            useBrowserName: false, // add browser name to report and classes names 
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element 
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element 
            properties: {} // key value pair of properties to add to the <properties> section of the report 
        },
        
        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'], // 'Chrome', 'IE', 'Firefox', 'FirefoxDeveloper'
        
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-html-reporter',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true, // change to false if you want to dev locally

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
