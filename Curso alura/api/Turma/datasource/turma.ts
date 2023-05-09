import { SQLDataSource } from 'datasource-sql';

class TurmasAPI extends SQLDataSource {
  public Resposta: any

    constructor(dbConfig){
        super(dbConfig);
        this.Resposta = {
          mensagem: ""
        }
    }

    public async getTurmas() {
      return this.db.select('*').from('turmas');
    }

    public  async getTurma(id: number) {
      const turma = await this.db.select('*').from('turmas').where({ id: Number(id)})
      return turma[0]
    }
    
    public async incluiTurma(novaTurma) {
      const novaTurmaId = await this.db
        .insert(novaTurma)
        .returning('id')
        .into('turmas')

      const turmaInserida = await this.getTurma(novaTurmaId[0].id)
      return ({ ...turmaInserida })
    }

    public  async atualizaTurma(novosDados) {
      await this.db
        .update({ ...novosDados.turma })
        .where({ id: Number(novosDados.id) })
        .into('turmas')
   
      const turmaAtualizada = await this.getTurma(novosDados.id)
      return ({
        ...turmaAtualizada
      })
    }

    public  async deletaTurma(id) {
      await this.db('turmas')
        .where({ id: id })
        .del()
   
      this.Resposta.mensagem = "registro deletado"
      return this.Resposta
    }
}

export default TurmasAPI;