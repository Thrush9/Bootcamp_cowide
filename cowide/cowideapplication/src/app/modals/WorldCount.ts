export class WorldCount {
    countId: number;
    userId: number; 
    recovered: number;
    confirmed: number;
    death: number;
    type: string;

    public constructor(id: number,user: number,con: number,rec: number,dea: number){
      this.countId = id;
      this.userId = user;
      this.confirmed = con;
      this.recovered = rec;
      this.death = dea;
      this.type = 'World';
    }
}