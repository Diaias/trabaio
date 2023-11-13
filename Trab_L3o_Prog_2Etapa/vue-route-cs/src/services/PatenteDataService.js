
import http from "../http-common";

class PatenteDataService {

    async list(){

        console.log('PatenteDataService.list: ');
        return await http.get(`/listpatente`);
    }

}

export default new PatenteDataService();