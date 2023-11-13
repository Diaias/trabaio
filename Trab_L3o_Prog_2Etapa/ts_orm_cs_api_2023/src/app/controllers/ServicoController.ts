import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Servico from '../models/Servico';

class ServicoController{

    async find(req: Request, res: Response){
        const repository = getRepository(Servico);
        const id = req.params.id;
        const s = repository.createQueryBuilder('tb_servico').where({"id" : id}).innerJoinAndSelect("tb_servico.funcionario", "funcionario").innerJoinAndSelect("tb_servico.equipamento", "equipamento").getOne();
        // const j = await repository.createQueryBuilder('tb_jogador').where({"nickname" : nickname}).innerJoinAndSelect("tb_jogador.endereco", "endereco").leftJoinAndSelect("tb_jogador.patentes", "patente").getOne();
        if(s){
            console.log(s);      
            return res.json(s);
        }else{
            return res.sendStatus(204);
        }
    }

    async list(req: Request, res: Response){
        const repository = getRepository(Servico);
        const lista = await repository.createQueryBuilder('tb_servico').innerJoinAndSelect("tb_servico.funcionario", "funcionario").innerJoinAndSelect("tb_servico.cliente", "cliente").innerJoinAndSelect("tb_servico.equipamento", "equipamento").getOne();
        return res.json(lista);
    }

    async delete(req: Request, res: Response){
        const repository = getRepository(Servico);//recupera o repositorio do Cliente.
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
        const repository = getRepository(Servico);//recupera o repositorio do Servico.
        const {id} = req.body;//extrai os atributos id do corpo da mensagem
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo id.
        if(!idExists){
            return res.sendStatus(404);
        }
        const c = repository.create(req.body); //cria a entidade Servico
        await repository.save(c); //persiste (update) a entidade na tabela.
        return res.json(c);
    }

    async store(req: Request, res: Response){
        const repository = getRepository(Servico);
        const {id} = req.body;
        const idExists = await repository.findOne({where : {id}});// Testa para ver se tem um id igual
        if(!idExists){ //Se nn tem um id igual ele cria 
            const s = repository.create(req.body); //cria a entidade Servico
            await repository.save(s);//efetiva a operacao de insert do Servico.
            return res.json(s);//retorna o bojeto json no response.
        }else{
            return res.sendStatus(409);//Se tem um ele informa o erro
        }
    }
}
export default new ServicoController();