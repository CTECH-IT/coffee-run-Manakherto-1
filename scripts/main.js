(function (window) {
    'use strict';
    let App = window.App || {};
    

 DataStore.prototype.add = function(key, val) {
    this.data = {};
}

DataStore.prototype.get = function (key) {
    return this.data[key];
} 
DataStore.prototype.getAll =function () {
    return this.data;
} 
DataStore.prototype.remove= function(key) {
    delete this.dat[key];
}
App.DataStore = DataStore;
window.App = App;

}) (window);
