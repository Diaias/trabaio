import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Cliente from '../models/Cliente';

class ClienteController{

    async find(req: Request, res: Response){
        const repository = getRepository(Cliente);
        const cpf = req.params.cpf;
        const j = repository.createQueryBuilder('tb_pessoa').where({"cpf" : cpf}) ;
        if(j){
            console.log(j);      
            return res.json(j);
        }else{
            return res.sendStatus(204);
        }
    }

    async login(req: Request, res: Response){
        const repository = getRepository(Cliente);
        const {cpf, senha} = req.body;
        const j = await repository.findOne(
            {where : {"cpf" : cpf, "senha" : senha }});
        if(j){
          //  res.sendStatus(201);
            return res.json(j);
        }else{
            return res.sendStatus(204);
        }
    }

    async list(req: Request, res: Response){
        const repository = getRepository(Cliente);
        const lista = await repository.find();
        return res.json(lista);
    }

    async delete(req: Request, res: Response){
        const repository = getRepository(Cliente);//recupera o repositorio do Cliente.
        const cpf = req.params.cpf;
        const cpfExists = await repository.findOne({where :{cpf}});//consulta na tabela se existe um registro com o mesmo  da mensagem.
        if(cpfExists){
            await repository.remove(cpfExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
            return res.sendStatus(204);//retorna o coigo 204.
        }else{
            return res.sendStatus(404);//se nao encontrar Cliente para remover, retorna o codigo 404.
        }
    }

    async update(req: Request, res: Response){
        const repository = getRepository(Cliente);//recupera o repositorio do Cliente.
        const {cpf} = req.body;//extrai os atributos cpf do corpo da mensagem
        const cpfExists = await repository.findOne({where :{cpf}});//consulta na tabela se existe um registro com o mesmo cpf.
        if(!cpfExists){
            return res.sendStatus(404);
        }
        const c = repository.create(req.body); //cria a entidade Cliente
        await repository.save(c); //persiste (update) a entidade na tabela.
        return res.json(c);
    }

    async store(req: Request, res: Response){
        const repository = getRepository(Cliente);
        const {cpf} = req.body;
        const cpfExists = await repository.findOne({where : {cpf}});// Testa para ver se tem um cpf igual
        if(!cpfExists){ //Se nn tem um cpf igual ele cria 
            const c = repository.create(req.body); //cria a entidade Cliente
            await repository.save(c);//efetiva a operacao de insert do Cliente.
            return res.json(c);//retorna o bojeto json no response.
        }else{
            return res.sendStatus(409);//Se tem um ele informa o erro
        }
    }
}
export default new ClienteController();