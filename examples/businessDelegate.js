class CuentaSoles {
    calcularIGV(p1) {
        return p1 * 0.18;
    }
}
class CuentaDolares {
    calcularIGV(p1) {
        return p1 * 3.42 * 0.18;
    }
}
class BusinessLookUp {
    getCuentaService(serviceType) {
        var classChosen = new CuentaSoles();
        if (serviceType === '$') {
            classChosen = new CuentaDolares();
        }
        return classChosen;
    }
}
class BusinessDelegate {
    constructor() {
        this.businessLookUp = new BusinessLookUp();
    }
    set serviceType(st) {
        this._serviceType = st;
    }
    get serviceType() {
        return this._serviceType;
    }
    doTask(amount) {
        var businessService = this.businessLookUp.getCuentaService(this.serviceType);
        return businessService.calcularIGV(amount);
        ;
    }
}
class BankClient {
    constructor(delegateBusiness) {
        this.delegateBusiness = delegateBusiness;
        this._amount = 0;
        this.delegateBusiness = delegateBusiness;
    }
    get amount() {
        return this._amount;
    }
    set amount(amount) {
        this._amount = amount;
    }
    doTask() {
        return this.delegateBusiness.doTask(this.amount);
    }
}
module.exports = {
    BusinessDelegate: BusinessDelegate,
    BankClient: BankClient
};
