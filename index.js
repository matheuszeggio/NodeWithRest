const customExpress = require('./config/customExpress');
const conexao = require("./infra/conexao");
const Tabelas = require("./infra/Tabelas");

conexao.connect(erro =>{
    if(erro){
        console.log(erro);
    }else{
        const app = customExpress();
        
        Tabelas.init(conexao);
        
        app.listen(3000, function(){
            console.log("Servidor rodando na porta 3000, Bem vindo ao Curso de REST");
        });
    }
});

    


