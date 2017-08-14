"use strict";
var $ = require('../lib/node_modules/jquery/dist/jquery.js');
let inventory = [];
let bakery = {};

let fillInventory = (data) => {
    let keys = Object.keys(data);
        keys.forEach((item) => {
            data[item].firebaseId = item;
            console.log(item);
            inventory.push(data[item]);
    });
};


//get data

bakery.getInventory = () => {
    return inventory;
};

bakery.loadInventory =  () => {
    let typeId = 1;
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://donut-test-data-e898b.firebaseio.com/items.json?orderBy="typeId"&equalTo="${typeId}"`,
            type: 'GET'
        }).done(function(data){
            fillInventory(data);
            resolve(data);
        }).fail((error) => reject(error));
    });
};

module.exports = bakery;


//load data