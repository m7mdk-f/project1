export interface IStoreRediness {
    id: number;
    title: string;
  }
  
  export interface ICategory {
    id: number;
    title: string;
    description: string;
  }

  export type Advantage = {
    id: number;
    name: string;
  };
  
  export type Plan = {
    id: number;
    type: string;         
    priceMonthly: number;  
    priceYearys: number;   
    duration: string;     
    title: string;        
    advantages: Advantage[];
  };