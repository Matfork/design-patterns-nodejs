/*
The word “proxy” can be defined as a substitute, and that essentially explains what a proxy is.

we can give a few different scenarios where the proxy can come in handy:
delaying instantiation of a large object, accessing a remote object, and access control.
*/

class GeoCoder{
    getLatLng(address) {

        if (address === "Amsterdam") {
            return "52.3700° N, 4.8900° E";
        } else if (address === "London") {
            return "51.5171° N, 0.1062° W";
        } else if (address === "Paris") {
            return "48.8742° N, 2.3470° E";
        } else if (address === "Berlin") {
            return "52.5233° N, 13.4127° E";
        } else {
            return "";
        }
    };
}

class GeoProxy{
    constructor(x, y) {
      this.geocoder = new GeoCoder();
      this.geocache = {};
    }

    getLatLng(address) {
        if (!this.geocache[address]) {
            this.geocache[address] = this.geocoder.getLatLng(address);
        }
        log.add(address + ": " + this.geocache[address]);
        return this.geocache[address];
    }

    getCount() {
        var count = 0;
        for (var code in this.geocache) { count++; }
        return count;
    }
};

// log helper
var log = (function() {
    var log = "";

    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
    }
})();

module.exports = {
  GeoProxy: GeoProxy,
  log : log
}
