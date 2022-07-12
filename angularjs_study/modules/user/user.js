(function (window) {
    angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app.users', {
            url: '/users',
            views: {
                'content@app': {
                    templateUrl: 'modules/user/users_list.html',
                    controller: 'userListController'
                }
            }
        })
        $stateProvider.state('app.users.detail', {
            url: '/detail',
            views: {
                'detail@app.users': {
                    templateUrl: 'modules/user/users_detail.html',
                    controller: 'userDetailController'
                }
            }
        })
    }]).controller('userListController', function ($scope, $http, $state) {
        console.log('user list controller ');

        $http({
            method: 'GET',
            url: 'http://localhost/project2-3/jsonData.json'
        }).then(function (response) {
            console.log("getData");
            $scope.userList = response.data.data.user;
            $scope.userListCount = $scope.userList.length;
        }, function (error) {
            console.log(error, "can not get data");
        });

        $scope.selectUser = function(user, indx) {
            //$scope.selectedUserInfo = user;
            $scope.selectedUserInfo = JSON.parse(JSON.stringify(user));
            console.log(indx)
            $scope.selected_user_index = indx;
            $state.go('app.users.detail');
        }

        $scope.close = function() {
            $state.go('app.users');
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
        
        
    }).controller('userDetailController', function ($scope, $http, $state) {
        console.log('user userDetailController ');
        $scope.mode = true;

        $scope.modify = function() {
            console.log('modify')
            $scope.mode = false
        }

        $scope.save = function() {
            $scope.mode = true;
            console.log($scope.selected_user_index)
            $scope.userList[$scope.selected_user_index] = JSON.parse(JSON.stringify($scope.selectedUserInfo));
        }

        $scope.cancel = function() {
            $scope.mode = false;
            $scope.selectedUserInfo=JSON.parse(JSON.stringify($scope.userList[$scope.selected_user_index]));
        }
        
    })
})(window);