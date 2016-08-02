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
    return {
        elements: store.elements,
    };
}

function dispatchToProps(dispatch) {
    return {
        addElement: function addElement(name, val) {
            dispatch({
                type: 'ADD_ELEMENT',
                elementName: name,
                elementValue: val,
            });

            var element = {
                elementName: name,
                elementValue: val,
                instanceName: config.instanceName,
                className: 'restaurants',
            };

            DataObject
                .please()
                .create(element)
                .then(function(element) {
                    console.log("element created", element);
                    refetch();
                });


        },
        removeElement: function removeElement(id) {
            dispatch({
                type: 'REMOVE_ELEMENT',
                elementId: id,
            });

            const query = {
                id: id,
                instanceName: config.instanceName,
                className: 'restaurants',
            };

            DataObject
                .please()
                .delete(query)
                .then(function(element) {
                    console.log("element deleted", id);
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
            console.info("data", dataObjects.objects);
            FirstScreenStore.dispatch({
                type: 'INIT_DATA',
                elements: dataObjects.objects,
            });
        });
}

let FirstScreen = connect(storeToProps, dispatchToProps)(FirstScreenView);

refetch();


export default <Provider store={FirstScreenStore}><FirstScreen/></Provider>;
