(function (window) {
    angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('app.snacks', {
            url: '/snacks',
            views: {
                'content@app': {
                    templateUrl: 'modules/snack/snacks_list.html',
                    controller: 'snackListController'
                }
            }
        })

        $stateProvider.state('app.snacks.detail', {
            url: '/detail',
            views: {
                'detail@app.snacks': {
                    templateUrl: 'modules/snack/snacks_detail.html',
                    controller: 'snackDetailController'
                }
            }
        })
    }]).controller('snackListController', function ($scope, $http, $state) {
        console.log('snackListController ');
  
        $http({
            method: 'GET',
            url: 'http://localhost/project2-3/jsonData.json'
        }).then(function (response) {
            console.log("getSnackData");
            $scope.snackList = response.data.data.snack;
            $scope.snackListCount = $scope.snackList.length;
        }, function (error) {
            console.log(error, "can not get data");
        });

        $scope.selectSnack = function(snack, indx) {
            //$scope.selectedUserInfo = user;
            $scope.selectedSnackInfo = JSON.parse(JSON.stringify(snack));
            console.log(indx)
            $scope.selected_snack_index = indx;
            $state.go('app.snacks.detail');
        }

        $scope.close = function() {
            $state.go('app.snacks');
        }

        $scope.limitOptions = [3, 4];

        $scope.query = {
            order: 'id',
            limit: 4,
            currentPage: 1
          };
      
          $scope.options = {
            limitSelect: true,
            pageSelect: true
          }
        
    })
    .controller('snackDetailController', function ($scope, $http, $state) {
        console.log('snackDetailsController ');

        $scope.mode = true;

        $scope.modify = function() {
            console.log('modify')
            $scope.mode = false
        }

        $scope.save = function() {
            $scope.mode = true;
            console.log($scope.selected_snack_index)
            $scope.snackList[$scope.selected_snack_index] = JSON.parse(JSON.stringify($scope.selectedSnackInfo));
        }

        $scope.cancel = function() {
            $scope.mode = false;
            $scope.selectedSnackInfo=JSON.parse(JSON.stringify($scope.snackList[$scope.selected_snack_index]));
        }
    })
})(window);