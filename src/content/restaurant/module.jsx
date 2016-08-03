'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantList from './list.jsx';
import RestaurantForm from './form.jsx';
import RestaurantSyncanoService from './RestaurantSyncanoService.js';
import _ from 'underscore';

const refreshInterval = 5; //in minutes

class RestaurantBox extends React.Component {    
    /**
     * Constructor
     * 
     * @param  {Object} props
     */
	constructor(props) {
        super(props);

        this.getRestaurants = this.getRestaurants.bind(this);
        this.handleOrderByChange = this.handleOrderByChange.bind(this);
        this.handleRestaurantAddition = this.handleRestaurantAddition.bind(this);

        this.state = {
            restaurants: [],
            orderBy: RestaurantList.ORDER_BY_NAME
        };
    }

    /**
     * Handle adding restauration
     * 
     * @param  {String} field
     */
    handleRestaurantAddition(restaurant) {
        var restaurants = this.state.restaurants;            

        this.setState({
            restaurants: _.sortBy(restaurants.concat([restaurant]), this.state.orderBy)
        });

        RestaurantSyncanoService
            .addRestaurant(restaurant)
            .then((restaurant) => {
                //console.log(restaurant);
            })
            .catch((error) => {
                // restore original restaurants array
                this.setState({
                    restaurants: _.sortBy(restaurants, this.state.orderBy),
                });
                console.log(`Add restaurant error: ${error}`);
            })
        ;
    }

    /**
     * Handle order by change
     * 
     * @param  {String} field
     */
    handleOrderByChange(field) {
        const allowed = [RestaurantList.ORDER_BY_NAME, RestaurantList.ORDER_BY_MENU_LINK, RestaurantList.ORDER_BY_PACKAGE_COST];

        if (allowed.indexOf(field) !== -1) {
            this.setState({
                restaurants: _.sortBy(this.state.restaurants, field),
                orderBy: field
            });            
        }
    }

    /**
     * Retrive restaurants via Syncano API
     */
    getRestaurants() {
        // console.log(RestaurantSyncanoService.getActiveRestaurants(this.state.orderBy));
        RestaurantSyncanoService
            .getActiveRestaurants(this.state.orderBy)
            .then((restaurants) => {
                this.setState({ restaurants });
            })
            .catch((error) => {
                console.log(`Get restaurants error: ${error}`);
            })
        ;           
    }

    componentDidMount() {       
        this.getRestaurants();
        setInterval(this.getRestaurants, refreshInterval*60*1000);
    }

  	render() {
    	return (
    	    <div className="restaurantBox">
                <RestaurantList 
                    restaurants={this.state.restaurants} 
                    onOrderByChange={this.handleOrderByChange}
                    orderBy={this.state.orderBy}
                />
                <br /><br />
                <RestaurantForm 
                    onRestaurantAddition={this.handleRestaurantAddition}
                />
            </div>
		);
  	}
}

ReactDOM.render(<RestaurantBox/>, document.getElementById('container'));