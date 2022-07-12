(function (window) {
    'use strict';
    angular.module('commons', ['ui.router', 'ngMaterial', 'ngMessages', 'md.data.table','ngMaterialSidemenu', 'pascalprecht.translate', 'ngCookies', 'ngResource']);
    angular.module('app', ['commons']);
})(window);