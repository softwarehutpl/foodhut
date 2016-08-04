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

function storeToProps(store) {
    console.log("elements: store.elements");
    // console.log(store.elements);
    return {
        restaurants: store.restaurants,
    };
}

function dispatchToProps(dispatch) {
    return {
        selectOrder: function selectOrder(id) {
            dispatch({
                type: 'SELECT_ORDER',
                elementId: id,
            });

            const query = {
                id: id,
                instanceName: config.instanceName,
                className: 'orders',
            };

            DataObject
                .please()
                .create(element)
                .then(function(element) {
                    console.log("element created", element);
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
                            if(orderElement.restaurant.value===restaurantElement.id) {
                                restaurantElement.ordered = true;
                            }

                            return restaurantElement;
                        });

                        return orderElement;
                    });
                    FirstScreenStore.dispatch({
                        type: 'INIT_DATA',
                        restaurants: restaurants,
                    });
                });



        });
    

}

let FirstScreen = connect(storeToProps, dispatchToProps)(FirstScreenView);

refetch();


export default <Provider store={FirstScreenStore}><FirstScreen/></Provider>;
