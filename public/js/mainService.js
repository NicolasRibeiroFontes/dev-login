angular.module('mainService', [])
    .factory('loginService',['$http',function($http){
        return{
            logar: function(objeto){
                return $http.post('/logar',objeto);
            },
            enviarSenha: function(objeto){
                return $http.post('/enviarSenha',objeto);
            }
        }
    }]);
