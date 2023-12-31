import {Router} from 'express';
import EnderecoController from './app/controllers/EnderecoController';
import LocalController from './app/controllers/LocalController';
import PatenteController from './app/controllers/PatenteController';
import JogadorController from './app/controllers/JogadorController';

const router = Router();

//http://localhost:3000/endereco/list
router.get('/endereco/list', EnderecoController.list);
router.post('/endereco/store', EnderecoController.store)
router.delete('/endereco/delete', EnderecoController.delete)


//http://localhost:3000/local/list
router.get('/local/list', LocalController.list);



router.post('/loginjogador', JogadorController.login);
router.get('/jogador/:nickname', JogadorController.find);
router.get('/listjogador', JogadorController.list);
router.get('/deletejogador/:nickname', JogadorController.delete);
router.post('/updatejogador/', JogadorController.update);
router.post('/insertjogador/', JogadorController.store);


router.get('/listpatente', PatenteController.list);

//Criação das rotas para /patente.
//http://localhost:3000/patente/
router.get('/patente/list', PatenteController.list);
router.post('/patente/store', PatenteController.store);
router.delete('/patente/delete', PatenteController.delete);


export default router;