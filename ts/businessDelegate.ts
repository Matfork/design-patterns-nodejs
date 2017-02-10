/*
Business Delegate Pattern is used to decouple presentation tier and business tier.
It is basically use to reduce communication or remote lookup functionality to business tier code in presentation tier code. In business tier we have following entities.

- Client - Presentation tier code may be JSP, servlet or UI java code.
- Business Delegate - A single entry point class for client entities to provide access to Business Service methods.
- LookUp Service - Lookup service object is responsible to get relative business implementation and provide business object access to business delegate object.
- Business Service - Business Service interface. Concrete classes implement this business service to provide actual business implementation logic.
*/

interface BusinessService{
  calcularIGV(p1: number);
}

class CuentaSoles implements BusinessService{
  public calcularIGV(p1: number){
    return p1 * 0.18;
  }
}

class CuentaDolares implements BusinessService{
  public calcularIGV(p1: number){
    return p1 * 3.42 * 0.18;
  }
}

class BusinessLookUp{
  getCuentaService(serviceType: string){
    var classChosen = new CuentaSoles();
    if(serviceType === '$'){
      classChosen = new CuentaDolares();
    }
    return classChosen;
  }
}

class BusinessDelegate{
  private businessLookUp = new BusinessLookUp();
  private _serviceType:string;

  set serviceType(st : string){
    this._serviceType = st;
  }

  get serviceType(){
    return this._serviceType;
  }

  public doTask(amount: number){
    var businessService = this.businessLookUp.getCuentaService(this.serviceType);
    return businessService.calcularIGV(amount);;
 }
}

class BankClient {
   private _amount:number = 0;

   constructor(public delegateBusiness: BusinessDelegate){
      this.delegateBusiness = delegateBusiness;
   }

   get amount(){
     return this._amount;
   }

   set amount(amount : number){
     this._amount = amount;
   }

   public doTask(){
      return this.delegateBusiness.doTask(this.amount);
   }
}

module.exports = {
  BusinessDelegate : BusinessDelegate,
  BankClient : BankClient
}
