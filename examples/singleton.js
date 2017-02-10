"use strict";
let instance = null;

class Singleton{
    constructor() {
        console.log(!instance ? 'Creating instance' : 'Using instance');

        if(!instance){
          instance = this;
        }

        // to test whether we have singleton or not | it should give same always same time generated
        this.time = new Date()
        return instance;
      }
}

module.exports = Singleton
