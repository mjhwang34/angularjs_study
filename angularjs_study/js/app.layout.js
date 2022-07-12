(function (window) {
    'use strict';
    angular.module('app')
    .controller('layoutController', ['$scope', function ($s) {
        $s.items = ['로그아웃'];
        $s.selectedItem = undefined;
        $s.getSelectedText = function () {
            if ($s.selectedItem !== undefined) {
                return $s.selectedItem;
            } else {
                return "민주";
            }
        };
        
    }]);
})(window);