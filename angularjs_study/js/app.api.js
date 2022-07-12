(function (window) {
    console.log('api')
    'use strict';
    angular.module('app')
        .factory('API', ['$resource',
            function ($resource) {
                console.log('api....')
                var api = {};
    
                api.currency = $resource('/main/currencies/:num', {  }, {
                    'list':{
                        method: 'get'
                    },
                    'detail':{
                        method: 'get'
                    },
                    'add':{
                        method:'post',
                        headers: { "content-type": "application/json; charset=UTF-8" }
                    },
                    'update':{
                        method:'put',
                        headers: { "content-type": "application/json; charset=UTF-8" }
                    },
                    'delete':{
                        method:'delete'
                    }
                });


                /*
                API.currency.list().then(list=>{
                    listsfksfsfksfsfsf
                })


                API.currency.list({num:123}).then(list=>{
                    listsfksfsfksfsfsf
                })

                API.currency.detail({num:123}).then(list=>{
                    listsfksfsfksfsfsf
                })

                 API.currency.update({num:123},{memo:'aaaa'}).then(list=>{
                    listsfksfsfksfsfsf
                })

                 "application/x-www-form-urlencoded; charset=UTF-8"
                */

                


                return api;
            }

            
        ]);
    }(window));