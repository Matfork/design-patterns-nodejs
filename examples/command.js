/*
The Command pattern encapsulates actions as objects. Command objects allow for loosely coupled systems by separating the objects that issue a request from the objects that actually process the request. These requests are called events and the code that processes the requests are called event handlers.
Suppose you are building an application that supports the Cut, Copy, and Paste clipboard actions. These actions can be triggered in different ways throughout the app: by a menu system, a context menu (e.g. by right clicking on a textbox), or by a keyboard shortcut.
Command objects allow you to centralize the processing of these actions, one for each operation. So, you need only one Command for processing all Cut requests, one for all Copy requests, and one for all Paste requests.
Because commands centralize all processing, they are also frequently involved in handling Undo functionality for the entire application.

Participants
The objects participating in this pattern are:

Client -- In sample code: the run() function references the Receiver object
Receiver -- In sample code: Calculator knows how to carry out the operation associated with the command (optionally) maintains a history of executed commands
Command -- In sample code: Command maintains information about the action to be taken
Invoker -- In our sample code: the user pushing the buttons asks to carry out the request

*/

function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { return x / y; }

var AddCommand = function (value) {
    return new Command(add, sub, value);
};
var SubCommand = function (value) {
    return new Command(sub, add, value);
};
var MulCommand = function (value) {
    return new Command(mul, div, value);
};
var DivCommand = function (value) {
    return new Command(div, mul, value);
};

class Command{
  constructor(execute, undo, value){
    this.execute = execute;
    this.undo = undo;
    this.value = value;
  }
}

class Calculator {
   constructor(){
     this.current = 0;
     this.commands = [];
   }

   action(command) {
       var name = command.execute.toString().substr(9, 3);
       return name.charAt(0).toUpperCase() + name.slice(1);
   }

   execute(command) {
       this.current = command.execute(this.current, command.value);
       this.commands.push(command);
       log.add(this.action(command) + ": " + command.value);
   }

   undo() {
       var command = this.commands.pop();
       this.current = command.undo(this.current, command.value);
       log.add("Undo " + this.action(command) + ": " + command.value);
   }

   getCurrentValue() {
       return this.current;
   }
}

// log helper
var log = (function () {
   var log = "";
   return {
       add: function (msg) { log += msg + "\n"; },
       show: function () { console.log(log); log = ""; }
   }
})();

module.exports = {
  Calculator: Calculator,
  Commands: {
    Add : AddCommand,
    Sub : SubCommand,
    Mul : MulCommand,
    Div : DivCommand,
  },
  log : log
}
