(function (window) {
    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('app.currencies', {
                url: '/currencies',
                views: {
                    'content@app': {
                        templateUrl: 'modules/currency/currencies_list.html',
                        controller: 'currencyListController'
                    }
                }
            })
            $stateProvider.state('app.currencies.detail', {
                url: '/detail',
                views: {
                    'detail@app.currencies': {
                        templateUrl: 'modules/currency/currencies_detail.html',
                        controller: 'currencyDetailController'
                    }
                }
            })
        }]).controller('currencyListController', ['$scope', '$state', 'API', function ($scope, $state, API) {
            console.log('currency list controller ');

            $scope.limitOptions = [10, 30, 60];

            $scope.query = {
                order: 'code',
                limit: 10,
                currentPage: 1
            };

            $scope.options = {
                limitSelect: true,
                pageSelect: true
            }

            $scope.list = function() {
                /* 로딩 만들기
                API.currency.list({}).$promise.then(response=>{
                    $scope.items = response.data;
                    $scope.currencyListCount = response.data.length;
                })*/
                /* 로딩 만들기
                $scope.loading = API.currency.list({}, function(response) {
                    $scope.items = response.data;
                    $scope.currencyListCount = response.data.length;
                }).$promise
                */

                $scope.loading =  API.currency.list({}).$promise;

                $scope.loading.then(response=>{
                    $scope.currencyList = response.data;
                    $scope.currencyListCount = response.data.length;
                })
            }

            

            $scope.selectCurrency = function (currency, indx) {
                //$scope.selectedUserInfo = user;
                $scope.selectedCurrencyInfo = JSON.parse(JSON.stringify(currency));
                console.log(indx)
                console.log($scope.selectedCurrencyInfo);
                $scope.selected_currency_index = indx;
                $scope.mode = true;
                $scope.modeAdd = true;
                $state.go('app.currencies.detail', {}, {reload:"app.currencies.detail"});
            }

            $scope.insert = function(){
                console.log('insert')
                $scope.mode = false;
                $scope.modeAdd = false;
                console.log($scope.mode);
                console.log($scope.modeAdd);
                $scope.selectedCurrencyInfo={
                    code:"",
                    num:null,
                    memo:""
                }
                $state.go('app.currencies.detail', {}, {reload:"app.currencies.detail"});
            }

            $scope.list();

        }]).controller('currencyDetailController', ['$scope', '$state', 'API', function ($scope, $state, API) {
            console.log('currency currencyDetailController ');

            $scope.close = function () {
                $state.go('app.currencies');
            }

            $scope.modify = function () {
                console.log('modify')
                $scope.mode = false
            }

            $scope.save = function () {
                $scope.mode=true;
                console.log($scope.modeAdd);
                console.log($scope.selectedCurrencyInfo); // {Currency:$scope.selectedCurrencyInfo}
                if($scope.modeAdd==false){
                    API.currency.add({},$scope.selectedCurrencyInfo).$promise.then(response=>{
                        $scope.list();
                        $scope.close();
                        $scope.modeAdd=true;
                    }).catch(err=>{
                        console.error(err);
                    })
                }
                else{
                    API.currency.update({num:$scope.selectedCurrencyInfo.num}, {memo:$scope.selectedCurrencyInfo.memo}).$promise.then(response=>{
                        $scope.list();
                    }).catch(err=>{
                        console.error(err);
                    })
                }
                /*
                $scope.mode = true;

                API.currency.update({num:$scope.selectedCurrencyInfo.num}, {memo:$scope.selectedCurrencyInfo.memo}).$promise.then(response=>{
                    $scope.list();
                }).catch(err=>{
                    console.error(err);
                })*/
            }

            $scope.delete = function(){
                if(confirm("정말 삭제하시겠습니까?")){
                    API.currency.delete({num:$scope.selectedCurrencyInfo.num}).$promise.then(response=>{
                        $scope.list();
                        $scope.close();
                    }).catch(err=>{
                        console.error(err);
                    })
                }
            }

            $scope.reset = function () {
                API.currency.get({num:$scope.selectedCurrencyInfo.num}).$promise.then(response=>{
                    $scope.selectedCurrencyInfo = response.data;
                })
                $scope.selectedCurrencyInfo = JSON.parse(JSON.stringify($scope.currencyList[$scope.selected_currency_index]));
            }

        }])
})(window);