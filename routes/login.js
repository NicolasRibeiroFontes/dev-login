var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/dev", {native_parser: true});

exports.logar = function(req,res){
    if ((req.body.login=='')||(req.body.login==undefined)||(req.body.senha=='')||(req.body.senha=='')){
        res.send({status:false,resposta: 'Todos campos são obrigatórios!'});
    }else{
        db.collection('usuario').findOne({'login':req.body.login,'senha':req.body.senha},function(err,usuario){
            if (err){
                res.send({status:false,resposta: 'Erro no servidor'});
            }else{
                if ((usuario==null)||(usuario==undefined)){
                    res.send({status:false,resposta: 'Login/Senha não encontrado!'});
                }else{
                    res.send({status:true,objeto: usuario});
                }
            }
        })
    }
};

exports.enviarSenha = function(req,res){
    if ((req.body.login=='')||(req.body.login==undefined)){
        res.send({status:false,resposta: 'Digite seu login corretamente!'});
    }else{
        db.collection('usuario').findOne({'login':req.body.login}, function(err,usuario){
            if (err){
                res.send({status:false,resposta: 'Erro no servidor'});
            }else{
                if ((usuario==null)||(usuario==undefined)){
                    res.send({status:false,resposta: 'Login não encontrado!'});
                }else{
                    var nodemailer = require('nodemailer');
                    var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');//colocar usuario e senha
                    var mailOptions = {
                        from: '', // seu email
                        to: usuario.email,
                        subject: 'Teste', // Subject line
                        html: '<b>Hello world 🐴</b>' // html body
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            res.send({status:false,resposta: 'Erro no servidor'});
                        }else{
                            res.send({status:true,resposta:'Senha foi enviada para seu e-mail'});
                        }
                    });
                }
            }
        })
    }
};