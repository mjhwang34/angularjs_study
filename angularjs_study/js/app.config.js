(function (window) {
    'use strict';
    angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        // 툴바가 포함된 레이아웃
        $stateProvider.state('app', {
            'abstract': true,
            views: {
                'init@': {
                    templateUrl: 'layout/layout_toolbar.html?v=' + version,
                    controller: 'layoutController'
                }
            }
        });

        // 툴바가 포함 안된 레이아웃
        $stateProvider.state('app_no', {
            'abstract': true,
            views: {
                'init@': {
                    templateUrl: 'layout/layout_no.html?v=' + version
                }
            }
        });

    }])
    .config(['$translateProvider',
        function($translateProvider) {
            var language = (window.navigator.userLanguage || window.navigator.language).toLowerCase();
            console.log(language);
            $translateProvider.registerAvailableLanguageKeys(['en', 'ko'], {
                'en': 'en',
                'ko': 'ko'
            });

            $translateProvider.useStaticFilesLoader({
                prefix: 'lang/lang_',
                suffix: '.json'
            });


            $translateProvider.preferredLanguage('ko');
            // $translateProvider.use('de');
            $translateProvider.useCookieStorage();
            $translateProvider.fallbackLanguage("en");
        }
    ]).run(['$rootScope', 'API', function ($rootScope, API) {
        console.log('run..');
        console.log(API)
        
    }]);
})(window);