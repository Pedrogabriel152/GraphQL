import { SQLDataSource } from 'datasource-sql';

class MatriculaApi extends SQLDataSource {
    public Resposta: any

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

    public async getMatriculasPorTurma(id: number) {
        const matriculas = await this.db.select('*').from('matriculas').where({ turma_id: Number(id)});
        return matriculas;
    }

    public async getMatriculasPorUser(id: number){
        const matriculas = await this.db.select('*').from('matriculas').where({ estudante_id: Number(id)});
        console.log(matriculas)
        return matriculas;
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