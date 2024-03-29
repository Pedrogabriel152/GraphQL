import { SQLDataSource } from 'datasource-sql';
const DataLoader = require('dataloader');

class MatriculaApi extends SQLDataSource {
    public Resposta: any
    public matriculasLoader = new DataLoader(this.getMatriculasPorUser.bind(this));
    public turmaLoader = new DataLoader(this.getMatriculasPorTurma.bind(this));

    constructor(dbConfig){
        super(dbConfig);
        this.Resposta = {
            mensagem: ""
        }
    } 

    public async matricularEstudante(ids){
        const novaMatricula = {
            estudante_id: ids.estudante,
            turma_id: ids.turma,
            status: "confirmado"
        };

        await this.db.insert(novaMatricula).into('matriculas');
        this.Resposta.mensagem = "Matricula adicionada com sucesso";
        return this.Resposta;
    }

    public async getMatriculasPorTurma(ids) {
        const matriculas = await this.db.select('*')
            .from('matriculas')
            .whereIn('turma_id', ids)
            .select();
        console.log(matriculas)
        return matriculas;
    }

    public async getMatriculasPorUser(ids){
        const matriculas = await this.db.select('*')
            .from('matriculas')
            .whereIn('estudante_id', ids)
            .select();
        
        return ids.map((id:number) => matriculas.filter(matricula => matricula.estudante_id === id));
    }

    public async deletarMatricula(idMatricula) {
        await this.db('matriculas')
        .where({ id: Number(idMatricula) })
        .del()
        
        this.Resposta.mensagem = "registro deletado"
        return this.Resposta
    }

    public async cancelarMatricula(idMatricula) {
        await this.db
          .update({ status: "cancelado" })
          .where({ id: Number(idMatricula) })
          .into('matriculas')
     
        this.Resposta.mensagem = "matrícula cancelada"
        return this.Resposta
    }
}

export default MatriculaApi;