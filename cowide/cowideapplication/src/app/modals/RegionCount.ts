export class RegionCount {
    countId: number;
    userId: number; 
    recovered: number;
    confirmed: number;
    death: number;
    type: string;
    name: string;
    belongsTo: string

    public constructor(id: number,user: number,con: number,rec: number,dea: number,
                      type: string,name: string,belongs: string){
      this.countId = id;
      this.userId = user;
      this.confirmed = con;
      this.recovered = rec;
      this.death = dea;
      this.type = type;
      this.name = name;
      this.belongsTo = belongs;
    }
}