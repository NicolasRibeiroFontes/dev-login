angular.module('mainController', [])
    .controller('loginController',['$scope','loginService',function($scope,loginService){
        $scope.login = {
            login:'',
            senha:''
        };
        $scope.logar = function(){
            document.getElementById('logar').style.display = 'none';
            $scope.resposta = "CARREGANDO...";
            loginService.logar($scope.login)
                .success(function(retorno){
                    if (retorno.status==false){
                        $scope.resposta = retorno.resposta;
                    }else{
                        localStorage.setItem('usuarioLogado',JSON.stringify(retorno.objeto));
                        //location.href = '';
                        $scope.resposta = '';
                        alert('Usuário Logado!');
                    }
                    document.getElementById('logar').style.display = 'block';
                })
                .error(function(){location.href = '404.html';})
        };
        $scope.enviarSenha = function(){
            document.getElementById('logar').style.display = 'none';
            $scope.resposta = "CARREGANDO...";
            loginService.enviarSenha($scope.login)
                .success(function(retorno){
                    if (retorno.status==false){
                        $scope.resposta = retorno.resposta;
                    }else{
                        //location.href = '';
                        $scope.resposta = '';
                        alert('E-mail Enviado!');
                    }
                    document.getElementById('logar').style.display = 'block';
                })
                .error(function(){location.href = '404.html';})
        };
    }]);