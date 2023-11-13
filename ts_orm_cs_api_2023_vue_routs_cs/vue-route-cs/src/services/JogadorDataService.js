
import http from "../http-common";

class JogadorDataService {

    async authenticate(data){

        console.log('JogadorDataService.authenticate: ', data);
        const response = await http.post(`/loginjogador`, data);
        return response;
    }

    async get(nickname){

        console.log('JogadorDataService.get: ', nickname);
        return await http.get('/jogador/'+nickname);
    }

    async list(){

        console.log('JogadorDataService.list: ');
        return await http.get(`/listjogador`);
    }

    async delete(nickname){

        console.log('JogadorDataService.delete: ', nickname);
        return await http.get(`/deletejogador/`+nickname);
    }

    async update(data){

        console.log('JogadorDataService.update: ', data);
        return await http.post(`/updatejogador/`, data);
    }
    
    async create(data){

        console.log('JogadorDataService.create: ', data);
        return await http.post(`/insertjogador/`, data);

    }  

}

export default new JogadorDataService();
