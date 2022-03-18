(function (window) {
    'use strict'; 
    let FORM_SELECTOR = '[data-coffee-order="form"]';
    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let myTruck = newTruck('12344',new DataStore());
    let $ = window.jQuery;
    window.myTruck = myTruck;

    // find the form that is being submitted and a create a formHandler objectS
    let formHandler = new FormHandler (FORM_SELECTOR);
    // bind the createOder to a specific truck and pass it to addSubmitHandler
    formHandler.addSubmitHandler(myTruck.createOder.bind(myTruck)); 
    console.log(formHandler);

})(window);
 


function FormHandler(selector){
    if (!selector) {
        throw new Error('No selector provided')
    }
} 
// find the "selector" in the DOM using jQuery and assign it to this.formElement
this.$formElement = $(selector);
if (this.$formElement.length ==0){
    throw new Error ('could not find element with selector:' + selector);
} 
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

//Add an event handler for the Submit button and pass increateOrder as a parameter (func)
FormHandler.prototype.addSubmitHandler = function (func) {
    console.log('Setting the submit handler for the form...');
    this.$formElement.on('submit', function(event) {
        event.preventDefault ();
        //copy all the infor from the form fields into the variable called data
        let data = {};
        $(this).serializeArray().forEach(function(item){
            data[item.name] = item.value;
            console.log(item.name + 'is ' + item.value);
        })
        console.log(data);
        func(data); // call the function that was passed in on the data from the form

        this.rest(); // rest the form
        this.element[0].focus(); // focus on the first field
    });
}

App.FormHandler = FormHandler;