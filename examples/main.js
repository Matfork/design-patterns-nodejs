var Singleton = require('./singleton');
var ProxyTest = require('./proxy');
var BusinessDelegateTest = require('./businessDelegate');
var CommandTest = require('./command');
var dependencyInjectionTest = require('./di');

//Singleton Test
function singletonTest(){
    console.log('Singleton Example');
    console.log('=================');

    let inst1 = new Singleton();
    console.log(inst1.time);
    console.log('');

    setTimeout(function(){
      let inst2 = new Singleton();
      console.log(inst2.time);
      console.log('\n');
    },3000);
}

//Proxy Test
function proxyTest(){
    console.log('Proxy Example');
    console.log('==============');

    let proxyInts = new ProxyTest.GeoProxy();
    // geolocation requests

    proxyInts.getLatLng("Paris");
    proxyInts.getLatLng("London");
    proxyInts.getLatLng("London");
    proxyInts.getLatLng("London");
    proxyInts.getLatLng("London");
    proxyInts.getLatLng("Amsterdam");
    proxyInts.getLatLng("Amsterdam");
    proxyInts.getLatLng("Amsterdam");
    proxyInts.getLatLng("Amsterdam");
    proxyInts.getLatLng("London");
    proxyInts.getLatLng("London");

    ProxyTest.log.add("\nCache size: " + proxyInts.getCount());
    ProxyTest.log.show();
}

//BussinessDelegate Test
function bussinessDelegateTest(){
     console.log('BussinessDelegate Example');
     console.log('=========================');

    let businessDelegate = new BusinessDelegateTest.BusinessDelegate();
    businessDelegate.serviceType = "S";

    let bankClient = new BusinessDelegateTest.BankClient(businessDelegate);
    bankClient.amount = 6000;
    console.log('Result 1: ' + bankClient.doTask());

    businessDelegate.serviceType = "$";
    console.log('Result 2: ' + bankClient.doTask());
}

//Command Test
function commandTest(){
    console.log('Command Example');
    console.log('===============');

    var calculator = new CommandTest.Calculator();

    // issue commands
    calculator.execute(new CommandTest.Commands.Add(10));
    calculator.execute(new CommandTest.Commands.Sub(5));
    calculator.execute(new CommandTest.Commands.Mul(8));
    calculator.execute(new CommandTest.Commands.Div(10));

    // reverse last two commands
    calculator.undo();
    calculator.undo();

    CommandTest.log.add("\nValue: " + calculator.getCurrentValue());
    CommandTest.log.show();
}

//Command Test
function dependencyInjection(){
    console.log('Dependency Injection Example');
    console.log('============================');

    var ItemController = function(logger){this.logger = logger;};
    ItemController.prototype.add = function(item) {
       this.logger.log("Item["+item.id+"] is added!");
    };

    var Injector = new dependencyInjectionTest.Injector();
    Injector.add("logger", new dependencyInjectionTest.FancyLogger());
    Injector.add("logger2", new dependencyInjectionTest.SimpleLogger());

    var test = Injector.get(ItemController);
    test.add({id : 5});
}


//singletonTest();
//proxyTest();
//bussinessDelegateTest();
//commandTest();
dependencyInjection();
