"use strict";

let Handlebars = require('../lib/node_modules/hbsfy/runtime'),
    cakeInventory = require('./bakery_factory'),
    cakeTemplate = require('../templates/cake-grid.hbs'),
    welcomeTemplate = require('../templates/welcome.hbs'),
    welcomeData = require('../javascripts/welcome_data');


Handlebars.registerHelper("incrementer", (value) => parseInt(value) + 1);
Handlebars.registerPartial("footer", require("../templates/partials/footer.hbs"));

$("#welcome").append(welcomeTemplate(welcomeData));

function populatePage(stuff) {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = cakeTemplate(stuff);
    $("#cake-cards").append(newDiv);

}

cakeInventory.loadInventory()
    .then(
        (inventoryFromLoadInventoryResolve) => {
            console.log('Cake promise', inventoryFromLoadInventoryResolve);
            populatePage(inventoryFromLoadInventoryResolve);
        },
        (reject) => {
            console.log('It brokz', reject);
        }
    );

