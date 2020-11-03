const conexao = require("../infra/conexao");
const moment = require("moment");

class Atendimento{
    adiciona(atendimento, resp){
        const dataCriacao = moment().format('YYYY-MM-DD')
        const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD");
        const atendimentoDatado = {...atendimento, dataCriacao, data};

        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser igual ou posterior a atual!'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter no mínimo 5 caracteres!'
            }
        ];
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros){
            resp.status(400).json(erros);
        }else{
            const sql = "INSERT INTO Atendimentos SET ?";

            conexao.query(sql, atendimentoDatado, (erro, resultado)=>{
                if(erro){
                    resp.status(400).json(erro);
                }else{
                    resp.status(201).json(resultado);
                }
            })
        }

    }
    lista(resp){
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                resp.status(400).json(erro);
            }else{
                resp.status(200).json(resultados);
            };
        });
    }
    buscaPorId(id, resp){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        conexao.query(sql, (erro, resultados)=>{
            const atendimento = resultados[0];
            if(erro){
                resp.status(400).json(erro);
            }else{
                resp.status(200).json({atendimento});
            };
        })
    }
    delete(id, resp){
        const sql = `DELETE FROM Atendimentos WHERE id=?`;

        conexao.query(sql, id, (erro, resultados)=>{
            if(erro){
                resp.status(400).json(erro);
            }else{
                resp.status(200).json({id})
            }
        })
    }

    update(id, value,  resp){
        const sql = `UPDATE Atendimentos SET ? WHERE id=?`
        const data = moment(value.data, "DD/MM/YYYY").format("YYYY-MM-DD");
        const valueDatado = {...value, data};

        conexao.query(sql, [valueDatado, id], (erro, resultados)=>{
            if(erro){
                resp.status(400).json(erro);
            }else{
                resp.status(200).json({...value, id})
            }

        })
    }
}
module.exports = new Atendimento;