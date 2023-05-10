import { SQLDataSource } from 'datasource-sql';

class UsersApi extends SQLDataSource {
    public respostaCustom;

    public Resposta: any

  constructor(dbConfig){
      super(dbConfig);
      this.respostaCustom = {
        code: 200,
        mensagem: "Operação realizada com sucesso!"
      };
  }

    public async getUsers() {
        const users = await this.db.select('*').from('users')
        return users.map(async user => ({
            id: user.id,
            nome: user.nome,
            ativo: user.ativo? true : false,
            email: user.email,
            role: await this.db.select('*').from('tipo').where({id: Number(user.role)})
        }));
    }

    public async getUserById(id) {
        const user = await this.db.select('*').from('users').where({id: Number(id)});
        console.log(user)
        if(user[0].ativo){
            user[0].ativo = true;
        } else {
            user[0].ativo = false
        }
        user[0].role = await this.db.select('*').from('tipo').where({id: Number(user[0].role)});
        return user[0];
    }

    public async adicionaUser({user}){
        const role = await this.db.select('*').from('tipo').where({tipo: String(user.role)});
        user.role = role[0].id;
        console.log(user)
        await this.db.insert(user).into('users');
        return ({
            id: user.id,
            nome: user.nome,
            ativo: user.ativo,
            email: user.email,
            role: role[0]
        });
    }

    public async atualizaUser(novosDados){
        const role = await this.db.select('*').from('tipo').where({tipo: String(novosDados.user.role)});
        novosDados.user.role = role[0].id;
        await this.db.update({ ...novosDados.user })
        .where({ id: Number(novosDados.id) })
        .into('users');
        return ({
            ...this.respostaCustom,
            user: {
                ...novosDados.user,
                role: role[0]
            }
        });
    }

    public async deletaUser(id: number) {
        await this.db('users')
            .where({ id: id })
            .del();
        return this.respostaCustom;
    }
    
    public async getDocente(id: number){
        const  docente = await this.db('users as u')
            .join('matriculas as m', 'm.estudante_id', 'u.id')
            .join('turmas as t', 't.id', 'm.turma_id')
            .select('u.id','u.nome', 'u.email', 'u.ativo', 'u.created_at', 'u.role')
            .where({role: 2});

        const role = await this.db.select('*').from('tipo').where({id: docente[0].role})

        return ({
            id: docente[0].id,
            nome: docente[0].nome,
            email: docente[0].email,
            ativo: docente[0].ativo? true : false,
            createdAt: docente[0].created_at,
            role: role[0]
        })

        
    }
}

export default UsersApi;