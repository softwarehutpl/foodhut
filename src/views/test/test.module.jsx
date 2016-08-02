import { Provider, connect } from "react-redux";
import TestView from "./test.view.jsx";
import TestStore from "./test.store.js";
import React from 'react';

import Syncano from 'syncano';
var connection = Syncano({ accountKey: 'fbf1124e539032498f59217ec26ce4e53e6ee398' });
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
                instanceName: 'fh-tt-instance',
                className: 'elements',
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
                instanceName: 'fh-tt-instance',
                className: 'elements',
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
        .fetchData({name: 'elements', instanceName: 'fh-tt-instance'})
        .then(function success(dataObjects) {
            console.info("MAMYY", dataObjects.objects);
            TestStore.dispatch({
                type: 'INIT_DATA',
                elements: dataObjects.objects,
            });
        });
}

let Test = connect(storeToProps, dispatchToProps)(TestView);

refetch();

export default <Provider store={TestStore}><Test/></Provider>;
