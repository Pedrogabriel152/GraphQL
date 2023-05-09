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
        
    }
}

export default MatriculaApi;