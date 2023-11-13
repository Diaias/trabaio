import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Pecas from '../models/Pecas';

class PecaController{

    async find(req: Request, res: Response){
        const repository = getRepository(Pecas);
        const id = req.params.id;
        const f = repository.createQueryBuilder('tb_pessoa').where({"id" : id}) ;
        if(f){     
            console.log(f);      
            return res.json(f);
        }else{
            return res.sendStatus(204);
        }
    }

    async login(req: Request, res: Response){
        const repository = getRepository(Pecas);
        const {id, senha} = req.body;
        const f = await repository.findOne(
            {where : {"id" : id, "senha" : senha }});
        if(f){           
          //  res.sendStatus(201);
            return res.json(f);
        }else{
            return res.sendStatus(204);
        }
    }

  
    async list(req: Request, res: Response){
        const repository = getRepository(Pecas);
        const lista = await repository.find();
        return res.json(lista);
    }

    async delete(req: Request, res: Response){
        const repository = getRepository(Pecas);//recupera o repositorio do Cliente.
        const id = req.params.id;
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo  da mensagem.
        if(idExists){
            await repository.remove(idExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
            return res.sendStatus(204);//retorna o coigo 204.
        }else{
            return res.sendStatus(404);//se nao encontrar Cliente para remover, retorna o codigo 404.
        }
    }

    async update(req: Request, res: Response){
    
        const repository = getRepository(Pecas);//recupera o repositorio do Cliente.
        const {id} = req.body;//extrai os atributos id do corpo da mensagem
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname.
        if(!idExists){
            return res.sendStatus(404);
        }
        const j = repository.create(req.body); //cria a entidade Cliente
        await repository.save(j); //persiste (update) a entidade na tabela.
        return res.json(j);
    }

    async store(req: Request, res: Response){
        const repository = getRepository(Pecas);//recupera o repositorio do Patente.
        const {id} = req.body;//extrai os atributos id do corpo da mensagem
        const idExists = await repository.findOne({where : {id}});//consulta na tabela se existe um registro com o mesmo id da mensagem.
        if(!idExists){                  
            const f = repository.create(req.body); //cria a entidade Cliente
            await repository.save(f);//efetiva a operacao de insert do Cliente.
            return res.json(f);//retorna o bojeto json no response.
        }else{
            return res.sendStatus(409);//caso exista um registro, retorna 409 informando o conflito
        }
    }
}
export default new PecaController();