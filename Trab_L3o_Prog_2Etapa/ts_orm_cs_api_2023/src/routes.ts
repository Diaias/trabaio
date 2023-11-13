import {Router} from 'express';
import ClienteController from './app/controllers/ClienteController';
import FuncionarioController from './app/controllers/FuncionarioController';
import ServicoController from './app/controllers/ServicoController';
import PecaController from './app/controllers/PecaController';
import EquipamentoController from './app/controllers/EquipamentoController';

const router = Router();

//Cliente
router.get('/listCliente', ClienteController.list);
router.post('/storeCliente/', ClienteController.store);
router.put('/updateCliente/:cpf', ClienteController.update);
router.delete('/deleteCliente/:cpf', ClienteController.delete);

//Funcionario
router.get('/listFuncionario', FuncionarioController.list);
router.post('/storeFuncionario/', FuncionarioController.store);
router.put('/updateFuncionario/:cpf', FuncionarioController.update);
router.delete('/deleteFuncionario/:cpf', FuncionarioController.delete);

//Servico
router.get('/listServico', ServicoController.list);
router.post('/storeServico/', ServicoController.store);
router.put('/updateServico/:cpf', ServicoController.update);
router.delete('/deleteServico/:cpf', ServicoController.delete);

//Peca
router.get('/listPeca', PecaController.list);
router.post('/storePeca/', PecaController.store);
router.put('/updatePeca/:cpf', PecaController.update);
router.delete('/deletePeca/:cpf', PecaController.delete);

//Equipamento
router.get('/listEquipamento', EquipamentoController.list);
router.post('/storeEquipamento/', EquipamentoController.store);
router.put('/updateEquipamento/:cpf', EquipamentoController.update);
router.delete('/deleteEquipamento/:cpf', EquipamentoController.delete);

export default router;