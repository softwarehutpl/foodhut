'use strict';
import { Provider, connect } from "react-redux";
import FirstScreenView from "./first-screen.view.jsx";
import config from '../../config.json';
import React from 'react';
import Syncano from 'syncano';
import Store from '../../store';

// var connection = Syncano({ accountKey: "fbf1124e539032498f59217ec26ce4e53e6ee398" });
var connection = Syncano({ accountKey: config.accountKey });
var DataEndpoint = connection.DataEndpoint;
var DataObject = connection.DataObject;

// 1) Naprawić wyczajanie relacji restauracje<->ordery
// *) Mozna skorzystac z łączenia promisów (Promise.all())
// 2) Wprowadzic route'y do przechodzenia na order
// Zadanie z gwiazdką:) Jeśli zamówienie jest tworzone przeze mnie, mały "X" na górze do kasowania go z bazy

function storeToProps(store) {
    console.log("elements: store.elements");
    // console.log(store.elements);
    return {
        restaurants: store.dashboard.restaurants,
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

    DataEndpoint
        .please()
        .fetchData({name: 'restaurants', instanceName: config.instanceName})
        .then(function success(dataObjects) {
            let restaurants = dataObjects.objects;
            DataEndpoint
                .please()
                .fetchData({name: 'orders', instanceName: config.instanceName})
                .then(function success(dataObjects) {
                    let orders = dataObjects.objects.map((orderElement, i) => {
                        restaurants = restaurants.map((restaurantElement, i) => {
                            restaurantElement.ordered = false;
                            restaurantElement.orders = [];
                            if(orderElement.restaurant.value===restaurantElement.id) {
                                restaurantElement.ordered = true;
                                restaurantElement.orders.push(orderElement);
                            }

                            return restaurantElement;
                        });

                        return orderElement;
                    });
                    console.log("orders");
                    console.log(orders);
                    console.log("restaurants");
                    console.log(restaurants);
                    Store.dispatch({
                        type: 'DASHBOARD_INIT_DATA',
                        restaurants: restaurants,
                    });
                });



        });


}

refetch();

export default connect(storeToProps, dispatchToProps)(FirstScreenView);