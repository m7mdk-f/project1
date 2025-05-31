export interface IStoreRediness {
    id: number;
    title: string;
  }
  

export class StoreRediness {
    id: number;
    title: string;
  
    constructor(id: number, title: string) {
      this.id = id;
      this.title = title;
    }
  }