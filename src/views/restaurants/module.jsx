import React from 'react';
import { Provider, connect } from "react-redux";
import RestaurantSyncanoService from '../../services/RestaurantSyncanoService.js';
import RestaurantsPage from "./RestaurantsPage.jsx";
import RestaurantStore from "./store.js";
import RestaurantList from './list.jsx';


function stateToProps(state) {
    return {
        restaurants: state.restaurants,
        orderBy: state.orderBy
    };
}

function dispatchToProps(dispatch) {
    return {
        /**
         * Handle adding restauration
         * 
         * @param  {String} field
         */
        addRestaurant: function addRestaurant(restaurant) {          
            dispatch(Object.assign({}, restaurant, {
                type: 'ADD_RESTAURANT'
            }));

            RestaurantSyncanoService
                .addRestaurant(restaurant)
                .then((restaurant) => {
                    return getRestaurants();
                })
                .catch((error) => {
                    // restore original restaurants array
                    // this.setState({
                    //     restaurants: _.sortBy(restaurants, this.state.orderBy),
                    // });
                    console.log(`Add restaurant error: ${error}`);
                })
            ;

        },
        /**
         * Handle order by change
         * 
         * @param  {String} field
         */
        changeOrderBy: function(field) {
            const allowed = [RestaurantList.ORDER_BY_NAME, RestaurantList.ORDER_BY_MENU_LINK, RestaurantList.ORDER_BY_PACKAGE_COST];

            if (allowed.indexOf(field) !== -1) {
                 dispatch(Object.assign({}, {field}, {
                    type: 'CHANGE_ORDER_BY',
                    orderBy: field
                }));
                // this.setState({
                //     restaurants: _.sortBy(this.state.restaurants, field),
                //     orderBy: field
                // });            
            }
           
        }
    };
}

/**
 * Retrive restaurants via Syncano API
 */
function getRestaurants() {
   RestaurantSyncanoService
        .getActiveRestaurants()
        .then((restaurants) => {
            return RestaurantStore.dispatch({
                type: 'REFRESH_LIST',
                restaurants
            });
        })
        .catch((error) => {
            console.log(`Get restaurants error: ${error}`);
        })
    ;
}

const Restaurants = connect(stateToProps, dispatchToProps)(RestaurantsPage);
getRestaurants();

export default <Provider store={RestaurantStore}><Restaurants/></Provider>;