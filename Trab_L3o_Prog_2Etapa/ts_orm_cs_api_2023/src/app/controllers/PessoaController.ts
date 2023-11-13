import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Pessoa from '../models/Pessoa';

class PessoaController{
    async find(req: Request, res: Response){
        const repository = getRepository(Pessoa);
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
        const repository = getRepository(Pessoa);
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
        const repository = getRepository(Pessoa);
        const lista = await repository.find();
        return res.json(lista);
    }

    async delete(req: Request, res: Response){
        const repository = getRepository(Pessoa);//recupera o repositorio do Pessoa.
        const cpf = req.params.cpf;
        const cpfExists = await repository.findOne({where :{cpf}});//consulta na tabela se existe um registro com o mesmo  da mensagem.
        if(cpfExists){
            await repository.remove(cpfExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
            return res.sendStatus(204);//retorna o coigo 204.
        }else{
            return res.sendStatus(404);//se nao encontrar Pessoa para remover, retorna o codigo 404.
        }
    }

    async update(req: Request, res: Response){
        const repository = getRepository(Pessoa);//recupera o repositorio do Pessoa.
        const {cpf} = req.body;//extrai os atributos id do corpo da mensagem
        const cpfExists = await repository.findOne({where :{cpf}});//consulta na tabela se existe um registro com o mesmo nickname.
        if(!cpfExists){
            return res.sendStatus(404);
        }
        const j = repository.create(req.body); //cria a entidade Pessoa
        await repository.save(j); //persiste (update) a entidade na tabela.
        return res.json(j);
    }

    async store(req: Request, res: Response){
        const repository = getRepository(Pessoa);//recupera o repositorio do Patente.
        const {cpf} = req.body;//extrai os atributos id do corpo da mensagem
        const cpfExists = await repository.findOne({where : {cpf}});//consulta na tabela se existe um registro com o mesmo cpf da mensagem.
    }
}
export default new PessoaController();