import { SQLDataSource } from 'datasource-sql';

class MatriculaApi extends SQLDataSource {
    public Resposta: any

    constructor(dbConfig){
        super(dbConfig);
        this.Resposta = {
            mensagem: ""
        }
    } 

    public async matricularEstudante({estudante, turma}){

        this.Resposta.mensagem = "Matricula adicionada com sucesso";
        return this.Resposta;
    }
}

export default MatriculaApi;