import { RESTDataSource } from '@apollo/datasource-rest';

class UsersApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000';
    }

    public async getUsers() {
        const users = await this.get('/users');
        return users.map(async user => ({
            id: user.id,
            nome: user.nome,
            ativo: user.ativo,
            email: user.email,
            role: await this.get(`/roles/${user.role}`)
        }));
    }

    public async getUserById(id) {
        const user = await this.get(`/users/${id}`);
        user.role = await this.get(`/roles/${user.role}`);
        return user;
    }

    public async adicionaUser({user}){
        const users = await this.get('/users');
        user.id = users.length + 1;
        const role = await this.get(`roles?type=${user.role}`);
        user.role = role[0].id;
        await this.post('users', user);
        console.log(user)
        return ({
            ...user,
            role: role[0]
        });
    }

    public async atualizaUser(novosDados){
        const role = await this.get(`roles?type=${novosDados.user.role}`);

        await this.put(`users/${novosDados.id}`, {...novosDados.user, role: role[0].id});
        return ({
            ...novosDados.user,
            role: role[0]
        });
    }

    public async deletaUser(id: number) {
        await this.delete(`users/${id}`)
        
        return id;
    }
    
}

export default UsersApi;