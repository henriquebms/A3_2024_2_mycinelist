import { Auth } from "../Auth";

class Persistence {

    KEY = 'TIVIT';
  
    save(data) {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(this.KEY, jsonData);
    }

    getData() {
      const jsonData = localStorage.getItem(this.KEY);
      if (jsonData) {
        return JSON.parse(jsonData);
      }
      
      return { 
        list: []
      };
    }
}

export default new Persistence();