(function (window) {
    'use strict';
    console.log(angular.module('app'))
    console.log(angular.element(document))
    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider',  function ($stateProvider, $urlRouterProvider, $translateProvider) {

            $stateProvider.state('app_no.login', {
                url: '/login',
                views: {
                    'content@app_no': {
                        templateUrl: 'modules/login/login.html',
                        controller: 'loginController'
                    }
                }
            })

            /*
            var en_translations = {
                "language" : "Selected Language English",
                "greeting" : "Welcome Dinesh",
                "headline": "Quick Pay",
                "subhead": "Quick, Simple Payment Service",
                "username": "username",
                "password": "password",
                "login":"login"
              }
              
            var ko_translations = {
                "language" : "Selected Language Spanish",
                "greeting" : "Bienvenida Dinesh",
                "headline": "퀵 페이",
                "subhead": "빠르고 간편한 결제 서비스",
                "username": "아이디",
                "password": "비밀번호",
                "login":"로그인"
              }
              
              $translateProvider.translations('en',en_translations);
              
              $translateProvider.translations('ko', ko_translations);
              
              $translateProvider.preferredLanguage('en');*/

        }])
        .controller('loginController', ['$scope', '$http', '$state', '$translate', 'API', function ($scope, $http, $state, $translate, API) {
            console.log('loginController');
            console.log(API)



            API.currency.list({}).$promise.then(function(response){
                console.log(response.code);
                console.log(response.data);
            }).catch(function (err) {
                
            });


            $scope.submitForm = function (user) {
                console.log($scope.loginData.userName);
                if (user == null || user.userName == null || user.password == null) {
                    alert("Please enter your ID or PW !");
                }
                else if (user.userName != $scope.loginData.userName || user.password != $scope.loginData.password) {
                    alert("Icorrect ID or PW !");
                }
                else {
                    $state.go('app.users');
                    console.log("main");
                }
            };

            $http({
                method: 'GET',
                url: 'http://localhost/project2-3/jsonData.json'
            }).then(function (response) {
                console.log("getData");
                $scope.loginData = response.data.data.loginData;
                $scope.language = response.data.data.language;
            }, function (error) {
                console.log(error, "can not get data");
            });

            $scope.changeLanguage = function (lang) {
                $translate.use(lang);
            }

        }]);
})(window);