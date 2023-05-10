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
        const turma = await this.db.select('*').from('turmas').where({id: Number(id)});

        const users = await this.db.select('*')
            .from('users').where({role: Number(2)})

        const matricula = await this.db('users').select('users.nome', 'users.email', 'users.ativo', 'tipo.tipo')
            .join('tipo', 'tipo.id', 'users.role')
            .where({role: 2})

            console.log(matricula);
    }
}

export default UsersApi;