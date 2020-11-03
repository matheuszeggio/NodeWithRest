module.exports = app =>{
    const Atendimento = require("../models/atendimento");

    app.get("/atendimentos", (req, resp) => {
        Atendimento.lista(resp);
    });

    app.get("/atendimentos/:id", (req, resp)=>{
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id, resp);
    })

    app.post("/atendimentos", (req, resp)=>{
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, resp);
        resp.send("Rota Atendimentos, Método POST");
    })
    app.delete("/atendimentos/:id", (req, resp)=>{
        const id = parseInt(req.params.id);
        Atendimento.delete(id, resp);
        
    })
    app.patch("/atendimentos/:id", (req, resp)=>{
        const id =parseInt(req.params.id);
        const value = req.body;
        Atendimento.update(id, value, resp);

    })
}