'use strict';

import React from 'react';
import RestaurantList from './RestaurantList';
import RestaurantForm from './RestaurantForm';

class RestaurantsPage extends React.Component {
    componentDidMount() { 
        this.props.loadRestaurants();
    }

  	render() {
    	return (
    	    <div className="restaurantBox">
                <RestaurantList 
                    restaurants={this.props.restaurants} 
                    onOrderByChange={this.props.changeOrderBy}
                    orderBy={this.props.orderBy}
                />
                <br /><br />
                <RestaurantForm 
                    onRestaurantAddition={this.props.addRestaurant}
                />
            </div>
		);
  	}
}

export default RestaurantsPage;