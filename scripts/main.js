(function (window) {
    'use strict'; 
   var App = window.App || {};
   var $ = window.jQuery;
   function RemoteDataStore(url) {
       if(!url) {
           throw new Error('No remote URL supplied');
       } 
       this.serverUrl = url;
   } 

  
  
RemoteDataStore.prototype.getAll = function (cb) {
    // make a "get" call to server URL
    // pass in an anonymous function that calls the "cb" callback funstion
    $.get(this.serverUrl, function (serverResponse){
        console.log(serverResponse);
        cb(serverResponse);
    });
}

   RemoteDataStore.prototype.add = fundtion (key,val) {
       // Call jQuery's $.post method to send the value to the serverUrl
       // when the server responds, call an anonymous function with serverResponse
       $.pot(this.serverUrl,val, function(serverResponse) {
        console.log(serverResponse);
       });
        

   };
   
   App.RemoteDataStore = RemoteDataStore;
   window.App = App;
})(window);
     


    
 

  

    // let's make sure we only have one of eachof these:
    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.Checklist;
    let Validation = App.Validation;
    let myTruck = newTruck('12344',new DataStore());

    window.myTruck = myTruck;
    App.Validation = Validation;
    window.App = App
    const  FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR ='[data-coffee-order="checklist"]';
 
 
    let Validation = {
        isCompanyEmail: function (email) {
            return /.+@isd535\.org$/.test(email);
        }
    };
    // find the form that is being submitted and a create a formHandler objectS
    let formHandler = new FormHandler (FORM_SELECTOR);
    // find the checklist that is being updated and create a CheckList object
    let checkList = new CheckList(CHECKLIST_SELECTOR);

    //when a checkbox is clicked, call "deliverOder" on myTruck
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    // when the submit button is called, create the order and add a checkbox
    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck,data);
        checkList.addRow.call(checkList,Data);
    });

// add the email validation to email input field
formHandler.addInputHandler(Validation.isCompanyEmail);

// when the checkbox is clicked, get the email address from the row 
//and then call the function ( func) that is passed in with the email as a parameter  
CheckList.prototype.addClickHandler = function (func) {
    this.$element.on('click','input' , function ( event){
        var email = event .target.value;
        this.removeRow(emwil);
        func(email);
    }.bind(this));
};

// the method that adds a new row to the chechklist
CheckList.prototype.addRow = function (coffeeOrder) { 
    // Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.emailAddress);
    // Create a new instance of a row, using the coffee order infor
    var rowElement = new Row(coffeeOrder);
    // Add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
};
 

function CheckList (selector) 

// remove a row identified by an email address
CheckList.prototype.removeRow = function ( email) {
    this.$element 
    .find('[value="' + email + '"]')
    .closest('[data-coffee-order="checkbox"]')
    .remove();
} 
// Each row is one outstanding order
function Row(coffeeOrder) {
    let $div = $('<div></div>',{
        'data-coffee-order': 'checkbox', 'class': 'checkbox'
    });
    let $label = $('<label></label>');
    let $checkbox = $('<input></input>',{
        type: 'checkbox',
        value: coffeeOrder.emailAddress
    });

}

let description = coffeeOrder.size + '';
if (coffeeOrder.flavor) {
    description += coffeeOrder.flavor + '';
    description += coffeeOrder.emailAddress + ',';
    description += '(' + coffeeOrder.emailAddress + ')';
    description += '[' + coffeeOrder.strength + 'x]';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
}
// Add the Checklist to App namespace
App.Checklist = Checklist ;
window.App = App;



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

 (window);
 App.FormHandler = FormHandler;

//Add an event handler for the Submit button and pass increateOrder as a parameter (func)
FormHandler.prototype.addSubmitHandler = function (func) {
    console.log('Setting the submit handler for the form');
    this.$formElement.on('submit', function(event) {
        event.preventDefault ();
       
        // get the data from the form and store it in a data object
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
};


FormHandler.prototype.addInputHandler = function (func) {
    console.log('Setting input handler for form');
    this.$formElment.on('input', '[name="emailAddress"]', function (event){
        let emailAddress = event.target.value;
        if (func(emailAddress) == true) { //use validation.js to chek email
           event.target.setCustomValidation ('');
        } else {
            event.target.setCustomVaildation(emailAddress + 'is not an authorized email address!');
        }
    });
};



