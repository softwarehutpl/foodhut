'use strict';
import { Provider, connect } from "react-redux";
import FirstScreenView from "./first-screen.view.jsx";
import FirstScreenStore from "./first-screen.store.js";
import config from '../../config.json';
import React from 'react';
import Syncano from 'syncano';

// var connection = Syncano({ accountKey: "fbf1124e539032498f59217ec26ce4e53e6ee398" });
var connection = Syncano({ accountKey: config.accountKey });
var DataEndpoint = connection.DataEndpoint;
var DataObject = connection.DataObject;

// 1) Naprawić wyczajanie relacji restauracje<->ordery
// *) Mozna skorzystac z łączenia promisów (Promise.all())
// 2) Wprowadzic route'y do przechodzenia na order
// Zadanie z gwiazdką:) Jeśli zamówienie jest tworzone przeze mnie, mały "X" na górze do kasowania go z bazy

function storeToProps(store) {
    
    // console.log(store.elements);
    return {
        restaurants: store.restaurants,
        orders: store.orders,
    };
}

function dispatchToProps(dispatch) {
    return {
        selectOrder: function selectOrder(id) {
            console.log("order selected");

        },
        selectRestaurant: function selectRestaurant(id) {

            console.log("id");
            console.log(id);
            dispatch({
                type: 'SELECT_ORDER',
                elementId: id,
            });


            var order = {
                is_closed: false,
                restaurant: id,
                instanceName: config.instanceName,
                className: 'orders',
                price: 0,
            };


            DataObject
                .please()
                .create(order)
                .then(function(order) {
                    console.log("order created", order);
                    refetch();
                });

        },
    };
}

function refetch() {
    var orderPromise = new Promise((resolve, reject) => { 
       DataEndpoint
        .please()
        .fetchData({name: 'orders', instanceName: config.instanceName})
        .then(function success(dataObjects) {
            return resolve(dataObjects.objects);
        }); 
    });
    var restaurantPromise = new Promise((resolve, reject) => {
        DataEndpoint
        .please()
        .fetchData({name: 'restaurants', instanceName: config.instanceName})
        .then(function success(dataObjects) {
            return resolve(dataObjects.objects);
        });
    });
    Promise.all([orderPromise, restaurantPromise]).then(responses => { 
        console.log("responses");
        console.log(responses);
        FirstScreenStore.dispatch({
            type: 'INIT_DATA',
            orders: responses[0],
            restaurants: responses[1]
        });
        // FirstScreenStore.dispatch({
        //     type: 'INIT_DATA',
        // });
    }, reason => {
    });





}

let FirstScreen = connect(storeToProps, dispatchToProps)(FirstScreenView);

refetch();


export default <Provider store={FirstScreenStore}><FirstScreen/></Provider>;
