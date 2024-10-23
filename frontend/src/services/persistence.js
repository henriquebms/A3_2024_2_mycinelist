class Persistence {
    
    #key = 'MYCINELIST';
    
    save(data) {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(this.#key, jsonData);
      }
  
      get() {
        const jsonData = localStorage.getItem(this.#key);
        if (jsonData) {
          return JSON.parse(jsonData);
        }
        return [];
      }
}

export default new Persistence();