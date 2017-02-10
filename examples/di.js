/*
Like all techniques for inverting program control, the primary aim use for dependency
injection is to decouple a complex application into smaller constituent parts.

Dependency injection is about removing the hard coded dependencies and providing way of changing dependencies in compile-time or run-time.

There can be two main reason to favor dependency injection : first is to improve maintainability of the code, second is to make it easy to test the code
*/

class Injector{
  constructor(){
    this.dependencies = {};
  }

  add(qualifier, obj){
     this.dependencies[qualifier] = obj;
  }

  get(func){
     var obj = new func;
     var dependencies = this.resolveDependencies(func);
     console.log('get: ' + dependencies);
     func.apply(obj, dependencies);
     return obj;
  }

  resolveDependencies(func) {
     var args = this.getArguments(func);
     var dependencies = [];

     console.log('func: ' + func);
     console.log('args: ' + args);
     for ( var i = 0; i < args.length; i++) {
        dependencies.push(this.dependencies[args[i]]);
     }
     return dependencies;
  }

  getArguments(func) {
     //This regex is from require.js
     var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
     var args = func.toString().match(FN_ARGS)[1].split(',');
     return args;
  }

}

var Logger = {
   log : function(log) {}
};

var SimpleLogger = function(){};
SimpleLogger.prototype = Object.create(Logger);
SimpleLogger.prototype.log = function(log){
  console.log(log);
}

var FancyLogger = function(){};
FancyLogger.prototype = Object.create(Logger);
FancyLogger.prototype.log = function(log){
   var now = new Date();
   console.log(now.toString("dd/MM/yyyy HH:mm:ss fff") + " : "+ log);
}

module.exports = {
  SimpleLogger: SimpleLogger,
  FancyLogger: FancyLogger,
  Injector: Injector
};
